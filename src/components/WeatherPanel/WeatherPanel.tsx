import WeatherPanelDetail from "./WeatherPanelDetail";
import WeatherPanelMain from "./WeatherPanelMain";
import { useLocationStore } from "../../stores/locationStore";

// WeatherPanel 컴포넌트
export default function WeatherPanel() {
  const selectedLocation = useLocationStore((state) =>
    state.getSelectedLocation()
  );

  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const today = `${month}월 ${date}일`;

  const locationName = selectedLocation?.name || "선택된 위치 없음";

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
