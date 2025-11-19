import { useState } from 'react';
import type { Location } from '@/types/location';
import { SelectedLocationContext } from './contexts/selected-location-context';
import Sidebar from './components/Sidebar';
import AddLocationModal from './components/AddLocationModal';
import MainView from './components/main/main-view';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 추가된 위치 목록 (초기값 빈 배열)

  // 핀 버튼 클릭 시 고정/비고정 상태를 토글

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
      <div className="bg-blue flex">
        <Sidebar onAdd={handleAddLocation} />
        {/* 오른쪽에 메인 컨텐츠 자리 */}
        <div style={{ flex: 1 }}>sdflsj</div>
        {isModalOpen && (
          <AddLocationModal onClose={() => setIsModalOpen(false)} />
        )}
        <MainView />
      </div>
    </SelectedLocationContext>
  );
}

export default App;
