"use client";

import { useEffect, useState } from "react";

import type { Location } from "@/types/location";

import { useSidebarStore } from "../store/sidebarStore";

export function useSidebar(initialLocations: Location[]) {
  const {
    locations,
    selectedId,
    setLocations,
    setSelectedId,
    addLocation,
    deleteLocation,
    togglePin,
  } = useSidebarStore();

  // 모달/삭제 대상은 전역 스토어까지는 필요 없어서 로컬 상태로 유지
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Location | null>(null);

  // 🔹 초기 진입 시 INITIAL_LOCATIONS로 한 번만 채워주기
  useEffect(() => {
    if (locations.length === 0 && initialLocations.length > 0) {
      setLocations(initialLocations);
      setSelectedId(initialLocations[0].id);
    }
  }, [locations.length, initialLocations, setLocations, setSelectedId]);

  // 🔹 위치 선택 (같은 거 한 번 더 누르면 선택 해제)
  const handleSelect = (id: string) => {
    const nextId = selectedId === id ? null : id;
    setSelectedId(nextId);
  };

  // 🔹 삭제 요청 (모달 띄우기용)
  const handleRequestDelete = (id: string) => {
    const target = locations.find(loc => loc.id === id) ?? null;
    setDeleteTarget(target);
  };

  // 🔹 실제 삭제 확정
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    deleteLocation(deleteTarget.id);
    setDeleteTarget(null);
  };

  // 🔹 위치 추가
  const handleAddLocation = (input: {
    name: string;
    lat: number;
    lng: number;
    address?: string;
  }) => {
    const newId = String(Date.now());

    const newLocation: Location = {
      id: newId,
      name: input.name,
      lat: input.lat,
      lng: input.lng,
      address: input.address ?? "",
      isPinned: false,
    };

    addLocation(newLocation);
    setSelectedId(newId);
  };

  // 🔹 핀 토글 (로직은 store에 있음)
  const handleTogglePin = (id: string) => {
    togglePin(id);
  };

  // 🔹 모달 제어
  const openAddModal = () => setIsAddOpen(true);
  const closeAddModal = () => setIsAddOpen(false);
  const cancelDelete = () => setDeleteTarget(null);

  return {
    locations,
    selectedId,
    deleteTarget,
    isAddOpen,

    // 모달 제어
    openAddModal,
    closeAddModal,
    cancelDelete,

    // 핸들러들
    handleSelect,
    handleRequestDelete,
    handleConfirmDelete,
    handleAddLocation,
    handleTogglePin,
  };
}
