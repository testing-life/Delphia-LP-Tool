import React, {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

export type TWeb3Context = {
  setProvider: any;
  setSigner: any;
  provider: any;
  signer: any;
  error: Error | undefined;
  accounts: string[] | undefined;
};

interface IWeb3Provider {
  children: ReactNode;
}

const Web3Context = createContext<TWeb3Context>(null!);

const Web3Provider: FC<IWeb3Provider> = (props) => {
  const [provider, setProvider] = useState<any | undefined>(undefined);
  const [signer, setSigner] = useState<any | undefined>(undefined);
  const [error, setError] = useState<Error>();
  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    setExistingProvider();
  }, []);

  useEffect(() => {
    if (provider) {
      // Subscribe to accounts change
      provider.provider.on("accountsChanged", accountsChangeHandler);

      // Subscribe to chainId change
      provider.provider.on("chainChanged", (chainId: any) => {
        console.log(`chainId`, chainId);
      });

      // Subscribe to networkId change
      provider.provider.on("networkChanged", (networkId: any) => {
        console.log(`networkId`, networkId);
      });

      listAccounts();
    }
  }, [provider]);

  const accountsChangeHandler = async (accounts: string[]) => {
    setAccounts(accounts);
  };

  const setExistingProvider = async (): Promise<void> => {
    const existingProvider = await detectEthereumProvider();
    if (!existingProvider) {
      return;
    }
    const newProvider =
      existingProvider &&
      new ethers.providers.Web3Provider(existingProvider as any);
    if (newProvider) {
      setProvider(newProvider);
      setSigner((newProvider as any).getSigner());
    }
  };

  const listAccounts = async (): Promise<void> => {
    const newAccounts = await provider.listAccounts();
    setAccounts(newAccounts);
  };

  return (
    <Web3Context.Provider
      value={{ provider, signer, setProvider, setSigner, error, accounts }}
      {...props}
    />
  );
};

const useEthProvider = () => useContext(Web3Context);
export { Web3Provider, useEthProvider };
