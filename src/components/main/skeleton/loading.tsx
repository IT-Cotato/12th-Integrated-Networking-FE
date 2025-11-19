/**
 * Suspense fallback으로 사용할 날씨 UI 스켈레톤
 */
export function WeatherSkeleton() {
  // 시간별/주간별 아이템을 반복해서 렌더링하기 위한 헬퍼
  const items = [1, 2, 3, 4, 5]; // 5개만 표시

  return (
    // MainView와 동일한 레이아웃 (max-w, gap 등)
    <div className="mx-auto flex max-w-md flex-col gap-6 p-4">
      {/* ===== 1. 현재 날씨 스켈레톤 ===== */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
        {/* 상단: 아이콘 + 온도 */}
        <div className="flex items-center justify-between">
          <div className="h-20 w-20 animate-pulse rounded-full bg-gray-200"></div>
          <div className="h-24 w-32 animate-pulse rounded-lg bg-gray-200"></div>
        </div>
        {/* 중단: 텍스트 */}
        <div className="h-5 w-1/3 animate-pulse rounded-md bg-gray-200"></div>

        {/* 하단: 4개 뱃지 */}
        <div className="mt-2 flex justify-between gap-2">
          <div className="h-12 w-1/4 animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-12 w-1/4 animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-12 w-1/4 animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-12 w-1/4 animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      </div>

      {/* ===== 2. 시간별 예보 스켈레톤 ===== */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
        {/* 제목 */}
        <div className="h-6 w-1/3 animate-pulse rounded-md bg-gray-200"></div>
        {/* 가로 스크롤 영역 (스켈레톤에서는 스크롤 숨김) */}
        <div className="flex justify-between overflow-hidden">
          {items.map((item) => (
            <div key={item} className="flex flex-col items-center gap-2">
              <div className="h-4 w-10 animate-pulse rounded-md bg-gray-200"></div>
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
              <div className="h-4 w-10 animate-pulse rounded-md bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 3. 주간 예보 스켈레톤 ===== */}
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
        {/* 제목 */}
        <div className="h-6 w-1/3 animate-pulse rounded-md bg-gray-200"></div>
        {/* 가로 스크롤 영역 (스켈레톤에서는 스크롤 숨김) */}
        <div className="flex justify-between overflow-hidden">
          {items.map((item) => (
            // (UI가 오전/오후로 더 복잡하지만, 스켈레톤은 단순화)
            <div key={item} className="flex flex-col items-center gap-2">
              <div className="h-4 w-12 animate-pulse rounded-md bg-gray-200"></div>
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
              <div className="h-4 w-12 animate-pulse rounded-md bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
