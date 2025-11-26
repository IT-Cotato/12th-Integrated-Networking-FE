"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { WeeklyForecast } from "../../types/Weather";
import { getWeatherIcon } from "../../utils/GetWeatherIcon";
import { iconCodeMap } from "../../utils/IconCodeMap";

interface Props {
  lat: number;
  lng: number;
}

interface ApiDaily {
  dayOfWeek: string;
  dateLabel: string;
  amIconCode: string;
  amTemperature: string;
  amPrecipitationProb: string;
  pmIconCode: string;
  pmTemperature: string;
  pmPrecipitationProb: string;
}

const BASE_URL = "https://your-backend.com";
const getAccessToken = () => localStorage.getItem("accessToken") || "";

const mapDailyToWeekly = (daily: ApiDaily[]): WeeklyForecast[] => {
  return daily.map((day) => ({
    date: `${day.dayOfWeek} ${day.dateLabel}`,
    forecasts: {
      am: {
        rain: parseInt(day.amPrecipitationProb.replace("%", "")),
        temp: parseInt(day.amTemperature.replace("°", "")),
        status: iconCodeMap[day.amIconCode] || "흐림",
      },
      pm: {
        rain: parseInt(day.pmPrecipitationProb.replace("%", "")),
        temp: parseInt(day.pmTemperature.replace("°", "")),
        status: iconCodeMap[day.pmIconCode] || "흐림",
      },
    },
  }));
};

export default function WeeklyForecastPanel({ lat, lng }: Props) {
  const {
    data: weekly,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["weeklyWeather", lat, lng],
    queryFn: async () => {
      const token = getAccessToken();
      const res = await axios.get(`${BASE_URL}/api/weather`, {
        params: { latitude: lat, longitude: lng },
        headers: { Authorization: `Bearer ${token}` },
      });
      return mapDailyToWeekly(res.data.daily as ApiDaily[]);
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div className="w-full h-[328px] flex items-center justify-center">
        Loading...
      </div>
    );

  if (error || !weekly)
    return (
      <div className="w-full h-[328px] flex items-center justify-center text-red-500">
        데이터를 불러오지 못했습니다.
      </div>
    );

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1080px] h-[328px] p-8 bg-white rounded-[16px] border-2 border-[#F2F2F2] shadow-[0px_0px_8px_2px_rgba(0,0,0,0.1)] flex-col gap-[12px]">
        <h2 className="text-[20px] font-bold leading-none font-sans">
          주간 예보
        </h2>
        <div className="w-[1032px] h-[244px] px-6 py-3 flex justify-between">
          {weekly.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-[16px] font-medium"
            >
              <div className="flex gap-6 mb-2">
                {/* 오전 */}
                <div className="w-[60px] h-[174px] flex flex-col items-center pt-2 pb-2 gap-3">
                  <img
                    src={getWeatherIcon(day.forecasts.am.status, true)}
                    className="w-[60px] h-[60px]"
                  />
                  <p className="w-[42px] h-[24px] text-[20px] font-bold font-sans text-[#CCE8FF] flex items-center justify-center">
                    {day.forecasts.am.rain}%
                  </p>
                  <p className="text-[16px] font-bold font-sans text-[#292E2E] flex items-center justify-center">
                    오전
                  </p>
                  <p className="w-[17px] h-[19px] text-[16px] font-bold font-sans text-[#32A1FF] flex items-center justify-center mt-1">
                    {day.forecasts.am.temp}°
                  </p>
                </div>

                {/* 오후 */}
                <div className="w-[60px] h-[174px] flex flex-col items-center pt-2 pb-2 gap-3">
                  <img
                    src={getWeatherIcon(day.forecasts.pm.status, false)}
                    className="w-[60px] h-[60px]"
                  />
                  <p className="w-[42px] h-[24px] text-[20px] font-bold font-sans text-[#CCE8FF] flex items-center justify-center">
                    {day.forecasts.pm.rain}%
                  </p>
                  <p className="text-[16px] font-bold font-sans text-[#292E2E] flex items-center justify-center">
                    오후
                  </p>
                  <p className="w-[25px] h-[19px] text-[16px] font-bold font-sans text-[#FF3232] flex items-center justify-center mt-1">
                    {day.forecasts.pm.temp}°
                  </p>
                </div>
              </div>

              <p className="text-[16px] font-medium font-sans">
                {day.date.split(" ")[0]}
              </p>
              <p className="text-[16px] font-medium font-sans">
                {day.date.split(" ")[1]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
