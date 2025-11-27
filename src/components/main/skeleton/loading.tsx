/**
 * Suspense fallback으로 사용할 날씨 UI 스켈레톤
 */
export function WeatherSkeleton() {
  // 시간별/주간별 아이템을 반복해서 렌더링하기 위한 헬퍼

  return (
    // MainView와 동일한 레이아웃 (max-w, gap 등)
    <div className="mx-auto flex max-w-md min-w-[400px] flex-col gap-6 p-4">
      <img src="/loading.jpg" width={700} height={700} />
    </div>
  );
}
