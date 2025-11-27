export interface KakaoPlace {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  category_name: string;
  phone: string;
  id: string;
}

export interface KakaoSearchResult {
  documents: KakaoPlace[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

export interface KakaoAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  x: string;
  y: string;
}

export interface Location {
  id: string;
  name: string;
  lat: number;
  log: number;
}
