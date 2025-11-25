import { useState } from 'react';
import { searchKakaoKeyword } from '@/api/kakao';
import type { KakaoPlace } from '@/api/kakao';

type AddLocationModalProps = {
  onClose: () => void;
  onSelect: (place: KakaoPlace) => void;
};

export default function AddLocationModal({
  onClose,
  onSelect,
}: AddLocationModalProps) {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<KakaoPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('1');

  // 검색 함수 (API 요청)
  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const data = await searchKakaoKeyword(keyword.trim());
      setResults(data);
    } catch (e) {
      alert('검색 실패');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="bg-gray60/40 fixed top-0 left-0 h-screen w-screen"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        <div
          className="relative flex w-[624px] max-w-full flex-col items-start gap-12 rounded-2xl bg-white p-[36px_72px] shadow-[4px_4px_4px_3px_rgba(0,0,0,0.25)]"
          style={{ padding: '36px 72px', gap: '48px' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl font-bold text-gray-400"
          >
            &times;
          </button>
          <div className="mb-3 flex w-full items-center gap-4">
            {/* 합성에 따라 아이콘 경로/이미지 교체 */}

            <img src="/cloud-sun.svg" className="h-20 w-20" alt="" />
            <span className="text-[32px] font-bold">날씨 위치 추가</span>
          </div>
          {/* 검색 인풋 */}
          <div className="flex w-full flex-col gap-2">
            <label
              className="mb-2 block pl-1 text-[24px] font-normal"
              htmlFor="locationInput"
            >
              {' '}
              장소 이름{' '}
            </label>
            <div className="relative w-full">
              <input
                id="locationInput"
                className="h-12 w-full border-0 border-b border-gray-400 bg-transparent pr-10 pl-2 text-lg font-normal placeholder-gray-300 outline-none focus:border-blue-500 focus:ring-0"
                placeholder="장소를 입력해주세요"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center"
                tabIndex={-1} // 포커스 이동 방지: 필요시 삭제
                onClick={handleSearch}
              >
                <img
                  src="/zoom-front-color.svg"
                  alt="검색"
                  className="h-6 w-6"
                />
              </button>
            </div>
          </div>

          {/* 결과/선택 리스트*/}
          <div
            className="mt-8 max-h-[250px] w-full overflow-y-auto rounded-lg border border-gray-200 bg-white"
            style={{ minHeight: '140px' }}
          >
            {loading ? (
              <div className="p-4 text-gray-400">검색 중...</div>
            ) : results.length > 0 ? (
              results.map((place, idx) => (
                <button
                  key={place.id}
                  type="button"
                  className={`flex w-full items-center px-4 py-4 text-left ${idx < results.length - 1 ? 'border-b border-gray-200' : ''} focus:outline-none`}
                  style={{ gap: '6px' }}
                  onClick={() => setSelectedId(place.id)}
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-gray-40 truncate text-[16px] font-semibold">
                      {place.place_name}
                    </span>
                    <span className="text-gray-40 truncate text-[12px]">
                      {place.address_name}
                    </span>
                  </div>
                  {place.id === selectedId && (
                    <img
                      src="/tick-front-color.svg"
                      alt="선택됨"
                      className="ml-3 h-8 w-8"
                    />
                  )}
                </button>
              ))
            ) : (
              <div className="p-4 text-gray-400"></div>
            )}
          </div>

          <div className="mt-3 flex w-full justify-end">
            <button
              className="rounded-lg bg-gray-900 px-8 py-2 text-lg font-bold text-white shadow"
              style={{ minWidth: '100px' }}
              disabled={!selectedId}
              onClick={() => {
                const sel = results.find((p) => p.id === selectedId);
                if (sel) {
                  onSelect(sel);
                }
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
