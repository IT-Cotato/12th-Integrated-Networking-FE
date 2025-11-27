// 날씨 관련 유틸리티
export function getTimePeriod(hour: number): string {
  if (hour < 0 || hour > 23) {
    console.error("잘못된 시간 형식입니다.");
    return "시간 오류";
  }

  if (hour >= 0 && hour <= 5) {
    return "야간"; // 00:00 ~ 05:59
  } else if (hour >= 6 && hour <= 8) {
    return "아침"; // 06:00 ~ 08:59
  } else if (hour >= 9 && hour <= 11) {
    return "오전"; // 09:00 ~ 11:59
  } else if (hour >= 12 && hour <= 17) {
    return "오후"; // 12:00 ~ 17:59
  } else {
    // 18부터 23까지의 범위
    return "야간";
  }
}

export const getWeatherIconAM = (weather: string): string => {
  switch (weather) {
    case "맑음":
      return "/Day Sun.svg";
    case "화창함":
      return "/Day Sun.svg";
    case "대체로 맑음":
      return "/Day Sun.svg";
    case "흐림":
      return "/Day Clouds.svg";
    case "흐린":
      return "/Day Clouds.svg";
    case "구름 낀":
      return "/Day Clouds.svg";
    case "눈":
      return "/Day Snow.svg";
    case "태풍":
      return "/Day Storm.svg";
    case "바람":
      return "/Day Wind.svg";
    case "비":
      return "/Day Rain.svg";
    case "근처 곳곳에 비":
      return "/Day Rain.svg";
    default:
      return "/Day Sun.svg";
  }
};

export const getWeatherIconPM = (weather: string): string => {
  switch (weather) {
    case "맑음":
      return "/Night Moon.svg";
    case "화창함":
      return "/Night Moon.svg";
    case "대체로 맑음":
      return "/Night Moon.svg";
    case "흐림":
      return "/Night Clouds.svg";
    case "흐린":
      return "/Night Clouds.svg";
    case "구름 낀":
      return "/Night Clouds.svg";
    case "눈":
      return "/Night Snow.svg";
    case "태풍":
      return "/Night Storm.svg";
    case "바람":
      return "/Night Wind.svg";
    case "비":
      return "/Night Rain.svg";
    case "근처 곳곳에 비":
      return "/Night Rain.svg";
    default:
      return "/Night Moon.svg";
  }
};
