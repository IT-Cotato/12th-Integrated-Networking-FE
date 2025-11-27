"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Location } from "@/types/location";

type SidebarStore = {
  locations: Location[];
  selectedId: string | null;

  // actions
  setLocations: (list: Location[]) => void;
  setSelectedId: (id: string | null) => void;

  addLocation: (loc: Location) => void;
  deleteLocation: (id: string) => void;
  togglePin: (id: string) => void;
};

// ⭐ 고정된 애들 먼저 오도록 정렬하는 헬퍼
const sortLocations = (list: Location[]) => {
  const pinned = list.filter(l => l.isPinned);
  const unpinned = list.filter(l => !l.isPinned);
  return [...pinned, ...unpinned];
};

export const useSidebarStore = create<SidebarStore>()(
  persist(
    set => ({
      locations: [],
      selectedId: null,

      // 전체 리스트를 통째로 변경 (정렬 포함)
      setLocations: list => set({ locations: sortLocations(list) }),

      // 선택된 ID 변경
      setSelectedId: id => set({ selectedId: id }),

      // 위치 추가 (추가 후 pinned 우선 정렬)
      addLocation: loc =>
        set(state => ({
          locations: sortLocations([...state.locations, loc]),
        })),

      // 위치 삭제
      deleteLocation: id =>
        set(state => {
          const filtered = state.locations.filter(l => l.id !== id);
          const nextSelected =
            state.selectedId === id ? null : state.selectedId;

          return {
            locations: filtered,
            selectedId: nextSelected,
          };
        }),

      // 핀 토글 + 정렬
      togglePin: id =>
        set(state => {
          const updated = state.locations.map(l =>
            l.id === id ? { ...l, isPinned: !l.isPinned } : l,
          );

          return {
            locations: sortLocations(updated),
          };
        }),
    }),
    {
      name: "sidebar-storage", // 로컬에 저장될 key
    },
  ),
);
