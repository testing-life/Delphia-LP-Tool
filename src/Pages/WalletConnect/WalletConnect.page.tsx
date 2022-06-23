import React, { useEffect, useState } from "react";
import "./WalletConnect.page.css";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useNavigate } from "react-router";
import { Environments } from "../../Enums/environments";
import { Networks } from "../../Enums/networks";
import { ethers } from "ethers";
import { useEthProvider } from "../../Context/web3.context";

const WalletConnectPage = () => {
  const [reload, setReload] = useState<boolean>(false);
  const { setProvider, setSigner } = useEthProvider();
  const navigate = useNavigate();
  useEffect(() => {
    walletInit();
  }, []);

  const walletInit = async (): Promise<void> => {
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
        process.env.REACT_APP_ENV === Environments.PROD
          ? Networks.MAINNET
          : Networks.RINKEBY,
      cacheProvider: false,
      providerOptions,
    });

    try {
      const modalProvider = await web3Modal.connect();
      const provider =
        modalProvider && new ethers.providers.Web3Provider(modalProvider);
      const ready = provider && (await provider.ready);
      if (ready) {
        setProvider(provider);
        setSigner(provider.getSigner());
        navigate("/");
      }
    } catch (error) {
      setReload(true);
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
