"use client";

type Props = {
  onSubmit: () => void;
  disabled?: boolean;
};

export default function ConfirmButton({ onSubmit, disabled }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSubmit}
      className="mt-6 w-full rounded-lg bg-blue-500 py-3 text-white disabled:bg-gray-300"
    >
      위치 추가하기
    </button>
  );
}
