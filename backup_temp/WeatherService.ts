import type { WeatherInfo } from "../types/Weather";
import { todayApiDate, toDisplayDate } from "../utils/Date";

const apiDate = todayApiDate(); // "2025-11-24"
const displayDate = toDisplayDate(apiDate); // "11월 24일"

export const mockWeather: WeatherInfo = {
  location: "롯데월드",
  apiDate,
  displayDate,
  temperature: 12.2,
  feelsLike: 9,
  humidity: 48,
  windDirection: "남동풍",
  windSpeed: 0.4,
  status: "흐림",
  isDaytime: false,
  fineDust: 5,
  ultraFineDust: 30,
  uvIndex: 12,
  sunrise: "05:44",
};
