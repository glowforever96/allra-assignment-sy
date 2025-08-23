import { InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Check } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  success?: string;
  isPasswordInput?: boolean;
  isBusinessNumInput?: boolean;
  isVerified?: boolean;
}

function Input({
  error,
  success,
  isPasswordInput = false,
  isBusinessNumInput = false,
  isVerified = false,
  className,
  ...props
}: InputProps) {
  const [show, setShow] = useState(false);

  const inputType = isPasswordInput
    ? show
      ? "text"
      : "password"
    : props.type || "text";

  const inputElement = (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <input
          {...props}
          type={inputType}
          autoComplete="off"
          className={cn(
            "w-full h-12 bg-bg-default border radius-md px-4 py-[12.5px] text-body-3 placeholder:text-body-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:border-0 disabled:bg-bg-alternative disabled:text-label-700 disabled:placeholder:text-status-disable",
            error
              ? "border-status-error focus-visible:border-status-error"
              : "border-label-200 focus-visible:border-label-900",
            isVerified && "bg-green-50",
            isPasswordInput && "pr-12",
            isBusinessNumInput && isVerified && "pr-12",
            className
          )}
        />
        {isBusinessNumInput && isVerified && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Check size={15} className="text-status-correct" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-caption-1 font-medium text-status-error">{error}</p>
      )}
      {success && !isPasswordInput && (
        <p className="text-caption-1 font-medium text-status-correct">
          {success}
        </p>
      )}
    </div>
  );

  if (!isPasswordInput) return inputElement;

  return (
    <>
      <div className="relative w-full">
        {inputElement}
        <button
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-1 text-line-400 cursor-pointer"
        >
          {show ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      </div>
      {success && isPasswordInput && (
        <p className="text-caption-1 font-medium text-status-correct">
          {success}
        </p>
      )}
    </>
  );
}

export { Input };
