"use client";

import { formatLocalDate } from "src/utils/getLocalDate";

import { HourlyWeather } from "@/components/home/HourlyWeather";
import { TodayWeather } from "@/components/home/TodayWeather";
import { WeatherIconDisplay } from "@/components/home/WeatherIconDisplay";
import WeatherSection from "@/components/home/WeatherSection";
import { WeeklyWeather } from "@/components/home/WeeklyWeather";
import AddLocationModal from "@/components/modal/AddLocationModal/AddLocationModal";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";
import Sidebar from "@/components/sidebar/Sidebar";

import { Location } from "@/types/location";

import { useSidebar } from "../hooks/useSidebar";

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
  const date = formatLocalDate();
  const {
    locations,
    selectedId,
    deleteTarget,
    isAddOpen,

    // modal controls
    openAddModal,
    closeAddModal,

    // handlers
    handleSelect,
    handleRequestDelete,
    handleConfirmDelete,
    handleAddLocation,
    handleTogglePin,
    cancelDelete,
  } = useSidebar(INITIAL_LOCATIONS);

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
        onClickAdd={openAddModal}
        onClickDelete={handleRequestDelete}
        onTogglePin={handleTogglePin}
      />

      <main className="flex flex-1 flex-col items-center justify-center gap-6">
        {!LOCATION ? (
          <>
            <WeatherIconDisplay weather="clouds" width={320} height={320} />
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
        onClose={closeAddModal}
        onSubmit={handleAddLocation}
      />

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        targetName={deleteTarget?.name}
        onCancel={cancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Home;
