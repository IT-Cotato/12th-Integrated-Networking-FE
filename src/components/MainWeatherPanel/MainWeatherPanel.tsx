"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { WeatherInfo } from "../../types/Weather";
import {
  FineDustColor,
  TextFineDustColor,
  TextUltraFineDustColor,
  TextUvIndexColor,
  UltraFineDustColor,
  UvIndexColor,
} from "../../utils/ColorMap";
import { WeatherIconMap } from "../../utils/WeatherIconMap";
import DayCloud from "../../assets/icons/Day_Clouds.svg";

interface Props {
  lat: number;
  lng: number;
  locationName?: string;
}

const BASE_URL ="http://43.200.174.15:8080";

const getAccessToken = () => localStorage.getItem("accessToken") || "";

// 백엔드 API 호출 및 WeatherInfo 형태로 변환
const fetchWeather = async (lat: number, lng: number): Promise<WeatherInfo> => {
  const token = getAccessToken();
  const res = await axios.get(`${BASE_URL}/api/weather`, {
    params: { latitude: lat, longitude: lng },
    headers: { Authorization: `Bearer ${token}` },
  });

  const current = res.data.current;

  // API Response → WeatherInfo 매핑
  return {
    location: current.location || "선택된 위치",
    apiDate: new Date().toISOString().split("T")[0],
    displayDate:
      new Date().toLocaleDateString("ko-KR", {
        month: "numeric",
        day: "numeric",
      }) + "일",
    temperature: parseFloat(current.temperature),
    feelsLike: parseFloat(current.feelsLike),
    humidity: parseInt(current.humidity),
    windDirection: current.windDirection,
    windSpeed: parseFloat(current.windSpeed),
    status: current.skyCondition as WeatherInfo["status"],
    isDaytime: current.timeOfDay === "주간",
    fineDust:
      current.pm10Grade === "좋음"
        ? 20
        : current.pm10Grade === "보통"
        ? 60
        : 120,
    ultraFineDust:
      current.pm25Grade === "좋음"
        ? 10
        : current.pm25Grade === "보통"
        ? 25
        : 50,
    uvIndex:
      current.uvGrade === "낮음" ? 2 : current.uvGrade === "보통" ? 5 : 8,
    sunrise: current.sunriseTime,
  };
};

export default function MainWeatherPanel({ lat, lng, locationName }: Props) {
  const {
    data: weather,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["weather", lat, lng],
    queryFn: () => fetchWeather(lat, lng),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error || !weather)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img src={DayCloud} className="w-[322px] h-[320px] mb-6" />
          <div className="text-black text-[36px] font-bold">
            아직 선택된 위치가 없습니다!
          </div>
        </div>
      </div>
    );

  const getFineDustLevel = (value: number) =>
    value <= 30
      ? "좋음"
      : value <= 80
      ? "보통"
      : value <= 150
      ? "나쁨"
      : "매우나쁨";
  const getUltraFineDustLevel = (value: number) =>
    value <= 15
      ? "좋음"
      : value <= 35
      ? "보통"
      : value <= 75
      ? "나쁨"
      : "매우나쁨";
  const getUVLevel = (uv: number) =>
    uv < 3
      ? "낮음"
      : uv < 6
      ? "보통"
      : uv < 8
      ? "높음"
      : uv < 11
      ? "매우 높음"
      : "위험";

  const icon = weather.isDaytime
    ? WeatherIconMap[weather.status].day
    : WeatherIconMap[weather.status].night;

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1080px] h-[441px] p-8 bg-white rounded-[16px] border-2 border-[#F2F2F2] shadow-[0px_0px_8px_2px_rgba(0,0,0,0.1)] flex-col gap-[12px]">
        <div className="h-[24px] text-black font-bold text-[20px] pb-8">
          {weather.displayDate} {locationName || weather.location} 날씨 현황
        </div>
        <div className="gap-[10px] flex items-center justify-center">
          <img src={icon} className="w-[160px] h-[160px]" />
          <div className="w-[190px] h-[95px] text-[80px] font-bold flex items-center justify-center">
            {weather.temperature}°
          </div>
        </div>
        <div className="text-black text-[20px] font-semibold mt-2 flex justify-center">
          {weather.isDaytime ? "낮" : "야간"} / {weather.status}
        </div>
        <div className="mt-4 text-[16px] text-gray-600 flex items-center gap-[8px] justify-center">
          <p className="flex items-center">
            <span className="text-gray-400">체감:</span>
            <span className="ml-[6px] text-[#000000] font-semibold">
              {weather.feelsLike}°
            </span>
          </p>
          <p className="text-[8px] font-medium text-[#A4A4A4] flex items-center">
            ●
          </p>
          <p className="flex items-center">
            <span className="text-gray-400">습도:</span>
            <span className="ml-[6px] text-[#000000] font-semibold">
              {weather.humidity}%
            </span>
          </p>
          <p className="text-[8px] font-medium text-[#A4A4A4] flex items-center">
            ●
          </p>
          <p className="flex items-center">
            <span className="text-gray-400">{weather.windDirection}</span>
            <span className="ml-[6px] text-[#000000] font-semibold">
              {weather.windSpeed} m/s
            </span>
          </p>
        </div>
        <div className="mt-5 gap-4 flex justify-center">
          <div
            className={`w-[120px] h-[62px] pt-3 pr-6 pb-3 pl-6 rounded-[12px] flex flex-col items-center justify-center ${FineDustColor(
              weather.fineDust
            )} relative group`}
          >
            <span className="text-[12px] leading-none font-medium">
              미세먼지
            </span>
            <span
              className={`text-[12px] leading-none mt-2 font-bold ${TextFineDustColor(
                weather.fineDust
              )}`}
            >
              {getFineDustLevel(weather.fineDust)}
            </span>
          </div>
          <div
            className={`w-[120px] h-[62px] pt-3 pr-6 pb-3 pl-6 rounded-[12px] flex flex-col items-center justify-center ${UltraFineDustColor(
              weather.ultraFineDust
            )} relative group`}
          >
            <span className="text-[12px] leading-none font-medium">
              초미세먼지
            </span>
            <span
              className={`text-[12px] leading-none mt-2 font-bold ${TextUltraFineDustColor(
                weather.ultraFineDust
              )}`}
            >
              {getUltraFineDustLevel(weather.ultraFineDust)}
            </span>
          </div>
          <div
            className={`w-[120px] h-[62px] pt-3 pr-6 pb-3 pl-6 rounded-[12px] flex flex-col items-center justify-center ${UvIndexColor(
              weather.uvIndex
            )} relative group`}
          >
            <span className="text-[12px] leading-none font-medium">자외선</span>
            <span
              className={`text-[12px] leading-none mt-2 font-bold ${TextUvIndexColor(
                weather.uvIndex
              )}`}
            >
              {getUVLevel(weather.uvIndex)}
            </span>
          </div>
          <div className="w-[120px] h-[62px] pt-3 pr-6 pb-3 pl-6 bg-lime-100 rounded-[12px] flex flex-col items-center justify-center">
            <span className="text-[12px] leading-none font-medium">일출</span>
            <span className="text-[12px] leading-none mt-2 font-bold text-yellow-400">
              {weather.sunrise}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
