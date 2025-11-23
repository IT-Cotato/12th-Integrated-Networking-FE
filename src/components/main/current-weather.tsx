import { type CurrentWeather as CurrentWeatherType } from '@/types/weather.types';
import {
  mapWeatherIcon,
  convertPmToScore,
  convertUvToScore,
  getDate,
} from '@/utils/weather.util';
import WeatherStatItem from './weather-stat-item';
import StatusBadge from './status-badge';
import SectionContainer from './section-container';

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  location: string;
}
export default function CurrentWeather({
  current,
  location,
}: CurrentWeatherProps) {
  const iconAsset = mapWeatherIcon('n10');
  const uvScore = convertUvToScore(current.uvLevel);
  const pm10Score = convertPmToScore(current.pm10Level);
  const pm25Score = convertPmToScore(current.pm25Level);
  const date = getDate();

  const dateHeader = `${date.getMonth() + 1}월 ${date.getDate()}일 ${location} 날씨 현황`;

  return (
    <SectionContainer label={dateHeader}>
      <div className="flex w-full flex-col items-center gap-2.5 p-2.5">
        <div className="flex items-center gap-2.5">
          <img src={`/assets/${iconAsset}.svg`} className="h-40 w-40" />
          <span className="text-[80px] font-bold">{current.temperature}º</span>
        </div>
        <span className="text-xl font-semibold">
          {current.weatherDescription}
        </span>
        <div className="text-gray40 flex items-center gap-2 text-[8px] font-medium">
          <WeatherStatItem
            label="체감"
            value={current.feelsLike.toString() + 'º'}
          />
          ●
          <WeatherStatItem
            label="습도"
            value={current.humidity.toString() + '%'}
          />
          ●
          <WeatherStatItem
            label={current.windDirection}
            value={current.windSpeed.toString() + 'm/s'}
          />
        </div>
        <div className="flex gap-4">
          <StatusBadge label="미세먼지" levelValue={pm10Score} />
          <StatusBadge label="초미세먼지" levelValue={pm25Score} />
          <StatusBadge label="자외선" levelValue={uvScore} />
          <div
            className={`bg-lime text-yellow flex w-30 flex-col items-center justify-center gap-2.5 rounded-xl px-6 py-3 text-xs`}
          >
            <span className="font-medium text-black">일출</span>
            <span className="font-bold">{current.sunrise}</span>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
