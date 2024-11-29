import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './user.types';

const initialState: UserState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserState>) => {
      state.id = payload.id;
      state.name = payload.name;
    },
  },
});

export const { setUser } = userSlice.actions;
