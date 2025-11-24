"use client";

import { useState } from "react";

import { Location } from "@/types/location";

export function useSidebar(initial: Location[]) {
  const [locations, setLocations] = useState<Location[]>(initial);
  const [selectedId, setSelectedId] = useState<string | null>(
    initial[0]?.id ?? null,
  );
  const [deleteTarget, setDeleteTarget] = useState<Location | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  const handleRequestDelete = (id: string) => {
    const target = locations.find(loc => loc.id === id) ?? null;
    setDeleteTarget(target);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    const id = deleteTarget.id;

    setLocations(prev => prev.filter(loc => loc.id !== id));
    setSelectedId(prev => (prev === id ? null : prev));
    setDeleteTarget(null);
  };

  const handleAddLocation = (location: {
    name: string;
    lat: number;
    lng: number;
    address?: string;
  }) => {
    const newId = String(Date.now());

    const newLocation: Location = {
      id: newId,
      name: location.name,
      lat: location.lat,
      lng: location.lng,
      address: location.address ?? "",
      isPinned: false,
    };

    setLocations(prev => [...prev, newLocation]);
    setSelectedId(newId);
  };

  const handleTogglePin = (id: string) => {
    setLocations(prev => {
      const updated = prev.map(loc =>
        loc.id === id ? { ...loc, isPinned: !loc.isPinned } : loc,
      );

      const pinned = updated.filter(l => l.isPinned);
      const unpinned = updated.filter(l => !l.isPinned);

      return [...pinned, ...unpinned];
    });
  };

  return {
    locations,
    selectedId,
    deleteTarget,
    isAddOpen,

    // open/close
    openAddModal: () => setIsAddOpen(true),
    closeAddModal: () => setIsAddOpen(false),

    // handlers
    handleSelect,
    handleRequestDelete,
    handleConfirmDelete,
    handleAddLocation,
    handleTogglePin,
  };
}
