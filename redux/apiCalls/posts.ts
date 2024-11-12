import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASEURL} from '../../constants/constants';

export const fetchFeed = createAsyncThunk(
  'fetchFeed',
  async (userId: string) => {
    const response = await axios.get(`${API_BASEURL}post/feed/${userId}`);
    return response.data.data;
  },
);
