import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchWeather } from '@/api/fetch-weather';
import { weatherKeys } from '@/queries/weatherKeys';
import type { Location } from '@/types/location';

export function useWeather(location: Location | null) {
  return useSuspenseQuery({
    queryKey: weatherKeys.byLocation(location),
    queryFn: async () => {
      const weatherData = await fetchWeather(location);
      return weatherData;
    },
  });
}
