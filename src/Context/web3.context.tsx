import React, {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ethers } from "ethers";

export type TWeb3Context = {
  setProvider: any;
  setSigner: any;
  provider: any;
  signer: any;
  error: Error | undefined;
};

interface IWeb3Provider {
  children: ReactNode;
}

const Web3Context = createContext<TWeb3Context>(null!);

const Web3Provider: FC<IWeb3Provider> = (props) => {
  const [provider, setProvider] = useState<any | undefined>(undefined);
  const [signer, setSigner] = useState<any | undefined>(undefined);
  const [error, setError] = useState<Error>();

  return (
    <Web3Context.Provider
      value={{ provider, signer, setProvider, setSigner, error }}
      {...props}
    />
  );
};

const useEthProvider = () => useContext(Web3Context);
export { Web3Provider, useEthProvider };
