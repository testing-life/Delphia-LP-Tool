import React, { FC, ReactNode } from "react";
import "./Card.css";

export interface CardProps {
  children: ReactNode;
  variant?: "grey";
  classes?: string;
  size?: 'sm' | 'lg';
}

const Card: FC<CardProps> = ({ children, variant, classes, size }) => {
  return (
    <div
      className={`card ${size} ${variant === "grey" ? "card--grey" : ""} ${classes ? classes : ""
        }`}
    >
      {children}
    </div>
  );
};

export default Card;
