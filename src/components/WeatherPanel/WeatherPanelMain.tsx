import {
  getWeatherIconAM,
  getWeatherIconPM,
  getTimePeriod,
} from "../../utils/weatherUtils";
import useWeather from "../../hooks/useWeather";

export default function WeatherPanelMain() {
  const { data, loading, error } = useWeather();

  const currentTime = new Date().getHours();
  const time = getTimePeriod(currentTime);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        날씨 정보를 불러오는 중입니다...
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-10 text-center text-lg text-red-500">
        날씨 정보를 불러오는데 실패했습니다: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        표시할 날씨 데이터가 없습니다.
      </div>
    );
  }

  const iconSrc =
    time === "야간" || time === "오후"
      ? getWeatherIconPM(data.description)
      : getWeatherIconAM(data.description);

  return (
    <>
      <div className="flex justify-center items-center pt-6">
        <img src={iconSrc} alt={data.description} className="w-40 h-40" />
        <div className="font-extrabold text-[80px]">{data.temperature}º</div>
      </div>
      <div className="font-bold text-[20px]">
        {time} / {data.description}
      </div>

      <div className="flex justify-center items-center font-medium text-[16px] text-gray-400 gap-1 pt-1 pb-4">
        체감 <span className="text-gray-950">{data.feelTemperature}º</span>
        <span className="font-medium text-gray-400 text-[8px]">●</span>
        습도 <span className="text-gray-950">{data.humidity}%</span>
        <span className="font-medium text-gray-400 text-[8px]">●</span>
        {data.windDirection}{" "}
        <span className="text-gray-950">{data.windSpeed}m/s</span>
      </div>
    </>
  );
}
