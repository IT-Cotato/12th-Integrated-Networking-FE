import type { WeatherStatus } from "../types/Weather";

export const iconCodeMap: Record<string, WeatherStatus> = {
  "01d": "맑음",
  "01n": "맑음",
  "02d": "흐림",
  "02n": "흐림",
  "03d": "흐림",
  "03n": "흐림",
  "04d": "흐림",
  "04n": "흐림",
  "09d": "비",
  "09n": "비",
  "10d": "비",
  "10n": "비",
  "11d": "폭풍",
  "11n": "폭풍",
  "13d": "눈",
  "13n": "눈",
  "50d": "바람",
  "50n": "바람",
};
