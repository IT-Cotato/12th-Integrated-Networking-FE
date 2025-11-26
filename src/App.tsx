"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import AddLocationModal from "./components/Modal/AddLocationModal";
import DeleteConfirmModal from "./components/Modal/DeleteConfirmModal";
import KakaoLogin from "./components/KakaoLogin/KakaoLogin";
import { type KakaoPlace } from "./types";
import { type KakaoUserInfo } from "./types/Login";
import "pretendard/dist/web/static/pretendard.css";

import type { WeatherInfo } from "./types/Weather";
import { mockHourly, mockWeather, mockWeekly } from "./services/WeatherService";
import MainWeatherPanel from "./components/MainWeatherPanel/MainWeatherPanel";
import WeeklyForecastPanel from "./components/WeeklyForecast/WeeklyForecast";
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
  const [selectedWeather] = useState<WeatherInfo | null>(mockWeather);
  
  // 카카오 로그인 상태
  const [user, setUser] = useState<KakaoUserInfo | null>(null);

  // 카카오 로그인 핸들러
  const handleLogin = (userData: KakaoUserInfo) => {
    setUser(userData);
    console.log('로그인 성공:', userData);
    // TODO: 여기서 사용자별 위치 목록을 서버에서 불러올 수 있습니다
  };

  // 카카오 로그아웃 핸들러
  const handleLogout = () => {
    setUser(null);
    setLocations([]); // 로그아웃 시 위치 목록 초기화
    setSelectedLocation(null);
    console.log('로그아웃');
  };

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
    
    // TODO: 로그인한 사용자의 경우 서버에 위치 저장
    if (user) {
      console.log('사용자 위치 저장:', user.id, newLocation);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 사이드바 */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col items-center">
        {/* 카카오 로그인 헤더 */}
        <div className="p-4 border-b border-gray-200">
          <KakaoLogin onLogin={handleLogin} onLogout={handleLogout} />
        </div>

        {/* 사이드바 내용 */}
        <Sidebar
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationClick={handleLocationClick}
          onAddClick={() => setShowAddModal(true)}
          onDeleteClick={handleDeleteClick}
        />
      </div>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
        {selectedLocation ? (
          <div className="w-full min-h-screen flex flex-col gap-6 p-10">
            <MainWeatherPanel
              selectedWeather={selectedWeather}
              locationName={
                locations.find((loc) => loc.id === selectedLocation)?.name
              }
            />
            <HourlyWeatherPanel hourly={mockHourly} />
            <WeeklyForecastPanel weekly={mockWeekly} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-black">
            <img src="/Day Clouds.svg" width="240px" height="240px" alt="구름" />
            <p className="text-[36px] font-bold">
              아직 선택된 위치가 없습니다!
            </p>
            {!user && (
              <p className="text-sm text-gray-500 mt-4">
                로그인하여 위치를 저장하세요
              </p>
            )}
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