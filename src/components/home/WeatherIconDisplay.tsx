import { WEATHER_ICON_MAP, WeatherIconKey } from "@/constants/weatherIconMap";

export const WeatherIconDisplay = ({
  weather,
}: {
  weather: WeatherIconKey;
}) => {
  const Icon = WEATHER_ICON_MAP[weather];
  return <Icon width={130} height={130} />;
};
