export interface WeeklyWeatherPeriod {
  weather: string; // 날씨
  avgTemp: number; // 평균 기온
  pop: number; // 강수확률 (percent)
}

export interface WeeklyWeather {
  date: string; // "2025-11-19"
  am: WeeklyWeatherPeriod;
  pm: WeeklyWeatherPeriod;
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
  weather: string; // 날씨
  sunrise: string; // 일출시각
  sunsetTime: string; // 일몰시각
  timestamp: string;
}

export interface HourlyWeather {
  time: string;
  weather: string;
  temperature: number;
}
