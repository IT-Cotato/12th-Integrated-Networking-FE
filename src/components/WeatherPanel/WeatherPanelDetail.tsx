import useWeather from "../../hooks/useWeather";
// 상태에 따라 색상 클래스를 반환하는 함수
const getColorClasses = (status: string) => {
  switch (status) {
    case "좋음":
      return { bg: "bg-blue-200", text: "text-blue-600" };
    case "보통":
      return { bg: "bg-green-200", text: "text-green-600" };
    case "나쁨":
    case "낮음":
      return { bg: "bg-blue-200", text: "text-blue-600" };
    case "높음":
    case "매우나쁨":
      return { bg: "bg-red-200", text: "text-red-600" };
    default:
      return { bg: "bg-gray-200", text: "text-gray-600" };
  }
};
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
  const pm10Classes = getColorClasses(data.pm10);
  const pm25Classes = getColorClasses(data.pm25);
  const uvClasses = getColorClasses(data.uv);
  return (
    <>
      <div className="flex justify-center gap-4 pt-3 pb-3">
        <div>
          <div
            className={`w-[120px] h-[62px] rounded-xl pt-3 pr-6 pb-3 pl-6 flex flex-col justify-between ${pm10Classes.bg}`}
          >
            <div className="font-medium text-[12px]">미세먼지</div>
            <div className={`font-bold text-[12px] ${pm10Classes.text}`}>
              {data.pm10}
            </div>
          </div>
        </div>
        <div>
          <div
            className={`w-[120px] h-[62px] rounded-xl pt-3 pr-6 pb-3 pl-6 flex flex-col justify-between ${pm25Classes.bg}`}
          >
            <div className="font-medium text-[12px]">초미세먼지</div>
            <div className={`font-bold text-[12px] ${pm25Classes.text}`}>
              {data.pm25}
            </div>
          </div>
        </div>
        <div>
          <div
            className={`w-[120px] h-[62px] rounded-xl pt-3 pr-6 pb-3 pl-6 flex flex-col justify-between ${uvClasses.bg}`}
          >
            <div className="font-medium text-[12px]">자외선</div>
            <div className={`font-bold text-[12px] ${uvClasses.text}`}>
              {data.uv}
            </div>
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
