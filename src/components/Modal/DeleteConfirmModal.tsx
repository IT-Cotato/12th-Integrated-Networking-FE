'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  locationName: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
          >
            {/* 모달 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[545px] h-[354px] bg-white rounded-2xl pt-9 pr-[108px] pb-9 pl-[108px] flex flex-col items-center gap-6"
              style={{
                boxShadow: '4px 4px 4px 3px rgba(0, 0, 0, 0.25)'
              }}
            >
              {/* 타이틀 */}
              <h2 className="text-xl font-bold text-bold text-[32px] text-[#292E2E] text-center">
                정말로 삭제하시겠습니까?
              </h2>
              

              {/* 구름 캐릭터 이미지 */}
              <div className="flex-1 flex items-center justify-center">
                <img 
                  src="/Night Storm.svg" 
                  alt="삭제 여부 확인" 
                  className="w-32 h-32 object-contain"
                />
              </div>

              {/* 버튼 그룹 */}
              <div className="flex gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 h-11 bg-white border border-[#D6D6D6] text-[#292E2E] text-sm font-medium rounded-lg hover:bg-[#F6F6F6] transition-colors"
                >
                  취소하기
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 h-11 bg-[#292E2E] text-white text-sm font-medium rounded-lg hover:bg-[#000000] transition-colors"
                >
                  삭제하기
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}