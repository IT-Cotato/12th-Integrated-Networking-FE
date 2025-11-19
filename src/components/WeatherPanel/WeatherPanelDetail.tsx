export default function WeatherPanelDetail() {
  return (
    <>
      <div className="flex justify-center gap-4 pt-3 pb-3">
        <div>
          <div className="w-[120px] h-[62px] rounded-xl pt-3 pr-6 pb-3 pl-6 bg-blue-200 flex flex-col justify-between">
            <div className="font-medium text-[12px]">미세먼지</div>
            <div className="font-bold text-[12px] text-blue-600">좋음</div>
          </div>
        </div>
        <div>
          <div className="w-[120px] h-[62px] rounded-xl pt-3 pr-6 pb-3 pl-6 bg-green-200 flex flex-col justify-between">
            <div className="font-medium text-[12px]">초미세먼지</div>
            <div className="font-bold text-[12px] text-green-600">보통</div>
          </div>
        </div>
        <div>
          <div className="w-[120px] h-[62px] rounded-xl pt-3 pr-6 pb-3 pl-6 bg-red-200 flex flex-col justify-between">
            <div className="font-medium text-[12px]">자외선</div>
            <div className="font-bold text-[12px] text-red-600">위험</div>
          </div>
        </div>
        <div>
          <div className="w-[120px] h-[62px] rounded-xl pt-3 pr-6 pb-3 pl-6 bg-yellow-200 flex flex-col justify-between">
            <div className="font-medium text-[12px]">일출</div>
            <div className="font-bold text-[12px] text-yellow-600">05:44</div>
          </div>
        </div>
      </div>
    </>
  );
}
