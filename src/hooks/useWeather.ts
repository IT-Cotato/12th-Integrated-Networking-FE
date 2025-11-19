// useWeather 커스텀 훅(미완성)
import { useState } from "react";

const useWeather = () => {
  const [forecast, setForecast] = useState({
    weather: "Sunny",
    temp: 8,
    rain: 10,
  });

  const handleForecast = () => {
    setForecast({
      //임시
      weather: "Windy",
      temp: 18,
      rain: 0,
    });
  };
};
