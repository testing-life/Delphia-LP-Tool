import React, { FC } from "react";
import Card from "../../Atoms/Card/Card";
import "./SwapApproval.css";

export interface SwapApprovalProps {
  token: "SEC" | "CRD";
}
const SwapApproval: FC<SwapApprovalProps> = ({ token }) => {
  return <section>approve {token}</section>;
};

export default SwapApproval;
