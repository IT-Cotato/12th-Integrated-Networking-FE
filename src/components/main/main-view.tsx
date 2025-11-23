import { use } from 'react';
import { SelectedLocationContext } from '@/contexts/selected-location-context';
import { useWeather } from '@/hooks/use-weather';
import CurrentWeather from './current-weather';
import HourlyForecast from './hourly-forecast';
import WeeklyForecast from './weekly-forecast';

export default function MainView() {
  const contextValue = use(SelectedLocationContext);
  if (!contextValue) {
    throw new Error('Must be used inside SelectedLocationProvider.');
  }

  const { selectedLocation } = contextValue;

  const { data } = useWeather(selectedLocation);
  if (!selectedLocation) {
    return (
      <main className="mx-auto flex h-64 max-w-md items-center justify-center p-4">
        <p>사이드바에서 장소를 선택해주세요.</p>
      </main>
    );
  }

  const weatherData = data?.data;

  if (!weatherData) {
    return <div>날씨정보를 불러오는데 실패했습니다</div>;
  }
  console.log(weatherData);
  return (
    <div className="mx-auto flex h-screen w-full max-w-7xl flex-col items-center gap-6 p-10">
      <CurrentWeather
        current={weatherData.current}
        location={selectedLocation.name}
      />
      <HourlyForecast hourlyData={weatherData.hourly} />
      <WeeklyForecast weeklyData={weatherData.weekly} />
    </div>
  );
}
