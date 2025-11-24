import { IndividualForecast } from "./IndividualForecast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { HourlyWeather } from "../../types/hourly";

const weatherData: HourlyWeather[] = [
  { time: "03시", temp: 8, status: "약간 흐림", icon: "" },
  { time: "04시", temp: 8, status: "흐림", icon: "" },
  { time: "05시", temp: 8, status: "흐림", icon: "" },
  { time: "06시", temp: 8, status: "맑음", icon: "" },
  { time: "07시", temp: 8, status: "맑음", icon: "" },
  { time: "08시", temp: 8, status: "맑음", icon: "" },
  { time: "09시", temp: 8, status: "맑음", icon: "" },
  { time: "10시", temp: 8, status: "맑음", icon: "" },
  { time: "11시", temp: 8, status: "맑음", icon: "" },
  { time: "12시", temp: 8, status: "맑음", icon: "" },
  { time: "13시", temp: 8, status: "맑음", icon: "" },
  { time: "14시", temp: 8, status: "맑음", icon: "" },
  { time: "15시", temp: 9, status: "맑음", icon: "" },
  { time: "16시", temp: 9, status: "맑음", icon: "" },
  { time: "17시", temp: 9, status: "맑음", icon: "" },
  { time: "18시", temp: 7, status: "흐림", icon: "" },
  { time: "19시", temp: 6, status: "흐림", icon: "" },
  { time: "20시", temp: 5, status: "흐림", icon: "" },
  { time: "21시", temp: 4, status: "흐림", icon: "" },
  { time: "22시", temp: 4, status: "흐림", icon: "" },
  { time: "23시", temp: 3, status: "흐림", icon: "" },
  { time: "00시", temp: 3, status: "흐림", icon: "" },
  { time: "01시", temp: 2, status: "흐림", icon: "" },
  { time: "02시", temp: 2, status: "흐림", icon: "" },
];

const CHART_WIDTH = 80;
const TOTAL_WIDTH = weatherData.length * CHART_WIDTH;

export const HourlyForecast: React.FC = () => {
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
              data={weatherData}
              margin={{ top: 1, right: 20, left: 20, bottom: 1 }}
            >
              <XAxis
                dataKey="time"
                interval={0}
                tickLine={false}
                axisLine={false}
                height={XAXIS_HEIGHT}
                tick={(props) => (
                  <IndividualForecast {...props} allWeatherData={weatherData} />
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
