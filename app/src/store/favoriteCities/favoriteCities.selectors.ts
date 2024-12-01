import { RootState } from '../store';

export const selectDetailsCity = (state: RootState) =>
  state.favoriteCities.detailsCity;

export const selectIsLoadingDetailsCity = (state: RootState) =>
  state.favoriteCities.isLoadingDetailsCity;

export const selectFavoriteCities = (state: RootState) =>
  state.favoriteCities.favoriteCities;

export const selectIsLoadingFavoriteCities = (state: RootState) =>
  state.favoriteCities.isLoadingFavoriteCities;

export const selectIsValidFavoriteCities = (state: RootState) =>
  state.favoriteCities.isValidFavoriteCities;
