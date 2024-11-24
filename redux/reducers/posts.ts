import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {Post} from '../../types/Post';
import {fetchFeed, fetchUserPosts} from '../apiCalls/posts';

export interface PostsState {
  feed: Array<Post>;
  userPosts: Array<Post>;
  isLoadingFeed: boolean;
  loadingFeedError: string;
  isLoadingUserPosts: boolean;
  loadingUserPostsError: string;
}

const initialState: PostsState = {
  feed: [],
  userPosts: [],
  isLoadingFeed: true,
  loadingFeedError: '',
  isLoadingUserPosts: false,
  loadingUserPostsError: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PostsState>) => {
    builder.addCase(fetchFeed.pending, state => {
      state.isLoadingFeed = true;
      state.loadingFeedError = '';
    });
    builder.addCase(fetchFeed.rejected, (state, action) => {
      state.loadingFeedError = action.payload as string;
      state.isLoadingFeed = false;
    });
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.feed = action.payload;
      state.isLoadingFeed = false;
      state.loadingFeedError = '';
    });
    builder.addCase(fetchUserPosts.pending, (state, _) => {
      state.isLoadingUserPosts = true;
      state.loadingUserPostsError = '';
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.isLoadingUserPosts = false;
      state.loadingUserPostsError = '';
      state.userPosts = action.payload;
    });
    builder.addCase(fetchUserPosts.rejected, (state, action) => {
      state.loadingUserPostsError = action.payload as string;
      state.isLoadingUserPosts = false;
    });
  },
});

export default postSlice.reducer;
