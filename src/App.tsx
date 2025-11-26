// import { useState } from "react";
// import MainWeatherPanel from "./components/MainWeatherPanel";
// import type { WeatherInfo } from "./types/Weather";
// import { mockWeather, mockWeekly } from "./services/WeatherService";
// import WeeklyForecastPanel from "./components/WeeklyForecast";

// function App() {
//   const [selectedWeather] = useState<WeatherInfo | null>(mockWeather); //(null)로 다시 바꾸기

//   return (
//     <div className="w-full min-h-screen bg-[#F6F6F6] pl-[248px] flex flex-col gap-6 p-10">
//       <MainWeatherPanel selectedWeather={selectedWeather} />
//       <WeeklyForecastPanel weekly={mockWeekly} />
//     </div>
//   );
// }

// export default App;

"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import AddLocationModal from "./components/Modal/AddLocationModal";
import DeleteConfirmModal from "./components/Modal/DeleteConfirmModal";
import { type KakaoPlace } from "./types";
import "pretendard/dist/web/static/pretendard.css";

import type { WeatherInfo } from "./types/Weather"; //추가
import { mockHourly, mockWeather, mockWeekly } from "./services/WeatherService"; //추가
//추가
import MainWeatherPanel from "./components/MainWeatherPanel/MainWeatherPanel"; // 추가
import WeeklyForecastPanel from "./components/WeeklyForecast/WeeklyForecast"; // 추가
import HourlyWeatherPanel from "./components/HourlyForecast/HourlyForecast";

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export default function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<string | null>(null);
  const [selectedWeather] = useState<WeatherInfo | null>(mockWeather); //(null)로 다시 바꾸기 //추가

  // 위치 선택/해제
  const handleLocationClick = (id: string) => {
    setSelectedLocation(selectedLocation === id ? null : id);
  };

  // 위치 삭제 시작
  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLocationToDelete(id);
    setShowDeleteModal(true);
  };

  // 위치 삭제 확인
  const confirmDelete = () => {
    if (locationToDelete) {
      setLocations(locations.filter((loc) => loc.id !== locationToDelete));
      if (selectedLocation === locationToDelete) {
        setSelectedLocation(null);
      }
    }
    setShowDeleteModal(false);
    setLocationToDelete(null);
  };

  // 위치 추가
  const handleAddLocation = (place: KakaoPlace) => {
    const newLocation: Location = {
      id: place.id,
      name: place.place_name,
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
    };
    setLocations([...locations, newLocation]);
    setShowAddModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 사이드바 */}
      <Sidebar
        locations={locations}
        selectedLocation={selectedLocation}
        onLocationClick={handleLocationClick}
        onAddClick={() => setShowAddModal(true)}
        onDeleteClick={handleDeleteClick}
      />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-8">
        {selectedLocation ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">
              {locations.find((loc) => loc.id === selectedLocation)?.name}의
              날씨
            </h1>
            {/* 여기에 날씨 정보 컴포넌트 추가 */}
            <div className="w-full min-h-screen pl-[248px] flex flex-col gap-6 p-10">
              <MainWeatherPanel
                selectedWeather={selectedWeather}
                locationName={
                  locations.find((loc) => loc.id === selectedLocation)?.name
                }
              />
              <HourlyWeatherPanel hourly={mockHourly} />
              <WeeklyForecastPanel weekly={mockWeekly} />
            </div>{" "}
            {/* 추가 */}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-black">
            <img src="/Day Clouds.svg" width="240px" height="240px" />
            <p className="text-xl text-bold text-[36px]">
              아직 선택된 위치가 없습니다!
            </p>
          </div>
        )}
      </main>

      {/* 모달 */}
      <AddLocationModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddLocation}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        locationName={
          locations.find((loc) => loc.id === locationToDelete)?.name || ""
        }
      />
    </div>
  );
}
