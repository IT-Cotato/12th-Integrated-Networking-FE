import { IndividualForecast } from "./IndividualForecast";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import useHourlyForecast from "../../hooks/useHourlyForecast";
import { useMemo } from "react";
import type { WeatherItem } from "../../types/hourly";
import { getWeatherIconAM, getWeatherIconPM } from "../../utils/weatherUtils";

interface ChartData {
  time: string;
  temp: number;
  status: string;
  icon: string;
}

const CHART_WIDTH = 80;

export const HourlyForecast: React.FC = () => {
  const { data, loading, error } = useHourlyForecast();

  const transformedWeatherData: ChartData[] = useMemo(() => {
    if (!data || !data.weatherList) {
      return [];
    }
    return data.weatherList.map((item: WeatherItem) => {
      const hourString = item.time.substring(0, 2);
      const currentHour = parseInt(hourString, 10);
      const isNightTime =
        currentHour >= 18 || (currentHour >= 0 && currentHour <= 5);

      const calculatedIconSrc = isNightTime
        ? getWeatherIconPM(item.description)
        : getWeatherIconAM(item.description);

      return {
        time: hourString + "시",
        temp: Math.round(item.temperature),
        status: item.description,
        icon: calculatedIconSrc, // 💡 계산된 iconSrc 할당
      };
    });
  }, [data]);
  if (loading) {
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        시간별 현황 데이터를 불러오는 중입니다... ⏳
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-lg text-red-500">
        시간별 현황 로드 실패: {error}
      </div>
    );
  }

  if (transformedWeatherData.length === 0) {
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        시간별 예보 정보가 없습니다.
      </div>
    );
  }

  const TOTAL_WIDTH = transformedWeatherData.length * CHART_WIDTH;
  const TOTAL_HEIGHT = 136;
  const CHART_RENDER_HEIGHT = 8;
  const XAXIS_HEIGHT = TOTAL_HEIGHT - 24 - CHART_RENDER_HEIGHT;

  return (
    <>
      <div className="w-[1080px] h-[232px] max-w-full p-6 border border-gray-100 rounded-2xl shadow-lg mx-auto bg-white flex flex-col">
        <div className="font-bold text-[20px] text-left mb-4">시간별 현황</div>

        <div
          className="w-[1032px] h-[136px] max-w-full pt-3 pb-3 px-6 overflow-y-hidden mx-auto"
          style={{ boxSizing: "border-box" }}
        >
          <div style={{ width: TOTAL_WIDTH, height: "100%" }}>
            <LineChart
              width={TOTAL_WIDTH}
              height={TOTAL_HEIGHT}
              data={transformedWeatherData}
              margin={{ top: 1, right: 20, left: 20, bottom: 1 }}
            >
              <XAxis
                dataKey="time"
                interval={0}
                tickLine={false}
                axisLine={false}
                height={XAXIS_HEIGHT}
                tick={(props) => (
                  <IndividualForecast
                    {...props}
                    allWeatherData={transformedWeatherData}
                  />
                )}
              />
              <YAxis
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
                tick={false}
                width={0}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#D1D5DB"
                strokeWidth={2}
                dot={{ r: 4, fill: "#D1D5DB", stroke: "#fff", strokeWidth: 2 }}
                activeDot={{
                  r: 6,
                  stroke: "#D1D5DB",
                  fill: "#fff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </div>
        </div>
      </div>
    </>
  );
};
