import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASEURL} from '../../constants/constants';
import {AppState} from '../store';

export const fetchUserBySID = createAsyncThunk(
  'fetchUserFromDb',
  async (supabaseId: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${API_BASEURL}user/${supabaseId}`);
      return response.data.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(
          `failed to fetch user with code : ${e.code} , message : ${e.message}`,
        );
      }
    }
  },
);

export const fetchUserProfileBySID = createAsyncThunk(
  'fetchUserProfileBySID',
  async (supabaseId: string, {rejectWithValue, getState}) => {
    try {
      const currentState = getState() as AppState;
      const {userId} = currentState.user.appUser;
      const response = await axios.get(
        `${API_BASEURL}user/view/${userId}/${supabaseId}`,
      );
      return response.data.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(
          `failed to fetch user with code : ${e.code} , message : ${e.message}`,
        );
      }
      console.error(`ERROR ------------------- ${e}`);
    }
  },
);
