import React, { FC, ReactNode } from "react";
import "./IconButton.css";

export interface IconButtonProps {
  onClick: () => void;
  children: ReactNode;
  classes?: string;
}

const IconButton: FC<IconButtonProps> = ({ children, onClick, classes }) => {
  return (
    <button className={`iconButton ${classes}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
