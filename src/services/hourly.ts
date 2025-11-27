import axios from "axios";
import type { ForecastApiResponse, HourlyWeather } from "../types/hourly";

const API_BASE_PATH = import.meta.env.VITE_API_PATH || "/api/v1";
const HOURLY_API_ENDPOINT = `${API_BASE_PATH}/forecast/hourly`;

export const fetchHourlyForecast = async (
  lat: number,
  lon: number
): Promise<HourlyWeather> => {
  const requestUrl = `${HOURLY_API_ENDPOINT}?lat=${lat}&lon=${lon}`;
  console.log("[Hourly API] Requesting URL:", requestUrl);
  try {
    const response = await axios.get<ForecastApiResponse>(HOURLY_API_ENDPOINT, {
      params: {
        lat: lat,
        lon: lon,
      },
    });
    console.log("[Hourly API] Response Status:", response.status);

    if (response.data.status !== "OK") {
      console.error(
        "[Hourly API] Failed response status in body:",
        response.data.status
      );
      throw new Error(`API 응답 실패: ${response.data.status}`);
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = `시간별 예보 정보를 불러오는 데 실패했습니다. Status: ${error.response.status}`;
      console.error("[Hourly API] Axios Error:", errorMessage, error.toJSON());
      throw new Error(errorMessage);
    }
    console.error("[Hourly API] Unknown Error:", error);
    throw new Error(
      "네트워크 오류 또는 알 수 없는 이유로 요청에 실패했습니다."
    );
  }
};
