// 날씨 관련 유틸리티
export const getWeatherIconAM = (weather: string): string => {
  switch (weather) {
    case "맑음":
      return "/Day Sun.svg";
    case "흐림":
      return "/Day Clouds.svg";
    case "눈":
      return "/Day Snow.svg";
    case "태풍":
      return "/Day Storm.svg";
    case "바람":
      return "/Day Wind.svg";
    case "비":
      return "/Day Rain.svg";
    default:
      return "/Day Sun.svg";
  }
};

export const getWeatherIconPM = (weather: string): string => {
  switch (weather) {
    case "맑음":
      return "/Night Moon.svg";
    case "흐림":
      return "/Night Clouds.svg";
    case "눈":
      return "/Night Snow.svg";
    case "태풍":
      return "/Night Storm.svg";
    case "바람":
      return "/Night Wind.svg";
    case "비":
      return "/Night Rain.svg";
    default:
      return "/Night Moon.svg";
  }
};
