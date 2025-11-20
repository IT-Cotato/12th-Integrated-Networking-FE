import { useState } from "react";
import MainWeatherPanel from "./components/MainWeatherPanel";
import type { WeatherInfo } from "./types/Weather";

function App() {
  const [selectedWeather] = useState<WeatherInfo | null>(null);

  return (
    <div className="p-10">
      <MainWeatherPanel selectedWeather={selectedWeather} />
    </div>
  );
}

export default App;
