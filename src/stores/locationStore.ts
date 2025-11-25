import { create } from 'zustand';
import { getLocations, updateLocationPin } from '../services/api';
import type { LocationResponseItem } from '../types';

interface LocationStore {
  // 상태
  locations: LocationResponseItem[];
  isLoading: boolean;
  selectedLocationId: string | null;
  error: string | null;

  // 액션
  fetchLocations: () => Promise<void>;
  updateLocationPin: (locationId: number, pinned: boolean) => Promise<void>;
  selectLocation: (locationId: string | null) => void;
  getLocationCoordinates: (locationId: number) => { lat: number; lng: number } | null;
  getSelectedLocation: () => LocationResponseItem | null;
  addLocation: (location: LocationResponseItem) => void;
  removeLocation: (locationId: number) => void;
}

// TODO: 추후 로그인 구현 시 userId를 실제 사용자 ID로 변경 필요
const TEMP_USER_ID = 1;

export const useLocationStore = create<LocationStore>((set, get) => ({
  // 초기 상태
  locations: [],
  isLoading: false,
  selectedLocationId: null,
  error: null,

  // 위치 목록 조회
  fetchLocations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getLocations(TEMP_USER_ID);
      set({ locations: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '위치 목록 조회에 실패했습니다.';
      console.error('위치 목록 조회 실패:', error);
      set({ error: errorMessage, isLoading: false, locations: [] });
    }
  },

  // 위치 선택
  selectLocation: (locationId: string | null) => {
    set({ selectedLocationId: locationId });
  },

  // 핀 상태 업데이트
  updateLocationPin: async (locationId: number, pinned: boolean) => {
    //먼저 UI 업데이트
    set((state) => ({
      locations: state.locations.map((loc) =>
        loc.locationId === locationId ? { ...loc, pinned } : loc
      ),
    }));

    try {
      // 서버에 핀 상태 변경 요청
      const response = await updateLocationPin(TEMP_USER_ID, locationId);
      // 서버 응답으로 최종 상태 업데이트
      set((state) => ({
        locations: state.locations.map((loc) =>
          loc.locationId === locationId ? { ...loc, pinned: response.data.pinned } : loc
        ),
      }));
    } catch (error) {
      // 에러 발생 시 이전 상태로 롤백
      set((state) => ({
        locations: state.locations.map((loc) =>
          loc.locationId === locationId ? { ...loc, pinned: !pinned } : loc
        ),
        error: error instanceof Error ? error.message : '핀 상태 변경에 실패했습니다.',
      }));
      console.error('핀 상태 변경 실패:', error);
    }
  },

  // 위치의 위도/경도 가져오기
  getLocationCoordinates: (locationId: number) => {
    const location = get().locations.find((loc) => loc.locationId === locationId);
    // TODO: 백엔드에서 위도/경도가 포함된 응답이 오면 아래 주석 해제
    // if (location && 'latitude' in location && 'longitude' in location) {
    //   return { lat: location.latitude, lng: location.longitude };
    // }
    // 임시로 경고 방지용
    void location;
    return null;
  },

  // 선택된 위치 정보 가져오기 (WeatherPanel에서 사용)
  getSelectedLocation: () => {
    const { selectedLocationId, locations } = get();
    if (!selectedLocationId) return null;
    return locations.find((loc) => loc.locationId === Number(selectedLocationId)) || null;
  },

  // 위치 추가 (추가 모달에서 사용)
  addLocation: (location: LocationResponseItem) => {
    set((state) => ({
      locations: [...state.locations, location],
    }));
  },

  // 위치 삭제 (삭제 모달에서 사용)
  removeLocation: (locationId: number) => {
    set((state) => ({
      locations: state.locations.filter((loc) => loc.locationId !== locationId),
      selectedLocationId:
        state.selectedLocationId === String(locationId) ? null : state.selectedLocationId,
    }));
  },
}));

