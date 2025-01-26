import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {ViewProfile} from '../../types/ViewProfile';
import {fetchUserProfileBySID} from '../apiCalls/user';

interface ViewProfileState {
  userProfile: ViewProfile | null;
  isLoadingProfile: boolean;
  loadingProfileError: string;
}

const initialState: ViewProfileState = {
  userProfile: null,
  isLoadingProfile: true,
  loadingProfileError: '',
};

const viewProfileSlice = createSlice({
  name: 'viewProfileSlice',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ViewProfileState>) => {
    builder.addCase(fetchUserProfileBySID.pending, (state, _) => {
      state.isLoadingProfile = true;
      state.loadingProfileError = '';
      state.userProfile = null;
    });
    builder.addCase(fetchUserProfileBySID.rejected, (state, action) => {
      state.isLoadingProfile = false;
      state.loadingProfileError = action.payload as string;
      state.userProfile = null;
    });
    builder.addCase(fetchUserProfileBySID.fulfilled, (state, action) => {
      state.isLoadingProfile = false;
      state.loadingProfileError = '';
      state.userProfile = action.payload;
    });
  },
});

export default viewProfileSlice.reducer;
