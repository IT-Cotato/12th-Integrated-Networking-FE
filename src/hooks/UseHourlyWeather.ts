import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { HourlyForecast, HourlyApiResponse } from "../types/Weather";
import { iconCodeMap } from "../utils/IconCodeMap";

const BASE_URL = "https://your-backend.com";
const getAccessToken = () => localStorage.getItem("accessToken") || "";

export const useHourlyWeather = (lat: number, lng: number) => {
  return useQuery({
    queryKey: ["hourlyWeather", lat, lng],
    queryFn: async (): Promise<HourlyForecast[]> => {
      const token = getAccessToken();
      const res = await axios.get(`${BASE_URL}/api/weather`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { latitude: lat, longitude: lng },
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
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
