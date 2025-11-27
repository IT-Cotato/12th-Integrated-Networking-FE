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

export const useSidebarStore = create<SidebarStore>()(
  persist(
    set => ({
      locations: [],
      selectedId: null,

      // 전체 리스트를 통째로 변경
      setLocations: list => set({ locations: list }),

      // 선택된 ID 변경
      setSelectedId: id => set({ selectedId: id }),

      // 위치 추가
      addLocation: loc =>
        set(state => ({
          locations: [...state.locations, loc],
        })),

      // 위치 삭제
      deleteLocation: id =>
        set(state => ({
          locations: state.locations.filter(l => l.id !== id),
          selectedId: state.selectedId === id ? null : state.selectedId,
        })),

      // 핀 토글
      togglePin: id =>
        set(state => ({
          locations: state.locations.map(l =>
            l.id === id ? { ...l, isPinned: !l.isPinned } : l,
          ),
        })),
    }),
    {
      name: "sidebar-storage", // 로컬에 저장될 key
    },
  ),
);
