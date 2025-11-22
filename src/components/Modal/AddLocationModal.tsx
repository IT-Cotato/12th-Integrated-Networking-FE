interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddLocationModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-[624px] h-[641px] shadow-[4px_4px_4px_3px_#00000040] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 (우측 상단) - 모달 경계 기준 */}
        <button
          onClick={onClose}
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
                className="flex-1 outline-none border-none bg-transparent text-left"
                style={{ fontFamily: 'Pretendard, sans-serif' }}
              />
              {/* 검색 아이콘 */}
              <button
                type="button"
                className="!w-6 !h-6 !p-0 !m-0 !bg-transparent !border-none !outline-none !rounded-none flex items-center justify-center flex-shrink-0 ml-2 cursor-pointer"
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
        </div>
      </div>
    </div>
  );
}
