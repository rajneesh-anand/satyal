import React, { InputHTMLAttributes, useState, Fragment } from "react";
import cn from "classnames";
import { Eye } from "@components/icons/eye-icon";
import { EyeOff } from "@components/icons/eye-off-icon";
import Link from "../link";
import { usePopper } from "react-popper";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label: string;
  name: string;
  forgotPageLink?: string;
  forgotPassHelpText?: string;
  helperText?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  error: string | undefined;
  forgotPageRouteOnClick?: () => void;
}

const classes = {
  root: "py-2 px-4 w-full appearance-none transition duration-150 ease-in-out border text-input text-13px lg:text-sm font-body rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-skin-base",
  normal:
    "bg-gray-100 border-gray-300 focus:shadow focus:bg-skin-fill focus:border-skin-primary",
  solid:
    "bg-skin-fill border-skin-two focus:border-2 focus:outline-none focus:border-skin-primary h-11 md:h-12",
  outline: "border-gray-300 focus:border-skin-primary",
  shadow: "focus:shadow",
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      label,
      name,
      error,
      children,
      variant = "normal",
      shadow = false,
      type = "text",
      forgotPageLink,
      forgotPassHelpText,
      helperText,
      forgotPageRouteOnClick,
      ...rest
    },
    ref
  ) => {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      modifiers: [{ name: "arrow", options: { element: arrowElement } }],
    });
    const [show, setShow] = useState(false);
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === "normal",
        [classes.solid]: variant === "solid",
        [classes.outline]: variant === "outline",
      },
      {
        [classes.shadow]: shadow,
      },
      inputClassName
    );

    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={name} className="font-semibold text-sm text-body">
            {label}
          </label>

          {helperText && (
            <>
              <button type="button" ref={setReferenceElement}>
                <i className="icofont-info-circle"></i>
              </button>

              <div
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
              >
                {helperText}
                <div ref={setArrowElement} style={styles.arrow} />
              </div>
            </>
          )}

          {forgotPageLink && (
            <Link
              href={forgotPageLink}
              className="text-xs text-accent transition-colors duration-200 focus:outline-none focus:text-accent-700 focus:font-semibold hover:text-accent-hover"
            >
              {forgotPassHelpText}
            </Link>
          )}
          {forgotPageRouteOnClick && (
            <button
              onClick={forgotPageRouteOnClick}
              type="button"
              className="text-xs text-accent transition-colors duration-200 focus:outline-none focus:text-accent-700 focus:font-semibold hover:text-accent-hover"
            >
              {forgotPassHelpText}
            </button>
          )}
        </div>
        <div className="relative">
          <input
            id={name}
            name={name}
            type={show ? "text" : "password"}
            ref={ref}
            className={rootClassName}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...rest}
          />
          <label
            htmlFor={name}
            className="absolute ltr:right-4 rtl:left-4 top-4 -mt-2 text-body cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOff className="w-6 h-6 " />
            ) : (
              <Eye className="w-6 h-6" />
            )}
          </label>
        </div>

        {error && (
          <p className="my-2 text-13px text-skin-red text-opacity-70">
            {error}
          </p>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
