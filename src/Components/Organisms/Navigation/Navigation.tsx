import React, { FC, PropsWithChildren, ReactNode } from "react";
import "./Navigation.css";
export interface NavigationProps {
  leftAligned: PropsWithChildren<ReactNode>;
  rightAligned: PropsWithChildren<ReactNode>;
}
const Navigation: FC<NavigationProps> = ({ leftAligned, rightAligned }) => {
  return (
    <header className="outerNav">
      <div className="innerNav">
        <div className="flex">{leftAligned}</div>
        <div className="flex gap-3 items-center">{rightAligned}</div>
      </div>
    </header>
  );
};

export default Navigation;
