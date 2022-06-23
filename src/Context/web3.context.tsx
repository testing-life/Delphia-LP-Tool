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
import { BigNumber as BN } from "bignumber.js";
import { RequestUrl } from "../Consts/requestUrls";
import { NetworkDictionary, NetworkIds, Networks } from "../Enums/networks";
import { Environments } from "../Enums/environments";

export type TWeb3Context = {
  currentAddress: string | undefined;
  setProvider: any;
  setSigner: any;
  provider: any;
  signer: any;
  error: Error | undefined | string;
  accounts: string[] | undefined;
  balances: TBalances[] | undefined;
  pending: NamedTransactionResponse[];
  isAllowed: boolean;
  removeFromPending: (receipt: TransactionReceipt) => void;
  addToPending: (tx: NamedTransactionResponse) => void;
  getBalances: (arg: string) => void;
  estimateTokenGain: (arg: BigNumber) => Promise<BigNumberish>;
  estimateTokenCost: (arg: BigNumber) => Promise<BigNumberish>;
  getMaxAllowance: (arg1: TBalances[], arg2: TTokens) => string;
  getApprovalEstimate: () => Promise<BigNumber>;
  getSwapCostEstimate: (
    source: TTokens,
    values: ITxValues
  ) => Promise<BigNumber>;
  swap: (
    from: TTokens,
    value: BigNumber
  ) => Promise<TransactionResponse | undefined>;
  approveSwapping: (
    source: TokenAddresses,
    spender: TokenAddresses,
    abi: any
  ) => Promise<TransactionResponse>;
  setCurrentAddress: (arg: string | undefined) => void;
  toUSD: (arg: any) => any
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
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<string | undefined>(
    undefined
  );
  const [accounts, setAccounts] = useState<string[]>([]);
  const [pending, setPending] = useState<NamedTransactionResponse[]>([]);
  const crdContract = new ethers.Contract(TokenAddresses.CRD, CRDabi, signer);

  useEffect(() => {
    if (provider) {
      // Subscribe to accounts change
      provider.provider.on("accountsChanged", accountsChangeHandler);

      // Subscribe to chainId change
      provider.provider.on("chainChanged", networkChangeHandler);
      getInitialNetwork()
    }
  }, [provider]);

  useEffect(() => {
    if (!error && currentAddress) {
      isWhiteListed(currentAddress);
    }
  }, [currentAddress])

  const accountsChangeHandler = async (accounts: string[]) => {
    if (!accounts.length) {
      setIsAllowed(true);
    }
    await isWhiteListed(accounts[0]);
    setAccounts(accounts);
  };

  const getInitialNetwork = async () => {
    const network = await provider.getNetwork().catch((e: any) => console.log(`network id error`, e));
    let id = (NetworkDictionary as any)[network.chainId] || NetworkDictionary.na;

    if (id) {
      networkChangeHandler(id);
    }
  }

  const networkChangeHandler = async (networkId: NetworkIds) => {
    if (networkId !== NetworkIds.RINKEBY_ID && networkId !== NetworkIds.MAINNET_ID) {
      setError(`Wrong Network. Please connect either to ${Networks.MAINNET} or ${Networks.RINKEBY}`);
      return;
    }
    if (process.env.REACT_APP_ENV === Environments.PROD && networkId !== NetworkIds.MAINNET_ID) {
      setError(`Wrong Network. Please connect to ${Networks.MAINNET}`);
      return;
    }
    if (process.env.REACT_APP_ENV === Environments.DEV && networkId !== NetworkIds.RINKEBY_ID) {
      setError(`Wrong Network. Please connect to ${Networks.RINKEBY}`);
      return;
    }
    setError(undefined)
  };

  const isWhiteListed = async (address: string): Promise<void> => {
    if (!address) {
      return;
    }
    const contract = new ethers.Contract(TokenAddresses.SEC, SECabi, provider.getSigner());
    const res = await contract.isInWhitelist(address).catch((e: Error) => console.log(`e`, e));
    setIsAllowed(res)
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
        ].filter(item => !!item);
        setBalances(newBalances as TBalances[]);
      }
    });
  };

  const getMaxAllowance = (balances: TBalances[], from: TTokens): string => {
    const fromMaxValue = balances?.find((balance) => balance[from]);
    return fromMaxValue ? fromMaxValue[from] : "0";
  };

  const estimateTokenGain = async (val: BigNumber): Promise<BigNumberish> => {
    return await crdContract.calculateCurvedMintReturn(val);
  };

  const estimateTokenCost = async (val: BigNumber): Promise<BigNumberish> => {
    return await crdContract.calculateCurvedBurnReturn(val);
  };

  const getApprovalEstimate = async (): Promise<BigNumber> => {
    const contract = new ethers.Contract(TokenAddresses.SEC, SECabi, signer);
    const gas = await gasPrice();
    const initAmount = BigInt(2 ** 255);
    const amount = BigNumber.from(initAmount);
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

  const getEthPrice = async () => {
    return await fetch(RequestUrl.ETH_TO_USD);
  }

  const toUSD = async (tokens: BigNumber): Promise<string> => {
    const res = await getEthPrice().catch(e => console.log(`e`, e))
    let usdPrice = null;
    if (res) {
      const data = await res.json();
      const string = ethers.utils.formatEther(tokens);
      const bn = new BN(string);
      usdPrice = bn.multipliedBy(data['ethereum'].usd)
    }
    return usdPrice ? usdPrice.toFormat(2) : '0';
  }

  const getSwapCostEstimate = async (
    source: TTokens,
    values: ITxValues
  ): Promise<BigNumber> => {
    let estimate = null;
    const gas = await gasPrice();
    const min = BigNumber.from(1);

    switch (source) {
      case "SEC":
        estimate = await crdContract.estimateGas
          .bondToMint(values?.fromValue, min)
          .catch((e) => console.log(`Gas estimate error`, e));
        break;
      case "CRD":
        estimate = await crdContract.estimateGas
          .burnToWithdraw(values?.toValue, min)
          .catch((e) => console.log(`Gas estimate error`, e));
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
    value: BigNumber
  ): Promise<TransactionResponse | undefined> => {
    const min = BigNumber.from(1);
    switch (from) {
      case "SEC":
        return await crdContract.bondToMint(value, min);
      case "CRD":
        return await crdContract.burnToWithdraw(value, min);
      default:
        throw new Error("No Token provided for swap");
        break;
    }
  };

  const approveSwapping = async (
    source: TokenAddresses,
    spender: TokenAddresses,
    abi: any
  ): Promise<TransactionResponse> => {
    const contract = new ethers.Contract(source, abi, signer);
    const initAmount = BigInt(2 ** 255);
    const amount = BigNumber.from(initAmount);
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

  return (
    <Web3Context.Provider
      value={{
        currentAddress,
        provider,
        signer,
        setProvider,
        setSigner,
        error,
        accounts,
        balances,
        pending,
        isAllowed,
        swap,
        getBalances,
        estimateTokenGain,
        estimateTokenCost,
        getMaxAllowance,
        getApprovalEstimate,
        approveSwapping,
        getSwapCostEstimate,
        addToPending,
        removeFromPending,
        setCurrentAddress,
        toUSD
      }}
      {...props}
    />
  );
};

const useEthProvider = () => useContext(Web3Context);
export { Web3Provider, useEthProvider };
