import React, { ReactNode } from "react";

interface CardProps {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className = "",
  onClick,
  children,
}) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
