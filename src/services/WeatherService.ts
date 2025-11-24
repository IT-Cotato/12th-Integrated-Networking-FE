import type { WeatherInfo, WeeklyForecast } from "../types/Weather";
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

export const mockWeekly: WeeklyForecast[] = [
  {
    date: "오늘 4.26",
    forecasts: {
      am: { rain: 10, temp: 8, status: "비" },
      pm: { rain: 10, temp: 19, status: "비" },
    },
  },
  {
    date: "일 4.27",
    forecasts: {
      am: { rain: 0, temp: 10, status: "맑음" },
      pm: { rain: 0, temp: 20, status: "맑음" },
    },
  },
  {
    date: "월 4.28",
    forecasts: {
      am: { rain: 0, temp: 9, status: "맑음" },
      pm: { rain: 40, temp: 19, status: "비" },
    },
  },
  {
    date: "화 4.29",
    forecasts: {
      am: { rain: 10, temp: 8, status: "눈" },
      pm: { rain: 10, temp: 20, status: "눈" },
    },
  },
  {
    date: "수 4.30",
    forecasts: {
      am: { rain: 10, temp: 12, status: "폭풍" },
      pm: { rain: 10, temp: 22, status: "폭풍" },
    },
  },
];
