import { create } from 'zustand';
import { getLocations, updateLocationPin, deleteLocation as deleteLocationAPI } from '../services/api';
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
  deleteLocation: (locationId: number) => Promise<void>;
}

// TODO: 추후 로그인 구현 시 userId를 실제 사용자 ID로 변경 필요
// const TEMP_USER_ID = 1; // 일단 주석처리

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
      const response = await getLocations(/* TEMP_USER_ID */);
      // pinned=true가 위로 오도록 정렬
      const sortedLocations = [...response.data].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
      });
      set({ locations: sortedLocations, isLoading: false });
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
    //먼저 UI 업데이트 및 정렬
    set((state) => {
      const updatedLocations = state.locations.map((loc) =>
        loc.locationId === locationId ? { ...loc, pinned } : loc
      );
      // pinned=true가 위로 오도록 정렬
      const sortedLocations = [...updatedLocations].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
      });
      return { locations: sortedLocations };
    });

    try {
      // 서버에 핀 상태 변경 요청
      const response = await updateLocationPin(/* TEMP_USER_ID, */ locationId);
      // 서버 응답으로 최종 상태 업데이트 및 정렬
      set((state) => {
        const updatedLocations = state.locations.map((loc) =>
          loc.locationId === locationId ? { ...loc, pinned: response.data.pinned } : loc
        );
        // pinned=true가 위로 오도록 정렬
        const sortedLocations = [...updatedLocations].sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return 0;
        });
        return { locations: sortedLocations };
      });
    } catch (error) {
      // 에러 발생 시 이전 상태로 롤백 및 정렬
      set((state) => {
        const updatedLocations = state.locations.map((loc) =>
          loc.locationId === locationId ? { ...loc, pinned: !pinned } : loc
        );
        // pinned=true가 위로 오도록 정렬
        const sortedLocations = [...updatedLocations].sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return 0;
        });
        return {
          locations: sortedLocations,
          error: error instanceof Error ? error.message : '핀 상태 변경에 실패했습니다.',
        };
      });
      console.error('핀 상태 변경 실패:', error);
    }
  },

  // 위치의 위도/경도 가져오기
  getLocationCoordinates: (locationId: number) => {
    const location = get().locations.find((loc) => loc.locationId === locationId);
    if (location && 'lat' in location && 'lng' in location) {
      return { lat: location.lat, lng: location.lng };
    }
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

  // 위치 삭제 API 호출
  deleteLocation: async (locationId: number) => {
    try {
      // 먼저 UI에서 제거 (낙관적 업데이트)
      set((state) => ({
        locations: state.locations.filter((loc) => loc.locationId !== locationId),
        selectedLocationId:
          state.selectedLocationId === String(locationId) ? null : state.selectedLocationId,
      }));

      // 서버에 삭제 요청
      await deleteLocationAPI(locationId);
    } catch (error) {
      // 에러 발생 시 목록 새로고침하여 원래 상태로 복구
      await get().fetchLocations();
      const errorMessage = error instanceof Error ? error.message : '위치 삭제에 실패했습니다.';
      set({ error: errorMessage });
      console.error('위치 삭제 실패:', error);
      throw error;
    }
  },
}));

