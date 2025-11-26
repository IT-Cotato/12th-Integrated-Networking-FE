'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { KakaoPlace } from '../../types';

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (place: KakaoPlace) => void;
}

export default function AddLocationModal({
  isOpen,
  onClose,
  onAdd,
}: AddLocationModalProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<KakaoPlace[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const [hoveredPlaceId, setHoveredPlaceId] = useState<string | null>(null);

  // 카카오맵 API 로드 확인
  useEffect(() => {
    const checkKakaoLoaded = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          console.log('카카오맵 로드 완료');
          setIsKakaoLoaded(true);
        });
      } else {
        setTimeout(checkKakaoLoaded, 100);
      }
    };
    checkKakaoLoaded();
  }, []);

  // 카카오 장소 검색
  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      alert('검색어를 입력해주세요');
      return;
    }

    if (!isKakaoLoaded) {
      alert('지도를 로딩중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    console.log('검색 시작:', searchKeyword);
    const ps = new window.kakao.maps.services.Places();
    
    ps.keywordSearch(searchKeyword, (data: KakaoPlace[], status: string) => {
      console.log('검색 결과:', data, status);
      
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data);
        console.log('검색된 장소들:', data.map(place => ({
          이름: place.place_name,
          위도: place.y,
          경도: place.x
        })));
        if (data.length === 0) {
          alert('검색 결과가 없습니다.');
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 없습니다.');
        setSearchResults([]);
      } else {
        alert('검색 중 오류가 발생했습니다.');
        console.error('Search error:', status);
      }
    });
  };

  const handleConfirm = () => {
    if (selectedPlace) {
      console.log('선택된 장소 정보:', {
        이름: selectedPlace.place_name,
        위도: selectedPlace.y,
        경도: selectedPlace.x,
        ID: selectedPlace.id
      });
      
      onAdd(selectedPlace);
      
      // 초기화
      setSearchKeyword('');
      setSearchResults([]);
      setSelectedPlace(null);
    }
  };

  const handleClose = () => {
    setSearchKeyword('');
    setSearchResults([]);
    setSelectedPlace(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
          >
            {/* 모달 */}
            <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[624px] h-[641px] bg-white rounded-2xl shadow-2xl pt-9 pr-[72px] pb-9 pl-[72px] flex flex-col gap-12"
            >
              {/* 헤더 - 480x80, gap: 16 */}
              <div className="w-[480px] h-20 flex items-center  gap-4">
                {/* 아이콘 - 80x80 */}
                <img 
                  src="/Day Clouds.svg" 
                  alt="날씨" 
                  className="w-20 h-20 object-contain flex-shrink-0"
                />
                {/* 타이틀 - width: 181, height: 38, font-size: 32px */}
                <h2 className="text-[32px] font-bold leading-[100%] text-[#292E2E]">
                  날씨 위치 추가
                </h2>
                {/* 닫기 버튼 */}
                <button
                  onClick={handleClose}
                  className="ml-auto text-[#A4A4A4] hover:text-[#292E2E] text-2xl transition-colors leading-none"
                >
                  ×
                </button>
              </div>

              {/* 검색 섹션 - 480x69, gap: 32 */}
            <div className="w-[480px] flex flex-col gap-2">
                <label className="block text-[24px] font-medium text-[#292E2E]">
                    장소 이름
                </label>
                {/* 검색창 - 하단 밑줄만, 돋보기 아이콘을 내부에 배치 */}
                <div className="relative">
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="KFC"
                        className="w-full h-11 pl-4 pr-12 border-b border-[#292E2E] focus:outline-none focus:border-[#32A1FF] text-[#A4A4A4] text-sm placeholder:text-[#A4A4A4] bg-transparent"
                    />
                
                {/* 돋보기 아이콘 - 24x24, 검색창 내부 오른쪽 */}
                <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                <img 
                    src="/zoom-front-color.svg" 
                    alt="검색" 
                    className="w-6 h-6"
                />
                </button>
            </div>
            </div>

            {/* 검색 결과 리스트 */}
            <div className="w-[480px] flex-1 border border-[#D6D6D6] rounded-lg overflow-hidden flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto">
                {searchResults.length === 0 ? (
                    <div className="flex items-center justify-center h-full px-4">
                    <p className="text-xs text-[#A4A4A4] text-center">
                        검색어를 입력하고 검색해주세요
                    </p>
                    </div>
                ) : (
                    <div>
                    {searchResults.map((place, index) => (
                        <button
                        key={place.id}
                        onClick={() => setSelectedPlace(place)}
                        onMouseEnter={() => setHoveredPlaceId(place.id)}
                        onMouseLeave={() => setHoveredPlaceId(null)}
                        className={`w-full text-left px-4 py-3 transition-colors flex items-start justify-between ${
                            index !== 0 ? 'border-t border-[#F2F2F2]' : ''
                        } ${
                            selectedPlace?.id === place.id 
                            ? 'bg-[#CCE8FF]' 
                            : hoveredPlaceId === place.id 
                            ? 'bg-[#F6F6F6]'
                            : ''
                        }`}
                        >
                        <div className="flex-1 min-w-0 pr-2">
                            <div className="font-semibold text-[#292E2E] text-sm">
                            {place.place_name}
                            </div>
                            <div className="text-xs text-[#A4A4A4] mt-0.5 truncate">
                            {place.road_address_name || place.address_name}
                            </div>
                        </div>
                        {/* hover 또는 선택 시 체크 아이콘 표시 - 36x36 */}
                        {(selectedPlace?.id === place.id || hoveredPlaceId === place.id) && (
                        <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center">
                            <img 
                            src={
                                selectedPlace?.id === place.id 
                                ? "/tick-front-color.svg"  // 선택된 항목 - 파란색 체크
                                : "/tick-front-color.svg"   // hover 항목 - 회색 체크
                            }
                            alt="선택" 
                            className="w-6 h-6"
                            />
                        </div>
                        )}
                        </button>
                    ))}
                    </div>
                )}
                </div>
            </div>


              {/* 확인 버튼 영역 - 480x36, 내부에 오른쪽 정렬 버튼 95x36 */}
              <div className="w-[480px] h-9 flex justify-end">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedPlace}
                  className="w-[95px] h-9 py-1.5 px-[30px] bg-[#292E2E] text-white text-sm font-medium rounded-md hover:bg-[#000000] transition-colors disabled:bg-[#F2F2F2] disabled:text-[#A4A4A4] disabled:cursor-not-allowed"
                >
                  확인
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}