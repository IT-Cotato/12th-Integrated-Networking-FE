// 타입 정의

// 카카오맵 API 응답 타입
export interface KakaoPlace {
  id: string;
  place_name: string;
  road_address_name: string;
  address_name: string;
  x: string; // 경도
  y: string; // 위도
  category_name: string;
}

export interface KakaoSearchResponse {
  documents: KakaoPlace[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

// 검색 결과 타입
export interface SearchResult {
  id: string;
  name: string;
  address: string;
  roadAddress?: string;
  latitude: number; // 위도
  longitude: number; // 경도
}

// 위치 정보 타입
export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

// 위치 추가 API 응답 타입
export interface AddLocationResponse {
  locationId: number;
}