import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./TransactionStatusLink.css";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import Button from "../../Atoms/Button/Button";
import Spinner from "../../Atoms/Spinner/Spinner";

export interface TransactionStatusLinkProps {
  transactionCount: number;
  onClick: () => void;
}

const TransactionStatusLink: FC<TransactionStatusLinkProps> = ({
  transactionCount,
  onClick,
}) => {
  return (
    <Button variant="primary" classes="flex gap-3" size="sm" onClick={onClick}>
      <Spinner />
      <span>{transactionCount} Pending</span>
    </Button>
  );
};

export default TransactionStatusLink;
