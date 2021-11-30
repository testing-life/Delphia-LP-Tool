import React, { FC } from "react";
import { TBalances, TTokens } from "../../../Context/web3.context";
import "./ConnectedWalletDetails.css";

export interface ConnectedWalletDetailsProps {
  error?: boolean;
  balances: TBalances[] | undefined;
  connectedAddress: string;
}

const ConnectedWalletDetails: FC<ConnectedWalletDetailsProps> = ({
  error,
  balances,
  connectedAddress = "",
}) => {
  return (
    <div
      className={`connectedWalletDetails ${
        error ? "connectedWalletDetails--hasError" : ""
      }`}
    >
      {!error &&
        balances &&
        balances.map((balance: { [key: string]: string }) => {
          const key = Object.keys(balance)[0];
          return (
            <span className="connectedWalletDetails__tokenDetails">
              {key} {balance[key as TTokens]}
            </span>
          );
        })}
      {error && <span className="text-white">Unregistered Wallet</span>}
      <span className="connectedWalletDetails__connectedAddress">
        {`${connectedAddress.substring(0, 6)}...${connectedAddress.substring(
          connectedAddress.length - 4,
          connectedAddress.length
        )}`}
      </span>
    </div>
  );
};

export default ConnectedWalletDetails;
