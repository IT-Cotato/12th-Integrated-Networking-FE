import type { Location } from '@/types/location';

// 'weather' 기능(도메인)과 관련된 모든 쿼리 키
export const weatherKeys = {
  all: ['weather'] as const,

  /**
   * (One Call API)
   * 특정 '위치'의 모든 날씨 정보(현재, 시간별, 주간)
   * @param location
   * @returns ['weather', location]
   */
  byLocation: (location: Location | null) =>
    [...weatherKeys.all, location] as const,
};
