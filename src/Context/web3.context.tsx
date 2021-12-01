import { BigNumber, BigNumberish, ethers } from "ethers";
import React, {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CRDabi } from "../ABI/CRDabi";
import { Tokens } from "../Consts/tokens";
import { TokenAddresses } from "../Enums/tokensAddresses";

export type TWeb3Context = {
  setProvider: any;
  setSigner: any;
  provider: any;
  signer: any;
  error: Error | undefined | string;
  accounts: string[] | undefined;
  balances: TBalances[] | undefined;
  getBalances: (arg: string) => void;
  estimateTokenGain: (arg: BigNumber) => Promise<BigNumberish>;
  estimateTokenCost: (arg: BigNumber) => Promise<BigNumberish>;
  getMaxAllowance: (arg1: TBalances[], arg2: TTokens) => string;
};

interface IWeb3Provider {
  children: ReactNode;
}

export interface ReasonError extends Error {
  reason: string;
}

export type TTokens = "SEC" | "CRD" | "ETH";

export type TBalances = {
  [key in TTokens]: string;
};

const Web3Context = createContext<TWeb3Context>(null!);

const Web3Provider: FC<IWeb3Provider> = (props) => {
  const [provider, setProvider] = useState<any | undefined>(undefined);
  const [signer, setSigner] = useState<any | undefined>(undefined);
  const [balances, setBalances] = useState<TBalances[] | undefined>(undefined);
  const [error, setError] = useState<Error | string>();
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

  const getTokens = async (
    token: { name: string; address: TokenAddresses },
    currentAddress: string
  ) => {
    const contract = new ethers.Contract(token.address, balanceOfABI, signer);
    let balance = undefined;
    try {
      balance = await contract.balanceOf(currentAddress);
      if (balance) {
        return { [token.name]: ethers.utils.formatEther(balance) };
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const getBalances = async (currentAddress: string): Promise<void> => {
    if (!currentAddress) {
      return;
    }
    const resolveTokenRequests = async () => {
      return Promise.all(
        Tokens.map((token) => getTokens(token, currentAddress))
      );
    };

    resolveTokenRequests().then(async (res) => {
      const ethBalance = await signer
        .getBalance()
        .catch((error: any) => console.warn(`ETH balance error`, error));
      if (res && ethBalance) {
        const newBalances = [
          ...res,
          { ETH: ethers.utils.formatEther(ethBalance) },
        ];
        setBalances(newBalances as TBalances[]);
      }
    });
  };

  const getMaxAllowance = (balances: TBalances[], from: TTokens): string => {
    const fromMaxValue = balances?.find((balance) => balance[from]);
    return fromMaxValue ? fromMaxValue[from] : "0";
  };

  const estimateTokenGain = async (val: BigNumber): Promise<BigNumberish> => {
    const contract = new ethers.Contract(TokenAddresses.CRD, CRDabi, signer);
    return await contract.calculateCurvedMintReturn(val);
  };

  const estimateTokenCost = async (val: BigNumber): Promise<BigNumberish> => {
    const contract = new ethers.Contract(TokenAddresses.CRD, CRDabi, signer);
    return await contract.calculateCurvedBurnReturn(val);
  };

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
        estimateTokenGain,
        estimateTokenCost,
        getMaxAllowance,
      }}
      {...props}
    />
  );
};

const useEthProvider = () => useContext(Web3Context);
export { Web3Provider, useEthProvider };
