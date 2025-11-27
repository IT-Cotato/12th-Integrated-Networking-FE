import { type CurrentWeather as CurrentWeatherType } from '@/types/weather.types';
import {
  mapWeatherIcon,
  convertPmToScore,
  convertUvToScore,
  getDate,
  mapWeatherText,
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
  const iconAsset = mapWeatherIcon(current.weatherIcon);
  const uvScore = convertUvToScore(current.uvLevel);
  const pm10Score = convertPmToScore(current.pm10Level);
  const pm25Score = convertPmToScore(current.pm25Level);
  const weatherText = mapWeatherText(current.weatherIcon);
  const date = getDate();

  const dateHeader = `${date.getMonth() + 1}월 ${date.getDate()}일 ${location} 날씨 현황`;

  return (
    <SectionContainer label={dateHeader}>
      <div className="flex w-full flex-col items-center gap-4 p-4 md:gap-6 md:p-6">
        {/* 1. 상단: 아이콘 및 온도 */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          {/* 모바일: h-28, 데스크탑: h-40 */}
          <img
            src={`${iconAsset}`}
            className="h-28 w-28 object-contain md:h-40 md:w-40"
            alt="날씨 아이콘"
          />
          {/* 모바일: text-6xl, 데스크탑: text-[80px] */}
          <span className="text-6xl font-bold md:text-[80px]">
            {Number(current.temperature.toFixed(1))}º
          </span>
        </div>

        {/* 2. 날씨 설명 */}
        <span className="text-lg font-semibold md:text-xl">{weatherText}</span>

        {/* 3. 상세 스탯 (체감, 습도, 풍향) */}
        {/* 모바일: text-xs, 데스크탑: text-sm (기존 text-[8px]는 너무 작아서 키웠습니다) */}
        <div className="text-gray40 flex items-center gap-3 text-xs font-medium md:text-sm">
          <WeatherStatItem
            label="체감"
            value={current.feelsLike.toString() + 'º'}
          />
          <span>●</span>
          <WeatherStatItem
            label="습도"
            value={current.humidity.toString() + '%'}
          />
          <span>●</span>
          <WeatherStatItem
            label={current.windDirection}
            value={current.windSpeed.toString() + 'm/s'}
          />
        </div>

        {/* 4. 하단 뱃지 영역 */}
        {/* 모바일: 2열 그리드 (공간 효율), 태블릿 이상: Flex 가로 배치 */}
        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:justify-center md:gap-4">
          <StatusBadge
            label="미세먼지"
            levelValue={pm10Score}
            textValue={current.pm10Level}
          />
          <StatusBadge
            label="초미세먼지"
            levelValue={pm25Score}
            textValue={current.pm25Level}
          />
          <StatusBadge
            label="자외선"
            levelValue={uvScore}
            textValue={current.uvLevel}
          />

          {/* 일출 뱃지 (커스텀 스타일) */}
          {/* sm:w-auto로 설정하여 데스크탑에서는 내용물 크기만큼만 차지하게 함 */}
          <div className="bg-lime text-yellow flex w-30 flex-col items-center justify-center gap-1 rounded-xl px-4 py-3 text-xs shadow-sm md:gap-2.5 md:px-6">
            <span className="font-medium text-black">일출</span>
            <span className="font-bold">{current.sunrise}</span>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
