interface WeatherSectionProps {
  title: string;
  children?: React.ReactNode;
  gap?: string;
}
const WeatherSection = ({ title, children, gap }: WeatherSectionProps) => {
  return (
    <div
      className={`section-shadow bg-gray-0 border-gray-10 flex w-[1080px] flex-col gap-3 rounded-2xl border p-6 ${gap}`}
    >
      <div className="text-body-lg text-gray-100">{title}</div>
      <div>{children}</div>
    </div>
  );
};
export default WeatherSection;
