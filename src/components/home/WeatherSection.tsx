interface WeatherSectionProps {
  title: string;
  children?: React.ReactNode;
  gap?: number;
}
const WeatherSection = ({ title, children, gap = 3 }: WeatherSectionProps) => {
  return (
    <div
      className={`section-shadow bg-gray-0 border-gray-10 flex w-[1080px] flex-col gap-${gap} rounded-2xl border p-6`}
    >
      <div className="text-body-lg text-gray-100">{title}</div>
      <div>{children}</div>
    </div>
  );
};
export default WeatherSection;
