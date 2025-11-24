import { useState } from "react";
import MainWeatherPanel from "./components/MainWeatherPanel";
import type { WeatherInfo } from "./types/Weather";
import { mockWeather } from "./services/WeatherService";

function App() {
  const [selectedWeather] = useState<WeatherInfo | null>(mockWeather); //(null)로 다시 바꾸기

  return (
    <div className="p-10">
      <MainWeatherPanel selectedWeather={selectedWeather} />
    </div>
  );
}

export default App;
