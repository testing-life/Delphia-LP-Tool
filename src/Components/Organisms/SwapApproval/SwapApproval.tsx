import React, { FC, useEffect, useState } from "react";
import { useDialog } from "react-dialog-async";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { CRDabi } from "../../../ABI/CRDabi";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { getApprovalEstimate, approveSwapping } = useEthProvider();

  const otherToken = Tokens.find(({ name }) => name !== token)?.name;
  const handleClick = async () => {
    const gasEstimate = await getApprovalEstimate().catch((e) =>
      console.log(`gas estimate error`, e)
    );

    if (gasEstimate) {
      setIsLoading(true);
      const response = await confirmationDialog
        .show({ token, otherToken, gasEstimate })
        .catch((e) => console.log(`dialog error`, e));
      if (response) {
        let approval = null;
        if (token === "SEC") {
          approval = await approveSwapping(
            TokenAddresses.SEC,
            TokenAddresses.CRD,
            SECabi
          ).catch((e) => console.log(`approval error`, e));
        }

        if (token === "CRD") {
          approval = await approveSwapping(
            TokenAddresses.CRD,
            TokenAddresses.SEC,
            CRDabi
          ).catch((e) => console.log(`approval error`, e));
        }
        if (approval) {
          setIsLoading(false);
          window.location.reload();
        }
      }
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold mb-5">Unlock Access</h1>
      <p className="text-sm font-normal mb-14">
        First time swapping {token}? Please approve Delphia to swap your tokens.
        <span className="underline" data-tip data-for="learn-more">
          Learn more.
        </span>
        <ReactTooltip
          clickable={true}
          id="learn-more"
          effect="solid"
          place="bottom"
          className="max-w-sm"
        >
          <span>
            Our app uses Ethereum smart contracts to automate transactions. To
            use a smart contract, you must first allow it to access the tokens
            in your wallet.
          </span>
        </ReactTooltip>
      </p>
      <Button
        loading={isLoading}
        fullWidth
        variant="primary"
        onClick={handleClick}
      >
        Continue
      </Button>

      <p className="text-gray-600 text-sm text-center mt-4">
        We will only ask you to do this once.
      </p>
    </section>
  );
};

export default SwapApproval;
