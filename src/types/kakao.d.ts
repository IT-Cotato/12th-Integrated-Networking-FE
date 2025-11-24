interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
}

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

interface KakaoServicesStatus {
  OK: string;
  ZERO_RESULT: string;
  ERROR: string;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void; // 이 부분 추가!
        services: {
          Places: new () => KakaoPlacesService;
          Status: KakaoServicesStatus;
        };
      };
    };
  }
}

export {};