import React, { FC, ReactNode } from "react";
import "./Card.css";

export interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;
