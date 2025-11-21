import { Line, LineChart, XAxis, LabelList } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { HourlyWeather } from '@/types/weather.types';
import { convertKelvinToCelsius } from '@/utils/weather.util';

interface Props {
  hourlyData: HourlyWeather[];
}

const chartConfig = {
  temp: {
    label: '온도',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

// [수정 1] 차트 전체 높이를 늘릴 것이므로 기준선도 조금 여유 있게 내립니다.
const BASELINE_Y = 140;

export function HourlyChart({ hourlyData }: Props) {
  const chartData = hourlyData.map((data, index) => ({
    time: new Date(data.dt * 1000).getHours() + '시',
    temp: Math.round(convertKelvinToCelsius(data.temp)),
    isNow: index === 0,
    iconPath: '/assets/sun.svg',
  }));

  return (
    // scrollbar-hide 클래스 때문에 스크롤바가 눈에 안 보일 수 있습니다.
    // 스크롤바를 보고 싶다면 이 클래스를 잠시 제거하세요.
    <div className="w-full overflow-x-scroll overflow-y-visible">
      <div className="w-[2000px] p-4">
        {/* [수정 2] h-[200px] -> h-[260px] : 아이콘이 들어갈 공간만큼 전체 높이를 늘려줍니다. */}
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full overflow-y-visible"
        >
          <LineChart
            data={chartData}
            // [수정 3] bottom 여백 확보 (10 -> 50)
            // 이 여백이 너무 작으면 차트 아래쪽 내용이 잘립니다.
            margin={{ top: 20, left: 20, right: 10, bottom: 50 }}
          >
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              interval={0}
              height={60}
              tick={<CustomTimeLabel />}
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

const CustomTimeLabel = (props: any) => {
  const { x, payload } = props;
  const { value: timeText } = payload;

  return (
    <g transform={`translate(${x},${BASELINE_Y})`}>
      {/* [수정 4] height를 60 -> 100으로 늘려서 내용물이 잘리지 않게 함 */}
      <foreignObject x="-25" y="0" width="50" height="200">
        <div className="flex h-full flex-col items-center justify-start">
          <span className="mb-1 text-xs font-medium text-gray-500">
            {timeText}
          </span>
          {/* [수정 5] Next/Image 사용 및 크기 지정 */}
          <img
            src={'/assets/sun.svg'}
            alt="날씨 아이콘"
            className="h-10 w-10 object-contain"
          />
          <img
            src={'/assets/sun.svg'}
            alt="날씨 아이콘"
            className="h-10 w-10 object-contain"
          />{' '}
          <img
            src={'/assets/sun.svg'}
            alt="날씨 아이콘"
            className="h-10 w-10 object-contain"
          />{' '}
          <img
            src={'/assets/sun.svg'}
            alt="날씨 아이콘"
            className="h-10 w-10 object-contain"
          />{' '}
          <img
            src={'/assets/sun.svg'}
            alt="날씨 아이콘"
            className="h-10 w-10 object-contain"
          />{' '}
          <img
            src={'/assets/sun.svg'}
            alt="날씨 아이콘"
            className="h-10 w-10 object-contain"
          />{' '}
          <img
            src={'/assets/sun.svg'}
            alt="날씨 아이콘"
            className="h-10 w-10 object-contain"
          />
        </div>
      </foreignObject>
    </g>
  );
};

// --- 기존 점 컴포넌트 ---
const CustomizedDot = (props: any) => {
  const { cx, cy, payload } = props;
  const color = payload.isNow ? '#8b5cf6' : '#e2e8f0';

  // 세로선 끝점 (라벨 시작 위치와 동일하게)
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
