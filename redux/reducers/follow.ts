import {ActionReducerMapBuilder, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {
  fetchAllFollowers,
  fetchAllFollowing,
  followUser,
  removeFollower,
  unfollowUser,
} from '../apiCalls/follow';
import {FollowUser} from '../../types/FollowUser';

export interface FollowState {
  followers: Array<FollowUser>;
  following: Array<FollowUser>;
  isLoadingFollowerData: boolean;
  isLoadingFollowingData: boolean;
  loadingFollowerDataError: boolean;
  loadingFollowingDataError: boolean;
  loadingRequest: boolean;
  error: string;
  isLoadingRequest: boolean;
}

const initialState: FollowState = {
  followers: [],
  following: [],
  isLoadingFollowerData: true,
  isLoadingFollowingData: true,
  loadingFollowerDataError: false,
  loadingFollowingDataError: false,
  loadingRequest: false,
  error: '',
  isLoadingRequest: false,
};

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    removeFollowerFromList: (state, action) => {
      const indexToRemove = action.payload as number;
      state.followers.splice(indexToRemove, 1);
    },
  },
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
    builder.addMatcher(
      isAnyOf(followUser.pending, unfollowUser.pending, removeFollower.pending),
      (state, _) => {
        state.error = '';
        state.loadingRequest = true;
      },
    );
    builder.addMatcher(
      isAnyOf(
        followUser.rejected,
        unfollowUser.rejected,
        removeFollower.rejected,
      ),
      (state, action) => {
        state.error = action.payload as string;
        state.loadingRequest = false;
      },
    );
    builder.addMatcher(
      isAnyOf(
        followUser.fulfilled,
        unfollowUser.fulfilled,
        removeFollower.fulfilled,
      ),
      (state, _) => {
        state.error = '';
        state.loadingRequest = false;
      },
    );
  },
});

export default followSlice.reducer;
export const {removeFollowerFromList} = followSlice.actions;
