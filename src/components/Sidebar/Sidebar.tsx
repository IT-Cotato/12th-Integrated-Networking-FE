// 더미 데이터 타입
interface LocationItem {
  id: string;
  name: string;
  isSelected: boolean;
}

// API 연동 전, 화면 구성을 위한 더미 데이터
const dummyLocations: LocationItem[] = [
  { id: '1', name: '강남역 1번 출구', isSelected: false},
  { id: '2', name: 'RATTHAT', isSelected: false },
  { id: '3', name: '파이홀', isSelected: false},
  { id: '4', name: '청수당공명', isSelected: false },
  { id: '5', name: '롯데월드', isSelected: true},
  { id: '6', name: '구관', isSelected: false},
  { id: '7', name: 'Osiu', isSelected: false },
];

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

        {/* 위치 목록 아이템 */}
        <div className="flex flex-col w-full">
          {dummyLocations.map((location) => (
            <div
              key={location.id}
              className={`flex items-center px-6 py-4 rounded-lg w-full ${
                location.isSelected ? 'bg-gray-100' : ''
              }`}
            >
              <img
                src={'/pin-front-color.svg'}
                alt="위치"
                className="w-6 h-6"
              />
              <span
                className="text-[#292E2E] font-bold flex-1"
                style={{ fontFamily: 'Pretendard, sans-serif' }}
              >
                {location.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
