import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASEURL} from '../../constants/constants';
import {AppState} from '../store';

export const fetchChatFeed = createAsyncThunk(
  'fetchChatFeed',
  async (_, {getState, rejectWithValue}) => {
    const appState = getState() as AppState;
    const {userId} = appState.user.appUser;
    try {
      const response = (await axios.get(`${API_BASEURL}chat/feed/${userId}`))
        .data;
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const apiError = e.response?.data.apiError;
        return rejectWithValue(
          `fetching feed for userId : ${userId} failed with code ${e.status} message : ${apiError.message}`,
        );
      }
      return rejectWithValue(
        `failed to fetch chat feed for userId : ${userId}`,
      );
    }
  },
);

export const fetchChatMessages = createAsyncThunk(
  'fetchChatMessages',
  async (chatId: string, {rejectWithValue}) => {
    try {
      const response = (
        await axios.get(`${API_BASEURL}chat/messages/${chatId}`)
      ).data;
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const apiError = e.response?.data.apiError;
        return rejectWithValue(
          `fetching messages for chatId : ${chatId} failed with code ${e.status} message : ${apiError.message}`,
        );
      }
      return rejectWithValue(
        `failed to fetch chat feed for chatId : ${chatId}`,
      );
    }
  },
);
