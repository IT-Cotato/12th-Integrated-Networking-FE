import { useContext, useState, useEffect } from 'react';
import type { Location } from '@/types/location';
import { SelectedLocationContext } from '@/contexts/selected-location-context';
import AddLocationModal from './AddLocationModal';
import DeleteModal from './DeleteModal';
import { createPortal } from 'react-dom';
import { fetchLocation, fetchLocations, deleteLocation, createLocation } from '@/api/location';

export default function Sidebar() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [pinnedReady, setPinnedReady] = useState(false);

  useEffect(() => {
  const saved = window.localStorage.getItem('pinned-location-ids');
  if (saved) {
    setPinnedIds(JSON.parse(saved));
  }
  setPinnedReady(true); // 읽기 끝났다고 표시
}, []);

  const userId = 1;

  useEffect(() => {
  if (!pinnedReady) return;

    const load = async () => {
      try {
        const data = await fetchLocations(userId);

        // API 모델 
        const mapped: Location[] = data.map((item) => ({
          id: String(item.id),
          name: item.name,
          address: '',        
          x: String(item.longitude),
          y: String(item.latitude),
          isFixed: pinnedIds.includes(String(item.id)),   
        }));

        const sorted = [...mapped].sort((a,b) =>{
          if(a.isFixed === b.isFixed) return a.name.localeCompare(b.name);
          return a.isFixed? -1:1;
        });
        setLocations(sorted);
      } catch (e) {
        console.error(e);
      }
    };

    load();
  }, [userId, pinnedReady, pinnedIds]);

  const handleAddLocation = async (place: {
    id: string;
    place_name: string;
    address_name: string;
    x: string; // longitude
    y: string; // latitude
  }) => {
    try {
    const created = await createLocation(userId, {
      name: place.place_name,
      latitude: Number(place.y),
      longitude: Number(place.x),
    });
    
    setLocations((prev) => [
      ...prev,
      {
        id: String(created.id),
        name: created.name,
        address: place.address_name,
        x: String(created.longitude),
        y: String(created.latitude),
        isFixed: false,
      },
    ]);

    setIsModalOpen(false);
    } catch(e){
      console.error(e);
    }
  };

  //위치 단건 조회
  const handleSelectLocation = async (id: string) => {
  try {
    const detail = await fetchLocation(userId, Number(id));
    selectLocation({
      id: String(detail.id),
      name: detail.name,
      address: '',
      x: String(detail.longitude),
      y: String(detail.latitude),
      isFixed: false,
    });
  } catch (e) {
    console.error(e);
  }
};

  useEffect(() => {
    window.localStorage.setItem('pinned-location-ids', JSON.stringify(pinnedIds));
  }, [pinnedIds]);

  // 핀 버튼 클릭 시 고정/비고정 상태를 토글
  const handleTogglePin = (id: string) => {
  setLocations((locs) => {
    const updated = locs.map((loc) =>
      loc.id === id ? { ...loc, isFixed: !loc.isFixed } : loc
    );

  const sorted = [...updated].sort((a, b) => {
      if (a.isFixed === b.isFixed) return a.name.localeCompare(b.name);
      return a.isFixed ? -1 : 1;
    });

  return sorted;
});
  setPinnedIds((prev) =>
    prev.includes(id) ? prev.filter((x) => x!== id) : [...prev,id])
};

  // useContext 훅은 컴포넌트 함수 안에서 실행!
  const ctx = useContext(SelectedLocationContext);

  // context 값이 undefined일 수 있으니 방어 코드
  if (!ctx) throw new Error('SelectedLocationContext not found!');
  const { selectedLocation, selectLocation } = ctx;

  const [hovered, setHovered] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Location | null>(null);

  const handleDelete = async () => {
  if (!deleteTarget) return;
  try {
    await deleteLocation(userId, Number(deleteTarget.id));
    setLocations(prev => prev.filter(loc => loc.id !== deleteTarget.id));
    setDeleteTarget(null);
  } catch (e) {
    console.error(e);
  }
};

  return (
    <aside className="sticky top-0 flex h-screen w-[248px] flex-col items-start gap-10 rounded-r-[48px] bg-white px-4 pt-12 pb-12 shadow-[2px_0_4px_0_rgba(0,0,0,0.1)]">
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
        onClick={() => setIsModalOpen(true)}
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
              onClick={() => handleSelectLocation(loc.id)}
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
              <span className="truncate w-[248px] bloc flex-1 text-[16px] leading-5 font-medium">
                {loc.name}
              </span>
              {/* hover 시 trash 노출 */}
              {hovered === loc.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
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
      {isModalOpen &&
        createPortal(
          <AddLocationModal
            onClose={() => setIsModalOpen(false)}
            onSelect={handleAddLocation}
          />,
          document.body,
        )}

      {/* DeleteModal 호출 (deleteTarget이 있을 때만 띄움) */}
      {createPortal(
        <DeleteModal
          open={!!deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onDelete={handleDelete}
        />,
        document.body,
      )}
    </aside>
  );
}
