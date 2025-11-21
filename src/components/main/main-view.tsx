import { use } from 'react';
import { SelectedLocationContext } from '@/contexts/selected-location-context';
import { useWeather } from '@/hooks/use-weather';
import CurrentWeather from './current-weather';
import { useAirQuality } from '@/hooks/use-air-quality';

export default function MainView() {
  const contextValue = use(SelectedLocationContext);
  if (!contextValue) {
    throw new Error('Must be used inside SelectedLocationProvider.');
  }

  const { selectedLocation } = contextValue;

  const { data: weatherData } = useWeather(selectedLocation);
  const { data: airData } = useAirQuality(selectedLocation);
  const airItem = airData.list[0];
  if (!selectedLocation) {
    return (
      <main className="mx-auto flex h-64 max-w-md items-center justify-center p-4">
        <p>사이드바에서 장소를 선택해주세요.</p>
      </main>
    );
  }

  return (
    <div className="mx-auto flex h-screen w-full max-w-7xl flex-col items-center gap-6 p-10">
      <CurrentWeather
        current={weatherData.current}
        air={airItem}
        location={selectedLocation.name}
      />
    </div>
  );
}
