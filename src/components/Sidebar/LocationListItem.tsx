interface Props {
    id: string;
    name: string;
    selected: boolean;
    pinned: boolean;
    onSelect: () => void;
    onPin: () => void;
    onDelete: () => void;
  }
  
  export default function LocationListItem({
    name,
    selected,
    pinned,
    onSelect,
    onPin,
    onDelete,
  }: Props) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        className={`
          group flex items-center gap-3 px-2 py-2 w-full cursor-pointer select-none transition-all
          ${selected 
            ? "bg-[#F2F2F2] rounded-xl shadow-[-2px_2px_2px_1px_rgba(0,0,0,0.10)]" 
            : "rounded-lg hover:bg-gray-50"
          }
          outline-none focus:outline-none focus-visible:outline-none
        `}
      >
        {/* 핀 아이콘 */}
        <img 
          src={pinned ? "/pin-front-color.svg" : "/pin-front-clay.svg"} 
          className="w-6 h-6 cursor-pointer" 
          alt="위치"
          onClick={(e) => {
            e.stopPropagation();
            onPin();
          }}
        />

        {/* 위치 이름 */}
        <span 
          className="text-[#292E2E] font-semibold text-base leading-normal flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ fontFamily: 'Pretendard, sans-serif' }}
        >
          {name}
        </span>

        {/* hover 시 보이는 삭제 아이콘 */}
        <img
          src="/trash-can-front-color.svg"
          className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </div>
    );
  }