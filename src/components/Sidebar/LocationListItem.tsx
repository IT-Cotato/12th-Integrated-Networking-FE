interface Props {
    id: string;
    name: string;
    selected: boolean;
    onSelect: () => void;
    onDelete: () => void;
  }
  
  export default function LocationListItem({
    name,
    selected,
    onSelect,
    onDelete,
  }: Props) {
    return (
      <button
        onClick={onSelect}
        className={`group flex items-center gap-3 px-2 py-2 rounded-lg w-full transition-colors cursor-pointer ${
          selected ? "bg-gray-100" : "hover:bg-gray-50"
        }`}
      >
        <img src="/pin-front-color.svg" className="w-6 h-6" />
        <span 
          className="text-[#292E2E] font-semibold text-base leading-normal flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ fontFamily: 'Pretendard, sans-serif' }}
        >
          {name}
        </span>
  
        {/* hover 시 보이는 삭제 버튼 */}
        <img
          src="/trash-can-front-color.svg"
          className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </button>
    );
  }