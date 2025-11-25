import { useState, useEffect } from 'react';
import LocationListItem from './LocationListItem';
import AddLocationModal from '../Modal/AddLocationModal';
import DeleteLocationModal from '../Modal/DeleteLocationModal';
import { getLocations } from '../../services/api';
import type { LocationResponseItem } from '../../types';

export default function Sidebar() {
  const [selectedId, setSelectedId] = useState<string>("");
  const [locations, setLocations] = useState<LocationResponseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 위치 목록 조회
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        // TODO: 추후 로그인 구현 시 userId를 실제 사용자 ID로 변경 필요
        const userId = 1; // 임시 사용자 ID
        const response = await getLocations(userId);
        setLocations(response.data);
      } catch (error) {
        console.error('위치 목록 조회 실패:', error);
        // 에러 발생 시 빈 배열로 설정
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

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
                selected={selectedId === String(location.locationId)}
                pinned={location.pinned}
                onSelect={() => {
                  setSelectedId(selectedId === String(location.locationId) ? "" : String(location.locationId));
                }}
                onPin={() => {
                  // TODO: 백엔드 API 연동 - 핀 상태 변경 API 호출
                  // 현재는 로컬 상태만 업데이트 (서버와 동기화 필요)
                  setLocations((prev) =>
                    prev.map((loc) =>
                      loc.locationId === location.locationId
                        ? { ...loc, pinned: !loc.pinned }
                        : loc
                    )
                  );
                }}
                onDelete={() => {
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
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}