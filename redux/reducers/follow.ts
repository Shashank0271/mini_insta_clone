import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {fetchAllFollowers, fetchAllFollowing} from '../apiCalls/follow';
import {FollowUser} from '../../types/FollowUser';

export interface FollowState {
  followers: Array<FollowUser>;
  following: Array<FollowUser>;
  isLoadingFollowerData: boolean;
  isLoadingFollowingData: boolean;
  loadingFollowerDataError: boolean;
  loadingFollowingDataError: boolean;
}

const initialState: FollowState = {
  followers: [],
  following: [],
  isLoadingFollowerData: true,
  isLoadingFollowingData: true,
  loadingFollowerDataError: false,
  loadingFollowingDataError: false,
};

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<FollowState>) => {
    builder.addCase(fetchAllFollowing.pending, (state: FollowState, _) => {
      state.isLoadingFollowingData = true;
      state.loadingFollowingDataError = false;
    });
    builder.addCase(fetchAllFollowing.rejected, (state, _) => {
      state.isLoadingFollowingData = false;
      state.loadingFollowingDataError = true;
    });
    builder.addCase(fetchAllFollowing.fulfilled, (state, action) => {
      state.isLoadingFollowingData = false;
      state.loadingFollowingDataError = false;
      state.following = action.payload;
    });
    builder.addCase(fetchAllFollowers.pending, (state, _) => {
      state.isLoadingFollowerData = true;
      state.loadingFollowerDataError = false;
    });
    builder.addCase(fetchAllFollowers.rejected, (state, _) => {
      state.isLoadingFollowerData = false;
      state.loadingFollowerDataError = true;
    });
    builder.addCase(fetchAllFollowers.fulfilled, (state, action) => {
      state.isLoadingFollowerData = false;
      state.loadingFollowerDataError = false;
      state.followers = action.payload;
    });
  },
});

export default followSlice.reducer;
