import type {
  HourlyForecast,
  WeatherInfo,
  WeeklyForecast,
} from "../types/Weather";
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

// 시간당 예보 Mock 데이터 (현재~24시간)
export const mockHourly: HourlyForecast[] = [
  { time: "03시", temp: 8, status: "흐림", isDaytime: false },
  { time: "04시", temp: 8, status: "흐림", isDaytime: false },
  { time: "05시", temp: 8, status: "흐림", isDaytime: false },
  { time: "06시", temp: 8, status: "맑음", isDaytime: true },
  { time: "07시", temp: 8, status: "맑음", isDaytime: true },
  { time: "08시", temp: 8, status: "맑음", isDaytime: true },
  { time: "09시", temp: 8, status: "맑음", isDaytime: true },
  { time: "10시", temp: 8, status: "비", isDaytime: true },
  { time: "11시", temp: 8, status: "맑음", isDaytime: true },
  { time: "12시", temp: 8, status: "맑음", isDaytime: true },
  { time: "13시", temp: 8, status: "맑음", isDaytime: true },
  { time: "14시", temp: 8, status: "흐림", isDaytime: true },

  // 나머지 12시간
  { time: "15시", temp: 8, status: "흐림", isDaytime: true },
  { time: "16시", temp: 7, status: "흐림", isDaytime: true },
  { time: "17시", temp: 7, status: "비", isDaytime: true },
  { time: "18시", temp: 6, status: "비", isDaytime: false },
  { time: "19시", temp: 6, status: "비", isDaytime: false },
  { time: "20시", temp: 5, status: "흐림", isDaytime: false },
  { time: "21시", temp: 5, status: "흐림", isDaytime: false },
  { time: "22시", temp: 5, status: "눈", isDaytime: false },
  { time: "23시", temp: 4, status: "눈", isDaytime: false },
  { time: "00시", temp: 4, status: "눈", isDaytime: false },
  { time: "01시", temp: 3, status: "맑음", isDaytime: false },
  { time: "02시", temp: 3, status: "맑음", isDaytime: false },
];

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
