import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchAirQuality } from '@/mocks/fetch-weather';
import { airQualityKeys } from '@/queries/weatherKeys';
import type { Location } from '@/types/location';

export function useAirQuality(location: Location | null) {
  return useSuspenseQuery({
    queryKey: airQualityKeys.byLocation(location),
    queryFn: async () => {
      const airData = await fetchAirQuality(location);
      return airData;
    },
  });
}
