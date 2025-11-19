import React, { useContext, useState } from 'react';
import type { Location } from '@/types/location';
import { SelectedLocationContext } from '@/contexts/selected-location-context';

type SidebarProps = {
  locations: Location[];
  onAdd: () => void;
  onTogglePin: (id: string) => void;
};

export default function Sidebar({ locations, onAdd, onTogglePin }: SidebarProps) {
  // useContext 훅은 컴포넌트 함수 안에서 실행!
  const ctx = useContext(SelectedLocationContext);
  // context 값이 undefined일 수 있으니 방어 코드
  if (!ctx) throw new Error('SelectedLocationContext not found!');
  const { selectedLocation, selectLocation } = ctx;

  const [hovered, setHovered] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Location | null>(null);

  const handleDeleteConfirm = () => {
    setDeleteTarget(null);
  }

  return (
    <aside
      className="
        flex flex-col items-start
        [width:248px] [height:1200px]
        px-4 pt-12 pb-12
        gap-10
        aspect-[31/150]
        rounded-r-[48px]
        bg-white
        shadow-[2px_0_4px_0_rgba(0,0,0,0.1)]
      "
    >

      {/* 헤더: 아이콘 + 타이틀 */}
      <div className="flex items-center h-10 mb-0">
        <img src="/map-pin-front-color.svg" alt="위치 아이콘" className="w-10 h-10 mr-4" />
        <span className="font-normal text-[20px]" style={{ color: 'var(--color-gray-60)' }}>위치 목록</span>
      </div>
      {/* 추가하기 버튼 */}
      <button
        className="flex items-center h-10 w-full rounded bg-white text-gray-60 font-normal text-[20px]"
        onClick={onAdd}
      >
        <img src="/plus-front-clay.svg" alt="추가" className="w-10 h-10 mr-4" />
        <span>추가하기</span>
      </button>
      {/* 위치 리스트 */}
      <ul className="flex flex-col gap-2 w-full">
        {locations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;
          return (
            <li
              key={loc.id}
              className={`
            flex items-center w-full
            ${isSelected
              ? 'bg-gray-100 shadow-[0_3px_3px_0_rgba(0,0,0,0.10)] rounded-[8px]'
              : ''
            }
            text-gray-800 group
            transition
            cursor-pointer
          `}
          style={{
            marginBottom: '8px',
            padding: '8px',
            gap: '12px',           // 리스트 내부 아이템 gap
          }}
          onMouseEnter={() => setHovered(loc.id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => selectLocation(loc)}
        >
            <button
              onClick={(e) => { e.stopPropagation(); onTogglePin(loc.id); }}  // 리스트 선택 이벤트와 분리
              className="p-0 bg-transparent border-none outline-none"
              tabIndex={-1}
            >
              <img
              src={loc.isFixed ? '/pin-front-color.svg' : '/pin-front-clay.svg'}
              alt="핀"
              className="w-6 h-6 ml-2 mr-3"
            />
          </button>
            <span className="flex-1 font-medium text-[16px] leading-5">{loc.name}</span>
            {/* hover 시 trash 노출 */}
            {hovered === loc.id && (
              <button
                onClick={() => setDeleteTarget(loc)}
                className="ml-2 w-6 h-6 flex items-center justify-center"
                tabIndex={-1}
                >
                  <img src ="/trash-can-front-color.svg" alt="휴지통" className="w-6 h-6" />
                </button>
            )}
          </li>
        );
      })}
      </ul>
      {/* 아래 영역(48px 마진) */}
      <div style={{ height: '48px' }} />
    </aside>
  );
}

