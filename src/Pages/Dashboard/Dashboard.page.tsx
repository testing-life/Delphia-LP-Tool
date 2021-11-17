// auth app vs unauth app here

import { DotsVerticalIcon } from "@heroicons/react/solid";
import React, { FC, useEffect, useState } from "react";
import AvatarLink from "../../Components/Atoms/AvatarLink/AvatarLink";
import Button from "../../Components/Atoms/Button/Button";
import IconButton from "../../Components/Atoms/IconButton/IconButton";
import ConnectedWalletDetails from "../../Components/Molecules/ConnectedWalletDetails/ConnectedWalletDetails";
import TransactionStatusLink from "../../Components/Molecules/TransactionStatusLink/TransactionStatusLink";
import Navigation from "../../Components/Organisms/Navigation/Navigation";
import { useAuth } from "../../Context/auth.context";
import { IUser, useUser } from "../../Context/user.context";
import { useEthProvider } from "../../Context/web3.context";
import { isRegistered } from "../../Utils/ethAddress";

const DashboardPage: FC = () => {
  const user = useUser();
  const { logout } = useAuth();
  const [currentAddress, setCurrentAddress] = useState<string>();
  const { provider, signer, setProvider, accounts } = useEthProvider();
  const [addressError, setAddressError] = useState<boolean>(false);
  console.dir(user);
  console.log(`accounts`, accounts);

  useEffect(() => {
    console.log(`object`, accounts);
    if (signer) {
      getAddress();
    }
    if (currentAddress && (user as IUser).addresses.length) {
      isActiveAddressCorrect();
    }
  }, [accounts]);

  const getAddress = async () => {
    const address = await signer.getAddress();
    setCurrentAddress(address);
  };

  const isActiveAddressCorrect = (): void => {
    const result = isRegistered(
      (user as IUser).addresses,
      currentAddress as string
    );
    setAddressError(!result);
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
            <TransactionStatusLink
              path="https://ecosia.org"
              transactionCount={4}
            />
            <ConnectedWalletDetails
              balances={{ SEC: 234, ETH: 323, CRD: 0.3242 }}
              connectedAddress={currentAddress as string}
              error={addressError}
            />
            <Button variant="primary">Connect Wallet</Button>
            <IconButton onClick={() => {}}>
              <DotsVerticalIcon className="h-6 w-6 text-black" />
            </IconButton>
          </>
        }
      ></Navigation>
      <div>
        <button onClick={logout}>logout</button>
      </div>
    </>
  );
};

export default DashboardPage;
