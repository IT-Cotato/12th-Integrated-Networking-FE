'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import AddLocationModal from './components/Modal/AddLocationModal';
import DeleteConfirmModal from './components/Modal/DeleteConfirmModal';
import { type KakaoPlace } from './types';
import 'pretendard/dist/web/static/pretendard.css';

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
              {locations.find((loc) => loc.id === selectedLocation)?.name}의 날씨
            </h1>
            {/* 여기에 날씨 정보 컴포넌트 추가 */}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-black">
            <img src='/Day Clouds.svg' width='240px' height='240px'/>
            <p className="text-xl text-bold text-[36px]">아직 선택된 위치가 없습니다!</p>
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
          locations.find((loc) => loc.id === locationToDelete)?.name || ''
        }
      />
    </div>
  );
}