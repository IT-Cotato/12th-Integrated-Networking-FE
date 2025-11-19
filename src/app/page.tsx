import { formatLocalDate } from "src/utils/getLocalDate";

import Clouds from "@/assets/weather/clouds.svg";

import { HourlyWeather } from "@/components/home/HourlyWeather";
import { TodayWeather } from "@/components/home/TodayWeather";
import WeatherSection from "@/components/home/WeatherSection";

const Home = () => {
  const date = formatLocalDate();
  // TBD: 사이드바 위치 선택값으로 변경
  const LOCATION = "롯데월드";

  return (
    <div className="bg-gray-5 flex min-h-screen w-full flex-col items-center justify-center gap-6">
      {!LOCATION ? (
        <>
          <Clouds className="h-80 w-80" />
          <div className="text-h2 text-gray-100">
            아직 선택된 위치가 없습니다!
          </div>
        </>
      ) : (
        <>
          <WeatherSection title={`${date} ${LOCATION} 날씨 현황`}>
            <TodayWeather />
          </WeatherSection>
          <WeatherSection title="시간별 현황">
            <HourlyWeather />
          </WeatherSection>
          <WeatherSection title="주간 예보" />
        </>
      )}
    </div>
  );
};
export default Home;
