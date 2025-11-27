import { useEffect, useState } from "react";
import type {
  TodayWeather,
  HourlyWeather,
  WeeklyWeather,
} from "../types/weather";

// 등급(좋음/보통/위험) 변환 함수
function getFineDustLabel(value: number): string {
  if (value >= 7) return "좋음";
  if (value >= 4) return "보통";
  return "위험";
}

function getUltraFineDustLabel(value: number): string {
  if (value >= 7) return "좋음";
  if (value >= 4) return "보통";
  return "위험";
}

function getUVLabel(value: number): string {
  if (value <= 2) return "좋음";
  if (value <= 5) return "보통";
  return "위험";
}

// 낮 아이콘 매핑
function getDayIcon(main: string): string {
  switch (main) {
    case "맑음":
      return "Day-Sun";
    case "구름":
      return "Day-Clouds";
    case "비":
      return "Day-Rain";
    case "눈":
      return "Day-Snow";
    case "번개":
      return "Day-Storm";
    case "바람":
      return "Day-Wind";
    default:
      return "Day-Sun";
  }
}

// 밤 아이콘 매핑
function getNightIcon(main: string): string {
  switch (main) {
    case "맑음":
      return "Night-Sun";
    case "구름":
      return "Night-Clouds";
    case "비":
      return "Night-Rain";
    case "눈":
      return "Night-Snow";
    case "번개":
      return "Night-Storm";
    case "바람":
      return "Night-Wind";
    default:
      return "Night-Sun";
  }
}

// 시간별 아이콘 매핑 (밤/낮 구분)
function getHourlyIcon(main: string, time: string) {
  const hour = parseInt(time.replace("시", ""), 10);
  const isNight = hour >= 18 || hour <= 6;
  return isNight ? getNightIcon(main) : getDayIcon(main);
}

// 날씨를 아이콘으로 매핑
function convertWeatherToIcon(main: string): string {
  return getDayIcon(main);
}

export function useWeather(locationId: number | null) {
  const [today, setToday] = useState<TodayWeather | null>(null);
  const [hourly, setHourly] = useState<HourlyWeather[]>([]);
  const [weekly, setWeekly] = useState<WeeklyWeather[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!locationId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");

        const [t, h, w] = await Promise.all([
          fetch(`/api/weather/${locationId}/current`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((r) => r.json()),

          fetch(`/api/weather/${locationId}/hourly`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((r) => r.json()),

          fetch(`/api/weather/${locationId}/daily`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((r) => r.json()),
        ]);

        // TodayWeather 변환
        const tData = t.data;
        const mappedToday: TodayWeather = {
          locationName: tData.locationName,
          date: tData.date,
          temperature: tData.temperature,
          status: tData.weatherMain,
          feelsLike: tData.feelsLike,
          humidity: tData.humidity,
          windSpeed: tData.windSpeed,

          // 숫자를 등급(좋음/보통/위험)으로 변환
          fineDust: getFineDustLabel(tData.pm10),
          ultraFineDust: getUltraFineDustLabel(tData.pm25),
          uv: getUVLabel(tData.uvIndex),

          sunrise: tData.sunrise,
          icon: convertWeatherToIcon(tData.weatherMain),
        };

        // HourlyWeather 변환
        const mappedHourly: HourlyWeather[] = h.data.map((item: any) => ({
          time: item.time,
          temp: item.temperature,
          icon: getHourlyIcon(item.weatherMain, item.time),
        }));

        // WeeklyWeather 변환
        const mappedWeekly: WeeklyWeather[] = w.data.map((d: any) => ({
          date: `${d.dayOfWeek}\n${d.date}`,
          amIcon: getDayIcon(d.morningWeatherMain),
          pmIcon: getNightIcon(d.afternoonWeatherMain),
          amRain: d.morningRainChance,
          pmRain: d.afternoonRainChance,
          amTemp: d.minTemp,
          pmTemp: d.maxTemp,
        }));

        setToday(mappedToday);
        setHourly(mappedHourly);
        setWeekly(mappedWeekly);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locationId]);

  return { today, hourly, weekly, loading };
}
