import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// config
// socket
import { SOCKET } from "../../config";

// initial state
const initialState = {
  posts: null,
  isPostLoading: false,
  isNewPostUploading: false,
  isPostDeleting: false,
};

// get all posts
export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  try {
    const response = await axios.get("/api/post/get-all-posts");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

// add new post s
export const addNewPost = createAsyncThunk("posts/addNewPost", async (data) => {
  try {
    const response = await axios.post("/api/post/new-post", data);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

// delete post
export const deletePost = createAsyncThunk("posts/deletePost", async (_id) => {
  try {
    const response = await axios.delete(`/api/post/delete-post/${_id}`);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

// slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // add new post
    addNewPostEvent: (state, action) => {
      state.posts?.unshift(action?.payload);
    },
    // delete post
    deletePostEvent: (state, action) => {
      state.posts = state.posts.filter(
        (postItem) => postItem?._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // cases
      // get all posts
      // pending
      .addCase(getAllPosts.pending, (state) => {
        state.isPostLoading = true;
      })
      // fulfilled
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isPostLoading = false;
        if (action.payload?.posts) {
          state.posts = action.payload.posts;
        }
      })
      // rejected
      .addCase(getAllPosts.rejected, (state) => {
        state.isPostLoading = false;
        console.log("REJECTED-GET-POSTS");
      })

      // new post
      // pending
      .addCase(addNewPost.pending, (state) => {
        state.isNewPostUploading = true;
      })
      // fulfilled
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.isNewPostUploading = false;
        if (action.payload?.newPost) {
          SOCKET.emit("addNewPost", action.payload?.newPost);
        }
      })
      // rejected
      .addCase(addNewPost.rejected, (state) => {
        state.isNewPostUploading = false;
        console.log("ADD-NEW-POST-REJECTED");
      })
      // delete post
      // pending case
      .addCase(deletePost.pending, (state) => {
        state.isPostDeleting = true;
      })
      // fulfilled
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isPostDeleting = false;
        if (action.payload?._id) {
          SOCKET.emit("deletePost", action.payload?._id);
        }
      })
      // rejected
      .addCase(deletePost.rejected, (state) => {
        state.isPostDeleting = false;
        console.log("DELETE-POST-REJECTED");
      });
  },
});

// actions
export const { addNewPostEvent, deletePostEvent } = postsSlice.actions;
// selectors
// posts selector
export const postsSelector = (state) => state.posts.posts;
// is post loading
export const isPostLoadingSelector = (state) => state.posts.isPostLoading;
// is post uploading
export const isNewPostUploadingSelector = (state) => state.posts.isNewPostUploading
// is post deleting
export const isPostDeletingSelector = (state) => state.posts.isPostDeleting;

// exports
export default postsSlice.reducer;
