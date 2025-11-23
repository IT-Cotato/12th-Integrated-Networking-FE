import { Line, LineChart, XAxis, LabelList } from 'recharts';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';
import type { HourlyWeather } from '@/types/weather.types';
import { mapWeatherIcon } from '@/utils/weather.util';

// 1. ChartDataPoint 타입에 isTomorrow 플래그 추가
interface ChartDataPoint {
  time: string;
  temp: number;
  isNow: boolean;
  isTomorrow: boolean; // [추가] 내일 여부
  iconPath: string;
}

interface Props {
  hourlyData: HourlyWeather[];
}

interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string | number;
    index: number;
  };
  chartData: ChartDataPoint[];
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: ChartDataPoint;
}

const chartConfig = {
  temp: {
    label: '온도',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const BASELINE_Y = 80;

export function HourlyChart({ hourlyData }: Props) {
  const midnightIndex = hourlyData.findIndex((data) => data.time === '0시');

  const chartData: ChartDataPoint[] = hourlyData.map((data, index) => {
    return {
      time: data.time,
      temp: Number(data.temp.toFixed(1)),
      isNow: index === 0,
      isTomorrow: midnightIndex > 0 && index >= midnightIndex,
      iconPath: mapWeatherIcon(data.weatherIcon),
    };
  });

  return (
    <div className="w-full overflow-x-scroll overflow-y-visible">
      <div className="w-[2000px] p-4">
        <ChartContainer
          config={chartConfig}
          className="h-[180px] w-full overflow-y-visible"
        >
          <LineChart
            data={chartData}
            margin={{ top: 20, left: 20, right: 20, bottom: 50 }}
          >
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              interval={0}
              height={60}
              tick={(props) => (
                <CustomTimeLabel {...props} chartData={chartData} />
              )}
            />

            <Line
              dataKey="temp"
              type="monotone"
              stroke="var(--color-gray40)"
              strokeWidth={2}
              dot={<CustomizedDot />}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="temp"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `${value}°`}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}

// --- 하단 커스텀 컴포넌트 영역 ---

const CustomTimeLabel = ({ x, payload, chartData }: CustomTickProps) => {
  if (!payload || typeof payload.index !== 'number') return null;

  const index = payload.index;
  const data = chartData[index];

  if (!data) return null;

  // [로직 1] 텍스트 변환: "0시" -> "내일", 그 외엔 원래 시간
  const displayTime = data.time === '0시' ? '내일' : data.time;

  // [로직 2] 색상 변환: 내일 데이터면 보라색, 아니면 회색
  // (0시인 경우 강조를 위해 font-bold도 추가했습니다)
  const textColorClass = data.isTomorrow
    ? 'text-[#8b5cf6] font-bold' // 내일: 보라색
    : 'text-gray-500 font-medium'; // 오늘: 회색

  return (
    <g transform={`translate(${x},${BASELINE_Y})`}>
      <foreignObject x="-25" y="0" width="50" height="60">
        <div className="flex h-full flex-col items-center justify-start">
          {/* 변경된 텍스트와 색상 클래스 적용 */}
          <span className={`mb-1 text-xs ${textColorClass}`}>
            {displayTime}
          </span>
          <img
            src={`/assets/${data.iconPath}`}
            alt="날씨 아이콘"
            className="h-10 w-10 object-contain"
          />
        </div>
      </foreignObject>
    </g>
  );
};

// --- 기존 점 컴포넌트 ---

const CustomizedDot = ({ cx, cy, payload }: CustomDotProps) => {
  if (!cx || !cy || !payload) return null;

  const color = payload.isNow ? '#32a1ff' : '#e2e8f0';
  const lineEndY = BASELINE_Y;

  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={lineEndY}
        stroke="#e2e8f0"
        strokeWidth={1}
      />
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={color}
        stroke="white"
        strokeWidth={2}
      />
    </g>
  );
};
