import { useEffect } from "react";
import WeatherPanelDetail from "./WeatherPanelDetail";
import WeatherPanelMain from "./WeatherPanelMain";
interface LocationData {
  id: string;
  name: string;
  lat: number;
  lon: number;
}
interface WeatherPanelProps {
  onLocationSelect: (locationData: LocationData) => void;
}
// WeatherPanel 컴포넌트
export default function WeatherPanel({ onLocationSelect }: WeatherPanelProps) {
  const TEMP_LOCATION_DATA: LocationData = {
    id: "LotteWorld_1",
    name: "롯데월드", // {location.name}으로 사용될 부분
    lat: 37.5113, // 위도
    lon: 127.0984, // 경도
  };

  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const today = `${month}월 ${date}일`;

  useEffect(() => {
    if (onLocationSelect) {
      onLocationSelect(TEMP_LOCATION_DATA);
    }
  }, []);
  const locationName = TEMP_LOCATION_DATA.name;

  return (
    <>
      <div
        className="
        w-[1080px] h-[441px] max-w-full 
        p-6 
        border-gray-100
        rounded-2xl 
        shadow-lg
        mx-auto 
        bg-white
        flex flex-col
      "
      >
        <div className="font-bold text-[20px] text-left">
          {today} {locationName} 날씨 현황
        </div>
        <div className="justify-center items-center">
          <WeatherPanelMain />
          <WeatherPanelDetail />
        </div>
      </div>
    </>
  );
}
