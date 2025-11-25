import type { WeatherApiResponse } from '@/types/weather.types';
import type { Location } from '@/types/location';
import axios from 'axios';

export async function fetchWeather(
  location: Location | null,
): Promise<WeatherApiResponse | null> {
  if (!location) {
    console.error('[Mock API] Error: Location is null. Cannot fetch weather.');
    return Promise.reject(new Error('Location is required to fetch weather.'));
  }

  const lat = location.y;
  const lon = location.x;

  console.log(
    `[Mock API] ${location.name} 날씨 정보 요청. (lat: ${lat}, lon: ${lon} 전송)`,
  );

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/weather`,
      {
        params: { lat, lon },
      },
    );

    return response.data;
  } catch (error) {
    console.error('[API] 날씨 요청 실패:', error);
    return null;
  }
}
