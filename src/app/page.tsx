import WeatherSection from "@/components/WeatherSection";

export default function Home() {
  return (
    <div className="bg-gray-5 flex min-h-screen w-full flex-col items-center justify-center gap-6">
      <WeatherSection title="4월 26일 롯데월드 날씨 현황" />
      <WeatherSection title="시간별 현황" />
      <WeatherSection title="주간 예보" />
    </div>
  );
}
