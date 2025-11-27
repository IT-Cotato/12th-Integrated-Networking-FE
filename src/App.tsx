"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import AddLocationModal from "./components/Modal/AddLocationModal";
import DeleteConfirmModal from "./components/Modal/DeleteConfirmModal";
import KakaoLogin from "./components/KakaoLogin/KakaoLogin";
import { type KakaoPlace } from "./types";
import { type User } from "./types/Login";
import "pretendard/dist/web/static/pretendard.css";

import MainWeatherPanel from "./components/MainWeatherPanel/MainWeatherPanel";
import WeeklyForecastPanel from "./components/WeeklyForecast/WeeklyForecast";
import HourlyWeatherPanel from "./components/HourlyForecast/HourlyForecast";

import {
  getLocations,
  addLocation as addLocationToBackend,
  deleteLocation as deleteLocationFromBackend,
  type BackendLocation,
  getAccessToken,
} from "./services/AuthService";

interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export default function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const convertBackendLocation = (backendLoc: BackendLocation): Location => ({
    id: String(backendLoc.id),
    name: backendLoc.placeName,
    lat: backendLoc.lat,
    lon: backendLoc.lon,
  });

  const loadUserLocations = async () => {
    setIsLoadingLocations(true);
    try {
      const backendLocations = await getLocations();
      const convertedLocations = backendLocations.map(convertBackendLocation);
      setLocations(convertedLocations);
      console.log("위치 목록 불러오기 성공:", convertedLocations);
    } catch (error) {
      console.error("위치 목록 불러오기 실패:", error);
    } finally {
      setIsLoadingLocations(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          await loadUserLocations();
          setUser({
            memberId: 0,
            nickname: "사용자",
            profileImageUrl: "",
            isNewUser: false,
          });
        } catch (error) {
          console.error("자동 로그인 실패:", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, []);

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

  const handleAddLocation = async (place: KakaoPlace) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const backendLocation = await addLocationToBackend({
        placeName: place.place_name,
        lat: parseFloat(place.y),
        lon: parseFloat(place.x),
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

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {user ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <KakaoLogin user={user} onLogout={handleLogout} />
            </div>
            {isLoadingLocations ? (
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
            <KakaoLogin user={user} onLogout={handleLogout} />
          </div>
        )}
      </div>

      <main className="flex-1 overflow-auto">
        {selectedLocation ? (
          (() => {
            const currentLocation = locations.find(
              (loc) => loc.id === selectedLocation
            );

            if (!currentLocation) return null;

            return (
              <div className="w-full min-h-screen flex flex-col gap-6 p-10">
                <MainWeatherPanel
                  lat={currentLocation.lat}
                  lon={currentLocation.lon}
                  locationName={currentLocation.name}
                />
                <HourlyWeatherPanel
                  lat={currentLocation.lat}
                  lon={currentLocation.lon}
                />
                <WeeklyForecastPanel
                  lat={currentLocation.lat}
                  lon={currentLocation.lon}
                />
              </div>
            );
          })()
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
