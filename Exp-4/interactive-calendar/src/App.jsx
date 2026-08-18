// Optimization toggles — each hook has its own switch so the user can flip
// them independently. All three start ON.
//   - memoOn: PostCard is wrapped in React.memo (skips re-render when props unchanged)
//   - useMemoOn: Calendar postsByDay map is memoized
//   - useCallbackOn: App handlers + Calendar event handlers use useCallback
//
// Calendar uses native HTML5 drag-and-drop:
//   - each post chip has draggable + onDragStart
//   - each day cell has onDragOver (preventDefault) + onDrop
//   - on drop, App dispatches reschedulePost with the new date
import { useState, useCallback, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, reschedulePost } from './store/postSlice';
import PostForm from './components/PostForm';
import Calendar from './components/Calendar';
import PostCard from './components/PostCard';
import RenderCounter from './components/RenderCounter';
import PerformancePanel from './components/PerformancePanel';

// React.memo — skips re-render if props unchanged. Hoisted to module scope so
// the wrapper identity is stable across renders.
const PostCardMemo = memo(PostCard);

export default function App() {
  // Optimization toggles — each controls a real rendering behavior.
  const [memoOn, setMemoOn] = useState(true);
  const [useMemoOn, setUseMemoOn] = useState(true);
  const [useCallbackOn, setUseCallbackOn] = useState(true);
  const [editingPost, setEditingPost] = useState(null);

  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  // Live render counts — kept in refs so updating them does not trigger a
  // re-render and risk feedback loops. We mirror the values into state only
  // when one of the toggles flips, which is exactly when we want to display
  // the new numbers anyway.
  const countsRef = useRef({ App: 0, Calendar: 0, PostCard: 0 });
  const [counts, setCounts] = useState({ App: 0, Calendar: 0, PostCard: 0 });
  countsRef.current.App += 1;

  const handleCounts = useCallback((name, value) => {
    countsRef.current[name] = value;
  }, []);

  // Stable handlers when useCallback is ON; recreated every render when OFF.
  const handleEditStable = useCallback((post) => setEditingPost(post), []);
  const handleDeleteStable = useCallback((id) => dispatch(deletePost(id)), [dispatch]);
  const handlePostDropStable = useCallback(
    (id, newDate) => dispatch(reschedulePost({ id, date: newDate })),
    [dispatch],
  );
  const handlePostClickStable = useCallback((post) => setEditingPost(post), []);

  const handleEditPlain = (post) => setEditingPost(post);
  const handleDeletePlain = (id) => dispatch(deletePost(id));
  const handlePostDropPlain = (id, newDate) =>
    dispatch(reschedulePost({ id, date: newDate }));
  const handlePostClickPlain = (post) => setEditingPost(post);

  const handleEdit = useCallbackOn ? handleEditStable : handleEditPlain;
  const handleDelete = useCallbackOn ? handleDeleteStable : handleDeletePlain;
  const handlePostDrop = useCallbackOn ? handlePostDropStable : handlePostDropPlain;
  const handlePostClick = useCallbackOn ? handlePostClickStable : handlePostClickPlain;

  // Mirror counts into state whenever any toggle flips so the panel updates.
  const prevToggles = useRef({ memoOn, useMemoOn, useCallbackOn });
  if (
    prevToggles.current.memoOn !== memoOn ||
    prevToggles.current.useMemoOn !== useMemoOn ||
    prevToggles.current.useCallbackOn !== useCallbackOn
  ) {
    prevToggles.current = { memoOn, useMemoOn, useCallbackOn };
    setCounts({ ...countsRef.current });
  }

  // Selected post for the bottom detail panel — first one if none highlighted
  const selectedPost = editingPost || posts[0];

  const PostCardToUse = memoOn ? PostCardMemo : PostCard;

  const topbarStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 20px',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border-color)',
  };
  const titleRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginRight: 'auto',
  };
  const layoutStyle = {
    display: 'grid',
    gridTemplateColumns: '320px 1fr 280px',
    gap: '12px',
    padding: '12px',
    alignItems: 'start',
  };
  const bottomStyle = {
    margin: '0 12px 12px',
    padding: '16px',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
  };
  const toggleBtn = (on) => ({
    padding: '6px 12px',
    background: on ? 'var(--success)' : 'var(--danger)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  });

  // Wrap a setter so the panel's numbers visibly jump right after the flip.
  const flip = (setter) => {
    setCounts({ ...countsRef.current });
    setter((v) => !v);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <div style={topbarStyle}>
        <div style={titleRowStyle}>
          <strong style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>📱 Social Post Scheduler</strong>
          <RenderCounter name="App" onCount={handleCounts} color="var(--secondary)" />
        </div>
        <button
          type="button"
          data-testid="memo-toggle"
          onClick={() => flip(setMemoOn)}
          style={toggleBtn(memoOn)}
          title="Wrap PostCard in React.memo"
        >
          React.memo: {memoOn ? 'ON' : 'OFF'}
        </button>
        <button
          type="button"
          data-testid="usememo-toggle"
          onClick={() => flip(setUseMemoOn)}
          style={toggleBtn(useMemoOn)}
          title="Cache Calendar events array"
        >
          useMemo: {useMemoOn ? 'ON' : 'OFF'}
        </button>
        <button
          type="button"
          data-testid="usecallback-toggle"
          onClick={() => flip(setUseCallbackOn)}
          style={toggleBtn(useCallbackOn)}
          title="Stabilize handler references"
        >
          useCallback: {useCallbackOn ? 'ON' : 'OFF'}
        </button>
      </div>

      <div style={layoutStyle}>
        <div>
          <PostForm editingPost={editingPost} onDone={() => setEditingPost(null)} />
        </div>

        <div>
          <Calendar
            posts={posts}
            onPostDrop={handlePostDrop}
            onPostClick={handlePostClick}
            onCountsChange={handleCounts}
            useMemoOn={useMemoOn}
            useCallbackOn={useCallbackOn}
          />

          <div style={bottomStyle} data-testid="selected-post-panel">
            <strong style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🎯 Selected Post</strong>
            {selectedPost ? (
              <PostCardToUse
                title={selectedPost.title}
                description={selectedPost.description}
                date={selectedPost.date}
                time={selectedPost.time}
                platform={selectedPost.platform}
                status={selectedPost.status}
                priority={selectedPost.priority}
                author={selectedPost.author}
              />
            ) : (
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '12px', textAlign: 'center', padding: '20px 0' }}>
                No post selected yet.
              </div>
            )}
          </div>
        </div>

        <div>
          <PerformancePanel
            memoOn={memoOn}
            useMemoOn={useMemoOn}
            useCallbackOn={useCallbackOn}
            counts={counts}
          />

          <div style={{ marginTop: '10px', background: '#fff', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
            <strong style={{ fontSize: '13px' }}>Posts</strong>
            <div style={{ maxHeight: '320px', overflowY: 'auto', marginTop: '6px' }}>
              {posts.map((p) => (
                <div key={p.id} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                  <button
                    type="button"
                    onClick={() => handleEdit(p)}
                    style={{ flex: 1, padding: '4px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '12px',
                      background: '#fee2e2',
                      border: '1px solid #fecaca',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    data-testid={`delete-${p.id}`}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}