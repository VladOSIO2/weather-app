import { RootState } from '../store';

export const selectDetailsCity = (state: RootState) =>
  state.favoriteCities.detailsCity;

export const selectIsLoadingDetailsCity = (state: RootState) =>
  state.favoriteCities.isLoadingDetailsCity;
