interface InputProps {
  wrapperClassName?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  endIcon?: React.ReactNode;
}

export default function Input({
  wrapperClassName,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
  endIcon,
}: InputProps) {
  return (
    <div className={wrapperClassName}>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent"
        value={value}
        onChange={onChange}
        required={required}
      />
      {endIcon && <div className="ml-2">{endIcon}</div>}
    </div>
  );
}
