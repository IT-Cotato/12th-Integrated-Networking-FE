import { getWeatherIconAM, getWeatherIconPM } from "../../utils/weatherUtils";

interface ChartData {
  time: string;
  temp: number;
  status: string;
  icon: string;
}
interface IndividualForecastProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
    index: number;
  };
  allWeatherData: ChartData[];
}

export const IndividualForecast: React.FC<IndividualForecastProps> = ({
  x,
  y,
  payload,
  allWeatherData,
}) => {
  if (!payload || payload.index === undefined) return null;
  if (x == null || y == null) return null;

  const data = allWeatherData[payload.index];
  if (!data) return null;

  const hourString = String(data.time).replace(/[^0-9]/g, "");
  const currentHour = parseInt(hourString, 10);

  const isNightTime =
    currentHour >= 18 || (currentHour >= 0 && currentHour <= 5);

  const iconSrc = isNightTime
    ? getWeatherIconPM(data.status)
    : getWeatherIconAM(data.status);

  if (!iconSrc) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <image href={iconSrc} x={-20} y={-20} width={40} height={40} />
      <text
        x={0}
        y={40}
        textAnchor="middle"
        className="text-[12px] text-gray-400 font-normal"
      >
        {data.time}
      </text>
      <text
        x={0}
        y={65}
        textAnchor="middle"
        className="text-[12px] font-semibold text-gray-800"
      >
        {Math.round(data.temp)}º
      </text>
    </g>
  );
};
