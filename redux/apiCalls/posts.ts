import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASEURL} from '../../constants/constants';

export const fetchFeed = createAsyncThunk(
  'fetchFeed',
  async (userId: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${API_BASEURL}posts/feed/${userId}`);
      return response.data.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const apiError = e.response?.data.apiError;
        return rejectWithValue(
          `failed to fetch feed with code : ${e.status} , message : ${apiError.message}`,
        );
      }
    }
  },
);

export const fetchUserPosts = createAsyncThunk(
  'fetchUserPosts',
  async (userId: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${API_BASEURL}posts/user/${userId}/all-posts`,
      );
      return response.data.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const apiError = e.response?.data.apiError;
        return rejectWithValue(
          `fetch to fetch user posts with code : ${e.status} , message:  ${apiError.message}`,
        );
      }
    }
  },
);
