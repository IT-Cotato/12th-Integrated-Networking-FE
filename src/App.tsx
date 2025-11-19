import { useState } from 'react';
import type { Location } from '@/types/location';
import { SelectedLocationContext } from './contexts/selected-location-context';
import Sidebar from './components/Sidebar';
import MainView from './components/main/main-view';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  return (
    <SelectedLocationContext
      value={{
        selectedLocation: selectedLocation,
        selectLocation: setSelectedLocation,
      }}
    >
      {/* <div className="bg-blue"> sdflsj</div> */}
      <div className="bg-gray5 flex">
        <Sidebar />

        {selectedLocation != null ? (
          <MainView />
        ) : (
          <main className="flex w-full items-center justify-center">
            <p className="text-7xl text-black">
              사이드바에서 장소를 선택해주세요.
            </p>
          </main>
        )}
      </div>
    </SelectedLocationContext>
  );
}

export default App;
