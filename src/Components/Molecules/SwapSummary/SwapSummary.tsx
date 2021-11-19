import React, { Children, FC, ReactNode } from "react";
export interface SwapSummaryProps {
  children: ReactNode;
}
const SwapSummary: FC<SwapSummaryProps> = ({ children }) => {
  const count = Children.count(children);
  return (
    <dl>{count > 1 ? (children as []).map((child) => child) : children}</dl>
  );
};

export default SwapSummary;
