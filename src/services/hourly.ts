import axios from "axios";
import type { ForecastApiResponse, HourlyWeather } from "../types/hourly";

const HOURLY_API_BASE_URL = "http://15.164.104.156/api/v1/forecast/hourly";

export const fetchHourlyForecast = async (
  lat: number,
  lon: number
): Promise<HourlyWeather> => {
  try {
    const response = await axios.get<ForecastApiResponse>(HOURLY_API_BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
      },
    });

    if (response.data.status !== "OK") {
      throw new Error(`API 응답 실패: ${response.data.status}`);
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = `시간별 예보 정보를 불러오는 데 실패했습니다. Status: ${error.response.status}`;
      throw new Error(errorMessage);
    }

    throw new Error(
      "네트워크 오류 또는 알 수 없는 이유로 요청에 실패했습니다."
    );
  }
};
