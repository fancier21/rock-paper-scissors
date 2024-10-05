import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className = "",
  disabled = false,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
