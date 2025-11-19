import type { CurrentWeather as CurrentWeatherType } from '@/types/weather.types';
import {
  convertKelvinToCelsius,
  mapWeatherText,
  mapWeatherIcon,
  getWindDirectionText,
  getUvLevel,
  getPm10Level,
  getPm25Level,
} from '@/utils/weather.util';
import WeatherStatItem from './weather-stat-item';
import StatusBadge from './status-badge';
import type { AirQualityItem } from '@/types/air-quality.types';

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  air: AirQualityItem;
}
export default function CurrentWeather({ current, air }: CurrentWeatherProps) {
  const currentTemperature = convertKelvinToCelsius(current.temp);
  const feelslikeTemperature = convertKelvinToCelsius(current.feels_like);
  const iconAsset = mapWeatherIcon(current.weather[0].icon);
  const humidity = current.humidity;
  const weatherText = mapWeatherText(current.weather[0].icon);
  const windDirection = getWindDirectionText(current.wind_deg);
  const windSpeed = current.wind_speed;
  const uvLevel = getUvLevel(current.uvi);
  const pm10Level = getPm10Level(air.components.pm10);
  const pm25Level = getPm25Level(air.components.pm2_5);

  return (
    <div className="flex w-full flex-col items-center gap-2.5 p-2.5">
      <div className="flex items-center gap-2.5">
        <img src={`/assets/${iconAsset}.svg`} className="h-40 w-40" />
        <span className="text-[80px] font-bold">{currentTemperature}º</span>
      </div>
      <span className="text-xl font-semibold">{weatherText}</span>
      <div className="flex items-center gap-2">
        <WeatherStatItem label="체감" value={feelslikeTemperature.toString()} />
        <WeatherStatItem label="습도" value={humidity.toString()} />
        <WeatherStatItem
          label={windDirection}
          value={windSpeed.toString() + 'm/s'}
        />
      </div>
      <div className="flex gap-4">
        <StatusBadge label="미세먼지" levelValue={pm10Level} />
        <StatusBadge label="초미세먼지" levelValue={pm25Level} />
        <StatusBadge label="자외선" levelValue={uvLevel} />
      </div>
    </div>
  );
}
