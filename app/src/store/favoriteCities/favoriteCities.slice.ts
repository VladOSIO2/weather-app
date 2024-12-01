import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteCity, FavoriteCityState } from './favoriteCities.types';

const initialState: FavoriteCityState = {
  isLoadingDetailsCity: false,

  isLoadingFavoriteCities: true,
  isValidFavoriteCities: false,
};

export const favoriteCitiesSlice = createSlice({
  name: 'favoriteCities',
  initialState,
  reducers: {
    setIsLoadingDetailsCity: (state, action: PayloadAction<boolean>) => {
      state.isLoadingDetailsCity = action.payload;
    },

    setDetailsCity: (state, action: PayloadAction<FavoriteCity>) => {
      state.detailsCity = action.payload;
    },

    clearDetailsCity: (state) => {
      state.detailsCity = undefined;
      state.isLoadingDetailsCity = false;
    },

    setIsLoadingFavoriteCities: (state, action: PayloadAction<boolean>) => {
      state.isLoadingFavoriteCities = action.payload;
    },

    setFavoriteCities: (state, action: PayloadAction<FavoriteCity[]>) => {
      state.favoriteCities = action.payload;
      state.isValidFavoriteCities = true;
    },

    setIsValidFavoriteCities: (state, action: PayloadAction<boolean>) => {
      state.isValidFavoriteCities = action.payload;
    },

    clearFavoriteCities: (state) => {
      state.favoriteCities = undefined;
      state.isValidFavoriteCities = false;
      state.isLoadingFavoriteCities = true;
    },
  },
});

export const fetchDetailsCity = createAction<string>(
  'favoriteCities/fetchDetailsCity',
);
export const toggleDetailsCity = createAction<void>(
  'favoriteCities/toggleDetailsCity',
);
export const fetchFavoriteCities = createAction<void>(
  'favoriteCities/fetchFavoriteCities',
);

export const {
  setIsLoadingDetailsCity,
  setDetailsCity,
  clearDetailsCity,
  setIsLoadingFavoriteCities,
  setFavoriteCities,
  setIsValidFavoriteCities,
  clearFavoriteCities,
} = favoriteCitiesSlice.actions;
