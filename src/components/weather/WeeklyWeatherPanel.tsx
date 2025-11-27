import WeatherIcon from "./WeatherIcon";
import type { WeeklyWeather } from "../../types/weather";

type Props = { data: WeeklyWeather[] };

export default function WeeklyWeatherPanel({ data }: Props) {
  return (
    <div className="w-full p-6 bg-gray-0 rounded-2xl shadow-[0_0_8px_2px_rgba(0,0,0,0.10)] mt-6">
      <h2 className="text-gray-100 text-xl font-bold mb-4">주간 예보</h2>
      <div className="flex justify-between">
        {data.map((w, idx) => (
          <div key={idx} className="flex flex-col items-center px-4 py-2">
            {/* 아이콘 */}
            <div className="flex items-center gap-4 mb-2">
              <WeatherIcon icon={w.amIcon} size={50} />
              <WeatherIcon icon={w.pmIcon} size={50} />
            </div>
            {/* 강수 확률 */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-8">
                <span className="text-skyblue text-xl font-bold">
                  {w.amRain}%
                </span>
                <span className="text-skyblue text-xl font-bold">
                  {w.pmRain}%
                </span>
              </div>
              {/* 오전/오후 */}
              <div className="flex gap-10 text-gray-60 text-base font-bold mt-1">
                <span>오전</span>
                <span>오후</span>
              </div>
              {/* 온도 */}
              <div className="flex gap-9 mt-1">
                <span className="text-blue text-base font-bold">
                  {w.amTemp}°
                </span>
                <span className="text-red text-base font-bold">
                  {w.pmTemp}°
                </span>
              </div>
            </div>
            {/* 날짜 */}
            <div className="flex flex-col items-center mt-2 leading-tight text-center">
              <p className="text-gray-60 text-base font-medium whitespace-pre-line">
                {w.date.split("\n")[0]}
              </p>
              <p className="text-gray-60 text-base font-medium whitespace-pre-line">
                {w.date.split("\n")[1]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
