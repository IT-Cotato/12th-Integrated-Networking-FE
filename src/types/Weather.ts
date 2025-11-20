export type WeatherStatus = "맑음" | "흐림" | "비" | "눈" | "Storm" | "바람";

export interface WeatherInfo {
  temperature: number; // 현재 온도
  feelsLike: number; // 체감 온도
  humidity: number; // 습도 (%)
  windDirection: string;
  windSpeed: number; // 풍속 (m/s)
  status: WeatherStatus; // 날씨 상태
  isDaytime: boolean; // 낮/야간 여부
  fineDust: number; // 미세먼지 수치
  ultraFineDust: number; // 초미세먼지 수치
  date: string; // 오늘 날짜
  location: string; // 위치
  uvIndex: number; // 자외선
  sunrise: string; // 일출
  sunset: string; // 일몰
}
