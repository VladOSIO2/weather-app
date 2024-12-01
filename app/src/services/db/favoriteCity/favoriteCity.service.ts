import 'server-only';
import { dbPool } from '../db';
import { FavoriteCityModel } from './favoriteCity.types';

export async function findFavoriteCity(
  userId: string,
  weatherApiId: string,
): Promise<FavoriteCityModel | undefined> {
  const favoriteCity = await dbPool.query(
    `SELECT user_id AS "userId", weather_api_id AS "weatherApiId", name AS "cityName" 
    FROM favorite_cities WHERE user_id = $1 AND weather_api_id = $2`,
    [userId, weatherApiId],
  );

  return favoriteCity.rows[0];
}

export async function createFavoriteCityReturning(
  favoriteCity: FavoriteCityModel,
): Promise<FavoriteCityModel> {
  const insertQueryResult = await dbPool.query(
    `INSERT INTO favorite_cities (user_id, weather_api_id, name) 
    VALUES ($1, $2, $3) 
    ON CONFLICT (user_id, weather_api_id) DO UPDATE SET name = $3
    RETURNING user_id AS "userId", weather_api_id AS "weatherApiId", name AS "cityName"
    `,
    [favoriteCity.userId, favoriteCity.weatherApiId, favoriteCity.cityName],
  );

  return insertQueryResult.rows[0];
}

export async function deleteFavoriteCity(
  userId: string,
  weatherApiId: string,
): Promise<void> {
  await dbPool.query(
    'DELETE FROM favorite_cities WHERE user_id = $1 AND weather_api_id = $2',
    [userId, weatherApiId],
  );
}

export async function findAllFavoriteCities(
  userId: string,
): Promise<FavoriteCityModel[]> {
  const favoriteCities = await dbPool.query(
    `SELECT user_id AS "userId", weather_api_id AS "weatherApiId", name AS "cityName" 
    FROM favorite_cities WHERE user_id = $1`,
    [userId],
  );
  return favoriteCities.rows;
}
