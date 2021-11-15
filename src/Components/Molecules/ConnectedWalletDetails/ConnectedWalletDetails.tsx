import React, { FC } from "react";
import "./ConnectedWalletDetails.css";

export interface ConnectedWalletDetailsProps {
  error: boolean;
  balances: { [key: string]: number };
  connectedAddress: string;
}

const ConnectedWalletDetails: FC<ConnectedWalletDetailsProps> = ({
  error,
  balances,
  connectedAddress,
}) => {
  return (
    <div
      className={`connectedWalletDetails ${
        error ? "connectedWalletDetails--hasError" : ""
      }`}
    >
      {!error &&
        balances &&
        Object.entries(balances).map((balance) => {
          const token = balance[0];
          const value = balance[1];
          return (
            <span className="connectedWalletDetails__tokenDetails">
              {token} {value}
            </span>
          );
        })}
      {error && <span className="text-white">Unregistered Wallet</span>}
      <span className="connectedWalletDetails__connectedAddress">
        {connectedAddress}
      </span>
    </div>
  );
};

export default ConnectedWalletDetails;
