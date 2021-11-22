import React, { FC, useEffect, useState } from "react";
import Card from "../../Components/Atoms/Card/Card";
import TopBar from "../../Components/Molecules/TopBar/TopBar";
import { IUser, useUser } from "../../Context/user.context";
import { useEthProvider } from "../../Context/web3.context";
import toast, { Toaster } from "react-hot-toast";
import Toast from "../../Components/Molecules/Toast/Toast";

const DashboardPage: FC = () => {
  const user = useUser();
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const { accounts, signer } = useEthProvider();
  const [addressError, setAddressError] = useState<boolean>(false);

  useEffect(() => {
    setAddressError(false);
    if (accounts?.length) {
      getAddress();
    } else {
      setCurrentAddress(null);
    }
  }, [user, accounts]);

  useEffect(() => {
    if (currentAddress && (user as IUser).addresses.length) {
      const isRegistered = (user as IUser).addresses.includes(
        currentAddress as string
      );
      setAddressError(!isRegistered);
    }
  }, [currentAddress]);

  const getAddress = async () => {
    const address = await signer
      .getAddress()
      .catch((error: any) => console.warn(`address error`, error));
    setCurrentAddress(address);
  };
  const notify = (variant: any) =>
    toast.custom(
      <Toast
        variant={variant}
        message="Transaction successfull"
        etherscanUrl="https://ecosia.org"
        onClose={() => toast.dismiss()}
      />
    );
  return (
    <section>
      <TopBar
        currentAddress={currentAddress as string}
        accounts={accounts as string[]}
        addressError={addressError}
      />
      <br />
      <button onClick={() => notify("error")}>toast</button>
      <br />
      <button onClick={() => notify("success")}>toast succ</button>
      <div className="bg-gray-800 text-gray-900 flex h-screen justify-center items-start pt-28 relative">
        {addressError && (
          <Card>
            <h1 className="text-3xl font-semibold mb-5 text-center">
              Unregistered Wallet
            </h1>
            <p className="text-sm font-normal text-center">
              The wallet you have connected is not registered with Delphia.
              Please connect a registered wallet to swap tokens.
            </p>
          </Card>
        )}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
          }}
          containerStyle={{
            marginTop: "3rem",
          }}
        />
      </div>
    </section>
  );
};

export default DashboardPage;
