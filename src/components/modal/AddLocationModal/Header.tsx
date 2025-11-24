import { WeatherIconDisplay } from "@/components/home/WeatherIconDisplay";

export default function Header() {
  return (
    <div className="flex flex-col items-center gap-2 pt-2 pb-6">
      <WeatherIconDisplay weather="sun" width={56} height={56} />;
      <h2 className="text-xl font-semibold">날씨 위치 추가</h2>
    </div>
  );
}
