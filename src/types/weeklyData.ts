interface TimeOfDayForecast {
  description: string;
  rain: number;
}

export interface DailyForecast {
  date: string;
  dayOfWeek: string;
  minTemp: number;
  maxTemp: number;
  am: TimeOfDayForecast;
  pm: TimeOfDayForecast;
}

export interface WeeklyForecastData {
  city: string;
  dailyList: DailyForecast[];
}

export interface ForecastApiResponse {
  status: string;
  data: WeeklyForecastData;
  timestamp: string;
}
