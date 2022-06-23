import {
  TransactionReceipt,
  TransactionResponse,
} from "@ethersproject/providers";
import { ethers } from "ethers";
import React, { FC, useEffect, useState } from "react";
import { useDialog } from "react-dialog-async";
import toast from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import { CRDabi } from "../../../ABI/CRDabi";
import { SECabi } from "../../../ABI/SECabi";
import { Tokens } from "../../../Consts/tokens";
import { NamedTransactionResponse, useEthProvider } from "../../../Context/web3.context";
import { Actions } from "../../../Enums/actions";
import { Environments } from "../../../Enums/environments";
import { ToastMessages } from "../../../Enums/toast-messages";
import { TokenAddresses } from "../../../Enums/tokensAddresses";
import Button from "../../Atoms/Button/Button";
import Toast from "../../Molecules/Toast/Toast";
import "./SwapApproval.css";
import SwapApprovalDialog from "./SwapApprovalDialog/SwapApprovalDialog";

export interface SwapApprovalProps {
  token: "SEC" | "CRD";
  approvalCallback: (txHashUrl: string) => void
}
const SwapApproval: FC<SwapApprovalProps> = ({ token, approvalCallback }) => {
  const confirmationDialog = useDialog(SwapApprovalDialog);
  const [approvalError, setApprovalError] = useState<any | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    getApprovalEstimate,
    approveSwapping,
    provider,
    pending,
    addToPending,
    removeFromPending, toUSD
  } = useEthProvider();
  const otherToken = Tokens.find(({ name }) => name !== token)?.name;

  useEffect(() => {
    if (pending.length) {
      if (isApprovalPending(pending)) {
        setIsLoading(true)
      }
    }
  }, [pending])

  const notify = (
    variant: "error" | "success",
    msg: ToastMessages,
    hash: string | null
  ) => {
    const host = process.env.REACT_APP_ENV === Environments.PROD ? 'https://etherscan.io/' : 'https://rinkeby.etherscan.io/';
    return toast.custom(
      <Toast
        variant={variant}
        message={msg}
        etherscanUrl={hash ? `${host}${hash}` : undefined}
        onClose={() => toast.dismiss()}
      />
    )
  };

  const isApprovalPending = (transactions: NamedTransactionResponse[]) => !!transactions.filter((tx: NamedTransactionResponse) => tx.name === `${Actions.APPROVE} SEC`)


  const handleClick = async () => {
    if (approvalError) {
      setApprovalError(undefined);
    }
    const gasEstimate = await getApprovalEstimate().catch((e) => {
      setApprovalError(e);
      const hash = Object.keys(e).includes('transactionHash') || Object.keys(e).includes('hash') ? `tx/${e!.hash}` || `tx/${e!.transactionHash}` : null;
      notify("error", ToastMessages.TRANSACTION_FAILED, hash);
    });
    if (gasEstimate) {
      const usdPrice = await toUSD(gasEstimate);
      const response = await confirmationDialog
        .show({ token, otherToken, gasEstimate, usdPrice })
        .catch((e) => console.log(`dialog error`, e));
      if (response) {
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
              null
            );
          });
        }

        if (approval) {
          setIsLoading(true);

          addToPending({ ...approval, name: `${Actions.APPROVE} ${token}` });
          const receipt: TransactionReceipt = await provider
            .waitForTransaction(approval.hash)
            .catch((e: any) => {
              console.log(`e`, e);
              setApprovalError(e);
              notify(
                "error",
                ToastMessages.TRANSACTION_FAILED,
                `tx/${receipt!.transactionHash}`
              );
            });
          if (receipt) {
            removeFromPending(receipt);
            setIsLoading(false);
            approvalCallback(`tx/${receipt!.transactionHash}`);
          }
        }
      }
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold mb-5">Unlock Access</h1>
      <p className="text-sm font-normal mb-14">
        First time swapping {token}? Please approve Delphia to swap your tokens.{' '}
        <span className="underline" data-tip data-for="learn-more">
          Learn more.
        </span>
      </p>
      <ReactTooltip
        clickable={true}
        id="learn-more"
        effect="solid"
        place="bottom"
        className="max-w-sm"
      >
        <span>
          Our app uses Ethereum smart contracts to automate transactions. To use a smart contract, you must first allow it to access the tokens in your wallet. This requires a transaction and a one-time fee.
        </span>
      </ReactTooltip>
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
