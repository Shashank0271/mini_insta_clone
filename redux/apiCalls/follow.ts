import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASEURL} from '../../constants/constants';

export const fetchAllFollowing = createAsyncThunk(
  'fetchAllFollowers',
  async (userId: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${API_BASEURL}follow/following/${userId}`,
      );
      return response.data.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(
          `failed to fetch all followers with code : ${e.status} , message : ${e.message}`,
        );
      }
    }
  },
);
