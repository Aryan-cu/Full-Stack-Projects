// PostCard — exactly 8 props, all used in JSX
// When optimization is ON this export is replaced by a React.memo-wrapped version.
import React from 'react';

function PostCardPlain({ title, description, date, time, platform, status, priority, author }) {
  const priorityColor =
    priority === 'high' ? 'var(--danger)' : priority === 'medium' ? 'var(--warning)' : 'var(--success)';

  const cardStyle = {
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '14px',
    marginBottom: '10px',
    background: 'var(--card-bg)',
    fontSize: '13px',
    backdrop: 'blur(10px)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };
  const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' };
  const platformBadge = {
    fontSize: '11px',
    padding: '4px 8px',
    borderRadius: '6px',
    background: 'var(--primary-gradient)',
    color: '#fff',
    fontWeight: '500',
  };
  const metaStyle = { color: 'var(--text-secondary)', marginTop: '6px', fontSize: '12px' };
  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    fontSize: '11px',
    color: 'var(--text-secondary)',
    paddingTop: '8px',
    borderTop: '1px solid var(--bg-tertiary)',
  };

  return (
    <div style={cardStyle} data-testid={`post-card-${title}`}>
      <div style={headerStyle}>
        <strong>{title}</strong>
        <span style={platformBadge}>{platform}</span>
      </div>
      <div style={metaStyle}>{description}</div>
      <div style={metaStyle}>
        {date} at {time}
      </div>
      <div style={footerStyle}>
        <span>by {author}</span>
        <span style={{ color: priorityColor, fontWeight: 600 }}>{priority}</span>
        <span>{status}</span>
      </div>
    </div>
  );
}

// React.memo — skips re-render if props unchanged
export const PostCardMemo = React.memo(PostCardPlain);

// Default export is the plain component; App.jsx chooses which one to render.
export default PostCardPlain;
