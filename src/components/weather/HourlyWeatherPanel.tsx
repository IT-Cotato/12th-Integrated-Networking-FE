import type { HourlyWeather } from "../../types/weather";
import WeatherIcon from "./WeatherIcon";

// 온도 범위
const MIN_TEMP = -10;
const MAX_TEMP = 35;

export default function HourlyWeatherPanel({
  list,
}: {
  list: HourlyWeather[];
}) {
  // 점 위치: Y축 위치 계산
  const getY = (temp: number) => {
    const ratio = (temp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP);
    // 그래프 내에서만 이동하도록
    return 70 - ratio * 65;
  };

  return (
    <div className="w-full p-6 bg-gray-0 rounded-2xl shadow-[0px_0px_8px_2px_rgba(0,0,0,0.10)] flex flex-col gap-0 overflow-hidden">
      <h2 className="text-gray-100 text-xl font-bold mb-4">시간별 현황</h2>
      {/* 스크롤 영역 */}
      <div className="w-full overflow-x-auto scrollbar-hide px-6 py-3 relative">
        <div className="relative flex gap-12 min-w-max py-1.5">
          {/* 그래프 */}
          <svg className="absolute top-0 left-0 w-full h-[80px] pointer-events-none">
            <polyline
              fill="none"
              stroke="var(--color-gray-20)"
              strokeWidth="2"
              strokeLinecap="round"
              points={list
                .map((h, i) => {
                  const x = i * 88 + 20;
                  const y = getY(h.temp);
                  return `${x},${y}`;
                })
                .join(" ")}
            />
            {/* 점 */}
            {list.map((h, i) => {
              const x = i * 88 + 20;
              const y = getY(h.temp);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="var(--color-gray-20)"
                />
              );
            })}
          </svg>
          {/* 메인 영역 */}
          {list.map((hour, i) => (
            <div
              key={i}
              className="inline-flex flex-col justify-start items-center gap-2"
            >
              {/* 여백 */}
              <div className="h-[70px] w-full"></div>
              {/* 아이콘 */}
              <div className="w-10 h-10 relative">
                <WeatherIcon icon={hour.icon} size={40} />
              </div>
              {/* 시간 */}
              <div className="text-gray-40 text-xs font-normal font-['Pretendard']">
                {hour.time}
              </div>
              {/* 온도 */}
              <div className="text-gray-60 text-xs font-semibold font-['Pretendard']">
                {hour.temp}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
