import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { HourlyForecast, HourlyApiResponse } from "../types/Weather";
import { iconCodeMap } from "../utils/IconCodeMap";
import { useRef } from "react";

const BASE_URL = "http://43.200.174.15:8080";
const getAccessToken = () => localStorage.getItem("accessToken") || "";

export const useHourlyWeather = (lat: number, lon: number) => {
  const isFetchingRef = useRef(false); // 중복 요청 방지

  return useQuery({
    queryKey: ["hourlyWeather", lat, lon],
    queryFn: async (): Promise<HourlyForecast[]> => {
      if (isFetchingRef.current) {
        console.log("⏳ 이미 요청 중, 중복 방지");
        return []; // 이미 요청 중이면 빈 배열 반환
      }
      isFetchingRef.current = true;

      try {
        const token = getAccessToken();
        const res = await axios.get(`${BASE_URL}/api/weather`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { lat: lat, lon: lon }, // 서버가 기대하는 이름으로
        });

        const hourlyData: HourlyApiResponse[] = res.data.hourly;

        // 현재 시간 기준으로 24시간 순서 재배치
        const nowHour = new Date().getHours(); // 0~23
        const startIdx = hourlyData.findIndex(
          (h) => parseInt(h.time.replace("시", "")) === nowHour
        );
        const orderedHourly =
          startIdx !== -1
            ? [...hourlyData.slice(startIdx), ...hourlyData.slice(0, startIdx)]
            : hourlyData;

        // API -> 프론트 HourlyForecast 변환
        const hourlyForecasts: HourlyForecast[] = orderedHourly.map((h) => ({
          time: h.time,
          temp: parseInt(h.temperature.replace("°", "")),
          status: iconCodeMap[h.iconCode] || "흐림",
          isDaytime: h.iconCode.endsWith("d"),
        }));

        return hourlyForecasts;
      } finally {
        isFetchingRef.current = false; // 요청 완료 후 플래그 해제
      }
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
