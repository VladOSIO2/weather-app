export const buildCityNameDetails = (country: string, region?: string) => {
  return region ? `${region}, ${country}` : country;
};

export const buildCityName = (
  city: string,
  country: string,
  region?: string,
) => {
  return `${city}, ${buildCityNameDetails(country, region)}`;
};

export const buildWeatherIconUrl = (iconUrl: string) => {
  return 'https:' + iconUrl;
};

export const buildTemperature = (tempC: number, tempF: number) => {
  return `${tempC}°C / ${tempF}°F`;
};

export const buildDetailsUrl = (cityWeatherId: string, date?: string) => {
  return `/details?id=${cityWeatherId}${date ? `&date=${date}` : ''}`;
};
