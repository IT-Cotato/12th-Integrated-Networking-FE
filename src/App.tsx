import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import WeatherPanel from "./components/WeatherPanel/WeatherPanel";
interface LocationData {
  id: string;
  name: string;
  lat: number;
  lon: number;
}
export default function App() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const handleLocationSelect = (locationData: LocationData) => {
    setLocation(locationData);
  };

  const [isShow, setIsShow] = useState(true);

  return (
    <div className="App">
      <div className="bg-[#F6F6F6]">
        <Sidebar />
      </div>
      {isShow ? (
        <>
          <WeatherPanel onLocationSelect={handleLocationSelect} />
          {/* <HourlyForecast location={location} />
          <WeeklyForecast location={location} />{" "} */}
        </>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <img src="/Day Clouds.svg" className="w-[320px] h-[320px]" />
            <div className="font-bold text-[36px]">
              아직 선택된 위치가 없습니다!
            </div>
          </div>
        </>
      )}
    </div>
  );
}
