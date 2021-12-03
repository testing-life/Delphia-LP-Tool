import {
  TransactionReceipt,
  TransactionResponse,
} from "@ethersproject/providers";
import { ethers } from "ethers";
import React, { FC, useState } from "react";
import { useDialog } from "react-dialog-async";
import toast from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import { CRDabi } from "../../../ABI/CRDabi";
import { SECabi } from "../../../ABI/SECabi";
import { Tokens } from "../../../Consts/tokens";
import { useEthProvider } from "../../../Context/web3.context";
import { ToastMessages } from "../../../Enums/toast-messages";
import { TokenAddresses } from "../../../Enums/tokensAddresses";
import Button from "../../Atoms/Button/Button";
import Toast from "../../Molecules/Toast/Toast";
import "./SwapApproval.css";
import SwapApprovalDialog from "./SwapApprovalDialog/SwapApprovalDialog";

export interface SwapApprovalProps {
  token: "SEC" | "CRD";
}
const SwapApproval: FC<SwapApprovalProps> = ({ token }) => {
  const confirmationDialog = useDialog(SwapApprovalDialog);
  const [approvalError, setApprovalError] = useState<any | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    getApprovalEstimate,
    approveSwapping,
    provider,
    addToPending,
    removeFromPending,
  } = useEthProvider();
  const otherToken = Tokens.find(({ name }) => name !== token)?.name;

  const notify = (
    variant: "error" | "success",
    msg: ToastMessages,
    link: string
  ) =>
    toast.custom(
      <Toast
        variant={variant}
        message={msg}
        etherscanUrl={link}
        onClose={() => toast.dismiss()}
      />
    );

  const handleClick = async () => {
    if (approvalError) {
      setApprovalError(undefined);
    }
    const gasEstimate = await getApprovalEstimate().catch((e) => {
      console.log(`gas estimate error`, e);
      setApprovalError(e);
      notify("error", ToastMessages.TRANSACTION_FAILED, "https://ecosia.org");
    });

    if (gasEstimate) {
      const response = await confirmationDialog
        .show({ token, otherToken, gasEstimate })
        .catch((e) => console.log(`dialog error`, e));
      if (response) {
        setIsLoading(true);
        let approval: TransactionResponse | null | void = null;
        if (token === "SEC") {
          approval = await approveSwapping(
            TokenAddresses.SEC,
            TokenAddresses.CRD,
            SECabi
          ).catch((e) => {
            console.log(`approval error`, e);
            setApprovalError(e);
            notify(
              "error",
              ToastMessages.TRANSACTION_FAILED,
              "https://ecosia.org"
            );
          });
        }

        if (token === "CRD") {
          approval = await approveSwapping(
            TokenAddresses.CRD,
            TokenAddresses.SEC,
            CRDabi
          ).catch((e) => {
            console.log(`approval error`, e);
            setApprovalError(e);
            notify(
              "error",
              ToastMessages.TRANSACTION_FAILED,
              "https://ecosia.org"
            );
          });
        }
        if (approval) {
          addToPending({ ...approval, name: `Approve ${token}` });
          const receipt: TransactionReceipt = await provider
            .waitForTransaction(approval.hash)
            .catch((e: any) => {
              console.log(`e`, e);
              setApprovalError(e);
              notify(
                "error",
                ToastMessages.TRANSACTION_FAILED,
                "https://ecosia.org"
              );
            });
          if (receipt) {
            removeFromPending(receipt);
            setIsLoading(false);
            window.location.reload();
          }
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
