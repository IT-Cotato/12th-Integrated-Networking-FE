import DailyForecast from "./DailyForecast";

export default function WeeklyForecast() {
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
        <div className="flex justify-center items-start gap-20">
          {/* (임시)실제로는 API에서 받아온 날씨정보로 */}
          <DailyForecast
            amWeather="Rainy"
            amRain={10}
            amTemp={8}
            pmWeather="Windy"
            pmRain={10}
            pmTemp={19}
            date="4.26"
            day="오늘"
          />
          <DailyForecast
            amWeather="Sunny"
            amRain={0}
            amTemp={10}
            pmWeather="Storm"
            pmRain={0}
            pmTemp={20}
            date="4.27"
            day="일"
          />
          <DailyForecast
            amWeather="Storm"
            amRain={10}
            amTemp={8}
            pmWeather="Snow"
            pmRain={10}
            pmTemp={19}
            date="4.28"
            day="월"
          />
          <DailyForecast
            amWeather="Snow"
            amRain={10}
            amTemp={8}
            pmWeather="Cloudy"
            pmRain={10}
            pmTemp={19}
            date="4.29"
            day="화"
          />
          <DailyForecast
            amWeather="Cloudy"
            amRain={10}
            amTemp={8}
            pmWeather="Windy"
            pmRain={10}
            pmTemp={19}
            date="4.30"
            day="수"
          />
        </div>
      </div>
    </>
  );
}
