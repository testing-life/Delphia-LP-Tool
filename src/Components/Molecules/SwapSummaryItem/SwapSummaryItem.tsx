import React, { FC, ReactNode } from "react";
import "./SwapSummaryItem.css";

export interface SwapSummaryItemProps {
  children?: ReactNode;
  label: string;
  value: string;
  dollarCost?: string;
}
const SwapSummary: FC<SwapSummaryItemProps> = ({ children, label, value, dollarCost = '' }) => {
  return (
    <div className="swapSummaryItem">
      <dt className="swapSummaryItem__label">
        {label} {children}
      </dt>
      <dd className="swapSummaryItem__value">{value} {dollarCost && <p className='text-gray-600 text-sm text-right'>~ ${dollarCost}</p>}</dd>
    </div>
  );
};

export default SwapSummary;
