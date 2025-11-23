"use client";
import { useState } from "react";

import hourlyWeatherData from "@/mocks/hourlyWeather.json";
import currentWeather from "@/mocks/todayWeather.json";

import { formatLocalHour } from "@/utils/formatLocalTime";
import { getWeatherIconKey } from "@/utils/getWeatherIconKey";

import { WeatherIconDisplay } from "./WeatherIconDisplay";

export const HourlyWeather = () => {
  const { sunrise, sunsetTime } = currentWeather.currentWeather;

  const [page, setPage] = useState(0);
  const itemsPerPage = 12;

  // 현재 페이지 데이터
  const currentItems = hourlyWeatherData.hourlyWeather.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage,
  );

  return (
    <div className="flex w-full gap-4 px-4 py-3">
      <button
        onClick={() => setPage(0)}
        disabled={page === 0}
        className={`${page === 0 ? "text-black/50" : "text-black"} cursor-pointer`}
      >
        ◀︎
      </button>
      {/* 날씨 아이콘 그룹 */}
      <div className="flex w-full justify-between overflow-x-auto">
        {currentItems.map(data => {
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
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className={`${page === 1 ? "text-black/50" : "text-black"} cursor-pointer`}
      >
        ▶︎
      </button>
    </div>
  );
};
