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

export const followUser = createAsyncThunk(
  'followUser',
  async (otherUserId: string, {getState, rejectWithValue}) => {
    const currentState = getState() as AppState;
    const {userId: currentUserId} = currentState.user.appUser;
    try {
      await axios.post(`${API_BASEURL}follow/${currentUserId}/${otherUserId}`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(
          `failed to fetch all followers with code : ${e.status} , message : ${e.message}`,
        );
      }
    }
  },
);

// TODO : yet to be integrated
export const unfollowUser = createAsyncThunk(
  'unfollowUser',
  async (otherUserId: string, {getState, rejectWithValue}) => {
    const currentState = getState() as AppState;
    const {userId: currentUserId} = currentState.user.appUser;
    try {
      await axios.delete(
        `${API_BASEURL}follow/${currentUserId}/${otherUserId}`,
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(
          `failed to fetch all followers with code : ${e.status} , message : ${e.message}`,
        );
      }
    }
  },
);

export const removeFollower = createAsyncThunk(
  'removeFollower',
  async (followId: string, {rejectWithValue}) => {
    try {
      await axios.delete(`${API_BASEURL}follow/${followId}`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(
          `failed to fetch all followers with code : ${e.status} , message : ${e.message}`,
        );
      }
    }
  },
);
