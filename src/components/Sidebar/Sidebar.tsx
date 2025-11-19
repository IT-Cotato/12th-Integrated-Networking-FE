export default function Sidebar() {
    return (
      <div className="fixed left-0 top-0 w-[248px] h-[1200px] pt-12 pb-12 px-4 flex flex-col items-start gap-10 rounded-r-[48px] bg-white shadow-[2px_0_4px_rgba(0,0,0,0.10)]">
        {/* 위치 목록 */}
        <div className="flex items-center gap-4">
          <img src="/map-pin-front-color.svg" alt="위치" className="w-10 h-10" />
          <span className="text-[#292E2E] font-bold text-xl leading-normal" style={{ fontFamily: 'Pretendard, sans-serif' }}>위치 목록</span>
        </div>

        {/* 추가하기 */}
        <div className="flex items-center gap-4">
          <img src="/plus-front-clay.svg" alt="추가" className="w-10 h-10" />
          <span className="text-[#292E2E] font-bold text-xl leading-normal" style={{ fontFamily: 'Pretendard, sans-serif' }}>추가하기</span>
        </div>
      </div>
    );
  }
  