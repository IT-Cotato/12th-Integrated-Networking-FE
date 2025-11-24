import { useContext, useState } from 'react';
import type { Location } from '@/types/location';
import { SelectedLocationContext } from '@/contexts/selected-location-context';
import AddLocationModal from './AddLocationModal';
import DeleteModal from './DeleteModal';

export default function Sidebar() {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: '강남역 1번 출구',
      address: '',
      x: '',
      y: '',
      isFixed: true,
    },
    { id: '2', name: 'RATTHAT', address: '', x: '', y: '', isFixed: false },
    { id: '3', name: '파이홀', address: '', x: '', y: '', isFixed: false },
    { id: '4', name: '청수당공명', address: '', x: '', y: '', isFixed: false },
    { id: '5', name: '롯데월드', address: '', x: '', y: '', isFixed: false },
    { id: '6', name: '구관', address: '', x: '', y: '', isFixed: false },
    { id: '7', name: 'Osiu', address: '', x: '', y: '', isFixed: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddLocation = () => setIsModalOpen(true);
  // 핀 버튼 클릭 시 고정/비고정 상태를 토글
  const handleTogglePin = (id: string) => {
    setLocations((locs) =>
      locs.map((loc) =>
        loc.id === id ? { ...loc, isFixed: !loc.isFixed } : loc,
      ),
    );
  };
  // useContext 훅은 컴포넌트 함수 안에서 실행!
  const ctx = useContext(SelectedLocationContext);

  // context 값이 undefined일 수 있으니 방어 코드
  if (!ctx) throw new Error('SelectedLocationContext not found!');
  const { selectedLocation, selectLocation } = ctx;

  const [hovered, setHovered] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Location | null>(null);

  const handleDelete = () => {
    if (!deleteTarget) return;
    setLocations(prev => prev.filter(loc => loc.id !== deleteTarget.id));
    setDeleteTarget(null); // 모달 닫기
  };

  return (
    <aside className="flex h-screen w-[248px] flex-col items-start gap-10 rounded-r-[48px] bg-white px-4 pt-12 pb-12 shadow-[2px_0_4px_0_rgba(0,0,0,0.1)]">
      {/* 헤더: 아이콘 + 타이틀 */}
      <div className="mb-0 flex h-10 items-center">
        <img
          src="/map-pin-front-color.svg"
          alt="위치 아이콘"
          className="mr-4 h-10 w-10"
        />
        <span
          className="text-[20px] font-normal"
          style={{ color: 'var(--color-gray-60)' }}
        >
          위치 목록
        </span>
      </div>
      {/* 추가하기 버튼 */}
      <button
        className="text-gray-60 flex h-10 w-full items-center rounded bg-white text-[20px] font-normal"
        onClick={handleAddLocation}
      >
        <img src="/plus-front-clay.svg" alt="추가" className="mr-4 h-10 w-10" />
        <span>추가하기</span>
      </button>
      {/* 위치 리스트 */}
      <ul className="flex w-full flex-col gap-2">
        {locations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;
          return (
            <li
              key={loc.id}
              className={`relative flex w-full items-center ${
                isSelected
                  ? 'rounded-lg bg-gray-100 shadow-[0_3px_3px_0_rgba(0,0,0,0.10)]'
                  : ''
              } group cursor-pointer text-gray-800 transition`}
              style={{
                marginBottom: '8px',
                padding: '8px',
                gap: '12px', // 리스트 내부 아이템 gap
              }}
              onMouseEnter={() => setHovered(loc.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => selectLocation(loc)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePin(loc.id);
                }} // 리스트 선택 이벤트와 분리
                className="border-none bg-transparent p-0 outline-none"
                tabIndex={-1}
              >
                <img
                  src={
                    loc.isFixed ? '/pin-front-color.svg' : '/pin-front-clay.svg'
                  }
                  alt="핀"
                  className="mr-3 ml-2 h-6 w-6"
                />
              </button>
              <span className="flex-1 text-[16px] leading-5 font-medium">
                {loc.name}
              </span>
              {/* hover 시 trash 노출 */}
              {hovered === loc.id && (
                <button
                  onClick={e => {e.stopPropagation(); 
                    setDeleteTarget(loc);
                }}
                  className="absolute right-2 flex h-6 w-6 items-center justify-center"
                  tabIndex={-1}
                >
                  <img
                    src="/trash-can-front-color.svg"
                    alt="휴지통"
                    className="h-6 w-6"
                  />
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {/* 아래 영역(48px 마진) */}
      <div style={{ height: '48px' }} />
      {isModalOpen && (
        <AddLocationModal onClose={() => setIsModalOpen(false)}
        onSelect={handleAddLocation} />
      )}

      {/* DeleteModal 호출 (deleteTarget이 있을 때만 띄움) */}
      <DeleteModal
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onDelete={handleDelete}
      />
    </aside>
  );
}
