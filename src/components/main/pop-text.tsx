const colorMap: Record<number, string> = {
  0: 'text-rainblue-0',
  10: 'text-rainblue-10',
  20: 'text-rainblue-20',
  30: 'text-rainblue-30',
  40: 'text-rainblue-40',
  50: 'text-rainblue-50',
  60: 'text-rainblue-60',
  70: 'text-rainblue-70',
  80: 'text-rainblue-80',
  90: 'text-rainblue-90',
  100: 'text-rainblue-100',
};

export default function PoPText({ PoP }: { PoP: string }) {
  // 1. 10단위 반올림 (0, 10, 20 ... 100)
  const depth = Math.round(Number(PoP) / 10) * 10;

  const colorClass = colorMap[depth] || 'text-rainblue-0';

  return <span className={`${colorClass} text-xl font-bold`}>{PoP}%</span>;
}
