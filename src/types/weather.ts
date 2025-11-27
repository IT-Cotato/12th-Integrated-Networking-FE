export interface TodayWeather {
  locationName: string;
  date: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  status: string;
  icon: string;
  fineDust: string;
  ultraFineDust: string;
  uv: string;
  sunrise: string;
}

export interface HourlyWeather {
  time: string;
  temp: number;
  icon: string;
  status: string;
}

export interface WeeklyWeather {
  dayLabel: string;
  date: string;
  amIcon: string;
  pmIcon: string;
  amTemp: number;
  pmTemp: number;
  amRain: number;
  pmRain: number;
}
