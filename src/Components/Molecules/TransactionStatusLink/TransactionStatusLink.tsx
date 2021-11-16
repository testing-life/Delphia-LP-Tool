import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./TransactionStatusLink.css";
import { ExternalLinkIcon } from "@heroicons/react/solid";
export interface TransactionStatusLinkProps {
  path: string;
  transactionCount: number;
}

const TransactionStatusLink: FC<TransactionStatusLinkProps> = ({
  path,
  transactionCount,
}) => {
  return (
    <Link className="transactionStatusLink" to={path}>
      <span>{transactionCount} Pending</span>
      <ExternalLinkIcon className="w-5 h-5" />
    </Link>
  );
};

export default TransactionStatusLink;
