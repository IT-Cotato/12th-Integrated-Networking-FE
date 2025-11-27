import Image from "next/image";

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
  const src = WEATHER_ICON_MAP[weather];
  return (
    <Image
      src={src}
      alt={weather}
      width={width}
      height={height}
      style={{ objectFit: "contain" }}
    />
  );
};
