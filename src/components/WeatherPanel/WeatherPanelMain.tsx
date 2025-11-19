import { getWeatherIconAM, getWeatherIconPM } from "../../utils/weatherUtils";

export default function WeatherPanelMain() {
  return (
    <>
      <div className="flex justify-center items-center pt-6">
        <img src={getWeatherIconAM("Storm")} className="w-40 h-40" />
        <div className="font-extrabold text-[80px]">12.2º</div>
      </div>
      <div className="font-bold text-[20px]">야간 / 흐림</div>

      <div className="flex justify-center items-center font-medium text-[16px] text-gray-400 gap-1 pt-1 pb-4">
        체감 <span className="text-gray-950">9.0º</span>
        <span className="font-medium text-gray-400 text-[8px]">●</span>
        습도 <span className="text-gray-950">48%</span>
        <span className="font-medium text-gray-400 text-[8px]">●</span>
        남동풍 <span className="text-gray-950">0.4m/s</span>
      </div>
    </>
  );
}
