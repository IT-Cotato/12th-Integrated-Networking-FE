import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import WeatherPanel from "./components/WeatherPanel/WeatherPanel";
import { useLocationStore } from "./stores/locationStore";
import { HourlyForecast } from "./components/HourlyForecast/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";

export default function App() {
  const selectedLocation = useLocationStore((state) =>
    state.getSelectedLocation()
  );
  const isLocationSelected = selectedLocation !== null;
  return (
    <div className="App flex">
      <Sidebar />
      <main className="flex-grow p-8 flex flex-col gap-3">
        {isLocationSelected ? (
          <>
            <WeatherPanel />
            <HourlyForecast />
            <WeeklyForecast />
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
