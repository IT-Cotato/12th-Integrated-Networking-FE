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
        className="bg-white rounded-2xl w-[624px] h-[641px] pt-9 pr-[72px] pb-9 pl-[72px] flex flex-col gap-12 shadow-[4px_4px_4px_3px_#00000040]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 빈 모달 화면 */}
      </div>
    </div>
  );
}
