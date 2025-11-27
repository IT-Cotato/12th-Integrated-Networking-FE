import WeatherIcon from "./WeatherIcon";
import type { TodayWeather } from "../../types/weather";

// 낮/야간 판별
function getDayPeriod(): "낮" | "야간" {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6 ? "야간" : "낮";
}

// 아이콘 결정 (날씨 + 시간대 기준)
function getTodayIcon(weatherMain: string) {
  const period = getDayPeriod();
  const isNight = period === "야간";

  if (weatherMain.includes("비")) return isNight ? "Night-Rain" : "Day-Rain";
  if (weatherMain.includes("눈")) return isNight ? "Night-Snow" : "Day-Snow";
  if (weatherMain.includes("흐림") || weatherMain.includes("구름"))
    return isNight ? "Night-Clouds" : "Day-Clouds";

  return isNight ? "Night-Sun" : "Day-Sun";
}

export default function TodayWeatherPanel({ data }: { data: TodayWeather }) {
  if (!data) return null;

  const dayPeriod = getDayPeriod();
  const todayIcon = getTodayIcon(data.status);
  const pureDate = data.date.split(" ").slice(0, 2).join(" ");

  return (
    <div className="w-full p-8 bg-gray-0 rounded-2xl shadow-[0px_0px_8px_2px_rgba(0,0,0,0.10)]">
      <h2 className="text-gray-100 text-xl font-bold mb-4">
        {pureDate} {data.locationName} 날씨 현황
      </h2>
      {/* 아이콘/온도 */}
      <div className="mt-4 flex flex-col items-center gap-2.5">
        <div className="flex items-center justify-center gap-2.5">
          <WeatherIcon icon={todayIcon} size={160} />
          <p className="text-gray-60 text-7xl font-bold">
            {Number(data.temperature).toFixed(1)}°
          </p>
        </div>
        {/* 상태 */}
        <p className="text-gray-60 text-xl font-semibold">
          {dayPeriod} / {data.status}
        </p>
        {/* 상세 정보 (체감/습도/바람) */}
        <div className="flex items-center justify-center gap-2 mt-1">
          {/* 체감 */}
          <div className="flex items-center">
            <span className="text-gray-40 text-base font-medium">체감</span>
            <span className="text-gray-60 text-base font-medium">
              {data.feelsLike}°
            </span>
          </div>
          {/* 구분점 */}
          <span className="text-gray-40 text-[8px] font-medium">●</span>
          {/* 습도 */}
          <div className="flex items-center">
            <span className="text-gray-40 text-base font-medium">습도 </span>
            <span className="text-gray-60 text-base font-medium">
              {data.humidity}%
            </span>
          </div>
          {/* 구분점 */}
          <span className="text-gray-40 text-[8px] font-medium">●</span>
          {/* 바람 */}
          <div className="flex items-center">
            <span className="text-gray-40 text-base font-medium">바람 </span>
            <span className="text-gray-60 text-base font-medium">
              {data.windSpeed}m/s
            </span>
          </div>
        </div>
      </div>
      {/* 배지 영역 */}
      <div className="grid grid-cols-4 gap-4 mt-8 mx-auto max-w-[600px]">
        <Badge label="미세먼지" value={data.fineDust} color="blue" />
        <Badge label="초미세먼지" value={data.ultraFineDust} color="green" />
        <Badge label="자외선" value={data.uv} color="red" />
        <Badge label="일출" value={data.sunrise} color="yellow" />
      </div>
    </div>
  );
}

// 배지 컴포넌트
function Badge({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "blue" | "green" | "red" | "yellow";
}) {
  const bgColors = {
    blue: "bg-skyblue",
    green: "bg-mint",
    red: "bg-coral",
    yellow: "bg-lime",
  };
  const textColors = {
    blue: "text-blue",
    green: "text-green",
    red: "text-red",
    yellow: "text-yellow",
  };
  return (
    <div
      className={`${bgColors[color]} rounded-xl py-3 text-center flex flex-col items-center justify-center`}
    >
      <span className="text-color-gray-60 text-xs font-medium">{label}</span>
      <span className={`${textColors[color]} text-xs font-bold mt-1`}>
        {value}
      </span>
    </div>
  );
}
