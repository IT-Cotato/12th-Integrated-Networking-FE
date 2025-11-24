import { useState } from "react";
import MainWeatherPanel from "./components/MainWeatherPanel";
import type { WeatherInfo } from "./types/Weather";
import { mockWeather, mockWeekly } from "./services/WeatherService";
import WeeklyForecastPanel from "./components/WeeklyForecast";

function App() {
  const [selectedWeather] = useState<WeatherInfo | null>(mockWeather); //(null)로 다시 바꾸기

  return (
    <div className="w-full min-h-screen bg-[#F6F6F6] pl-[248px] flex flex-col gap-6 p-10">
      <MainWeatherPanel selectedWeather={selectedWeather} />
      <WeeklyForecastPanel weekly={mockWeekly} />
    </div>
  );
}

export default App;
