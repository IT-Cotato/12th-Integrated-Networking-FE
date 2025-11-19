export function convertKelvinToCelsius(
  kelvinTemp: number,
  decimalPlaces: number = 2,
): number {
  const celsiusTemp = kelvinTemp - 273.15;
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(celsiusTemp * factor) / factor;
}
