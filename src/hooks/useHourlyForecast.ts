// hooks/useHourlyForecast.ts
import { useState, useEffect } from "react";
import { fetchHourlyForecast } from "../services/hourly";
import type { HourlyWeather } from "../types/hourly";
import { useLocationStore } from "../stores/locationStore";

interface HourlyForecastState {
  data: HourlyWeather | null;
  loading: boolean;
  error: string | null;
}

const initialForecastState: HourlyForecastState = {
  data: null,
  loading: true,
  error: null,
};

export default function useHourlyForecast() {
  const [forecastState, setForecastState] =
    useState<HourlyForecastState>(initialForecastState);

  const selectedLocation = useLocationStore((state) =>
    state.getSelectedLocation()
  );
  useEffect(() => {
    if (
      !selectedLocation ||
      selectedLocation.lat == null ||
      selectedLocation.lng == null
    ) {
      // 위치 정보가 없으면 로딩 종료 후 에러/정보 없음 상태 설정
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
        const forecastData = await fetchHourlyForecast(lat, lng);
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
  }, [selectedLocation]);

  return {
    data: forecastState.data,
    loading: forecastState.loading,
    error: forecastState.error,
  };
}
