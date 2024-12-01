export interface FavoriteCityState {
  isLoadingDetailsCity: boolean;
  detailsCity?: FavoriteCity;

  isLoadingFavoriteCities: boolean;
  isValidFavoriteCities: boolean;
  favoriteCities?: FavoriteCity[];
}

export interface FavoriteCity {
  weatherCityId: string;
  name: string;
}
