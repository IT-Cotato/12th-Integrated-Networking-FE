import { getWeatherIconAM, getWeatherIconPM } from "../../utils/weatherUtils";

interface DailyForecastProps {
  //
  amWeather: string;
  pmWeather: string;
  amRain: number;
  pmRain: number;
  amTemp: number;
  pmTemp: number;
  date: string;
  day: string;
}

export default function DailyForecast({
  amWeather,
  pmWeather,
  amRain,
  pmRain,
  amTemp,
  pmTemp,
  date,
  day,
}: DailyForecastProps) {
  return (
    <>
      <div className="flex flex-col items-center w-34 h-55 pt-5 pb-5">
        <div className="w-34 h-[174px] flex justify-center items-start space-x-2">
          <div className="flex flex-col items-center w-[60px] h-[174px] gap-2 pt-2 pb-2">
            <img src={getWeatherIconAM(amWeather)} className="w-15 h-15" />
            <div className="font-extrabold text-[20px] text-blue-200">
              {amRain}%
            </div>
            <div className="font-extrabold text-[16px]">오전</div>
            <div className="text-[16px] font-extrabold text-blue-400">
              {amTemp}º
            </div>
          </div>

          <div className="flex flex-col items-center w-[60px] h-[174px] gap-2 pt-2 pb-2">
            <img src={getWeatherIconPM(pmWeather)} className="w-15 h-15" />
            <div className="font-extrabold text-[20px] text-blue-200">
              {pmRain}%
            </div>
            <div className="font-extrabold text-[16px]">오후</div>
            <div className="text-[16px] font-extrabold text-red-400">
              {pmTemp}º
            </div>
          </div>
        </div>
        <div className="items-center h-[38px] pt-3 pb-3">
          <div className="font-semibold text-[16px]">{day}</div>
          <div className="font-semibold text-[16px]">{date}</div>
        </div>
      </div>
    </>
  );
}
