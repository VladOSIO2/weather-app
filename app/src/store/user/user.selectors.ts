import { RootState } from '../store';

export const selectUserId = (state: RootState) => state.user.id;

export const selectUserLoading = (state: RootState) => state.user.isLoading;
