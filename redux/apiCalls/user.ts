import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASEURL} from '../../constants/constants';
import {AppUser} from '../reducers/user';

export const fetchUserBySID = createAsyncThunk(
  'fetchUserFromDb',
  async (supabaseId: string): Promise<AppUser> => {
    const response = await axios.get(`${API_BASEURL}user/${supabaseId}`);
    return response.data;
  },
);
