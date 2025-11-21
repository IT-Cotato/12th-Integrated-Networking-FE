import type { mainData } from "../types/mainData";

const API_BASE_URL = "/api/v1/weather";

export const fetchCurrentWeather = async (
  lat: number,
  lon: number
): Promise<mainData> => {
  const url = `${API_BASE_URL}?lat=${lat}&lon=${lon}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("날씨 정보를 불러오는 데 실패했습니다.");
  }

  return response.json();
};
