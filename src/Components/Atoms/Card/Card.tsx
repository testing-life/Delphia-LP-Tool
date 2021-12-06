import React, { FC, ReactNode } from "react";
import "./Card.css";

export interface CardProps {
  children: ReactNode;
  variant?: "grey";
  classes?: string;
}

const Card: FC<CardProps> = ({ children, variant, classes }) => {
  return (
    <div
      className={`card ${variant === "grey" ? "card--grey" : ""} ${
        classes ? classes : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
