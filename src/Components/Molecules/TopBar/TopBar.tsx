import { DotsVerticalIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/auth.context";
import { IUser, useUser } from "../../../Context/user.context";
import { useEthProvider } from "../../../Context/web3.context";
import AvatarLink from "../../Atoms/AvatarLink/AvatarLink";
import Button from "../../Atoms/Button/Button";
import IconButton from "../../Atoms/IconButton/IconButton";
import Navigation from "../../Organisms/Navigation/Navigation";
import ConnectedWalletDetails from "../ConnectedWalletDetails/ConnectedWalletDetails";
import TransactionStatusLink from "../TransactionStatusLink/TransactionStatusLink";

const TopBar = () => {
  const user = useUser();
  const { logout } = useAuth();
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const { provider, signer, accounts } = useEthProvider();
  const [addressError, setAddressError] = useState<boolean>(false);

  useEffect(() => {
    if (signer) {
      getAddress();
    }
  }, []);

  useEffect(() => {
    setAddressError(false);
    if (accounts?.length) {
      setCurrentAddress(accounts[0]);
    } else {
      setCurrentAddress(null);
    }
  }, [accounts]);

  useEffect(() => {
    if (currentAddress && (user as IUser).addresses.length) {
      isActiveAddressCorrect((user as IUser).addresses, currentAddress);
    }
  }, [currentAddress]);

  const getAddress = async () => {
    const address = await signer
      .getAddress()
      .catch((error: any) => console.warn(`error`, error));
    setCurrentAddress(address);
  };

  const isActiveAddressCorrect = (
    addresses: string[],
    currentAddress: string
  ): void => {
    const result = addresses.includes(currentAddress);
    setAddressError(!result);
  };

  const reconnect = async () => {
    try {
      await provider.send("eth_requestAccounts", []);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

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
                balances={{ SEC: 234, ETH: 323, CRD: 0.3242 }}
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
