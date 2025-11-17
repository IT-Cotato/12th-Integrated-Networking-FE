interface WeatherSectionProps {
  title: string;
  children?: React.ReactNode;
  gap?: string;
}
const WeatherSection = ({ title, children, gap }: WeatherSectionProps) => {
  return (
    <div
      className={`section-shadow p-6 flex flex-col bg-gray-0 border border-gray-10 rounded-2xl w-[1080px] ${gap}`}
    >
      <div className="text-body-lg text-gray-100">{title}</div>
      <div>{children}</div>
    </div>
  );
};
export default WeatherSection;
