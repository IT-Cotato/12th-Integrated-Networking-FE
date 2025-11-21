import { useState } from "react";

// useWeather 커스텀 훅
export default function useWeather() {
  const [weather, setWeather] = useState({
    city: "Seoul",
    temperature: 10.5,
    description: "흐림",
    feelTemperature: 9.0,
    humidity: 50,
    windSpeed: 0.4,
    windDirection: "남동풍",
    sunriseTime: "05:44",
    pm10: "좋음",
    pm25: "보통",
    uv: "낮음",
  });

  const handleUpdate = (location: string, time: string) => {
    //시간이랑 위치 정보에 따라 날씨 정보 API에서 가져와 업데이트
    setWeather({
      city: "Seoul",
      temperature: 10.5,
      description: "흐림",
      feelTemperature: 9.0,
      humidity: 50,
      windSpeed: 0.4,
      windDirection: "남동풍",
      sunriseTime: "05:44",
      pm10: "좋음",
      pm25: "보통",
      uv: "낮음",
    });
  };
  return { weather, handleUpdate };
}
