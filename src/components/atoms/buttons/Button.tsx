import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Spinner } from "../Loading";

// Tailwind Variants configuration
const buttonVars = tv({
  base: "relative active:top-[1px] py-3 px-8 font-semibold rounded-lg shadow-md transition-all duration-200 hover:opacity-90",
  variants: {
    color: {
      primary: "bg-white text-black",
      danger: "bg-black text-white",
      dark: "bg-black text-white",
      success: "bg-black text-white",
    },
    disabled: {
      true: "bg-gray-300 text-gray-500 active:top-0 cursor-not-allowed opacity-50 hover:opacity-50",
    },
    bordered: {
      true: "border-2 bg-transparent",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  compoundVariants: [
    {
      color: "primary",
      bordered: true,
      className: "text-black border-black bg-transparent hover:bg-gray-100",
    },
    {
      color: "danger",
      bordered: true,
      className: "text-black border-black bg-transparent hover:bg-gray-100",
    },
    {
      color: "dark",
      bordered: true,
      className: "text-black border-black bg-transparent hover:bg-gray-100",
    },
    {
      color: "success",
      bordered: true,
      className: "text-black border-black bg-transparent hover:bg-gray-100",
    },
    {
      color: "primary",
      disabled: true,
      className: "bg-gray-300 text-gray-500 border-0",
    },
    {
      color: "danger",
      disabled: true,
      className: "bg-gray-300 text-gray-500 border-0",
    },
    {
      color: "dark",
      disabled: true,
      className: "bg-gray-300 text-gray-500 border-0",
    },
    {
      color: "success",
      disabled: true,
      className: "bg-gray-300 text-gray-500 border-0",
    },
  ],
  defaultVariants: {
    color: "primary",
  },
});

type ButtonVariants_TP = VariantProps<typeof buttonVars>;

type FormikValues_TP = Record<string, unknown>;

interface ButtonProps_TP extends ButtonVariants_TP {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  action?: (param?: FormikValues_TP) => void;
  variant?: "primary" | "danger" | "dark" | "success";
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  bordered?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  variant,
  children,
  className = "",
  disabled,
  action,
  loading,
  type = "button",
  bordered = false,
  fullWidth = false,
  ...props
}: ButtonProps_TP) => {
  const loadingClass = loading
    ? "inline-flex justify-center items-center gap-2"
    : "";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={buttonVars({
        color: variant,
        disabled: disabled || loading,
        bordered: bordered,
        fullWidth: fullWidth,
        className: `${loadingClass} ${className}`,
      })}
      onClick={() => action?.()}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};