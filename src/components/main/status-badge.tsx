const LEVEL_TEXT: string[] = ['좋음', '보통', '위험'];
const LEVEL_STYLES: { bg: string; text: string }[] = [
  {
    bg: 'bg-skyblue',
    text: 'text-blue',
  },
  {
    bg: 'bg-mint',
    text: 'text-green',
  },
  {
    bg: 'bg-coral',
    text: 'text-red',
  },
];

interface StatusBadgeProps {
  label: string;
  levelValue: number;
}

export default function StatusBadge({ label, levelValue }: StatusBadgeProps) {
  const levelText = LEVEL_TEXT[levelValue];
  const { bg, text } = LEVEL_STYLES[levelValue];

  return (
    <div
      className={`${bg} ${text} flex w-30 flex-col items-center justify-center gap-2.5 rounded-xl px-6 py-3 text-xs`}
    >
      <span className="font-medium text-black">{label}</span>
      <span className="font-bold">{levelText}</span>
    </div>
  );
}
