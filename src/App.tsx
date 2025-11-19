import { useState } from 'react';
import type { Location } from '@/types/location';
import { SelectedLocationContext } from './contexts/selected-location-context';
import Sidebar from './components/Sidebar'
import AddLocationModal from './components/AddLocationModal';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 추가된 위치 목록 (초기값 빈 배열)
  const [locations, setLocations] = useState<Location[]>([
  { id: '1', name: '강남역 1번 출구', address: '', x: '', y: '', isFixed: true },
  { id: '2', name: 'RATTHAT', address: '', x: '', y: '', isFixed: false  },
  { id: '3', name: '파이홀', address: '', x: '', y: '', isFixed: false  },
  { id: '4', name: '청수당공명', address: '', x: '', y: '', isFixed: false  },
  { id: '5', name: '롯데월드', address: '', x: '', y: '', isFixed: false  },
  { id: '6', name: '구관', address: '', x: '', y: '', isFixed: false  },
  { id: '7', name: 'Osiu', address: '', x: '', y: '', isFixed: false  },
]);

// 핀 버튼 클릭 시 고정/비고정 상태를 토글
  const handleTogglePin = (id: string) => {
    setLocations(locs =>
      locs.map(loc =>
        loc.id === id ? { ...loc, isFixed: !loc.isFixed } : loc
      )
    );
  };

  // 위치 추가 버튼 클릭 handler 
  const handleAddLocation = () => setIsModalOpen(true);

  return (
    <SelectedLocationContext
      value={{
        selectedLocation: selectedLocation,
        selectLocation: setSelectedLocation,
      }}
    >
      {/* <div className="bg-blue"> sdflsj</div> */}
      <div className="bg-blue" style={{ display: 'flex' }}>
        <Sidebar 
          locations={locations}
          onTogglePin={handleTogglePin}
          onAdd={handleAddLocation}
        />
        {/* 오른쪽에 메인 컨텐츠 자리 */}
        <div style={{ flex: 1 }}>sdflsj</div>
        {isModalOpen && (
          <AddLocationModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </SelectedLocationContext>
  );
}

export default App;
