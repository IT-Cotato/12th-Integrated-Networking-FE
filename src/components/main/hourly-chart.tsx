import { Line, LineChart, XAxis, LabelList } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { HourlyWeather } from '@/types/weather.types';
import { mapWeatherIcon } from '@/utils/weather.util';

// 1. 차트 데이터 포인트의 타입 정의
interface ChartDataPoint {
  time: string;
  temp: number;
  isNow: boolean;
  iconPath: string;
}

interface Props {
  hourlyData: HourlyWeather[];
}

// 2. CustomTimeLabel의 Props 타입 정의
interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string | number; // X축의 값 (시간)
    index: number; // 데이터 배열에서의 인덱스
  };
  // 우리가 추가로 주입할 전체 데이터 배열
  chartData: ChartDataPoint[];
}

// 3. CustomizedDot의 Props 타입 정의
interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: ChartDataPoint; // 점은 데이터 객체 자체를 payload로 받음
}

const chartConfig = {
  temp: {
    label: '온도',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const BASELINE_Y = 80;

export function HourlyChart({ hourlyData }: Props) {
  // 데이터 가공
  const chartData: ChartDataPoint[] = hourlyData.map((data, index) => ({
    time: data.time,
    temp: Number(data.temp.toFixed(1)),
    isNow: index === 0,
    iconPath: mapWeatherIcon(data.weatherIcon),
  }));

  return (
    <div className="w-full overflow-x-scroll overflow-y-visible">
      <div className="w-[2000px] p-4">
        <ChartContainer
          config={chartConfig}
          className="h-[180px] w-full overflow-y-visible"
        >
          <LineChart
            data={chartData}
            margin={{ top: 20, left: 20, right: 10, bottom: 50 }}
          >
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              interval={0}
              height={60}
              // [핵심 수정] 화살표 함수로 chartData를 주입합니다.
              tick={(props) => (
                <CustomTimeLabel {...props} chartData={chartData} />
              )}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
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
  // payload가 없거나 index가 없으면 렌더링하지 않음 (안전장치)
  if (!payload || typeof payload.index !== 'number') return null;

  const index = payload.index;
  const data = chartData[index]; // 인덱스로 원본 데이터에 접근

  // 데이터가 유효하지 않으면 렌더링하지 않음
  if (!data) return null;

  return (
    <g transform={`translate(${x},${BASELINE_Y})`}>
      <foreignObject x="-25" y="0" width="50" height="60">
        <div className="flex h-full flex-col items-center justify-start">
          <span className="mb-1 text-xs font-medium text-gray-500">
            {data.time}
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
  // Dot의 payload는 데이터 객체 그 자체입니다.
  if (!cx || !cy || !payload) return null;

  const color = payload.isNow ? '#8b5cf6' : '#e2e8f0';
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
