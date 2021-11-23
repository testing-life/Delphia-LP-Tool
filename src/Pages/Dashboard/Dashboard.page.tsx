import React, { FC, useEffect, useState } from "react";
import Card from "../../Components/Atoms/Card/Card";
import TopBar from "../../Components/Molecules/TopBar/TopBar";
import { IUser, useUser } from "../../Context/user.context";
import { useEthProvider } from "../../Context/web3.context";
import toast, { Toaster } from "react-hot-toast";
import Toast from "../../Components/Molecules/Toast/Toast";
import Tabs from "../../Components/Molecules/Tabs/Tabs";
import Tab from "../../Components/Molecules/Tab/Tab";
import Swap from "../../Components/Swap/Swap";
import { ethers } from "ethers";
import { SECabi } from "../../ABI/SECabi";
import { CRDabi } from "../../ABI/CRDabi";
import { Tokens } from "../../Consts/tokens";
import { TokenAddresses } from "../../Enums/tokensAddresses";

const DashboardPage: FC = () => {
  const user = useUser();
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const { accounts, signer, balances, getBalances } = useEthProvider();
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
      getBalances(currentAddress);
      // getBalance();
      // getSECBalance();
      // getCRDBalance();
    }
  }, [currentAddress]);

  const getAddress = async () => {
    const address = await signer
      .getAddress()
      .catch((error: any) => console.warn(`address error`, error));
    setCurrentAddress(address);
  };

  const getBalance = async () => {
    const balance = await signer
      .getBalance()
      .catch((error: any) => console.warn(`address error`, error));
    console.log(`balance`, balance);
  };

  const getSECBalance = async () => {
    const contract = new ethers.Contract(
      TokenAddresses.SEC,
      [
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
          ],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      signer
    );

    const balance = await contract
      .balanceOf(currentAddress)
      .catch((error: any) => console.warn(`address error`, error));
    console.log(`contract`, contract);
    console.log(
      `balance secccccccccccccccccccccccc`,
      ethers.utils.formatEther(balance)
    );
  };

  const getCRDBalance = async () => {
    const contract = new ethers.Contract(TokenAddresses.CRD, CRDabi, signer);

    const balance = await contract
      .balanceOf(currentAddress)
      .catch((error: any) => console.warn(`address error`, error));
    console.log(`contract`, contract);
    console.log(`balance crd`, ethers.utils.formatEther(balance));
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
      {console.log(`balances`, balances)}
      <TopBar
        currentAddress={currentAddress as string}
        accounts={accounts as string[]}
        addressError={addressError}
      />
      {/* <br />
      <button onClick={() => notify("error")}>toast</button>
      <br />
      <button onClick={() => notify("success")}>toast succ</button> */}
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
        {!addressError && (
          <Tabs labels={["Swap SEC", "Swap CRD"]}>
            <Tab>
              <Card>
                <Swap from="SEC" to="CRD" />
              </Card>
            </Tab>
            <Tab>
              <Card>
                <Swap from="CRD" to="SEC" />
              </Card>
            </Tab>
          </Tabs>
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
