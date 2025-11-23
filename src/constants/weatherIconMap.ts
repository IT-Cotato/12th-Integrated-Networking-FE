export const WEATHER_ICON_MAP = {
  sun: "/weather/sun.svg",
  "sun-night": "/weather/sun-night.svg",

  clouds: "/weather/clouds.svg",
  "clouds-night": "/weather/clouds-night.svg",

  rain: "/weather/rain.svg",
  "rain-night": "/weather/rain-night.svg",

  snow: "/weather/snow.svg",
  "snow-night": "/weather/snow-night.svg",

  storm: "/weather/storm.svg",
  "storm-night": "/weather/storm-night.svg",

  wind: "/weather/wind.svg",
  "wind-night": "/weather/wind-night.svg",
} as const;

export type WeatherIconKey = keyof typeof WEATHER_ICON_MAP;
