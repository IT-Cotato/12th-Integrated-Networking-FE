import { useState, useEffect } from 'react';
import LocationListItem from './LocationListItem';
import AddLocationModal from '../Modal/AddLocationModal';
import DeleteLocationModal from '../Modal/DeleteLocationModal';
import { useLocationStore } from '../../stores/locationStore';

export default function Sidebar() {
  const {
    locations,
    isLoading,
    selectedLocationId,
    fetchLocations,
    selectLocation,
    updateLocationPin,
    deleteLocation,
  } = useLocationStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [locationIdToDelete, setLocationIdToDelete] = useState<number | null>(null);

  // 위치 목록 조회
  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return (
    <div className="fixed left-0 top-0 w-[248px] h-[1200px] flex flex-col items-start rounded-r-[48px] bg-white shadow-[2px_0_4px_rgba(0,0,0,0.10)]">
      <div className="py-12 px-4 flex flex-col items-start gap-10 w-full">
        {/* 위치 목록 */}
        <div className="flex items-center gap-4">
          <img src="/map-pin-front-color.svg" className="w-10 h-10" />
          <span className="text-[#292E2E] font-bold text-xl">위치 목록</span>
        </div>

        {/* 추가하기 */}
        <div 
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setIsAddModalOpen(true)}
        >
          <img src="/plus-front-clay.svg" className="w-10 h-10" />
          <span className="text-[#292E2E] font-bold text-xl">추가하기</span>
        </div>

        {/* 리스트 */}
        <div className="flex flex-col gap-2 w-full">
          {isLoading ? (
            <div className="text-center text-gray-500 py-4">로딩 중...</div>
          ) : locations.length === 0 ? (
            <div className="text-center text-gray-500 py-4">위치 목록이 없습니다.</div>
          ) : (
            locations.map((location) => (
              <LocationListItem
                key={location.locationId}
                id={String(location.locationId)}
                name={location.name}
                selected={selectedLocationId === String(location.locationId)}
                pinned={location.pinned}
                onSelect={() => {
                  const newSelectedId =
                    selectedLocationId === String(location.locationId)
                      ? null
                      : String(location.locationId);
                  selectLocation(newSelectedId);
                }}
                onPin={() => {
                  updateLocationPin(location.locationId, !location.pinned);
                }}
                onDelete={() => {
                  setLocationIdToDelete(location.locationId);
                  setIsDeleteModalOpen(true);
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* 위치 추가 모달 */}
      <AddLocationModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      {/* 위치 삭제 모달 */}
      <DeleteLocationModal
        isOpen={isDeleteModalOpen}
        locationId={locationIdToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setLocationIdToDelete(null);
        }}
        onDelete={async () => {
          if (locationIdToDelete !== null) {
            try {
              await deleteLocation(locationIdToDelete);
              setIsDeleteModalOpen(false);
              setLocationIdToDelete(null);
            } catch (error) {
              // 에러는 store에서 처리됨
            }
          }
        }}
      />
    </div>
  );
}