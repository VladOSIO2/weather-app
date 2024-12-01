import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './user.types';

const initialState: UserState = {
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserState>) => {
      state.id = payload.id;
      state.name = payload.name;
      state.isLoading = false;
    },

    setUserLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    clearUser: (state) => {
      state.id = undefined;
      state.name = undefined;
      state.isLoading = true;
    },
  },
});

export const fetchUser = createAction<void>('user/fetchUser');
export const logout = createAction<void>('user/logout');

export const { setUser, setUserLoading, clearUser } = userSlice.actions;
