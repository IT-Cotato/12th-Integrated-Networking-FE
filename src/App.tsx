"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import AddLocationModal from "./components/Modal/AddLocationModal";
import DeleteConfirmModal from "./components/Modal/DeleteConfirmModal";
import KakaoLogin from "./components/KakaoLogin/KakaoLogin";
import { type KakaoPlace } from "./types";
import { type User } from "./types/Login"; // ✅ 변경: KakaoUserInfo → User
import "pretendard/dist/web/static/pretendard.css";

// import type { WeatherInfo } from "./types/Weather";
// import { mockHourly } from "./services/WeatherService";
import MainWeatherPanel from "./components/MainWeatherPanel/MainWeatherPanel";
import WeeklyForecastPanel from "./components/WeeklyForecast/WeeklyForecast";
// import HourlyWeatherWithAPI from "./components/HourlyForecast/HourlyWeatherWithAPI";
import HourlyWeatherPanel from "./components/HourlyForecast/HourlyForecast";

// ✅ 추가: 백엔드 연동 import
import {
  getLocations,
  addLocation as addLocationToBackend,
  deleteLocation as deleteLocationFromBackend,
  type BackendLocation,
} from "./services/AuthService";

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
  // const [selectedWeather] = useState<WeatherInfo | null>(mockWeather);

  const [user, setUser] = useState<User | null>(null); // ✅ 변경: KakaoUserInfo → User
  const [isLoadingLocations, setIsLoadingLocations] = useState(false); // ✅ 추가

  // ✅ 추가: 백엔드 Location 변환 함수
  const convertBackendLocation = (backendLoc: BackendLocation): Location => ({
    id: String(backendLoc.id),
    name: backendLoc.placeName,
    lat: backendLoc.latitude,
    lng: backendLoc.longitude,
  });

  // ✅ 추가: 위치 목록 불러오기 함수
  const loadUserLocations = async () => {
    setIsLoadingLocations(true);
    try {
      const backendLocations = await getLocations();
      const convertedLocations = backendLocations.map(convertBackendLocation);
      setLocations(convertedLocations);
      console.log("위치 목록 불러오기 성공:", convertedLocations);
    } catch (error) {
      console.error("위치 목록 불러오기 실패:", error);
      alert("위치 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoadingLocations(false);
    }
  };

  // ✅ 수정: 로그인 시 위치 목록 불러오기
  const handleLogin = (userData: User) => {
    setUser(userData);
    console.log("로그인 성공:", userData);
    void loadUserLocations();
  };

  const handleLogout = () => {
    setUser(null);
    setLocations([]);
    setSelectedLocation(null);
    console.log("로그아웃");
  };

  const handleLocationClick = (id: string) => {
    setSelectedLocation(selectedLocation === id ? null : id);
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLocationToDelete(id);
    setShowDeleteModal(true);
  };

  // ✅ 수정: 백엔드에서 삭제
  const confirmDelete = async () => {
    if (locationToDelete && user) {
      try {
        await deleteLocationFromBackend(Number(locationToDelete));
        setLocations(locations.filter((loc) => loc.id !== locationToDelete));
        if (selectedLocation === locationToDelete) {
          setSelectedLocation(null);
        }
        console.log("위치 삭제 성공");
      } catch (error) {
        console.error("위치 삭제 실패:", error);
        alert("위치 삭제에 실패했습니다.");
      }
    }
    setShowDeleteModal(false);
    setLocationToDelete(null);
  };

  // ✅ 수정: 백엔드에 저장
  const handleAddLocation = async (place: KakaoPlace) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const backendLocation = await addLocationToBackend({
        placeName: place.place_name,
        latitude: parseFloat(place.y),
        longitude: parseFloat(place.x),
        address: place.road_address_name || place.address_name,
        isPinned: false,
      });

      const newLocation = convertBackendLocation(backendLocation);
      setLocations([...locations, newLocation]);

      console.log("위치 추가 성공:", newLocation);
      setShowAddModal(false);
    } catch (error) {
      console.error("위치 추가 실패:", error);
      alert("위치 추가에 실패했습니다.");
    }
  };

  return (
    <div className="flex min-h-full bg-gray-50">
      {/* 사이드바 */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {user ? ( // ✅ 추가: 로그인 상태에 따라 다른 레이아웃
          <>
            <div className="p-4 border-b border-gray-200">
              <KakaoLogin onLogin={handleLogin} onLogout={handleLogout} />
            </div>
            {isLoadingLocations ? ( // ✅ 추가: 로딩 상태 표시
              <div className="flex items-center justify-center flex-1">
                <div className="text-sm text-gray-500">위치 불러오는 중...</div>
              </div>
            ) : (
              <Sidebar
                locations={locations}
                selectedLocation={selectedLocation}
                onLocationClick={handleLocationClick}
                onAddClick={() => setShowAddModal(true)}
                onDeleteClick={handleDeleteClick}
              />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <KakaoLogin onLogin={handleLogin} onLogout={handleLogout} />
          </div>
        )}
      </div>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
        {selectedLocation ? (
          <div className="w-full min-h-screen flex flex-col gap-6 p-10">
            <MainWeatherPanel
              lat={locations.find((loc) => loc.id === selectedLocation)!.lat}
              lng={locations.find((loc) => loc.id === selectedLocation)!.lng}
              locationName={
                locations.find((loc) => loc.id === selectedLocation)?.name
              }
            />

            <HourlyWeatherPanel
              lat={locations.find((loc) => loc.id === selectedLocation)!.lat}
              lng={locations.find((loc) => loc.id === selectedLocation)!.lng}
            />
            <WeeklyForecastPanel
              lat={locations.find((loc) => loc.id === selectedLocation)!.lat}
              lng={locations.find((loc) => loc.id === selectedLocation)!.lng}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-black">
            <img
              src="/Day Clouds.svg"
              width="240px"
              height="240px"
              alt="구름"
            />
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
