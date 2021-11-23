import { ethers } from "ethers";
import React, {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Tokens } from "../Consts/tokens";

export type TWeb3Context = {
  setProvider: any;
  setSigner: any;
  provider: any;
  signer: any;
  error: Error | undefined;
  accounts: string[] | undefined;
  balances: { [key: string]: string };
  getBalances: (arg: string) => void;
};

interface IWeb3Provider {
  children: ReactNode;
}

interface IBalances {
  SEC: any;
  CRD: any;
  ETH: any;
}

const Web3Context = createContext<TWeb3Context>(null!);

const Web3Provider: FC<IWeb3Provider> = (props) => {
  const [provider, setProvider] = useState<any | undefined>(undefined);
  const [signer, setSigner] = useState<any | undefined>(undefined);
  const [balances, setBalances] = useState<any | undefined>(undefined);
  const [error, setError] = useState<Error>();
  const [accounts, setAccounts] = useState<string[]>([]);

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

  const listAccounts = async (): Promise<void> => {
    const newAccounts = await provider.listAccounts();
    setAccounts(newAccounts);
  };
  const balanceOfABI = [
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const getBalances = async (currentAddress: string) => {
    let bal: any = {};
    Tokens.forEach(async (token) => {
      const contract = new ethers.Contract(token.address, balanceOfABI, signer);
      const balance = await contract
        .balanceOf(currentAddress)
        .catch((error: Error) => console.log(`error`, error));
      if (balance) {
        bal[token.name] = ethers.utils.formatEther(balance);
      }
    });
    // const ethBalance = await signer
    //   .getBalance()
    //   .catch((error: any) => console.warn(`address error`, error));
    // if (ethBalance) {
    //   bal["ETH"] = ethers.utils.formatEther(ethBalance);
    // }
    console.log(`bal`, bal);
    if (Object.keys(bal).length) {
      setBalances(bal);
    }
  };

  // const contract = new ethers.Contract(
  //   TokenAddresses.SEC,
  //   [
  //     {
  //       inputs: [
  //         { internalType: "address", name: "account", type: "address" },
  //       ],
  //       name: "balanceOf",
  //       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //   ],
  //   signer
  // );
  // const balance = await contract
  //   .balanceOf(currentAddress)
  //   .catch((error: any) => console.warn(`address error`, error));
  // console.log(`contract`, contract);
  // console.log(
  //   `balance secccccccccccccccccccccccc`,
  //   ethers.utils.formatEther(balance)
  // );

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        setProvider,
        setSigner,
        error,
        accounts,
        balances,
        getBalances,
      }}
      {...props}
    />
  );
};

const useEthProvider = () => useContext(Web3Context);
export { Web3Provider, useEthProvider };
