import React, { FC, ReactNode } from "react";
import "./IconButton.css";

export interface IconButtonProps {
  onClick: () => void;
  children: ReactNode;
}

const IconButton: FC<IconButtonProps> = ({ children, onClick }) => {
  return (
    <button className="iconButton" onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
