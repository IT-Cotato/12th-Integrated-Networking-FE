import useWeeklyForecast from "../../hooks/useWeeklyForecast";
import DailyForecast from "./DailyForecast";
export default function WeeklyForecast() {
  const { data, loading, error } = useWeeklyForecast();
  if (loading) {
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        주간 예보를 불러오는 중입니다... 🌥️
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-10 text-center text-lg text-red-500">
        주간 예보 로드 실패: {error}
      </div>
    );
  }
  if (!data || !data.dailyList || data.dailyList.length === 0) {
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        주간 예보 정보가 없습니다.
      </div>
    );
  }
  return (
    <>
      <div
        className="
        w-[1080px] h-[328px] max-w-full 
        p-6 
        border-gray-100
        rounded-2xl 
        shadow-lg
        mx-auto 
        bg-white
        flex flex-col
      "
      >
        <div className="font-bold text-[20px] text-left">주간 예보</div>
        <div className="flex flex-wrap justify-center items-start gap-7">
          {data.dailyList.map((dayForecast) => (
            <DailyForecast
              key={dayForecast.am.description}
              amRain={dayForecast.am.rain}
              amTemp={dayForecast.minTemp}
              amWeather={dayForecast.am.description}
              pmWeather={dayForecast.pm.description}
              pmRain={dayForecast.pm.rain}
              pmTemp={dayForecast.maxTemp}
              date={dayForecast.date}
              day={dayForecast.dayOfWeek}
            />
          ))}
        </div>
      </div>
    </>
  );
}
