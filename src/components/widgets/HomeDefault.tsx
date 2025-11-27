import { DayClouds } from "../img/DayClouds.tsx";

export default function HomeDefault() {
  return (
    <div className="inline-flex flex-col justify-start items-center gap-6">
      <div className="w-80 h-80 relative">
        <DayClouds className="w-80 h-80 left-0 top-0 absolute" />
      </div>
      <div className="justify-start text-black text-4xl font-bold font-['Pretendard'] tracking-[0] whitespace-nowrap">
        아직 선택된 위치가 없습니다!
      </div>
    </div>
  );
}
