import { BigNumber, ethers } from "ethers";
import React, {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { SECabi } from "../ABI/SECabi";
import { Tokens } from "../Consts/tokens";
import { TokenAddresses } from "../Enums/tokensAddresses";

export type TWeb3Context = {
  setProvider: any;
  setSigner: any;
  provider: any;
  signer: any;
  error: Error | undefined;
  accounts: string[] | undefined;
  balances: TBalances[] | undefined;
  getBalances: (arg: string) => void;
  getApprovalEstimate: () => Promise<BigNumber>;
  approveSwapping: (
    source: TokenAddresses,
    spender: TokenAddresses,
    abi: any
  ) => Promise<BigNumber>;
};

interface IWeb3Provider {
  children: ReactNode;
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

  const getApprovalEstimate = async (): Promise<BigNumber> => {
    const contract = new ethers.Contract(TokenAddresses.SEC, SECabi, signer);
    const amount = Number.MAX_SAFE_INTEGER - 1;
    return await contract.estimateGas.approve(TokenAddresses.CRD, amount);
  };

  const approveSwapping = async (
    source: TokenAddresses,
    spender: TokenAddresses,
    abi: any
  ): Promise<BigNumber> => {
    const contract = new ethers.Contract(source, abi, signer);
    const amount = Number.MAX_SAFE_INTEGER - 1;
    return await contract.approve(spender, amount);
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
        getApprovalEstimate,
        approveSwapping,
      }}
      {...props}
    />
  );
};

const useEthProvider = () => useContext(Web3Context);
export { Web3Provider, useEthProvider };
