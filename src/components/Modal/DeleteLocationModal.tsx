interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteLocationModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="w-[545px] h-[354px] rounded-2xl opacity-100 bg-white shadow-[4px_4px_4px_3px_#00000040]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 컨텐츠 컨테이너 */}
        <div className="flex py-9 px-[108px] flex-col justify-center items-center gap-6">
          {/* 모달 제목 */}
          <span
            className="text-[#292E2E] font-bold text-[32px]"
            style={{ fontFamily: 'Pretendard, sans-serif', lineHeight: 'normal' }}
          >
            정말로 삭제하시겠습니까?
          </span>

          {/* 이미지 */}
          <div className="flex w-[160px] h-[160px] justify-center items-center aspect-square">
            <img
              src="/Night Storm.svg"
              alt="삭제 확인"
              className="w-full h-full"
            />
          </div>

          {/* 버튼 컨테이너 */}
          <div className="flex justify-center items-start gap-4 self-stretch">
            <button className="!flex !py-[6px] !px-6 !justify-center !items-center !w-[118px] !h-[36px] !rounded-md !bg-white !border !border-[#292E2E] !p-0 !m-0 !font-inherit !cursor-pointer whitespace-nowrap">
              <span
                className="font-semibold text-[20px] text-[#292E2E] whitespace-nowrap"
                style={{ fontFamily: 'Pretendard, sans-serif', lineHeight: 'normal' }}
              >
                취소하기
              </span>
            </button>
            <button className="!flex !py-[6px] !px-6 !justify-center !items-center !w-[118px] !h-[36px] !rounded-md !bg-[#292E2E] !border-none !p-0 !m-0 !font-inherit !cursor-pointer whitespace-nowrap">
              <span
                className="font-semibold text-[20px] text-white whitespace-nowrap"
                style={{ fontFamily: 'Pretendard, sans-serif', lineHeight: 'normal' }}
              >
                삭제하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
