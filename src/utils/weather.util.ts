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

export function convertKelvinToCelsius(
  kelvinTemp: number,
  decimalPlaces: number = 2,
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
