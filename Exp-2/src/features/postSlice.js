import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Welcome Post",
      platform: "Twitter",
    },
    {
      id: 2,
      title: "React Tutorial",
      platform: "Instagram",
    },
    {
      id: 3,
      title: "Redux Toolkit Lab",
      platform: "LinkedIn",
    },
  ],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

export const { addPost, deletePost } = postSlice.actions;

export default postSlice.reducer;