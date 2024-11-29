import { RootState } from '../store';

export const selectUser = (state: RootState) => state.user;

export const selectUserLoading = (state: RootState) => state.user.isLoading;
