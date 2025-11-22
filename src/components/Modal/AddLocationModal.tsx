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
          className="absolute top-[16.5px] right-4 w-6 h-6 hover:opacity-70 transition-opacity z-50 cursor-pointer"
          aria-label="닫기"
          type="button"
          style={{ 
            background: 'transparent', 
            border: 'none', 
            boxShadow: 'none',
            outline: 'none',
            padding: 0,
            margin: 0,
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none'
          }}
        >
          <img 
            src="/Vector.svg" 
            alt="닫기" 
            className="block pointer-events-none absolute"
            style={{ 
              width: '16.0115966796875px', 
              height: '16.009889602661133px',
              top: '4px',
              left: '3.99px'
            }}
          />
        </button>

        {/* 모달 헤더와 검색 영역을 감싸는 컨테이너 */}
        <div className="pt-9 pr-18 pb-9 pl-18 flex flex-col items-start gap-12 h-full">
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

          {/* 위치 검색 영역 (추가 예정) */}
        </div>
      </div>
    </div>
  );
}
