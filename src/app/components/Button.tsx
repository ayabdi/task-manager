import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  disabled,
  type,
  loading,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-busy={loading}
      className={`
        ${
          disabled
            ? "bg-opacity-45 hover:bg-opacity-45 cursor-not-allowed"
            : "bg-opacity-100 hover:bg-opacity-85 cursor-pointer"
        }
        flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
    >
      {loading && (
        <svg
          className={`animate-spin relative -ml-1.5 my-auto mr-1.5 w-[18px] text-white`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-85"
            fill={"currentColor"}
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
