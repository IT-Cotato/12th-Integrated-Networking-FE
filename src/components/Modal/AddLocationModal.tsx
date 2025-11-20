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
        className="bg-white rounded-2xl w-[624px] h-[641px] pt-9 pr-[72px] pb-9 pl-[72px] shadow-[4px_4px_4px_3px_#00000040]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더와 검색 영역을 감싸는 컨테이너 */}
        <div className="flex flex-col items-start gap-12 h-full">
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
