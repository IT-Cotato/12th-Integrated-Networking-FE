import type { WeeklyWeather } from '@/types/weather.types';
import SectionContainer from './section-container';
import DailyWeather from './daily-weather';

interface WeeklyForecastProps {
  weeklyData: WeeklyWeather[];
}

export default function WeeklyForecast({ weeklyData }: WeeklyForecastProps) {
  return (
    <SectionContainer label="주간 예보">
      <ul className="flex w-full justify-around overflow-x-scroll">
        {weeklyData.map((data) => (
          <DailyWeather data={data} />
        ))}
      </ul>
    </SectionContainer>
  );
}
