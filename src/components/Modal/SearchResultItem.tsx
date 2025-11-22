interface Props {
  name: string;
  address: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function SearchResultItem({ name, address, selected, onClick }: Props) {
  return (
    <div 
      className="relative flex flex-col items-start gap-1 self-stretch py-2 px-3 border-b border-[#A4A4A4] cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      {/* 장소 이름 */}
      <span 
        className="text-black font-medium text-base leading-normal"
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        {name}
      </span>
      
      {/* 주소 */}
      <span 
        className="text-[#A4A4A4] font-normal text-xs leading-normal"
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        {address}
      </span>

      {/* 선택 체크 아이콘 */}
      {selected && (
        <img 
          src="/tick-front-color.svg" 
          alt="선택됨" 
          className="absolute w-9 h-9 aspect-square right-2 bottom-[7.5px]"
        />
      )}
    </div>
  );
}

