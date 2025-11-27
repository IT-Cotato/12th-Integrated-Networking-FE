import type { WeatherStatus } from "../types/Weather";

export const normalizeStatus = (raw: string): WeatherStatus => {
  const text = raw.trim();

  // 구름 → 흐림
  if (text.includes("구름") || text.includes("흐") || text.includes("튼"))
    return "흐림";

  // 맑음
  if (text.includes("맑")) return "맑음";

  // 비
  if (text.includes("비") || text.includes("소나기")) return "비";

  // 눈
  if (text.includes("눈")) return "눈";

  // 폭풍 / 천둥번개
  if (text.includes("천둥") || text.includes("번개") || text.includes("폭풍"))
    return "폭풍";

  // 바람
  if (text.includes("바람")) return "바람";

  // 기본값
  return "흐림";
};
