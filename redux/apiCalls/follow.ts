import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASEURL} from '../../constants/constants';
import {AppState} from '../store';

export const fetchAllFollowing = createAsyncThunk(
  'fetchAllFollowing',
  async (userId: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${API_BASEURL}follow/following/${userId}`,
      );
      return response.data.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(
          `failed to fetch all following with code : ${e.status} , message : ${e.message}`,
        );
      }
    }
  },
);

export const fetchAllFollowers = createAsyncThunk(
  'fetchAllFollowers',
  async (_, {rejectWithValue, getState}) => {
    const currentState = getState() as AppState;
    const {
      appUser: {userId},
    } = currentState.user;
    
    try {
      const response = await axios.get(
        `${API_BASEURL}follow/followers/${userId}`,
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
