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
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`h-10 rounded-lg px-6 text-sm font-medium text-white ${
          disabled
            ? "cursor-not-allowed bg-gray-300"
            : "bg-gray-900 hover:bg-black"
        }`}
      >
        확인
      </button>
    </div>
  );
}
