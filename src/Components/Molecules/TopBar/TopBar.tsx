import { DotsVerticalIcon } from "@heroicons/react/solid";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../../Context/auth.context";
import { IUser, useUser } from "../../../Context/user.context";
import { useEthProvider } from "../../../Context/web3.context";
import AvatarLink from "../../Atoms/AvatarLink/AvatarLink";
import Button from "../../Atoms/Button/Button";
import IconButton from "../../Atoms/IconButton/IconButton";
import Navigation from "../../Organisms/Navigation/Navigation";
import ConnectedWalletDetails from "../ConnectedWalletDetails/ConnectedWalletDetails";
import TransactionStatusLink from "../TransactionStatusLink/TransactionStatusLink";
interface TopBarProps {
  currentAddress: string;
  accounts: string[];
  addressError: boolean;
}
const TopBar: FC<TopBarProps> = ({ currentAddress, addressError }) => {
  const { logout } = useAuth();
  const { provider, balances, getBalances } = useEthProvider();

  const reconnect = async () => {
    try {
      await provider.send("eth_requestAccounts", []);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getBalances(currentAddress);
  }, [currentAddress]);

  return (
    <>
      <Navigation
        leftAligned={
          <AvatarLink
            path="/"
            imgSrc="https://duckduckgo.com/assets/icons/meta/DDG-icon_256x256.png"
          />
        }
        rightAligned={
          <>
            {currentAddress && !addressError ? (
              <TransactionStatusLink
                path="https://ecosia.org"
                transactionCount={4}
              />
            ) : null}
            {currentAddress ? (
              <ConnectedWalletDetails
                balances={balances}
                connectedAddress={currentAddress as string}
                error={addressError}
              />
            ) : null}
            {!currentAddress && (
              <Button variant="primary" onClick={() => reconnect()}>
                Connect Wallet
              </Button>
            )}
            <IconButton onClick={() => {}}>
              <DotsVerticalIcon className="h-6 w-6 text-black" />
            </IconButton>
          </>
        }
      ></Navigation>
      {addressError && (
        <p className="text-white bg-red-600 py-2 text-center">
          Connected wallet address is unregistered.
        </p>
      )}
      <button onClick={logout}>logout</button>
    </>
  );
};

export default TopBar;
