import {
  ActionReducerMapBuilder,
  createSlice,
} from '@reduxjs/toolkit';
import {fetchAllFollowing} from '../apiCalls/follow';

export interface FollowUser {
  name: string;
  id: string;
  profilePicUrl: string;
  followId: string;
}

export interface FollowState {
  followers: Array<FollowUser>;
  following: Array<FollowUser>;
  isLoadingFollowerData: boolean;
  isLoadingFollowingData: boolean;
  error: boolean;
}

const initialState: FollowState = {
  followers: [],
  following: [],
  isLoadingFollowerData: true,
  isLoadingFollowingData: true,
  error: false,
};

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<FollowState>) => {
    builder.addCase(fetchAllFollowing.pending, (state: FollowState, _) => {
      state.isLoadingFollowingData = true;
    });
    builder.addCase(fetchAllFollowing.rejected, (state, _) => {
      state.isLoadingFollowingData = false;
    });
    builder.addCase(fetchAllFollowing.fulfilled, (state, action) => {
      state.isLoadingFollowingData = false;
      state.followers = action.payload;
    });
  },
});

export default followSlice.reducer;
