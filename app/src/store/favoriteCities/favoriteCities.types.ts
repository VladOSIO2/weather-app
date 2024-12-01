export interface FavoriteCityState {
  isLoadingDetailsCity: boolean;
  detailsCity?: FavoriteCity;

  isLoadingFavoriteCities: boolean;
  isValidFavoriteCities: boolean;
  favoriteCities?: FavoriteCity[];
}

export interface FavoriteCity {
  weatherApiId: string;
  cityName: string;
}

export interface FavoriteCitiesResponse {
  cities: FavoriteCity[];
}
