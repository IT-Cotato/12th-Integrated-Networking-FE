// 카카오 장소 정보
interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // 경도
  y: string; // 위도
  place_url: string;
  distance: string;
}

// 카카오 장소 검색 서비스
interface KakaoPlacesService {
  keywordSearch: (
    keyword: string,
    callback: (data: KakaoPlace[], status: string) => void,
    options?: {
      page?: number;
      size?: number;
      sort?: string;
    }
  ) => void;
}

// 카카오 서비스 상태
interface KakaoServicesStatus {
  OK: string;
  ZERO_RESULT: string;
  ERROR: string;
}

// 카카오 좌표
interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

// 카카오 지도 옵션
interface KakaoMapOptions {
  center: KakaoLatLng;
  level?: number;
}

// 카카오 마커 옵션
interface KakaoMarkerOptions {
  position: KakaoLatLng;
  map?: unknown;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        services: {
          Places: new () => KakaoPlacesService;
          Status: KakaoServicesStatus;
        };
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (container: HTMLElement, options: KakaoMapOptions) => unknown;
        Marker: new (options: KakaoMarkerOptions) => unknown;
      };
    };
  }
}

export {};