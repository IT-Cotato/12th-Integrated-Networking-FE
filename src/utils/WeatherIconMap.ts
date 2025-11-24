import DaySun from "../assets/icons/Day_Sun.svg";
import DayClouds from "../assets/icons/Day_Clouds.svg";
import NightMoon from "../assets/icons/Night_Moon.svg";
import NightClouds from "../assets/icons/Night_Clouds.svg";
import DayRain from "../assets/icons/Day_Rain.svg";
import DaySnow from "../assets/icons/Day_Snow.svg";
import NightRain from "../assets/icons/Night_Rain.svg";
import NightSnow from "../assets/icons/Night_Snow.svg";
import DayStorm from "../assets/icons/Day_Storm.svg";
import DayWind from "../assets/icons/Day_Wind.svg";
import NightStorm from "../assets/icons/Night_Storm.svg";
import NightWind from "../assets/icons/Night_Wind.svg";
import type { WeatherStatus } from "../types/Weather";

export const WeatherIconMap: Record<
  WeatherStatus,
  { day: string; night: string }
> = {
  맑음: { day: DaySun, night: NightMoon },
  흐림: { day: DayClouds, night: NightClouds },
  비: { day: DayRain, night: NightRain },
  눈: { day: DaySnow, night: NightSnow },
  폭풍: { day: DayStorm, night: NightStorm },
  바람: { day: DayWind, night: NightWind },
};
