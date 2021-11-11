import React, { useEffect, useState } from "react";
import "./WalletConnect.page.css";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useNavigate } from "react-router";

const WalletConnectPage = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    wallettInit();
  }, []);

  const wallettInit = async (): Promise<void> => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "INFURA_ID", // required
        },
      },
    };
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions,
    });
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    console.log(`web3`, web3);
    if (web3) {
      setWeb3(web3);
      navigate("/");
    }
  };

  return <div className="walletConnectPage"></div>;
};

export default WalletConnectPage;
