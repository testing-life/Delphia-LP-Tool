import React, { useEffect, useState } from "react";
import "./WalletConnect.page.css";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useNavigate } from "react-router";
import { Environments } from "../../Enums/environments";
import { Networks } from "../../Enums/networks";

const WalletConnectPage = () => {
  const [reload, setReload] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    wallettInit();
  }, []);

  const wallettInit = async (): Promise<void> => {
    setReload(false);
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "INFURA_ID", // required
        },
      },
    };

    const web3Modal = new Web3Modal({
      network:
        process.env.NODE_ENV === Environments.PROD
          ? Networks.MAINNET
          : Networks.RINKEBY,
      cacheProvider: false,
      providerOptions,
    });
    const provider = await web3Modal.connect().catch(async (e) => {
      console.warn("Reload to connect");
      setReload(true);
    });
    const web3 = new Web3(provider);

    if (web3.currentProvider) {
      navigate("/");
    }
  };

  return (
    <div className="walletConnectPage">
      {reload && (
        <p className="text-white">
          You must refresh the page and connect to proceed
        </p>
      )}
    </div>
  );
};

export default WalletConnectPage;
