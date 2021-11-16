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
    <a
      target="_blank"
      className="transactionStatusLink"
      rel="noreferrer noopener"
      href={path}
    >
      <span>{transactionCount} Pending</span>
      <ExternalLinkIcon className="w-5 h-5" />
    </a>
  );
};

export default TransactionStatusLink;
