import { WEATHER_ICON_MAP, WeatherIconKey } from "@/constants/weatherIconMap";

export const WeatherIconDisplay = ({
  weather,
  width,
  height,
}: {
  weather: WeatherIconKey;
  width?: number;
  height?: number;
}) => {
  const Icon = WEATHER_ICON_MAP[weather];
  return <Icon widht={width} height={height} />;
};
