export interface WeatherItem {
  time: string;
  temperature: number;
  description: string;
}

export interface HourlyWeather {
  city: string;
  weatherList: WeatherItem[];
}

export interface ForecastApiResponse {
  status: string;
  data: HourlyWeather;
  timestamp: string;
}
