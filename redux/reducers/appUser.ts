import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {Session} from '@supabase/supabase-js';
import {fetchUserBySID} from '../apiCalls/user';
import {AccountType, AppUser} from '../../types/User';

export interface UserState {
  appUser: AppUser;
  isLoadingUser: boolean;
  failedToLoadUser: boolean;
  session: Session | null | undefined;
}

const initialState: UserState = {
  appUser: {
    userId: '',
    supabaseId: '',
    name: '',
    uname: '',
    accountType: AccountType.PRIVATE,
    email: '',
    bio: '',
    profilePicUrl: '',
    followers: 0,
    following: 0,
    posts: 0,
  },
  isLoadingUser: true,
  failedToLoadUser: false,
  session: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSession: (state: UserState, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    setSupabaseId: (state, action) => {
      state.appUser.supabaseId = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(fetchUserBySID.pending, state => {
      state.isLoadingUser = true;
      state.failedToLoadUser = false;
    });
    builder.addCase(fetchUserBySID.rejected, state => {
      state.isLoadingUser = false;
      state.failedToLoadUser = true;
    });
    builder.addCase(
      fetchUserBySID.fulfilled,
      (state, action: PayloadAction<AppUser>) => {
        state.isLoadingUser = false;
        state.failedToLoadUser = false;
        state.appUser = action.payload;
      },
    );
  },
});

export const {setSession , setSupabaseId} = userSlice.actions;
export default userSlice.reducer;
