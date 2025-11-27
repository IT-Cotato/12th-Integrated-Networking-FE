// 카카오맵 API 서비스
import axios from 'axios';
import type { KakaoSearchResponse, SearchResult } from '../types';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY;
const KAKAO_SEARCH_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';

/**
 * 카카오맵 API를 사용하여 장소 검색
 * @param query 검색어
 * @param page 페이지 번호 (기본값: 1)
 * @param size 페이지 크기 (기본값: 15)
 * @returns 검색 결과 배열
 */
export async function searchPlaces(
  query: string,
  page: number = 1,
  size: number = 15
): Promise<SearchResult[]> {
  if (!KAKAO_API_KEY || !KAKAO_API_KEY.trim()) {
    throw new Error('카카오맵 API 키가 설정되지 않았습니다. .env 파일에 VITE_KAKAO_MAP_API_KEY를 설정해주세요.');
  }

  if (!query.trim()) {
    return [];
  }

  try {
    const response = await axios.get<KakaoSearchResponse>(KAKAO_SEARCH_URL, {
      params: {
        query: query.trim(),
        page,
        size,
      },
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY.trim()}`,
      },
    });

    // 카카오맵 API 응답을 SearchResult 타입으로 변환
    return response.data.documents.map((place) => ({
      id: place.id,
      name: place.place_name,
      address: place.address_name,
      roadAddress: place.road_address_name || undefined,
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('카카오맵 API 인증에 실패했습니다. API 키를 확인해주세요.');
      } else if (error.response?.status === 403) {
        throw new Error('카카오맵 API 접근이 거부되었습니다. 플랫폼 설정을 확인해주세요.');
      }
    }
    throw error;
  }
}
