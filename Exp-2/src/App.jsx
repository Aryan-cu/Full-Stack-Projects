import "./App.css";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost } from "./features/postSlice";
import { selectPostsByPlatform } from "./features/selectors";
import PostCard from "./components/PostCard";

function App() {
  const dispatch = useDispatch();

  const [platform, setPlatform] = useState("All");

  const posts = useSelector((state) =>
    selectPostsByPlatform(state, platform)
  );

  const totalPosts = useMemo(() => posts.length, [posts]);

  const handleAddPost = () => {
    const title = prompt("Enter Post Title");

    if (!title) return;

    const platform = prompt(
      "Platform (Twitter, Instagram, Facebook, LinkedIn)"
    );

    if (!platform) return;

    dispatch(
      addPost({
        id: Date.now(),
        title,
        platform,
      })
    );
  };

  return (
    <div className="container">

      <h1>📱 Social Media Post Manager</h1>

      <button
        className="addBtn"
        onClick={handleAddPost}
      >
        Add New Post
      </button>

      <br /><br />

      <select
        value={platform}
        onChange={(e) =>
          setPlatform(e.target.value)
        }
      >
        <option>All</option>
        <option>Twitter</option>
        <option>Instagram</option>
        <option>Facebook</option>
        <option>LinkedIn</option>
      </select>

      <h2>Total Posts : {totalPosts}</h2>

      <div className="cards">

        {posts.map((post) => (

          <PostCard
            key={post.id}
            post={post}
            onDelete={(id) =>
              dispatch(deletePost(id))
            }
          />

        ))}

      </div>

    </div>
  );
}

export default App;