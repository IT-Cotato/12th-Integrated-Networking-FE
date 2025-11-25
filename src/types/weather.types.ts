// src/types/weather.types.ts

export interface HourlyWeather {
  time: string; // "19시"
  temp: number; // 10.89 (섭씨)
  weatherIcon: string; // "04n"
}

export interface WeeklyWeather {
  date: string; // "11/23"
  min: number;
  max: number;
  morningPop: number;
  eveningPop: number;
  morningIcon: string;
  eveningIcon: string;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  weatherDescription: string;
  humidity: number;
  windDirection: string;
  windSpeed: number;
  pm10Level: string;
  pm25Level: string;
  uvLevel: string;
  sunrise: string;
  sunset: string;
  day: boolean;
  weatherIcon: string;
}

// 전체 응답 구조
export interface WeatherApiResponse {
  code: string;
  message: string;
  data: {
    current: CurrentWeather;
    hourly: HourlyWeather[];
    weekly: WeeklyWeather[];
  };
}
