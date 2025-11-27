import type { WeeklyWeather } from '@/types/weather.types';
import { getDayLabel, mapWeatherIcon } from '@/utils/weather.util';
import PoPText from './pop-text';

interface DailyWeatherProps {
  data: WeeklyWeather;
}

export default function DailyWeather({ data }: DailyWeatherProps) {
  const morningIcon = mapWeatherIcon(data.morningIcon);
  const eveningIcon = mapWeatherIcon(data.eveningIcon);
  const minTemp = Number(data.min.toFixed(1));
  const maxTemp = Number(data.max.toFixed(1));
  const dayLabel = getDayLabel(data.date);

  return (
    <div className="flex w-[140px] flex-col items-center gap-2 rounded-2xl border-2 p-2 md:w-[200px]">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center">
            <span>오전</span>{' '}
            <img src={`${morningIcon}`} width={60} height={60} />
          </div>

          <PoPText PoP={data.morningPop.toString()} />
          <span className="font-bold">최저</span>
          <span className="text-blue font-bold">{minTemp}º</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center">
            <span>오후</span>
            <img src={`${eveningIcon}`} width={60} height={60} />
          </div>
          <PoPText PoP={data.morningPop.toString()} />
          <span className="font-bold">최고</span>
          <span className="text-red font-bold">{maxTemp}º</span>
        </div>
      </div>
      <div className="flex flex-col items-center font-medium">
        <span>{data.date}</span>
        <span>{dayLabel}</span>
      </div>
    </div>
  );
}
