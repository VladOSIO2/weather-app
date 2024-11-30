export const getWeatherSuggestion = (
  avgTempC: number,
  condition: string,
): string => {
  const suggestions: string[] = [];
  const conditionNormalized = condition.toLowerCase();

  if (avgTempC < 10) {
    suggestions.push('Wear a warm jacket');
  } else if (avgTempC > 25) {
    suggestions.push('Wear sunglasses');
  }

  if (conditionNormalized.includes('rain')) {
    suggestions.push('Take an umbrella');
  }

  return suggestions.join('; ') + '.';
};

export const convertDateStrToLocaleString = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const convertTimeToLocal = (
  dateStr: string,
  timeStr: string,
  timeZone: string,
): string => {
  const timezoneOffset = getTimezoneOffset(timeZone);
  const cityDateTime = new Date(`${dateStr} ${timeStr} ${timezoneOffset}`);

  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedTime = formatter.format(new Date(cityDateTime));

  return formattedTime;
};

const getTimezoneOffset = (timeZone: string): string => {
  return new Date()
    .toLocaleString('en', { timeZone, timeZoneName: 'longOffset' })
    .split(' ')[3];
};
