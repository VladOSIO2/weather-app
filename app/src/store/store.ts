import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/user.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
