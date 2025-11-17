import { mockRes } from '@/mocks/mockResponse';
import type { OneCallResponse } from '@/types/weather.types';
import type { Location } from '@/types/location';

export const fetchWeather = (
  location: Location | null,
): Promise<OneCallResponse> => {
  console.log(`[Mock API] ${location?.name}의 One Call 날씨 정보 요청 중...`);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRes as OneCallResponse);
    }, 500);
  });
};

// 5. TODO: (별도 구현 필요) 미세먼지 API 호출 함수
// export const fetchAirPollution = (location: Location | null): Promise<AirPollutionResponse> => { ... }
