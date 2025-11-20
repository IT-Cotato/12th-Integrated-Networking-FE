import type { WeatherInfo } from "../types/Weather";
import {
  FineDustColor,
  TextFineDustColor,
  TextUltraFineDustColor,
  TextUvIndexColor,
  UltraFineDustColor,
  UvIndexColor,
} from "../utils/ColorMap";
import { WeatherIconMap } from "../utils/WeatherIconMap";

interface MainWeatherPanelProps {
  selectedWeather: WeatherInfo | null;
}

export default function MainWeatherPanel({
  selectedWeather,
}: MainWeatherPanelProps) {
  if (!selectedWeather) {
    const testWeather: WeatherInfo = {
      location: "롯데월드",
      date: "4월 26일",
      temperature: 12.2,
      feelsLike: 9.0,
      humidity: 48,
      windDirection: "남동풍",
      windSpeed: 0.4,
      status: "흐림",
      isDaytime: false,
      fineDust: 5,
      ultraFineDust: 30,
      uvIndex: 12,
      sunrise: "05:44",
      sunset: "18:45", // 일출 일몰 이렇게 되는거일까?
    };

    return (
      <div className="p-6">
        <MainWeatherPanel selectedWeather={testWeather} />
      </div>
    );
  }

  // return (
  //   <div className="flex items-center justify-center h-64 rounded-xl bg-gray-100 text-gray-500">
  //     위치를 선택하면 날씨 정보를 볼 수 있어요
  //   </div>
  // );

  // 등급 변환 함수
  const getFineDustLevel = (value: number) => {
    if (value <= 30) return "좋음";
    if (value <= 80) return "보통";
    if (value <= 150) return "나쁨";
    return "매우나쁨";
  };

  const getUltraFineDustLevel = (value: number) => {
    if (value <= 15) return "좋음";
    if (value <= 35) return "보통";
    if (value <= 75) return "나쁨";
    return "매우나쁨";
  };

  const getUVLevel = (uv: number) => {
    if (uv < 3) return "낮음";
    if (uv < 6) return "보통";
    if (uv < 8) return "높음";
    if (uv < 11) return "매우 높음";
    return "위험";
  };

  const icon = selectedWeather.isDaytime
    ? WeatherIconMap[selectedWeather.status].day
    : WeatherIconMap[selectedWeather.status].night;

  return (
    <div className="w-full flex justify-center">
      <div
        className="
    w-[1080px] h-[441px]
    p-8
    bg-white
    rounded-[16px]
    border-2 border-[#F2F2F2]
    shadow-[0px_0px_8px_2px_rgba(0,0,0,0.1)]
    flex flex-col gap-[12px]
  "
      >
        {/* 위치 + 날짜 */}
        <div
          className="
  h-[24px]
  text-black
  font-bold
  text-[20px]

"
        >
          {selectedWeather.date} {selectedWeather.location} 날씨 현황
        </div>

        {/* 온도 + 아이콘 */}
        <div className="gap-[10px] flex items-center justify-center">
          <img src={icon} className="w-[160px] h-[160px]" />
          <div className=" w-[190px]  h-[95px] text-[80px] font-bold flex items-center justify-center">
            {selectedWeather.temperature}°
          </div>
        </div>

        {/* 날씨 상태 */}
        <div className="text-black text-[20px] font-semibold mt-2 flex justify-center">
          {selectedWeather.isDaytime ? "낮" : "야간"} / {selectedWeather.status}
        </div>

        {/* 상세 정보 */}
        <div className="mt-4 text-[16px] text-gray-600 flex items-center gap-[8px] flex justify-center">
          <p className="flex items-center">
            <span className="text-gray-400">체감:</span>
            <span className="ml-[6px] text-[#000000] font-semibold">
              {selectedWeather.feelsLike}°
            </span>
          </p>

          <p
            className="
    text-[8px] font-medium
    text-[#A4A4A4]
    flex items-center
  "
          >
            ●
          </p>
          <p className="flex items-center">
            <span className="text-gray-400">습도:</span>
            <span className="ml-[6px] text-[#000000] font-semibold">
              {selectedWeather.humidity}%
            </span>
          </p>
          <p
            className="
    text-[8px] font-medium
    text-[#A4A4A4]
    flex items-center
  "
          >
            ●
          </p>
          <p className="flex items-center">
            <span className="text-gray-400">
              {selectedWeather.windDirection}
            </span>
            <span className="ml-[6px] text-[#000000] font-semibold">
              {selectedWeather.windSpeed} m/s
            </span>
          </p>
        </div>

        {/* 미세먼지 */}
        <div className="mt-5 flex gap-4 flex justify-center">
          <div
            className={`
    w-[120px] h-[62px]
    pt-3 pr-6 pb-3 pl-6
    rounded-[12px]
    flex flex-col items-center justify-center
    ${FineDustColor(selectedWeather.fineDust)} relative group
  `}
          >
            <span className="text-[12px] leading-none font-medium">
              미세먼지
            </span>
            <span
              className={`text-[12px] leading-none mt-2 font-bold ${TextFineDustColor(
                selectedWeather.fineDust
              )}`}
            >
              {getFineDustLevel(selectedWeather.fineDust)}
            </span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {selectedWeather.fineDust} μg/m³
            </span>
          </div>
          <div
            className={`
    w-[120px] h-[62px]
    pt-3 pr-6 pb-3 pl-6
    rounded-[12px]
    flex flex-col items-center justify-center
    ${UltraFineDustColor(selectedWeather.ultraFineDust)} relative group
  `}
          >
            <span className="text-[12px] leading-none font-medium">
              초미세먼지
            </span>
            <span
              className={`text-[12px] leading-none mt-2 font-bold ${TextUltraFineDustColor(
                selectedWeather.ultraFineDust
              )}`}
            >
              {getUltraFineDustLevel(selectedWeather.ultraFineDust)}
            </span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {selectedWeather.ultraFineDust} μg/m³
            </span>
          </div>
          <div
            className={`
    w-[120px] h-[62px]
    pt-3 pr-6 pb-3 pl-6
    rounded-[12px]
    flex flex-col items-center justify-center
    ${UvIndexColor(selectedWeather.uvIndex)} relative group
  `}
          >
            <span className="text-[12px] leading-none font-medium">자외선</span>
            <span
              className={`text-[12px] leading-none mt-2 font-bold ${TextUvIndexColor(
                selectedWeather.uvIndex
              )}`}
            >
              {getUVLevel(selectedWeather.uvIndex)}
            </span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {selectedWeather.uvIndex}
            </span>
          </div>
          <div
            className={
              "w-[120px] h-[62px] pt-3 pr-6 pb-3 pl-6  bg-lime-100 rounded-[12px] flex flex-col items-center justify-center"
            }
          >
            <span className="text-[12px] leading-none font-medium">일출</span>
            <span className="text-[12px] leading-none mt-2 font-bold text-yellow-400">
              {selectedWeather.sunrise}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
