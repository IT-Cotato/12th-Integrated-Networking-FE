import { useState } from 'react';

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
  const [selectedId, setSelectedId] = useState<string>('5'); // 초기값: 롯데월드
    return (
      <div className="fixed left-0 top-0 w-[248px] h-[1200px] pt-12 pb-12 px-4 flex flex-col items-start gap-10 rounded-r-[48px] bg-white shadow-[2px_0_4px_rgba(0,0,0,0.10)]">
        {/* 위치 목록 */}
        <div className="flex items-center gap-4">
          <img src="/map-pin-front-color.svg" alt="위치" className="w-10 h-10" />
          <span className="text-[#292E2E] font-bold text-xl leading-normal" style={{ fontFamily: 'Pretendard, sans-serif' }}>위치 목록</span>
        </div>

        {/* 추가하기 */}
        <div className="flex items-center gap-4">
          <img src="/plus-front-clay.svg" alt="추가" className="w-10 h-10" />
          <span className="text-[#292E2E] font-bold text-xl leading-normal" style={{ fontFamily: 'Pretendard, sans-serif' }}>추가하기</span>
        </div>

        {/* 위치 목록 아이템 */}
        <div className="flex flex-col gap-2 w-full">
          {dummyLocations.map((location) => {
            const isSelected = selectedId === location.id;
            return (
              <button
                key={location.id}
                onClick={() => setSelectedId(location.id)}
                className={`group flex items-center gap-3 px-6 py-4 rounded-lg w-full transition-colors cursor-pointer ${
                  isSelected 
                    ? 'bg-gray-100' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={'/pin-front-color.svg'}
                  alt="위치"
                  className="w-6 h-6"
                />
                <span
                  className="text-[#292E2E] font-bold flex-1 text-left"
                  style={{ fontFamily: 'Pretendard, sans-serif' }}
                >
                  {location.name}
                </span>
                <img
                  src={'/trash-can-front-color.svg'}
                  alt="삭제"
                  className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            );
          })}
        </div>
      </div>
    );
  }
