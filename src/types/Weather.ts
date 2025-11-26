// src/types/weather.ts
export type WeatherStatus = "맑음" | "흐림" | "비" | "눈" | "폭풍" | "바람";

export interface WeatherInfo {
  // 프론트 표기용(피그마용)
  displayDate: string; // "4월 26일"
  // 백엔드 요청용(YYYY-MM-DD)
  apiDate: string; // "2025-04-26"
  location: string; // 위치

  temperature: number; // 현재 온도
  feelsLike: number; // 체감 온도
  humidity: number; // 습도 (%)
  windDirection: string;
  windSpeed: number; // 풍속 (m/s)
  status: WeatherStatus; // 날씨 상태
  isDaytime: boolean; // 낮/야간 여부
  fineDust: number; // 미세먼지 수치 (μg/m³)
  ultraFineDust: number; // 초미세먼지 수치 (μg/m³)
  uvIndex: number; // 자외선 지수
  sunrise: string; // 일출 시간
}

export interface HourlyForecast {
  time: string; // 시간
  temp: number; // 온도
  status: WeatherStatus; // 날씨 상태
  isDaytime: boolean; // 낮/야간 여부
}

export interface HourlyForecast {
  time: string; // "14시"
  temp: number; // 온도
  status: WeatherStatus; // 날씨 상태
  isDaytime: boolean; // 낮/밤 여부
}

// 백엔드 API 응답용 타입
export interface HourlyApiResponse {
  time: string; // "14시"
  iconCode: string; // "04d"
  iconUrl: string; // 이미지 URL
  temperature: string; // "10°"
}

export interface WeeklyForecast {
  date: string;
  forecasts: {
    am: { rain: number; temp: number; status: WeatherStatus };
    pm: { rain: number; temp: number; status: WeatherStatus };
  };
}
