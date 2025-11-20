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
        <img src="/pin-front-color.svg" className="w-6 h-6" />
  
        <span 
          className="text-[#292E2E] font-semibold text-base leading-normal flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ fontFamily: 'Pretendard, sans-serif' }}
        >
          {name}
        </span>
  
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