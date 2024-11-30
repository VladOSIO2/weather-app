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

export const convertTimeToLocal = (timeStr: string): string => {
  const [time, period] = timeStr.split(' ');
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  const now = new Date();
  const inputTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
  );

  const localTimeOffset = inputTime.getTimezoneOffset() * 60 * 1000;
  const localTime = new Date(inputTime.getTime() - localTimeOffset);
  const localHours = localTime.getHours();

  const clockHours = localHours % 12 || 12;
  const formattedHours = clockHours.toString().padStart(2, '0');
  const formattedMinutes = localTime.getMinutes().toString().padStart(2, '0');
  const formattedPeriod = localHours >= 12 ? 'PM' : 'AM';

  return `${formattedHours}:${formattedMinutes} ${formattedPeriod}`;
};
