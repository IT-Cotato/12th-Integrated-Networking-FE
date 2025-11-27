import { formatLocalTime } from "src/utils/formatLocalTime";
import { toStatusKey } from "src/utils/weatherStatusUtils";

import { WIND_DIRECTION_LABEL } from "@/constants/windDirectionMap";

import currentWeatherData from "@/mocks/todayWeather.json";

import { getWeatherIconKey } from "@/utils/getWeatherIconKey";

import { ColorInfoSection } from "./ColorInfoSection";
import { WeatherIconDisplay } from "./WeatherIconDisplay";

export const TodayWeather = () => {
  const data = currentWeatherData.currentWeather;
  const windDirectionCode = data.windDirection;
  const windDirection = WIND_DIRECTION_LABEL[windDirectionCode] ?? "알 수 없음";
  const sunriseTimeFormatted = formatLocalTime(data.sunrise);

  const iconKey = getWeatherIconKey({
    weather: data.weather,
    time: data.timestamp,
    sunrise: data.sunrise,
    sunsetTime: data.sunsetTime,
  });

  const isNight = iconKey.endsWith("-night");

  return (
    <section className="flex w-full flex-col items-center justify-center gap-3">
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center justify-center gap-[10px]">
          <WeatherIconDisplay weather={iconKey} width={160} height={160} />
          <div className="text-h1 text-gray-60">{data.temperature}º</div>
        </div>

        {/* TBD: 날씨 변수명 설정에 따라 한국어로 변경 로직 추가 */}
        <div className="text-gray-60 text-body-md flex justify-center">
          {isNight ? "야간" : "주간"} / {data.weather}
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
          status={sunriseTimeFormatted}
          bgColor="bg-lime"
          textColor="text-yellow"
          useStatusColor={false}
        />
      </div>
    </section>
  );
};
