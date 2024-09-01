import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


// initial state
const initialState = {
    profiles: [],
    myProfiles: [],
    isProfilesLoading: false,
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

// profile slice
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
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
    },
})


// selectors
// profiles
export const profilesSelectors = state => state.profile.profiles


// default exports
export default profileSlice.reducer