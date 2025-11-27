export default function SectionContainer({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="border-gray10 flex w-full max-w-[1080px] flex-col gap-3 rounded-2xl border-2 bg-white p-4 shadow-[0_0_8px_2px_rgba(0,0,0,0.10)]">
      <p className="text-xl font-bold">{label}</p>
      {children}
    </div>
  );
}
