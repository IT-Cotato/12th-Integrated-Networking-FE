"use client";

import { useEffect, useState } from "react";

import { Location } from "@/types/location";

const STORAGE_KEY_LOCATIONS = "weather_locations";
const STORAGE_KEY_SELECTED_ID = "weather_selected_location_id";

// localStorage에서 locations 초기값 가져오기
function loadInitialLocations(initial: Location[]): Location[] {
  if (typeof window === "undefined") return initial;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY_LOCATIONS);
    if (!stored) return initial;

    const parsed: Location[] = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) return initial;

    return parsed;
  } catch (error) {
    console.error("Failed to parse locations from localStorage", error);
    return initial;
  }
}

// localStorage에서 selectedId 초기값 가져오기
function loadInitialSelectedId(initialLocations: Location[]): string | null {
  if (typeof window === "undefined") {
    return initialLocations[0]?.id ?? null;
  }

  try {
    const storedId = window.localStorage.getItem(STORAGE_KEY_SELECTED_ID);
    if (!storedId) {
      return initialLocations[0]?.id ?? null;
    }

    // 저장된 id가 실제 목록에 있는 경우에만 사용
    const storedLocationsRaw = window.localStorage.getItem(
      STORAGE_KEY_LOCATIONS,
    );
    if (!storedLocationsRaw) {
      return initialLocations[0]?.id ?? null;
    }

    const storedLocations: Location[] = JSON.parse(storedLocationsRaw);
    const exists = storedLocations.some(loc => loc.id === storedId);

    return exists ? storedId : (storedLocations[0]?.id ?? null);
  } catch (error) {
    console.error("Failed to load selectedId from localStorage", error);
    return initialLocations[0]?.id ?? null;
  }
}

export function useSidebar(initial: Location[]) {
  // 여기서 localStorage 읽어서 초기값 설정
  const [locations, setLocations] = useState<Location[]>(() =>
    loadInitialLocations(initial),
  );

  const [selectedId, setSelectedId] = useState<string | null>(() =>
    loadInitialSelectedId(loadInitialLocations(initial)),
  );

  const [deleteTarget, setDeleteTarget] = useState<Location | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // locations가 바뀔 때만 localStorage에 쓰기
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY_LOCATIONS,
        JSON.stringify(locations),
      );
    } catch (error) {
      console.error("Failed to save locations to localStorage", error);
    }
  }, [locations]);

  //  selectedId 바뀔 때 localStorage에 쓰기
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if (selectedId === null) {
        window.localStorage.removeItem(STORAGE_KEY_SELECTED_ID);
      } else {
        window.localStorage.setItem(STORAGE_KEY_SELECTED_ID, selectedId);
      }
    } catch (error) {
      console.error("Failed to save selectedId to localStorage", error);
    }
  }, [selectedId]);

  // ===================== 핸들러들 =====================

  const handleSelect = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  const handleRequestDelete = (id: string) => {
    const target = locations.find(location => location.id === id) ?? null;
    setDeleteTarget(target);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    const id = deleteTarget.id;

    setLocations(prev => prev.filter(location => location.id !== id));
    setSelectedId(prev => (prev === id ? null : prev));
    setDeleteTarget(null);
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  const handleAddLocation = (locationInput: {
    name: string;
    lat: number;
    lng: number;
    address?: string;
  }) => {
    const newId = String(Date.now());

    const newLocation: Location = {
      id: newId,
      name: locationInput.name,
      lat: locationInput.lat,
      lng: locationInput.lng,
      address: locationInput.address ?? "",
      isPinned: false,
    };

    setLocations(prev => [...prev, newLocation]);
    setSelectedId(newId);
  };

  const handleTogglePin = (id: string) => {
    setLocations(prev => {
      const updated = prev.map(location =>
        location.id === id
          ? { ...location, isPinned: !location.isPinned }
          : location,
      );

      const pinned = updated.filter(loc => loc.isPinned);
      const unpinned = updated.filter(loc => !loc.isPinned);

      return [...pinned, ...unpinned];
    });
  };

  return {
    locations,
    selectedId,
    deleteTarget,
    isAddOpen,

    openAddModal: () => setIsAddOpen(true),
    closeAddModal: () => setIsAddOpen(false),

    handleSelect,
    handleRequestDelete,
    handleConfirmDelete,
    handleAddLocation,
    handleTogglePin,
    cancelDelete,
  };
}
