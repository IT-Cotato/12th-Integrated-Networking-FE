import { useState, useEffect } from "react";
import { fetchWeeklyForecast } from "../services/weeklyApi";
import type { WeeklyForecastData } from "../types/weeklyData";
import { useLocationStore } from "../stores/locationStore";
interface WeeklyForecastState {
  data: WeeklyForecastData | null;
  loading: boolean;
  error: string | null;
}

const initialForecastState: WeeklyForecastState = {
  data: null,
  loading: true,
  error: null,
};

export default function useWeeklyForecast() {
  const [forecastState, setForecastState] =
    useState<WeeklyForecastState>(initialForecastState);
  const selectedLocation = useLocationStore((state) =>
    state.getSelectedLocation()
  );
  useEffect(() => {
    if (
      !selectedLocation ||
      selectedLocation.lat == null ||
      selectedLocation.lng == null
    ) {
      setForecastState({
        data: null,
        loading: false,
        error: "표시할 위치 정보가 없습니다.",
      });
      return;
    }

    const { lat, lng } = selectedLocation;

    const loadForecast = async () => {
      setForecastState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const forecastData = await fetchWeeklyForecast(lat, lng);

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
  }, [selectedLocation]);

  return {
    data: forecastState.data,
    loading: forecastState.loading,
    error: forecastState.error,
  };
}
