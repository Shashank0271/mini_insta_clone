import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASEURL} from '../../constants/constants';
import {AppState} from '../store';
import {Comment} from '../../types/Comment';
import {
  setFetchedAllComments,
} from '../reducers/comment';
import {MutableRefObject} from 'react';

export const fetchAllCommentsForPost = createAsyncThunk(
  'fetchAllCommentsForPost',
  async (
    {
      postId,
      pageOffset,
    }: {postId: number; pageOffset: MutableRefObject<number>},
    {rejectWithValue, getState, dispatch},
  ) => {
    try {
      const offSet = pageOffset.current;
      let previousCommentList: Comment[] = [];
      const currentState = getState() as AppState;
      if (offSet > 0) {
        previousCommentList = currentState.comment.comments;
      }
      const response = await axios.get(
        `${API_BASEURL}comment/${postId}?pageOffset=${offSet}`,
      );
      const fetchedAllComments: boolean = response.data.data.last;
      dispatch(setFetchedAllComments(fetchedAllComments));
      return [...previousCommentList, ...response.data.data.content];
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const apiError = e.response?.data.apiError;
        return rejectWithValue(
          `fetching comments for postId : ${postId} failed with code ${e.status} message : ${apiError.message} `,
        );
      }
      return rejectWithValue(`failed to fetch comments for postId : ${postId}`);
    }
  },
);
