import WeatherPanelMain from "./WeatherPanelMain";

// WeatherPanel 컴포넌트
export default function WeatherPanel() {
  return (
    <>
      <div
        className="
        w-[1080px] h-[328px] max-w-full 
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
          4월 8일 롯데월드 날씨 현황
        </div>
        <WeatherPanelMain />
      </div>
    </>
  );
}
