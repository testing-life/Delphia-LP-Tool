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
import { SECabi } from "../ABI/SECabi";
import { Tokens } from "../Consts/tokens";
import { TokenAddresses } from "../Enums/tokensAddresses";
import {
  TransactionReceipt,
  TransactionResponse,
} from "@ethersproject/providers";
import { ITxValues } from "../Components/Swap/Swap";

export type TWeb3Context = {
  setProvider: any;
  setSigner: any;
  provider: any;
  signer: any;
  error: Error | undefined | string;
  accounts: string[] | undefined;
  balances: TBalances[] | undefined;
  pending: TransactionResponse[];
  removeFromPending: (receipt: TransactionReceipt) => void;
  addToPending: (tx: NamedTransactionResponse) => void;
  getBalances: (arg: string) => void;
  estimateTokenGain: (arg: BigNumber) => Promise<BigNumberish>;
  estimateTokenCost: (arg: BigNumber) => Promise<BigNumberish>;
  getMaxAllowance: (arg1: TBalances[], arg2: TTokens) => string;
  disproveSwapping: (
    source: TokenAddresses,
    spender: TokenAddresses,
    abi: any
  ) => Promise<TransactionResponse>;
  getApprovalEstimate: () => Promise<BigNumber>;
  getSwapCostEstimate: (from: TTokens, values: ITxValues) => Promise<BigNumber>;
  swap: (from: TTokens, values: ITxValues) => Promise<BigNumber | undefined>;
  approveSwapping: (
    source: TokenAddresses,
    spender: TokenAddresses,
    abi: any
  ) => Promise<TransactionResponse>;
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

export interface NamedTransactionResponse extends TransactionResponse {
  name: string;
}

const Web3Context = createContext<TWeb3Context>(null!);

const Web3Provider: FC<IWeb3Provider> = (props) => {
  const [provider, setProvider] = useState<any | undefined>(undefined);
  const [signer, setSigner] = useState<any | undefined>(undefined);
  const [balances, setBalances] = useState<TBalances[] | undefined>(undefined);
  const [error, setError] = useState<Error | string>();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [pending, setPending] = useState<NamedTransactionResponse[]>([]);

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

  const getApprovalEstimate = async (): Promise<BigNumber> => {
    const contract = new ethers.Contract(TokenAddresses.SEC, SECabi, signer);
    const gas = await gasPrice();
    const amount = 2 ** 255;
    const gasEstimate = await contract.estimateGas.approve(
      TokenAddresses.CRD,
      amount
    );
    if (gas && gasEstimate) {
      const txCostEstimate = gas.mul(gasEstimate);
      return txCostEstimate;
    } else {
      throw new Error("Cannot get Approval gas estimate");
    }
  };

  const getSwapCostEstimate = async (
    from: TTokens,
    values: ITxValues
  ): Promise<BigNumber> => {
    let estimate = null;
    let contract = null;
    const gas = await gasPrice();
    const min = BigNumber.from(1);

    switch (from) {
      case "SEC":
        contract = new ethers.Contract(TokenAddresses.CRD, CRDabi, signer);
        estimate = await contract.estimateGas.bondToMint(
          values?.fromValue,
          min
        );
        break;
      case "CRD":
        contract = new ethers.Contract(TokenAddresses.SEC, SECabi, signer);
        estimate = await contract.estimateGas.burnToWithdraw(
          values?.toValue,
          min
        );
        break;
      default:
        throw new Error("Missing swap token name");
    }

    if (gas && estimate) {
      const txCostEstimate = gas.mul(estimate);
      return txCostEstimate;
    } else {
      throw new Error("Cannot get Swap gas estimate");
    }
  };

  const swap = async (
    from: TTokens,
    values: ITxValues
  ): Promise<BigNumber | undefined> => {
    let contract = null;
    const min = BigNumber.from(1);
    switch (from) {
      case "SEC":
        contract = new ethers.Contract(TokenAddresses.CRD, CRDabi, signer);
        return await contract.bondToMint(values?.fromValue, min);
      case "CRD":
        contract = new ethers.Contract(TokenAddresses.SEC, SECabi, signer);
        return await contract.burnToWithdraw(values?.toValue, min);
      default:
        break;
    }
  };

  const approveSwapping = async (
    source: TokenAddresses,
    spender: TokenAddresses,
    abi: any
  ): Promise<TransactionResponse> => {
    const contract = new ethers.Contract(source, abi, signer);
    const amount = 2 ** 255;
    return await contract.approve(spender, amount);
  };

  const addToPending = (tx: NamedTransactionResponse): void => {
    const newPendingState = [...pending, tx];
    setPending(newPendingState);
  };

  const removeFromPending = (receipt: TransactionReceipt): void => {
    const newPendingState = pending.filter(
      (item: NamedTransactionResponse) => item.hash !== receipt.transactionHash
    );
    setPending(newPendingState);
  };

  const gasPrice = async () => await provider.getGasPrice();

  // for testing
  const disproveSwapping = async (
    source: TokenAddresses,
    spender: TokenAddresses,
    abi: any
  ): Promise<TransactionResponse> => {
    const contract = new ethers.Contract(source, abi, signer);
    const amount = Number.MAX_SAFE_INTEGER - 1;
    return await contract.decreaseAllowance(spender, amount);
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
        pending,
        swap,
        getBalances,
        estimateTokenGain,
        estimateTokenCost,
        getMaxAllowance,
        getApprovalEstimate,
        approveSwapping,
        getSwapCostEstimate,
        disproveSwapping,
        addToPending,
        removeFromPending,
      }}
      {...props}
    />
  );
};

const useEthProvider = () => useContext(Web3Context);
export { Web3Provider, useEthProvider };
