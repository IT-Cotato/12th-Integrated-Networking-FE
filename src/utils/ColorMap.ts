export const FineDustColor = (value: number) => {
  if (value <= 30) return "bg-blue-200";
  if (value <= 80) return "bg-green-200";
  if (value <= 150) return "bg-orange-100";
  return "bg-red-200";
};

export const TextFineDustColor = (value: number) => {
  if (value <= 30) return "text-blue-400";
  if (value <= 80) return "text-green-400";
  if (value <= 150) return "text-orange-400";
  return "text-red-500";
};

export const UltraFineDustColor = (value: number) => {
  if (value <= 15) return "bg-blue-200";
  if (value <= 35) return "bg-green-200";
  if (value <= 75) return "bg-orange-200";
  return "bg-red-200";
};

export const TextUltraFineDustColor = (value: number) => {
  if (value <= 15) return "text-blue-400";
  if (value <= 35) return "text-green-400";
  if (value <= 75) return "text-orange-400";
  return "text-red-500";
};

export const UvIndexColor = (value: number) => {
  if (value < 3) return "bg-blue-200";
  if (value < 6) return "bg-green-200";
  if (value < 8) return "bg-yellow-200";
  if (value < 11) return "bg-orange-200";
  return "bg-red-200";
};

export const TextUvIndexColor = (value: number) => {
  if (value < 3) return "text-blue-400";
  if (value < 6) return "text-green-400";
  if (value < 8) return "text-yellow-400";
  if (value < 11) return "text-orange-400";
  return "text-red-500";
};
