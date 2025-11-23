// api.ts (새로운 함수 추가)
import axios from "axios";
// 새로 정의한 타입 (ForecastApiResponse)을 import 합니다.
import type {
  ForecastApiResponse,
  WeeklyForecastData,
} from "../types/weeklyData.ts";

const WEEKLY_API_BASE_URL = "http://15.16.104.156:8080/api/v1/forecast/hourly";

export const fetchWeeklyForecast = async (
  lat: number,
  lon: number
): Promise<WeeklyForecastData> => {
  // 반환 타입은 data 내부의 HourlyForecastData입니다.
  try {
    const response = await axios.get<ForecastApiResponse>(WEEKLY_API_BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
      },
    });

    // 💡 핵심: 응답 데이터 내부의 'data' 필드(HourlyForecastData)를 반환합니다.
    if (response.data.status !== "OK") {
      throw new Error(`API 응답 실패: ${response.data.status}`);
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = `주간 예보 정보를 불러오는 데 실패했습니다. Status: ${error.response.status}`;
      throw new Error(errorMessage);
    }

    throw new Error(
      "네트워크 오류 또는 알 수 없는 이유로 요청에 실패했습니다."
    );
  }
};
