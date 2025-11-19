import { formatLocalHour } from "src/utils/formatLocalTime";

import { WeatherIconKey } from "@/constants/weatherIconMap";

import hourlyWeatherData from "@/mocks/hourlyWeather.json";

import { WeatherIconDisplay } from "./WeatherIconDisplay";

export const HourlyWeather = () => {
  return (
    <div className="flex w-full gap-[25px] overflow-x-auto px-4 py-3">
      {hourlyWeatherData.hourlyWeather.map(data => {
        const hour = formatLocalHour(data.time);
        return (
          <div
            key={data.time}
            className="flex flex-col items-center justify-center gap-2"
          >
            <WeatherIconDisplay
              weather={data.weather as WeatherIconKey}
              width={60}
              height={60}
            />
            <p className="text-gray-40 text-cap1-sm">{hour}</p>
            <p className="text-gray-60 text-cap1-lg">{data.temperature}º</p>
          </div>
        );
      })}
    </div>
  );
};
