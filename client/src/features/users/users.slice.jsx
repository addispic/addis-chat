import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// config
// io
import {SOCKET} from '../../config';

// local user
const localUser = JSON.parse(localStorage.getItem("user"));

// initial state
const initialState = {
  user: localUser ? localUser : null,
  users: null,
  errors: null,
  isFormSubmitting: false,
  loggingOut: false,
};

// login
export const login = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await axios.post("/api/user/login", data);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

// register
export const register = createAsyncThunk("user/register", async (data) => {
  try {
    const response = await axios.post("/api/user/register", data);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

// get all users
export const getAllUsers = createAsyncThunk("user/getAllUsers",async () => {
  try {
    const response = await axios.get("/api/user/get-all-users");
    return response.data
  } catch (err) {
    return err.response.data
  }
})

// logout
export const logout = createAsyncThunk('user/logout',async () => {
  try {
    const response = await axios.get('/api/user/logout');
    return response.data;
  } catch (err) {
    return err.response.data;
  }
})

// auth checker
export const authChecker = createAsyncThunk('user/authChecker', async () => {
  try{
    const response = await axios.get('/api/user/auth-checker')
    return response.data
  }catch(err){
    return err.response.data
  }
})
// users slice
const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // add new user
    addNewUser: (state,action) => {
      state.users = [action.payload,...state?.users];
    },
  },
  extraReducers: (builder) => {
    builder
      // cases
      // login
      // pending
      .addCase(login.pending, (state) => {
        state.isFormSubmitting = true;
      })
      // fulfilled
      .addCase(login.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        if (action.payload?._id) {
          state.user = action.payload;
          localStorage.setItem("user",JSON.stringify(action.payload))
          state.errors = null;
        }
        if (action.payload?.errors) {
          state.errors = action.payload?.errors;
        }
      })
      // rejected
      .addCase(login.rejected, (state) => {
        state.isFormSubmitting = false;
        console.log("LOGIN REJECTED");
      })
      // register
      // pending
      .addCase(register.pending, (state) => {
        state.isFormSubmitting = true;
      })
      // fulfilled
      .addCase(register.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        if (action.payload?._id) {
          SOCKET.emit('newUserRegister',action.payload)
          state.errors = null;
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
        if (action.payload?.errors) {
          state.errors = action.payload?.errors;
        }
      })
      // rejected
      .addCase(register.rejected, (state) => {
        state.isFormSubmitting = false;
        console.log("REGISTER REJECTED");
      })

      // get all users
      // fulfilled
      .addCase(getAllUsers.fulfilled, (state,action) => {
        if(action.payload?.users){
          state.users = action.payload?.users
        }
      })
      // rejected
      .addCase(getAllUsers.rejected, state => {
        console.log("get all users rejected");
      })
      // logout
      // pending
      .addCase(logout.pending,state => {
        state.loggingOut = true
      })
      // fulfilled
      .addCase(logout.fulfilled,(state,action)=>{
        state.loggingOut = false
        if(action.payload?.message){
          state.user = null;
          localStorage.removeItem('user');
        }
      })
      // rejected
      .addCase(logout.rejected, state => {
        state.loggingOut = false
      })
      // auth checker
      // fullfilled
      .addCase(authChecker.fulfilled, (state,action)=>{
        if(action.payload?.error === "unauthorized"){
          state.user = null 
          localStorage.removeItem('user')
        }
      })
  },
});

// actions
export const {addNewUser} = usersSlice.actions

// is form submitting
export const isFormSubmittingSelector = (state) => state.user.isFormSubmitting;
// logging out
export const loggingOutSelector = (state) => state.user.loggingOut
// error
export const errorsSelector = (state) => state.user.errors;
// user
export const userSelector = (state) => state.user.user;
// users
export const usersSelector = (state) => state.user.users;

// exports
export default usersSlice.reducer;
