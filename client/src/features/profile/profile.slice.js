import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// config
// socket
import { SOCKET } from '../../config';


// initial state
const initialState = {
    profiles: [],
    myProfiles: [],
    isProfilesLoading: false,
    isProfileUploading: false,
    isProfileDeleting: false,
    profileIndexIndicator: 0,
}


// get all profiles
export const getAllProfiles = createAsyncThunk('profile/getAllProfiles', async () => {
    try {
        const response = await axios.get('/api/profile/all-profiles')
        return response.data
    } catch (err) {
        return err.response.data
    }
})

// add new profile
export const addNewProfile = createAsyncThunk('profile/addNewProfile',async data => {
    try {
        const response = await axios.post('/api/profile/new-profile',data)
        return response.data
    } catch (err) {
        return err.response.data
    }
})

// delete profile
export const deleteProfile = createAsyncThunk('profile/deleteProfile', async _id => {
    try {
        const response = await axios.delete(`/api/profile/delete-profile/${_id}`)
        return response.data
    } catch (err) {
        return err.response.data
    }
})

// profile slice
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // add new profile event
        newProfileEvent: (state,action) => {
            state.profiles = [action.payload,...state.profiles]
        },
        // delete profile event
        deleteProfileEvent: (state,action) => {
            state.profiles = state.profiles?.filter(profile => profile?._id !== action.payload)
        },
        profileIndexIndicatorSetter: state => {
            state.profileIndexIndicator = 0
        }
    },
    extraReducers: builder => {
        builder
            // get all profiles
            // pending
            .addCase(getAllProfiles.pending, state => {
                state.isProfilesLoading = true
            })
            // fulfilled
            .addCase(getAllProfiles.fulfilled, (state,action)=>{
                state.isProfilesLoading = false
                if(action.payload?.profiles){
                    state.profiles = action.payload?.profiles
                }
            })
            // rejected
            .addCase(getAllProfiles.rejected, state => {
                state.isProfilesLoading = false 
                console.log('GET-ALL-PROFILES-REJECTED')
            })
            // add new profile
            // pending
            .addCase(addNewProfile.pending, state=>{
                state.isProfileUploading = true
            })
            // fulfilled
            .addCase(addNewProfile.fulfilled, (state,action)=>{
                state.isProfileUploading = false 
                if(action.payload?.newProfile){
                    SOCKET.emit('newProfile',action.payload?.newProfile)
                    state.profileIndexIndicator = 1
                }
            })
            // rejected
            .addCase(addNewProfile.rejected, state => {
                state.isProfileUploading = false 
                console.log('ADD-NEW-PROFILE-REJECTED')
            })
            // delete profile
            // pending
            .addCase(deleteProfile.pending, state => {
                state.isProfileDeleting = true
            })
            // fulfilled
            .addCase(deleteProfile.fulfilled, (state,action)=>{
                state.isProfileDeleting = false 
                if(action.payload?._id){
                    SOCKET.emit('deleteProfile',action.payload?._id)
                    state.profileIndexIndicator = -1
                }
            })
            // rejected
            .addCase(deleteProfile.rejected, (state)=> {
                state.isProfileDeleting = false 
                console.log('DELETE-PROFILE-REJECTED')
            })
    },
})

// actions
export const {
    newProfileEvent,
    deleteProfileEvent,
    profileIndexIndicatorSetter,
} = profileSlice.actions

// selectors
// profiles
export const profilesSelectors = state => state.profile.profiles
// is profile uploading
export const isProfileUploadingSelector = state => state.profile.isProfileUploading
// is profile deleting
export const isProfileDeletingSelector = state => state.profile.isProfileDeleting
// current profile index
export const profileIndexIndicatorSelector = state => state.profile.profileIndexIndicator


// default exports
export default profileSlice.reducer