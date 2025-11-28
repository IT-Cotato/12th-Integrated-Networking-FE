import type { WeatherStatus } from "../types/Weather";

// ⭐ 백엔드 상태 → 프론트 상태 통합 매핑
export const mapWeatherStatus = (sky: string): WeatherStatus => {
  const text = sky.toLowerCase();

  if (text.includes("맑") || text.includes("sun")) return "맑음";
  if (text.includes("구름") || text.includes("흐") || text.includes("cloud"))
    return "흐림";
  if (text.includes("비") || text.includes("rain") || text.includes("강수"))
    return "비";
  if (text.includes("눈") || text.includes("snow")) return "눈";
  if (text.includes("폭풍") || text.includes("storm")) return "폭풍";
  if (text.includes("바람") || text.includes("wind")) return "바람";

  return "맑음"; // 기본값
};
