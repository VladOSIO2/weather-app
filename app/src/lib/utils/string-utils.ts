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
