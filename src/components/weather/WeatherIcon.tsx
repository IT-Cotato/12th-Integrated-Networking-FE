type Props = { icon: string; size?: number };

export default function WeatherIcon({ icon, size = 80 }: Props) {
  return (
    <img
      src={`/src/assets/img/${icon}.png`}
      alt="weather icon"
      width={size}
      height={size}
      className="select-none"
    />
  );
}
