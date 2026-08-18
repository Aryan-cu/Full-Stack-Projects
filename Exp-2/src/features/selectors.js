import { createSelector } from "@reduxjs/toolkit";

const selectPosts = (state) => state.posts.posts;

const selectPlatform = (_, platform) => platform;

export const selectPostsByPlatform = createSelector(
  [selectPosts, selectPlatform],
  (posts, platform) => {
    if (platform === "All") return posts;

    return posts.filter(
      (post) =>
        post.platform.toLowerCase() ===
        platform.toLowerCase()
    );
  }
);