import React, { FC, ReactNode } from "react";
import "./SwapSummaryItem.css";

export interface SwapSummaryItemProps {
  children?: ReactNode;
  label: string;
  value: string;
}
const SwapSummary: FC<SwapSummaryItemProps> = ({ children, label, value }) => {
  return (
    <div className="swapSummaryItem">
      <dt className="swapSummaryItem__label">
        {label} {children}
      </dt>
      <dd className="swapSummaryItem__value">{value}</dd>
    </div>
  );
};

export default SwapSummary;
