import cn from "classnames";
import { FormEvent } from "react";

interface InputProps {
  label: string;
  value: string | undefined;
  placeholder?: string;
  type?: string;
  required?: boolean;
  showRequired?: boolean;
  className?: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}
export const Input = ({
  label,
  value,
  type = "text",
  placeholder = "",
  onChange,
  className,
  showRequired = false,
  required = true,
}: InputProps) => {
  return (
    <div className="flex flex-col font-medium mb-4">
      <span className="inline-flex justify-between">
        <label htmlFor={label} className="text-md text-dark-footer my-1 ">
          {label}
        </label>
        {required && showRequired && (
          <p className="text-primary-starberry-red leading-3 text-sm">
            This field is required
          </p>
        )}
      </span>
      <input
        type={type}
        id={label}
        value={value}
        className={cn(
          "border border-neutral-light-gray rounded px-4 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue",
          className,
          showRequired &&
            required &&
            !value &&
            "ring-1 ring-primary-starberry-red"
        )}
        placeholder={placeholder}
        onChange={(e: FormEvent<HTMLInputElement>) => onChange(e)}
      />
    </div>
  );
};
