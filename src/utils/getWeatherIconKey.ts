import type { WeatherIconKey } from "@/constants/weatherIconMap";

interface GetWeatherIconParams {
  weather: string;
  time: string;
  sunrise: string;
  sunsetTime: string;
}

/**
 * 일출/일몰 기준으로 낮/밤 판별 후 아이콘 key 반환
 */
export const getWeatherIconKey = ({
  weather,
  time,
  sunrise,
  sunsetTime,
}: GetWeatherIconParams): WeatherIconKey => {
  const current = new Date(time).getTime();
  const sunriseTime = new Date(sunrise).getTime();
  const sunset = new Date(sunsetTime).getTime();

  const isDay = current >= sunriseTime && current < sunset;

  // 기본 weather 문자열 그대로 사용
  const baseKey = weather as WeatherIconKey;

  if (isDay) {
    // 낮이면 고정 키 그대로
    return baseKey;
  }

  // 밤이면 -night 아이콘 사용
  const nightKey = `${weather}-night` as WeatherIconKey;
  return nightKey;
};
