import { BigNumber, ethers } from "ethers";
import React, { FC, useEffect, useState } from "react";
import { useDialog } from "react-dialog-async";
import { SECabi } from "../../../ABI/SECabi";
import { Tokens } from "../../../Consts/tokens";
import { useEthProvider } from "../../../Context/web3.context";
import { TokenAddresses } from "../../../Enums/tokensAddresses";
import Button from "../../Atoms/Button/Button";
import "./SwapApproval.css";
import SwapApprovalDialog from "./SwapApprovalDialog/SwapApprovalDialog";

export interface SwapApprovalProps {
  token: "SEC" | "CRD";
}
const SwapApproval: FC<SwapApprovalProps> = ({ token }) => {
  const confirmationDialog = useDialog(SwapApprovalDialog);
  const [dialogResult, setDialogResult] = useState<any>();
  const { provider, signer } = useEthProvider();

  const otherToken = Tokens.find(({ name }) => name !== token)?.name;
  const handleClick = async () => {
    const gasEstimate = await getEstimate().catch((e) =>
      console.log(`gas estimate error`, e)
    );
    if (gasEstimate) {
      const response = await confirmationDialog
        .show({ token, otherToken, gasEstimate })
        .catch((e) => console.log(`dialog error`, e));
      setDialogResult(response);
    }
  };

  const getEstimate = async (): Promise<BigNumber> => {
    const contract = new ethers.Contract(TokenAddresses.SEC, SECabi, signer);
    const amount = Number.MAX_SAFE_INTEGER - 1;
    return await contract.estimateGas.approve(TokenAddresses.CRD, amount);
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold mb-5">Unlock Access</h1>
      <p className="text-sm font-normal mb-14">
        First time swapping {token}? Please approve Delphia to swap your tokens
      </p>
      <Button fullWidth variant="primary" onClick={handleClick}>
        Continue
      </Button>
      <p className="text-gray-600 text-sm text-center mt-4">
        We will only ask you to do this once.
      </p>
    </section>
  );
};

export default SwapApproval;
