import { useState, useEffect } from "react";
import { fetchWeeklyForecast } from "../services/weeklyApi";
import type { WeeklyForecastData } from "../types/weeklyData";

interface WeeklyForecastState {
  data: WeeklyForecastData | null;
  loading: boolean;
  error: string | null;
}

const LAT = 37.56;
const LON = 126.97; //임시. {location.id}
const initialForecastState: WeeklyForecastState = {
  data: null,
  loading: true,
  error: null,
};

export default function useWeeklyForecast() {
  const [forecastState, setForecastState] =
    useState<WeeklyForecastState>(initialForecastState);

  useEffect(() => {
    const loadForecast = async () => {
      setForecastState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const forecastData = await fetchWeeklyForecast(LAT, LON);

        setForecastState({
          data: forecastData,
          loading: false,
          error: null,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "주간 예보를 불러오는 데 알 수 없는 에러가 발생했습니다.";

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
