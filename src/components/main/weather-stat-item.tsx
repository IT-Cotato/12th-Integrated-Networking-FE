interface WeatherStatItemProps {
  label: string;
  value: string;
}

export default function WeatherStatItem({
  label,
  value,
}: WeatherStatItemProps) {
  return (
    <div className="text-base text-black">
      <span className="text-gray40 font-medium">{label}</span>{' '}
      <span className="font-medium">{value}</span>
    </div>
  );
}
