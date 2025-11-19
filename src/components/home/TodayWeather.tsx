import { WeatherIconKey } from "@/constants/weatherIconMap";

import currentWeatherData from "@/mocks/todayWeather.json";

import { WeatherIconDisplay } from "./WeatherIconDisplay";

export const TodayWeather = () => {
  const data = currentWeatherData.currentWeather;

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-[10px]">
        <WeatherIconDisplay weather={data.weather as WeatherIconKey} />
        <div className="text-h1">{data.temperature}º</div>
      </div>
    </section>
  );
};
