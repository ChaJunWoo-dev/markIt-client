import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  variant = "primary",
  size = "sm",
  children,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variantStyles = {
    primary: "bg-gray-900 text-white hover:bg-gray-800",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const getSizeClasses = () => {
    if (size === "sm") {
      return variant === "outline" ? "px-[14px] py-[6px] text-sm" : "px-4 py-2 text-sm";
    }
    if (size === "md") {
      return variant === "outline" ? "px-[22px] py-[10px] text-base" : "px-16 py-3 text-base";
    }
    if (size === "lg") {
      return variant === "outline" ? "px-[30px] py-[14px] text-lg" : "px-8 py-4 text-lg";
    }
    return "";
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${getSizeClasses()} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2">처리 중...</span>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </>
      ) : (
        children
      )}
    </button>
  );
};
