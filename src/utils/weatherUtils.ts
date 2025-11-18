// 날씨 관련 유틸리티
export const getWeatherIconAM = (weather: string): string => {
  switch (weather) {
    case "Sunny":
      return "/Day Sun.svg";
    case "Cloudy":
      return "/Day Clouds.svg";
    case "Snow":
      return "/Day Snow.svg";
    case "Storm":
      return "/Day Storm.svg";
    case "Windy":
      return "/Day Wind.svg";
    case "Rainy":
      return "/Day Rain.svg";
    default:
      return "/Day Sun.svg";
  }
};

export const getWeatherIconPM = (weather: string): string => {
  switch (weather) {
    case "Sunny":
      return "/Night Moon.svg";
    case "Cloudy":
      return "/Night Clouds.svg";
    case "Snow":
      return "/Night Snow.svg";
    case "Storm":
      return "/Night Storm.svg";
    case "Windy":
      return "/Night Wind.svg";
    case "Rainy":
      return "/Night Rain.svg";
    default:
      return "/Night Moon.svg";
  }
};
