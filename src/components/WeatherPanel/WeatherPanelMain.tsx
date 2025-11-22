import {
  getWeatherIconAM,
  getWeatherIconPM,
  getTimePeriod,
} from "../../utils/weatherUtils";
import useWeather from "../../hooks/useWeather";

export default function WeatherPanelMain() {
  const currentTime = new Date().getHours();
  const time = getTimePeriod(currentTime);

  const { weather, handleUpdate } = useWeather();
  //업데이트 미구현

  const iconSrc =
    time === "야간" || time === "오후"
      ? getWeatherIconPM(weather.description)
      : getWeatherIconAM(weather.description);

  return (
    <>
      <div className="flex justify-center items-center pt-6">
        <img src={iconSrc} className="w-40 h-40" />
        <div className="font-extrabold text-[80px]">{weather.temperature}º</div>
      </div>
      <div className="font-bold text-[20px]">
        {time} / {weather.description}
      </div>

      <div className="flex justify-center items-center font-medium text-[16px] text-gray-400 gap-1 pt-1 pb-4">
        체감 <span className="text-gray-950">{weather.feelTemperature}º</span>
        <span className="font-medium text-gray-400 text-[8px]">●</span>
        습도 <span className="text-gray-950">{weather.humidity}%</span>
        <span className="font-medium text-gray-400 text-[8px]">●</span>
        {weather.windDirection}{" "}
        <span className="text-gray-950">{weather.windSpeed}m/s</span>
      </div>
    </>
  );
}
