import { useState } from 'react';
import LocationListItem from './LocationListItem';
import AddLocationModal from '../Modal/AddLocationModal';

// TODO: 백엔드 API 연동 - 실제 Location 타입으로 변경 필요
// 현재는 UI 구성용 더미 데이터
interface LocationItem {
  id: string;
  name: string;
}

// TODO: 백엔드 API 연동 - 실제 위치 목록을 API에서 가져오도록 수정
// 1. 위치 목록 조회 API 호출 (src/services/api.ts의 getLocations 함수 사용)
// 2. useEffect로 컴포넌트 마운트 시 위치 목록 불러오기
// 3. 더미 데이터 제거
const dummyLocations: LocationItem[] = [
  { id: '1', name: '강남역 1번 출구'},
  { id: '2', name: 'RATTHAT' },
  { id: '3', name: '파이홀'},
  { id: '4', name: '청수당공명' },
  { id: '5', name: '롯데월드'},
  { id: '6', name: '구관'},
  { id: '7', name: 'Osiu' },
];

export default function Sidebar() {
  const [selectedId, setSelectedId] = useState<string>("");
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
          {[...dummyLocations]
            .sort((a, b) => {
              const aPinned = pinnedIds.has(a.id);
              const bPinned = pinnedIds.has(b.id);
              if (aPinned && !bPinned) return -1;
              if (!aPinned && bPinned) return 1;
              return 0;
            })
            .map((location) => (
              <LocationListItem
                key={location.id}
                id={location.id}
                name={location.name}
                selected={selectedId === location.id}
                pinned={pinnedIds.has(location.id)}
                onSelect={() => {
                  setSelectedId(selectedId === location.id ? "" : location.id);
                }}
                onPin={() => {
                  setPinnedIds((prev) => {
                    const next = new Set(prev);
                    if (next.has(location.id)) {
                      next.delete(location.id);
                    } else {
                      next.add(location.id);
                    }
                    return next;
                  });
                }}
                onDelete={() => {
                  // TODO: 백엔드 API 연동 - 위치 삭제 처리
                  // 1. 삭제 확인 모달 표시 (DeleteLocationModal 사용)
                  // 2. 확인 시 백엔드 API 호출 (src/services/api.ts의 deleteLocation 함수 사용)
                  // 3. 성공 시 위치 목록에서 제거
                  // 4. 에러 처리
                  console.log("삭제", location.id);
                }}
              />
            ))}
        </div>
      </div>

      {/* 위치 추가 모달 */}
      <AddLocationModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}
