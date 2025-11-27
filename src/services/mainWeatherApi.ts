import type { mainData } from "../types/mainData";

// 개발 환경과 프로덕션 환경 모두 HTTPS 백엔드 서버로 직접 호출 (CORS 허용 필요)
// .env 파일(로컬) 또는 Vercel 환경 변수(프로덕션)에 VITE_API_BASE_URL 설정 필요
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_BASE_PATH = import.meta.env.VITE_API_PATH || "/api/v1";
const API_ENDPOINT = `${API_BASE_PATH}/weather`;

interface ApiResponse {
  status: "OK" | "ERROR";
  data: mainData;
  timestamp: string;
}

export const fetchCurrentWeather = async (
  lat: number,
  lon: number
): Promise<ApiResponse> => {
  const url = `${API_BASE_URL}${API_ENDPOINT}?lat=${lat}&lon=${lon}`;
  console.log("[API] Requesting URL:", url);
  try {
    const response = await fetch(url);
    console.log("[API] Response Status:", response.status);

    if (!response.ok) {
      const errorMessage = `날씨 정보를 불러오는 데 실패했습니다. Status: ${response.status}`;
      console.error("[API] HTTP Error:", errorMessage);
      throw new Error(errorMessage);
    }
    console.log("[API] Successfully fetched and parsing JSON.");
    return response.json();
  } catch (error) {
    // 네트워크 오류, JSON 파싱 오류 또는 위에서 던진 커스텀 오류를 다시 던짐
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      "네트워크 오류 또는 알 수 없는 이유로 요청에 실패했습니다."
    );
  }
};
