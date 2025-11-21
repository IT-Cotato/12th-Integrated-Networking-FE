import type { HourlyWeather } from '@/types/weather.types';
import { HourlyChart } from './hourly-chart';
import SectionContainer from './section-container';

interface Props {
  hourlyData: HourlyWeather[];
}

export default function HourlyForecast({ hourlyData }: Props) {
  return (
    <SectionContainer label="시간별 현황">
      {/* 데이터를 차트 컴포넌트로 전달합니다. 
        여기서는 별다른 로직 없이 전달만 수행합니다.
      */}
      <HourlyChart hourlyData={hourlyData} />
    </SectionContainer>
  );
}
