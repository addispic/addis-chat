import { configureStore } from "@reduxjs/toolkit";

// reducers
// users
import usersReducer from "../features/users/users.slice";
// profile
import profileReducer from "../features/profile/profile.slice";
// posts
import postsReducer from "../features/posts/posts.slice";

// store
export const store = configureStore({
  reducer: {
    // users reducer
    user: usersReducer,
    profile: profileReducer,
    posts: postsReducer,
  },
});
