import { mockRes } from '@/mocks/mockResponse';
import type { OneCallResponse } from '@/types/weather.types';
import type { Location } from '@/types/location';

export const fetchWeather = (
  location: Location | null,
): Promise<OneCallResponse> => {
  if (!location) {
    console.error('[Mock API] Error: Location is null. Cannot fetch weather.');
    return Promise.reject(new Error('Location is required to fetch weather.'));
  }

  const lat = location.y;
  const lon = location.x;

  console.log(
    `[Mock API] ${location.name} 날씨 정보 요청. (lat: ${lat}, lon: ${lon} 전송)`,
  );

  /*
  const response = await axios.get('/api/weather-server/weather', { 
    params: { lat, lon } 
  });
  return response.data;
  */

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRes as OneCallResponse);
    }, 1000);
  });
};

// TODO: (별도 구현 필요) 미세먼지 API 호출 함수
// export const fetchAirPollution = (location: Location | null): Promise<AirPollutionResponse> => { ... }
