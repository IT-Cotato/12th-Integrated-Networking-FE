// hooks/useHourlyForecast.ts
import { useState, useEffect } from "react";
import { fetchHourlyForecast } from "../services/hourly";
import type { HourlyWeather } from "../types/hourly";

interface HourlyForecastState {
  data: HourlyWeather | null;
  loading: boolean;
  error: string | null;
}

const LAT = 37.56;
const LON = 126.97;

const initialForecastState: HourlyForecastState = {
  data: null,
  loading: true,
  error: null,
};

export default function useHourlyForecast() {
  const [forecastState, setForecastState] =
    useState<HourlyForecastState>(initialForecastState);

  useEffect(() => {
    const loadForecast = async () => {
      setForecastState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const forecastData = await fetchHourlyForecast(LAT, LON);
        setForecastState({
          data: forecastData,
          loading: false,
          error: null,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "시간별 예보를 불러오는 데 알 수 없는 에러가 발생했습니다.";

        setForecastState({
          data: null,
          loading: false,
          error: errorMessage,
        });
      }
    };

    loadForecast();
  }, []);

  return {
    data: forecastState.data,
    loading: forecastState.loading,
    error: forecastState.error,
  };
}
