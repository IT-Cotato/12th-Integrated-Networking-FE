// API 서비스
import axios from 'axios';
import type { AddLocationResponse, GetLocationsResponse, PinLocationResponse, DeleteLocationResponse } from '../types';

// 개발 환경: Vite 프록시 사용
// 프로덕션 환경: Vercel 서버리스 함수 프록시 사용
const API_BASE_URL = import.meta.env.PROD 
  ? '/api/proxy'  // Vercel 서버리스 함수 경로
  : '';  // 개발 환경에서는 Vite 프록시 사용

// axios 인스턴스 생성
// TODO: 추후 로그인 구현 시 accessToken 헤더에 추가 필요
// TODO: 프로덕션 환경에서 API_BASE_URL은 백엔드에서 받아서 .env 파일에 설정 필요
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*',
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
 * @param name 장소 이름
 * @param lat 위도
 * @param lng 경도
 * @returns 추가된 위치 ID
 */
export async function addLocation(
  // userId: number, // 일단 주석처리
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
      requestData
      // {
      //   params: {
      //     userId,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '위치 추가에 실패했습니다.');
    }
    throw error;
  }
}

/**
 * 위치 목록 조회 API 함수
 * @param userId 사용자 ID
 * @returns 위치 목록 (pinned=true가 상단, pinned=false가 하단에 정렬됨)
 */
export async function getLocations(
  userId: number
): Promise<GetLocationsResponse> {
  try {
    const response = await apiClient.get<GetLocationsResponse>(
      '/api/locations',
      {
        params: {
          userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '위치 목록 조회에 실패했습니다.');
    }
    throw error;
  }
}

/**
 * 위치 핀 상태 변경 API 함수
 * @param userId 사용자 ID
 * @param locationId 위치 ID
 * @returns 핀 상태 변경된 위치 정보
 */
export async function updateLocationPin(
  userId: number,
  locationId: number
): Promise<PinLocationResponse> {
  try {
    const response = await apiClient.patch<PinLocationResponse>(
      `/api/locations/${locationId}/pin`,
      {},
      {
        params: {
          userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '핀 상태 변경에 실패했습니다.');
    }
    throw error;
  }
}

/**
 * 위치 삭제 API 함수
 * @param locationId 위치 ID
 * @returns 삭제 응답
 */
export async function deleteLocation(
  locationId: number
): Promise<DeleteLocationResponse> {
  try {
    const response = await apiClient.delete<DeleteLocationResponse>(
      `/api/locations/${locationId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '위치 삭제에 실패했습니다.');
    }
    throw error;
  }
}
