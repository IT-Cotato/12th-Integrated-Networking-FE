type DeleteModalProps = {
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

export default function DeleteModal({ open, onCancel, onDelete }: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-60 ">
      <div
        className="
          flex flex-col items-center justify-center bg-white rounded-2xl shadow-[4px_4px_4px_3px_rgba(0,0,0,0.25)]
          p-[36px_108px] gap-6 min-w-[360px] max-w-full"
        style={{
          padding: '36px 108px',
          boxShadow: '4px 4px 4px 3px rgba(0,0,0,0.25)',
          borderRadius: 16,
          gap: 24,
        }}
      >
        <div className="text-xl font-bold mb-1 text-center">
          정말로 삭제하시겠습니까?
        </div>
        <img src="/sun.svg" alt="경고" className="my-2 w-[96px] h-[96px]" />
        <div className="flex w-full justify-center gap-6 mt-1">
          <button
            className="
              flex items-center justify-center px-6 py-2 border border-gray-300 rounded-md text-[18px] font-normal
              bg-white hover:bg-gray-100"
            style={{
              padding: '6px 24px',
              borderRadius: 6,
            }}
            onClick={onCancel}
          >
            취소하기
          </button>
          <button
            className="
              flex items-center justify-center px-6 py-2 bg-gray-900 text-white rounded-md
              text-[18px] font-normal hover:bg-gray-700 ml-1"
            style={{
              padding: '6px 24px',
              borderRadius: 6,
            }}
            onClick={onDelete}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
