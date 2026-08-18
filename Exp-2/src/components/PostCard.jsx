import React from "react";

const PostCard = React.memo(({ post, onDelete }) => {
  console.log("Rendering:", post.title);

  return (
    <div className="card">
      <h2>{post.title}</h2>

      <p>
        <strong>Platform:</strong> {post.platform}
      </p>

      <button
        className="deleteBtn"
        onClick={() => onDelete(post.id)}
      >
        Delete
      </button>
    </div>
  );
});

export default PostCard;