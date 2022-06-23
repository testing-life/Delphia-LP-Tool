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
import SwapApproval from "../../Components/Organisms/SwapApproval/SwapApproval";
import {
  IApprovalConfig,
  secApprovalConfig,
} from "../../Consts/approvalConfig";
import { ToastMessages } from "../../Enums/toast-messages";
import { Environments } from "../../Enums/environments";

const DashboardPage: FC = () => {
  const user = useUser();
  const {
    accounts,
    signer,
    setCurrentAddress,
    currentAddress,
    isAllowed,
    error
  } = useEthProvider();
  const [isSECapproved, setIsSECapproved] = useState<boolean>(false);

  useEffect(() => {
    if (!error) {
      getAddress();
    }
  }, [user, accounts, error]);

  useEffect(() => {
    if (!error && currentAddress) {
      const secConfig: IApprovalConfig = {
        ...secApprovalConfig,
        account: currentAddress,
        signer,
      };
      getIsApproved(secConfig);
    }
  }, [currentAddress, error]);

  const getAddress = async () => {
    const address = await signer
      .getAddress()
      .catch((error: any) => console.warn(`address error`, error));
    setCurrentAddress(address);
  };

  const getIsApproved = async (args: IApprovalConfig) => {
    const { owner, abi, account, spender } = args;
    const contract = new ethers.Contract(owner, abi, signer);
    try {
      const res = await contract
        .allowance(currentAddress, spender)
        .catch((err: any) => {
          if (err.reason === 'underlying network changed') {
            window.location.reload();
          }
          console.dir(err)
        });
      if (res) {
        setIsSECapproved(res.gt(0));
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const notify = (
    variant: "error" | "success",
    msg: ToastMessages,
    hash: string
  ) => {
    const host = process.env.REACT_APP_ENV === Environments.PROD ? 'https://etherscan.io/' : 'https://rinkeby.etherscan.io/';
    return toast.custom(
      <Toast
        variant={variant}
        message={msg}
        etherscanUrl={`${host}${hash}`}
        onClose={() => toast.dismiss()}
      />
    )
  };
  const approvalCallback = (hashUrl: string) => {
    setIsSECapproved(true);
    notify('success', ToastMessages.TRANSACTION_SUCCESSFUL, hashUrl)
  }

  return (
    <section>
      <TopBar
        currentAddress={currentAddress as string}
        accounts={accounts as string[]}
        addressError={!isAllowed}
      />
      {error && <p className="text-white bg-red-600 py-2 text-center">
        {error}
      </p>}
      <div className="bg-gray-800 text-gray-900 flex h-screen justify-center items-start pt-28 relative">
        {currentAddress && !error && !isAllowed && (
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
        {currentAddress && !error && isAllowed && (
          <Tabs labels={["Swap SEC", "Swap CRD"]}>
            <Tab>
              <Card>
                {isSECapproved ? (
                  <Swap from="SEC" to="CRD" />
                ) : (
                  <SwapApproval token="SEC" approvalCallback={(hashUrl) => approvalCallback(hashUrl)} />
                )}
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
            marginTop: "4rem",
          }}
        />
      </div>
    </section>
  );
};

export default DashboardPage;
