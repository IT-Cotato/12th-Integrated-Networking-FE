import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar"; // 경로 유지
import WeatherPanel from "./components/WeatherPanel/WeatherPanel"; // 경로 유지
import { useLocationStore } from "./stores/locationStore"; // 경로 유지

export default function App() {
  const selectedLocation = useLocationStore((state) =>
    state.getSelectedLocation()
  );
  const isLocationSelected = selectedLocation !== null;
  return (
    <div className="App flex">
      <Sidebar />
      <main className="flex-grow p-8">
        {isLocationSelected ? (
          <>
            <WeatherPanel />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full pt-20">
            <img
              src="/Day Clouds.svg"
              alt="선택된 위치 없음"
              className="w-[320px] h-[320px] mb-6"
            />
            <div className="font-bold text-[36px] text-gray-700">
              아직 선택된 위치가 없습니다!
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
