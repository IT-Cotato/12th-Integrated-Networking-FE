import { formatLocalTime } from "src/utils/formatLocalTime";
import { toStatusKey } from "src/utils/weatherStatusUtils";

import { WeatherIconKey } from "@/constants/weatherIconMap";
import { WIND_DIRECTION_LABEL } from "@/constants/windDirectionMap";

import currentWeatherData from "@/mocks/todayWeather.json";

import { ColorInfoSection } from "./ColorInfoSection";
import { WeatherIconDisplay } from "./WeatherIconDisplay";

export const TodayWeather = () => {
  const data = currentWeatherData.currentWeather;
  const windDirectionCode = data.windDirection;
  const windDirection = WIND_DIRECTION_LABEL[windDirectionCode] ?? "알 수 없음";
  const sunriseTime = formatLocalTime(data.sunrise);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-3">
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center justify-center gap-[10px]">
          <WeatherIconDisplay weather={data.weather as WeatherIconKey} />
          <div className="text-h1 text-gray-60">{data.temperature}º</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <p className="text-gray-40 text-lab-sm">체감</p>
            <p className="text-gray-60 text-lab-sm">{data.feelsLike}º</p>
          </div>
          <div className="text-cap-xs text-gray-40">●</div>
          <div className="flex gap-1">
            <p className="text-gray-40 text-lab-sm">습도</p>
            <p className="text-gray-60 text-lab-sm">{data.humidity}%</p>
          </div>
          <div className="text-cap-xs text-gray-40">●</div>
          <div className="flex gap-1">
            <p className="text-gray-40 text-lab-sm">{windDirection}풍</p>
            <p className="text-gray-60 text-lab-sm">{data.windSpeed}m/s</p>
          </div>
        </div>
        {/* TBD: 야간 / 흐림 야간정보 주는 거에 따라서 추가할 것 */}
      </div>

      <div className="flex gap-4 py-3">
        <ColorInfoSection
          label="미세먼지"
          status={toStatusKey(data.fineDust)}
        />
        <ColorInfoSection
          label="초미세먼지"
          status={toStatusKey(data.ultraFineDust)}
        />
        <ColorInfoSection label="자외선" status={toStatusKey(data.uvIndex)} />
        <ColorInfoSection
          label="일출"
          status={sunriseTime}
          bgColor="bg-lime"
          textColor="text-yellow"
          useStatusColor={false}
        />
      </div>
    </section>
  );
};
