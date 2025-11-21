"use client";

import { useState } from "react";

import { formatLocalDate } from "src/utils/getLocalDate";

import Clouds from "@/assets/weather/clouds.svg";

import { HourlyWeather } from "@/components/home/HourlyWeather";
import { TodayWeather } from "@/components/home/TodayWeather";
import WeatherSection from "@/components/home/WeatherSection";
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

  const [selectedId, setSelectedId] = useState<string | null>(
    INITIAL_LOCATIONS[0]?.id ?? null,
  );
  const date = formatLocalDate();
  // TODO: 나중에 사이드바에서 선택한 위치로 변경

  const handleSelect = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  const handleDelete = (id: string) => {
    setLocations(prev => prev.filter(location => location.id !== id));
    setSelectedId(prev => (prev === id ? null : prev));
  };

  const selectedLocation =
    locations.find(location => location.id === selectedId) ?? null;

  const LOCATION = selectedLocation?.name ?? "";

  return (
    <div className="bg-gray-5 flex min-h-screen w-full">
      {/* 왼쪽: 사이드바 */}
      <Sidebar
        locations={locations}
        selectedId={selectedId}
        onSelect={handleSelect}
        onClickDelete={handleDelete}
      />

      {/* 오른쪽: 기존 Home 콘텐츠 */}
      <main className="flex flex-1 flex-col items-center justify-center gap-6">
        {!LOCATION ? (
          <>
            <Clouds className="h-80 w-80" />
            <div className="text-h2 text-gray-100">
              아직 선택된 위치가 없습니다!
            </div>
          </>
        ) : (
          <>
            <WeatherSection title={`${date} ${LOCATION} 날씨 현황`}>
              <TodayWeather />
            </WeatherSection>
            <WeatherSection title="시간별 현황">
              <HourlyWeather />
            </WeatherSection>
            <WeatherSection title="주간 예보" />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
