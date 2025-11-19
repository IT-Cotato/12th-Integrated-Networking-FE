import RainNight from "@/assets//weather/rain-night.svg";
import Rain from "@/assets//weather/rain.svg";
import SnowNight from "@/assets//weather/snow-night.svg";
import Snow from "@/assets//weather/snow.svg";
import StormNight from "@/assets//weather/storm-night.svg";
import Storm from "@/assets//weather/storm.svg";
import SunNight from "@/assets//weather/sun-night.svg";
import Sun from "@/assets//weather/sun.svg";
import WindNight from "@/assets//weather/wind-night.svg";
import Wind from "@/assets//weather/wind.svg";
import CloudsNight from "@/assets/weather/clouds-night.svg";
import Clouds from "@/assets/weather/clouds.svg";

export const WEATHER_ICON_MAP = {
  sun: Sun,
  "sun-night": SunNight,

  clouds: Clouds,
  "clouds-night": CloudsNight,

  rain: Rain,
  "rain-night": RainNight,

  snow: Snow,
  "snow-night": SnowNight,

  storm: Storm,
  "storm-night": StormNight,

  wind: Wind,
  "wind-night": WindNight,
} as const;

export type WeatherIconKey = keyof typeof WEATHER_ICON_MAP;
