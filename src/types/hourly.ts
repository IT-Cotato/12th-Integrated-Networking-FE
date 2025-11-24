// src/types/weather.ts
// export interface WeatherApiResponse {
//   status: "OK" | "ERROR";
//   data: WeatherData;
//   timestamp: string;
// }

// // data 필드 구조
// export interface WeatherData {
//   city: string;
//   weatherList: HourlyWeatherApi[];
// }

// export interface HourlyWeatherApi {
//   time: string;
//   temperature: number;
//   description: string;
// }

export interface HourlyWeather {
  time: string;
  temp: number;
  status: string;
  icon: string;
}
