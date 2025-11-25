import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../services/api";
import type { mainData } from "../types/mainData";
// import { useLocationStore } from "../stores/locationStore"; (위치 관련)

//예시 위경도
const LAT = 37.56;
const LON = 125.97;

interface WeatherState {
  data: mainData | null;
  loading: boolean;
  error: string | null;
}

const initialWeatherState: WeatherState = {
  data: null,
  loading: true,
  error: null,
};

// useWeather 커스텀 훅
export default function useWeather() {
  const [weatherState, setWeatherState] = useState(initialWeatherState);

  // const selectedLocationId = useLocationStore((state) => state.selectedLocationId);
  // const selectedLocation = useLocationStore((state) => state.getSelectedLocation());
  //(위치 관련)

  useEffect(() => {
    const loadWeather = async () => {
      setWeatherState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const weatherData = await fetchCurrentWeather(LAT, LON);
        setWeatherState({
          data: weatherData,
          loading: false,
          error: null,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "알 수 없는 에러가 발생했습니다.";
        setWeatherState({
          data: null,
          loading: false,
          error: errorMessage,
        });
      }
    };

    loadWeather();
  }, []);

  return {
    data: weatherState.data,
    loading: weatherState.loading,
    error: weatherState.error,
  };
}
