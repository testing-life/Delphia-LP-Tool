import { DotsVerticalIcon } from "@heroicons/react/solid";
import React, { FC, useEffect, useState } from "react";
import { useDialog } from "react-dialog-async";
import { useAuth } from "../../../Context/auth.context";
import { IUser, useUser } from "../../../Context/user.context";
import { useEthProvider } from "../../../Context/web3.context";
import AvatarLink from "../../Atoms/AvatarLink/AvatarLink";
import Button from "../../Atoms/Button/Button";
import IconButton from "../../Atoms/IconButton/IconButton";
import Navigation from "../../Organisms/Navigation/Navigation";
import ConnectedWalletDetails from "../ConnectedWalletDetails/ConnectedWalletDetails";
import TransactionStatusLink from "../TransactionStatusLink/TransactionStatusLink";
import PendingDialog from "./PendingDialog/PendingDialog";
interface TopBarProps {
  currentAddress: string;
  accounts: string[];
  addressError: boolean;
}
const TopBar: FC<TopBarProps> = ({ currentAddress, addressError }) => {
  const { logout } = useAuth();
  const pendingDialog = useDialog(PendingDialog);
  const { provider, balances, getBalances, pending } = useEthProvider();
  const [isShown, setIsShown] = useState<boolean>(false);
  const reconnect = async () => {
    try {
      await provider.send("eth_requestAccounts", []);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const handleClick = async () => {
    await pendingDialog.show({ pending }).catch((e) => console.log(`e`, e));
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
            {currentAddress && !addressError && pending.length ? (
              <TransactionStatusLink
                onClick={handleClick}
                transactionCount={pending.length}
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
            <IconButton onClick={() => setIsShown((prev) => !prev)}>
              <DotsVerticalIcon className="h-6 w-6 text-black" />
            </IconButton>
            {isShown && (
              <div className="z-10 p-2 absolute right-0 top-12 rounded bg-white">
                <Button variant="primary" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            )}
          </>
        }
      ></Navigation>
      {addressError && (
        <p className="text-white bg-red-600 py-2 text-center">
          Connected wallet address is unregistered.
        </p>
      )}
    </>
  );
};

export default TopBar;
