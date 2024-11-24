import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {Comment} from '../../types/Comment';
import {fetchAllCommentsForPost} from '../apiCalls/comment';

interface CommentState {
  comments: Array<Comment>;
  isLoadingComment: boolean;
  error: string | null;
  isLoadingMoreComments: boolean;
  fetchedAllComments: boolean;
}

const initialState: CommentState = {
  comments: [],
  isLoadingComment: false,
  error: null,
  isLoadingMoreComments: false,
  fetchedAllComments: false,
};

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    setLoadingMoreComments: (state, action) => {
      state.isLoadingMoreComments = action.payload;
    },
    setFetchedAllComments: (state, action) => {
      state.fetchedAllComments = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CommentState>) => {
    builder.addCase(fetchAllCommentsForPost.pending, (state, _) => {
      if (!state.isLoadingMoreComments) {
        state.isLoadingComment = true;
      }
      state.error = null;
    });
    builder.addCase(fetchAllCommentsForPost.rejected, (state, action) => {
      state.isLoadingComment = false;
      state.error = action.payload as string;
      state.isLoadingMoreComments = false;
    });
    builder.addCase(fetchAllCommentsForPost.fulfilled, (state, action) => {
      state.isLoadingComment = false;
      state.error = null;
      state.comments = action.payload;
      state.isLoadingMoreComments = false;
    });
  },
});

export default commentSlice.reducer;
export const {setLoadingMoreComments, setFetchedAllComments} =
  commentSlice.actions;
