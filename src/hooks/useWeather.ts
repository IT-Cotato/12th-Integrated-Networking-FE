import { useEffect, useState } from "react";
import { fetchCurrentWeather } from "../services/mainWeatherApi";
import type { mainData } from "../types/mainData";
import { useLocationStore } from "../stores/locationStore";

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

export default function useWeather() {
  const [weatherState, setWeatherState] = useState(initialWeatherState);

  const selectedLocation = useLocationStore((state) =>
    state.getSelectedLocation()
  );

  useEffect(() => {
    console.log("[useWeather] Selected Location Check:", selectedLocation);
    if (
      !selectedLocation ||
      selectedLocation.lat == null ||
      selectedLocation.lng == null
    ) {
      console.log("[useWeather] API call blocked: No valid location selected.");
      setWeatherState({
        data: null,
        loading: false,
        error: "표시할 위치 정보가 없습니다.",
      });
      return;
    }

    const { lat, lng } = selectedLocation;
    console.log(`[useWeather] Valid location found: Lat=${lat}, Lng=${lng}`);

    const loadWeather = async () => {
      setWeatherState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        console.log(`[useWeather] Starting API call for (${lat}, ${lng})...`);

        const apiResponse = await fetchCurrentWeather(lat, lng);
        console.log("[useWeather] API raw response:", apiResponse);

        const actualWeatherData = apiResponse.data;

        setWeatherState({
          data: actualWeatherData, // { temperature, humidity, ... }
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error("[useWeather] API call failed:", err);
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
  }, [selectedLocation]);

  return {
    data: weatherState.data,
    loading: weatherState.loading,
    error: weatherState.error,
  };
}
