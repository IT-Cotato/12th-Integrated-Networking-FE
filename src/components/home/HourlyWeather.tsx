import hourlyWeatherData from "@/mocks/hourlyWeather.json";
import currentWeather from "@/mocks/todayWeather.json";

import { formatLocalHour } from "@/utils/formatLocalTime";
import { getWeatherIconKey } from "@/utils/getWeatherIconKey";

import { WeatherIconDisplay } from "./WeatherIconDisplay";

export const HourlyWeather = () => {
  const { sunrise, sunsetTime } = currentWeather.currentWeather;

  return (
    <div className="flex w-full gap-[25px] overflow-x-auto px-4 py-3">
      {/*TBD: 그래프 제작 필요 */}
      {hourlyWeatherData.hourlyWeather.map(data => {
        const hour = formatLocalHour(data.time);

        const iconKey = getWeatherIconKey({
          weather: data.weather,
          time: data.time,
          sunrise,
          sunsetTime,
        });

        return (
          <div
            key={data.time}
            className="flex flex-col items-center justify-center gap-2"
          >
            <WeatherIconDisplay weather={iconKey} width={60} height={60} />
            <p className="text-gray-40 text-cap1-sm">{hour}</p>
            <p className="text-gray-60 text-cap1-lg">{data.temperature}º</p>
          </div>
        );
      })}
    </div>
  );
};
