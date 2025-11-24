"use client";

import { useState } from "react";

import { formatLocalDate } from "src/utils/getLocalDate";

import { HourlyWeather } from "@/components/home/HourlyWeather";
import { TodayWeather } from "@/components/home/TodayWeather";
import WeatherSection from "@/components/home/WeatherSection";
import { WeeklyWeather } from "@/components/home/WeeklyWeather";
import AddLocationModal from "@/components/modal/AddLocationModal/AddLocationModal";
import ConfirmDeleteModal from "@/components/modal/AddLocationModal/ConfirmDeleteModal";
import Sidebar from "@/components/sidebar/Sidebar";

import { Location } from "@/types/location";

const INITIAL_LOCATIONS: Location[] = [
  {
    id: "1",
    name: "롯데월드",
    address: "서울 송파구",
    lat: 37.511,
    lng: 127.098,
  },
  {
    id: "2",
    name: "강남역 1번 출구",
    address: "서울 강남구",
    lat: 37.4979,
    lng: 127.0276,
  },
];

const Home = () => {
  const [locations, setLocations] = useState<Location[]>(INITIAL_LOCATIONS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(
    INITIAL_LOCATIONS[0]?.id ?? null,
  );
  const [deleteTarget, setDeleteTarget] = useState<Location | null>(null);

  const date = formatLocalDate();

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

  const selectedLocation =
    locations.find(location => location.id === selectedId) ?? null;
  const LOCATION = selectedLocation?.name ?? "";

  return (
    <div className="bg-gray-5 flex min-h-screen w-full">
      {/* SIDE BAR */}
      <Sidebar
        locations={locations}
        selectedId={selectedId}
        onSelect={handleSelect}
        onClickDelete={handleRequestDelete}
        onClickAdd={() => setIsAddOpen(true)}
        onTogglePin={handleTogglePin}
      />

      {/* RIGHT CONTENT (팀원 코드 + 예찬 코드 통합) */}
      <main className="flex flex-1 flex-col items-center justify-center gap-6">
        {!LOCATION ? (
          <>
            <img
              src="/weather/clouds.svg"
              alt="날씨 없음"
              className="h-80 w-80"
            />
            <div className="text-h2 text-gray-100">
              아직 선택된 위치가 없습니다!
            </div>
          </>
        ) : (
          <>
            <WeatherSection title={`${date} ${LOCATION} 날씨 현황`}>
              <TodayWeather />
            </WeatherSection>

            <WeatherSection title="시간별 현황" gap={4}>
              <HourlyWeather />
            </WeatherSection>

            <WeatherSection title="주간 예보">
              <WeeklyWeather />
            </WeatherSection>
          </>
        )}
      </main>

      {/* ADD LOCATION MODAL */}
      <AddLocationModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddLocation}
      />

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        targetName={deleteTarget?.name}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Home;
