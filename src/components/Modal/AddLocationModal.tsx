import { useState } from 'react';
import SearchResultItem from './SearchResultItem';
import { searchPlaces } from '../../services/kakaoMap';
import { addLocation } from '../../services/api';
import { useLocationStore } from '../../stores/locationStore';
import type { SearchResult } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddLocationModal({ isOpen, onClose }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchLocations } = useLocationStore();

  // 검색 실행 함수
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSelectedIndex(null);

    try {
      const results = await searchPlaces(searchQuery);
      setSearchResults(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '검색 중 오류가 발생했습니다.';
      setError(errorMessage);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter 키 입력 시 검색
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 모달 닫을 때 초기화
  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedIndex(null);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl w-[624px] h-[641px] shadow-[4px_4px_4px_3px_#00000040] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 (우측 상단) - 모달 경계 기준 */}
        <button
          onClick={handleClose}
          className="absolute top-[16.5px] right-4 w-6 h-6 !p-0 !m-0 !bg-transparent !border-none !shadow-none !outline-none !appearance-none hover:opacity-70 transition-opacity z-50 cursor-pointer"
          aria-label="닫기"
          type="button"
        >
          <img 
            src="/Vector.svg" 
            alt="닫기" 
            className="block pointer-events-none absolute w-[16.0115966796875px] h-[16.009889602661133px] top-1 left-[3.99px]"
          />
        </button>

        {/* 모달 헤더와 검색 영역을 감싸는 컨테이너 */}
        <div className="pt-9 px-[72px] pb-9 flex flex-col items-start gap-12 h-full">
          {/* 모달 헤더 */}
          <div className="flex items-center gap-4">
            <img src="/Day Clouds.svg" alt="날씨" className="w-20 h-20" />
            <span 
              className="text-[#292E2E] font-bold text-[32px] leading-[100%] tracking-normal"
              style={{ fontFamily: 'Pretendard, sans-serif' }}
            >
              날씨 위치 추가
            </span>
          </div>

          {/* 정보 입력 영역 */}
          <div className="flex flex-col items-start gap-2 w-full">
            {/* 장소 이름 라벨 */}
            <span 
              className="text-[#292E2E] text-left text-[24px] font-semibold leading-normal"
              style={{ fontFamily: 'Pretendard, sans-serif' }}
            >
              장소 이름
            </span>
            
            {/* 입력 필드 */}
            <div className="flex justify-between items-center px-2 py-1 w-full border-b border-[#292E2E]">
              <input
                type="text"
                placeholder="장소를 입력해주세요."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 outline-none border-none bg-transparent text-left"
                style={{ fontFamily: 'Pretendard, sans-serif' }}
              />
              {/* 검색 아이콘 */}
              <button
                type="button"
                onClick={handleSearch}
                disabled={isLoading}
                className="!w-6 !h-6 !p-0 !m-0 !bg-transparent !border-none !outline-none !rounded-none flex items-center justify-center flex-shrink-0 ml-2 cursor-pointer disabled:opacity-50"
                aria-label="검색"
              >
                <img 
                  src="/zoom-front-color.svg" 
                  alt="검색" 
                  className="w-6 h-6 block"
                />
              </button>
            </div>
          </div>

          {/* 검색 결과 리스트 */}
          <div className="flex flex-col items-start gap-4 self-stretch h-[240px] py-2 px-4 overflow-y-auto w-full rounded-lg border border-[#A4A4A4]">
            {isLoading && (
              <div className="w-full text-center text-gray-500 py-8">
                검색 중...
              </div>
            )}
            {error && (
              <div className="w-full text-center text-red-500 py-8">
                {error}
              </div>
            )}
            {!isLoading && !error && searchResults.length === 0 && searchQuery && (
              <div className="w-full text-center text-gray-500 py-8">
                검색 결과가 없습니다.
              </div>
            )}
            {!isLoading && !error && searchResults.map((result, index) => (
              <SearchResultItem
                key={result.id}
                name={result.name}
                address={result.roadAddress || result.address}
                selected={selectedIndex === index}
                onClick={() => {
                  setSelectedIndex(selectedIndex === index ? null : index);
                }}
              />
            ))}
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end items-end self-stretch">
            <button
              type="button"
              disabled={selectedIndex === null || isSubmitting}
              className="flex justify-center items-center !py-[6px] !px-[30px] !rounded-md !bg-[#292E2E] !border-none !outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={async () => {
                if (selectedIndex === null) return;

                const selectedResult = searchResults[selectedIndex];
                setIsSubmitting(true);
                setError(null);

                try {
                  // 백엔드 API 호출 - 위치 추가
                  // TODO: 추후 로그인 구현 시 userId를 실제 사용자 ID로 변경 필요
                  const userId = 1; // 임시 사용자 ID
                  await addLocation(
                    userId,
                    selectedResult.name,
                    selectedResult.latitude,
                    selectedResult.longitude
                  );
                  
                  // 위치 목록 새로고침
                  await fetchLocations();
                  
                  handleClose();
                } catch (err) {
                  const errorMessage = err instanceof Error ? err.message : '위치 추가에 실패했습니다.';
                  setError(errorMessage);
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <span 
                className="text-white font-semibold text-xl leading-normal"
                style={{ fontFamily: 'Pretendard, sans-serif' }}
              >
                {isSubmitting ? '추가 중...' : '확인'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
