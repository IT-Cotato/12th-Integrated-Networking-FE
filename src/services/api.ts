// API 서비스
import axios from 'axios';
import type { AddLocationResponse } from '../types';

// 개발 환경에서는 프록시를 통해 요청하므로 빈 문자열 사용
// 프로덕션 환경에서는 VITE_API_BASE_URL 환경 변수 사용
const API_BASE_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_BASE_URL || '')
  : '';

// axios 인스턴스 생성
// TODO: 추후 로그인 구현 시 accessToken 헤더에 추가 필요
// TODO: 프로덕션 환경에서 API_BASE_URL은 백엔드에서 받아서 .env 파일에 설정 필요
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // TODO: Authorization: `Bearer ${accessToken}` 헤더 추가 예정
  },
});

// 위치 추가 요청 타입
interface AddLocationRequest {
  name: string;
  lat: number;
  lng: number;
}

/**
 * 위치 추가 API 함수
 * @param userId 사용자 ID
 * @param name 장소 이름
 * @param lat 위도
 * @param lng 경도
 * @returns 추가된 위치 ID
 */
export async function addLocation(
  userId: number,
  name: string,
  lat: number,
  lng: number
): Promise<AddLocationResponse> {
  const requestData: AddLocationRequest = {
    name,
    lat,
    lng,
  };

  try {
    const response = await apiClient.post<AddLocationResponse>(
      '/api/locations/save',
      requestData,
      {
        params: {
          userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '위치 추가에 실패했습니다.');
    }
    throw error;
  }
}

// TODO: 백엔드 API 연동

// 2. 위치 목록 조회 API 함수 구현
//    - 엔드포인트: GET /locations (예상)
//    - 응답 데이터: Location[] 타입
//
// 3. 위치 삭제 API 함수 구현
//    - 엔드포인트: DELETE /locations/:id (예상)
//
