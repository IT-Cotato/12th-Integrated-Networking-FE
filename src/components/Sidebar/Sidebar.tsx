import { useState } from 'react';
import LocationListItem from './LocationListItem';
// 더미 데이터 타입
interface LocationItem {
  id: string;
  name: string;
}

// API 연동 전, 화면 구성을 위한 더미 데이터
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
  const [selectedId, setSelectedId] = useState("5");
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

  return (
    <div className="fixed left-0 top-0 w-[248px] h-[1200px] flex flex-col items-start rounded-r-[48px] bg-white shadow-[2px_0_4px_rgba(0,0,0,0.10)]">
      <div className="py-12 px-4 flex flex-col items-start gap-10 w-full">
        {/* 위치 목록 */}
        <div className="flex items-center gap-4">
          <img src="/map-pin-front-color.svg" className="w-10 h-10" />
          <span className="text-[#292E2E] font-bold text-xl">위치 목록</span>
        </div>

        {/* 추가하기 */}
        <div className="flex items-center gap-4">
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
                onSelect={() => setSelectedId(location.id)}
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
                onDelete={() => console.log("삭제", location.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
