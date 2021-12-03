import { Signer } from "crypto";
import { CRDabi } from "../ABI/CRDabi";
import { SECabi } from "../ABI/SECabi";
import { TokenAddresses } from "../Enums/tokensAddresses";

export interface IApprovalConfig {
  owner: string;
  abi: typeof SECabi | typeof CRDabi;
  account: string | undefined;
  spender: string;
  signer: typeof Signer | undefined;
}

export const secApprovalConfig: IApprovalConfig = {
  owner: TokenAddresses.SEC,
  abi: SECabi,
  account: undefined,
  spender: TokenAddresses.CRD,
  signer: undefined,
};
export const crdApprovalConfig: IApprovalConfig = {
  owner: TokenAddresses.CRD,
  abi: CRDabi,
  account: undefined,
  spender: TokenAddresses.SEC,
  signer: undefined,
};
