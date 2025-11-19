export interface Weather {
  weather: string;
  time: string;
  sunrise: string; // TBD: iso타임으로 내려줄 경우 유틸 추가 필요
}

export interface WeeklyWeather {
  date: string;
  dayHumidity: number;
  nightHumidity: number;
  dayTemp: number;
  nightTemp: number;
  dayWeather: string;
  nightWeather: string;
}

export interface CurrentWeather {
  temperature: number; // 현재 온도
  feelsLike: number; // 체감 온도
  humidity: number; // 습도
  fineDust: "fine" | "normal" | "danger"; // 미세먼지
  ultraFineDust: "fine" | "normal" | "danger"; // 초미세먼지
  uvIndex: "fine" | "normal" | "danger"; // 자외선
  windDirection: string; // 풍향
  windSpeed: number; // 풍속
  weather: string; // 날씨 (clouds, clouds-night 같은 방식?)
  sunrise: string; // 일출시각
  timestamp: string;
}

export interface HourlyWeather {
  time: string;
  weather: string;
  temperature: number;
}
