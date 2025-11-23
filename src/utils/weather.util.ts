const ICON_MAP: { [key: string]: string } = {
  '01': '', // Clear
  '02': '-cloud', // Clouds
  '03': '-cloud',
  '04': '-cloud',
  '09': '-rain', // Rain
  '10': '-rain',
  '11': '-storm', // Thunderstorm
  '13': '-snow', // Snow
  '50': '-wind', // Mist -> wind로 매핑
};

const TEXT_MAP: { [key: string]: string } = {
  '01': '맑음',
  '02': '흐림',
  '03': '흐림',
  '04': '흐림',
  '09': '소나기',
  '10': '비',
  '11': '천둥번개',
  '13': '눈',
  '50': '안개/박무',
};

const WIND_DIRECTIONS: string[] = [
  '북',
  '북동',
  '동',
  '남동',
  '남',
  '남서',
  '서',
  '북서',
];

export function convertKelvinToCelsius(
  kelvinTemp: number,
  decimalPlaces: number = 1,
): number {
  const celsiusTemp = kelvinTemp - 273.15;
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(celsiusTemp * factor) / factor;
}

export function mapWeatherIcon(iconCode: string): string {
  if (!iconCode || iconCode.length !== 3) {
    return 'sun';
  }
  const isDay: boolean = iconCode.charAt(2) == 'd' ? true : false;
  const weatherCode: string = iconCode.substring(0, 2);
  let weatherIcon: string = '';

  const prefix: string = isDay ? 'sun' : 'moon';
  const suffix: string = ICON_MAP[weatherCode] || '';

  weatherIcon = prefix + suffix;
  return weatherIcon;
}

export function mapWeatherText(iconCode: string): string {
  const isDay: boolean = iconCode.charAt(2) == 'd' ? true : false;
  const weatherCode: string = iconCode.substring(0, 2);

  const prefix: string = isDay ? '주간' : '야간';
  const suffix: string = TEXT_MAP[weatherCode] || '';

  const weatherText = `${prefix} / ${suffix}`;
  return weatherText;
}

export function getWindDirectionText(deg: number): string {
  //북쪽 방향을 -22.5~ 22.5로
  const index = Math.floor(((deg + 22.5) % 360) / 45);
  const directionText = WIND_DIRECTIONS[index];
  return directionText + '풍';
}

export function getUvLevel(value: number): number {
  if (value < 3) return 0;
  if (value < 6) return 1;
  return 2;
}

export function getPm25Level(value: number): number {
  if (value < 15) return 0;
  if (value < 35) return 1;
  return 2;
}

export function getPm10Level(value: number): number {
  if (value < 30) return 0;
  if (value < 80) return 1;
  return 2;
}

export const convertPmToScore = (level: string | null | undefined): number => {
  if (!level) return 0;

  const scoreMap: Record<string, number> = {
    좋음: 0,
    보통: 1,
    나쁨: 2,
    매우나쁨: 3,
  };

  return scoreMap[level] ?? 0;
};

export const convertUvToScore = (level: string | null | undefined): number => {
  if (!level) return 0;

  const scoreMap: Record<string, number> = {
    낮음: 0,
    중간: 1,
    보통: 1,
    높음: 2,
    위험: 3,
    매우높음: 3,
  };

  return scoreMap[level] ?? 0;
};

export function getDate(): Date {
  const date = new Date(Date.now());
  return date;
}
