import { mockRes, mockAirQualityRes } from '@/mocks/mockResponse';
import type { OneCallResponse } from '@/types/weather.types';
import type { Location } from '@/types/location';
import type { AirQualityResponse } from '@/types/air-quality.types';

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
export const fetchAirQuality = (
  location: Location | null,
): Promise<AirQualityResponse> => {
  if (!location) {
    console.error(
      '[Mock API] Error: Location is null. Cannot fetch air quality.',
    );
    return Promise.reject(
      new Error('Location is required to fetch air quality.'),
    );
  }

  const lat = location.y;
  const lon = location.x;

  console.log(
    `[Mock API] ${location.name} 대기질 정보 요청. (lat: ${lat}, lon: ${lon} 전송)`,
  );

  /*
    // 실제 API 호출 시 사용할 코드 구조 (주석 처리)
    const response = await axios.get('/api/weather-server/air_pollution', { 
        params: { lat, lon } 
    });
    return response.data;
    */

  return new Promise((resolve) => {
    // 1초 지연 후 mock 데이터 반환
    setTimeout(() => {
      resolve(mockAirQualityRes as AirQualityResponse);
    }, 1000);
  });
};
