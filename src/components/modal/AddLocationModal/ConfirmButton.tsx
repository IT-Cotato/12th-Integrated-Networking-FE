"use client";

type ConfirmButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export default function ConfirmButton({
  disabled,
  onClick,
}: ConfirmButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`text-body-sm text-gray-0 flex items-center justify-center rounded-[6px] px-[30px] py-[6px] font-medium ${
        disabled
          ? "bg-gray-20 cursor-not-allowed"
          : "bg-gray-60 hover:bg-gray-100"
      } `}
    >
      확인
    </button>
  );
}
