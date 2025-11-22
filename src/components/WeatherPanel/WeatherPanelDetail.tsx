import useWeather from "../../hooks/useWeather";

export default function WeatherPanelDetail() {
  const { data, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="p-4 text-center text-sm text-gray-400">
        상세 정보를 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-sm text-red-500">
        상세 정보 로드 실패: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        표시할 상세 날씨 데이터가 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center gap-4 pt-3 pb-3">
        <div>
          <div className="w-[120px] h-[62px] rounded-xl pt-3 pr-6 pb-3 pl-6 bg-blue-200 flex flex-col justify-between">
            <div className="font-medium text-[12px]">미세먼지</div>
            <div className="font-bold text-[12px] text-blue-600">
              {data.pm10}
            </div>
          </div>
        </div>
        <div>
          <div className="w-[120px] h-[62px] rounded-xl pt-3 pr-6 pb-3 pl-6 bg-green-200 flex flex-col justify-between">
            <div className="font-medium text-[12px]">초미세먼지</div>
            <div className="font-bold text-[12px] text-green-600">
              {data.pm25}
            </div>
          </div>
        </div>
        <div>
          <div className="w-[120px] h-[62px] rounded-xl pt-3 pr-6 pb-3 pl-6 bg-red-200 flex flex-col justify-between">
            <div className="font-medium text-[12px]">자외선</div>
            <div className="font-bold text-[12px] text-red-600">{data.uv}</div>
          </div>
        </div>
        <div>
          <div className="w-[120px] h-[62px] rounded-xl pt-3 pr-6 pb-3 pl-6 bg-yellow-200 flex flex-col justify-between">
            <div className="font-medium text-[12px]">일출</div>
            <div className="font-bold text-[12px] text-yellow-600">
              {data.sunriseTime}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
