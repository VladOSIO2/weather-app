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
    },

    setUserLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const fetchUser = createAction<void>('user/fetchUser');

export const { setUser, setUserLoading } = userSlice.actions;
