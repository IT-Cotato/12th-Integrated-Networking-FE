import { getWeatherIconAM, getWeatherIconPM } from "../../utils/weatherUtils";

export default function WeatherPanelMain() {
  return (
    <>
      <div className="">
        <img src={getWeatherIconAM("Windy")} className="w-40 h-40" />
        <div className="font-extrabold text-[80px]">12.2º</div>
      </div>
      <div className="font-bold text-[20px]">야간 / 흐림</div>
    </>
  );
}
