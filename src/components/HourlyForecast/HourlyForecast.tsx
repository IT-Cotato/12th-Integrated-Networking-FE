import React, { useMemo } from "react";
import { LineChart, Line, XAxis } from "recharts";
import type { HourlyForecast } from "../../types/Weather";
import { WeatherIconMap } from "../../utils/WeatherIconMap";

interface Props {
  hourly: HourlyForecast[];
}

const CENTER_GAP = 86;
const BOX_WIDTH = 40;
const CHART_HEIGHT = 15;

function GraphSection({ hourly }: { hourly: HourlyForecast[] }) {
  const totalWidth = hourly.length * CENTER_GAP;

  const chartData = useMemo(
    () =>
      hourly.map((_, idx) => ({
        x: idx * CENTER_GAP + CENTER_GAP / 2,
        y: 1,
        idx,
      })),
    [hourly]
  );

  return (
    <div className={`h-[${CHART_HEIGHT}px]`} style={{ width: totalWidth }}>
      <LineChart
        data={chartData}
        width={totalWidth}
        height={CHART_HEIGHT}
        margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey="x"
          type="number"
          domain={[0, totalWidth]}
          hide
          allowDataOverflow
        />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#D6D6D6"
          strokeWidth={1}
          dot={{ r: 4, fill: "#D6D6D6" }}
          isAnimationActive={false}
        />
      </LineChart>
    </div>
  );
}

function TimeItems({ hourly }: { hourly: HourlyForecast[] }) {
  const totalWidth = hourly.length * CENTER_GAP;
  const leftPositions = hourly.map(
    (_, idx) => idx * CENTER_GAP + (CENTER_GAP - BOX_WIDTH) / 2
  );

  return (
    <div className="relative" style={{ width: totalWidth }}>
      {hourly.map((item, idx) => {
        const iconSrc = item.isDaytime
          ? WeatherIconMap[item.status].day
          : WeatherIconMap[item.status].night;

        const left = leftPositions[idx];

        return (
          <div
            key={`${item.time}-${idx}`}
            className="absolute flex flex-col items-center gap-2"
            style={{
              left,
              top: 0,
              width: BOX_WIDTH,
            }}
          >
            {/* 아이콘 */}
            <img src={iconSrc} className="w-[40px] h-[40px]" />

            {/* 시간 텍스트 */}
            <span className="text-[12px] font-normal leading-[100%] text-[#A4A4A4] font-[Pretendard]">
              {item.time}
            </span>

            {/* 온도 */}
            <span className="text-[12px] font-semibold text-[#292E2E]">
              {item.temp}°
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function HourlyForecastPanel({ hourly }: Props) {
  return (
    <div className="w-full flex justify-center">
      <div
        className="
          w-[1080px] h-[232px]
          p-8 bg-white rounded-[16px]
          border-2 border-[#F2F2F2]
          shadow-[0_0_8px_2px_rgba(0,0,0,0.1)]
          flex flex-col gap-[12px]
        "
      >
        {/* 타이틀 */}
        <h2 className="text-[20px] font-bold leading-[100%] text-black font-[Pretendard]">
          시간별 현황
        </h2>

        {/* 스크롤 영역 */}
        <div className="overflow-x-auto overflow-y-hidden w-[1032px] h-[136px] px-[6px] py-[12px]">
          <div className="relative w-[984px] h-[112px] py-[6px]">
            {/* 그래프 */}
            <div className={`h-[${CHART_HEIGHT}px]`}>
              <GraphSection hourly={hourly} />
            </div>

            {/* 시간 아이템 */}
            <TimeItems hourly={hourly} />
          </div>
        </div>
      </div>
    </div>
  );
}
