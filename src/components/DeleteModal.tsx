type DeleteModalProps = {
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

export default function DeleteModal({
  open,
  onCancel,
  onDelete,
}: DeleteModalProps) {
  if (!open) return null;

  return (
    <>
      <div className="bg-gray60/40 fixed top-0 left-0 h-screen w-screen"></div>
      <div className="bg-gray-60 fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="flex max-w-full min-w-[360px] flex-col items-center justify-center gap-6 rounded-2xl bg-white p-[36px_108px] shadow-[4px_4px_4px_3px_rgba(0,0,0,0.25)]"
          style={{
            padding: '36px 108px',
            boxShadow: '4px 4px 4px 3px rgba(0,0,0,0.25)',
            borderRadius: 16,
            gap: 24,
          }}
        >
          <div className="mb-1 text-center text-xl font-bold">
            정말로 삭제하시겠습니까?
          </div>
          <img src="/sun.svg" alt="경고" className="my-2 h-[96px] w-[96px]" />
          <div className="mt-1 flex w-full justify-center gap-6">
            <button
              className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-2 text-[18px] font-normal hover:bg-gray-100"
              style={{
                padding: '6px 24px',
                borderRadius: 6,
              }}
              onClick={onCancel}
            >
              취소하기
            </button>
            <button
              className="ml-1 flex items-center justify-center rounded-md bg-gray-900 px-6 py-2 text-[18px] font-normal text-white hover:bg-gray-700"
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
    </>
  );
}
