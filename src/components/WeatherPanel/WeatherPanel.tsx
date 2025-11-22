import { useState } from "react";
import WeatherPanelDetail from "./WeatherPanelDetail";
import WeatherPanelMain from "./WeatherPanelMain";

// WeatherPanel 컴포넌트
export default function WeatherPanel() {
  const [location, setLocation] = useState("롯데월드");
  // //임시로. 이후 위치 불러오도록 설정
  // const handleLocation = () => {
  //   setLocation("롯데월드");
  // };

  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const today = `${month}월 ${date}일`;

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
          {today} {location} 날씨 현황
        </div>
        <div className="justify-center items-center">
          <WeatherPanelMain />
          <WeatherPanelDetail />
        </div>
      </div>
    </>
  );
}
