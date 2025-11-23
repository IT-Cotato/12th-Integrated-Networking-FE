import { WeatherIconKey } from "@/constants/weatherIconMap";

import weeklyWeatherDate from "@/mocks/weeklyWeather.json";

import {
  formatLocalDateWithDot,
  getKoreanDayLabel,
} from "@/utils/getLocalDate";

import { WeatherIconDisplay } from "./WeatherIconDisplay";

export const WeeklyWeather = () => {
  return (
    <div className="flex w-full justify-between px-6 py-3">
      {weeklyWeatherDate.weeklyWeather.map(data => {
        const dayOfWeek = getKoreanDayLabel(data.date);
        const amWeatherKey: WeatherIconKey = data.am.weather as WeatherIconKey;
        const pmWeatherKey: WeatherIconKey =
          `${data.pm.weather}-night` as WeatherIconKey;

        return (
          <div key={data.date} className="flex flex-col gap-2 px-4 py-3">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-3 py-2">
                {/* 낮 */}
                <WeatherIconDisplay
                  weather={amWeatherKey}
                  width={60}
                  height={60}
                />
                <span className="text-body-lg text-skyblue">
                  {data.am.pop}%
                </span>
                <span className="text-lab-lg text-gray-60">오전</span>
                <span className="text-lab-lg text-blue">
                  {data.am.avgTemp}º
                </span>
              </div>
              <div className="flex flex-col items-center gap-3 py-2">
                {/* 밤 */}
                <WeatherIconDisplay
                  weather={pmWeatherKey}
                  width={60}
                  height={60}
                />
                <span className="text-body-lg text-skyblue">
                  {data.pm.pop}%
                </span>
                <span className="text-lab-lg text-gray-60">오후</span>
                <span className="text-lab-lg text-red">{data.pm.avgTemp}º</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-gray-60 text-lab-sm">{dayOfWeek}</div>
              <div className="text-gray-60 text-lab-sm">
                {formatLocalDateWithDot(data.date)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
