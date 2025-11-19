import { STATUS_COLOR_MAP } from "@/constants/statusColorMap";

interface ColorInfoSectionProps {
  label: string;
  status: string;
  useStatusColor?: boolean;
  bgColor?: string;
  textColor?: string;
}
export const ColorInfoSection = ({
  label,
  status,
  bgColor,
  textColor,
  useStatusColor = true,
}: ColorInfoSectionProps) => {
  let bg = "";
  let text = "";

  if (useStatusColor && status in STATUS_COLOR_MAP) {
    bg = STATUS_COLOR_MAP[status as keyof typeof STATUS_COLOR_MAP].bg;
    text = STATUS_COLOR_MAP[status as keyof typeof STATUS_COLOR_MAP].text;
  }

  return (
    <div
      className={`flex w-30 flex-col items-center justify-center gap-[10px] rounded-xl px-6 py-3 ${bg} ${bgColor}`}
    >
      <div className="text-gray-60 text-lab-md">{label}</div>
      <div className={`text-lab-md ${text} ${textColor}`}>{status}</div>
    </div>
  );
};
