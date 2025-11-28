import { WeatherIconMap } from "./WeatherIconMap";
import type { WeatherStatus } from "../types/Weather";
import { mockWeather } from "../services/WeatherService";

export function getWeatherIcon(status: WeatherStatus, isDaytime: boolean) {
  const time = isDaytime ? "day" : "night";

  // 기본값을 "흐림"으로 설정
  const fallbackStatus = mockWeather.status;
  const fallback = WeatherIconMap[fallbackStatus][time];

  return WeatherIconMap[status]?.[time] ?? fallback;
}
