import { TransactionReceipt } from "@ethersproject/providers";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { BigNumber } from "ethers";
import { ethers } from "ethers";
import React, { FC, useEffect, useState } from "react";
import { useDialog } from "react-dialog-async";
import toast from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import { ReasonError, useEthProvider } from "../../Context/web3.context";
import { Actions } from "../../Enums/actions";
import { ToastMessages } from "../../Enums/toast-messages";
import debounce from "../../Utils/debounce";
import Button from "../Atoms/Button/Button";
import TokenAvatar from "../Atoms/TokenAvatar/TokenAvatar";
import MaxCurrencyInput from "../Molecules/MaxCurrencyInput/MaxCurrencyInput";
import SwapInput from "../Molecules/SwapInput/SwapInput";
import SwapSummary from "../Molecules/SwapSummary/SwapSummary";
import SwapSummaryItem from "../Molecules/SwapSummaryItem/SwapSummaryItem";
import Toast from "../Molecules/Toast/Toast";
import "./Swap.css";
import ConfirmationDialog from "./SwapDialog/SwapDialog";

interface SwapProps {
  from: "SEC" | "CRD";
  to: "SEC" | "CRD";
}

export interface ITxValues {
  toValue?: BigNumber | undefined;
  toValueFormatted?: string | undefined;
  fromValue?: BigNumber | undefined;
  fromValueFormatted?: string | undefined;
}

const txInitialState: ITxValues = {
  toValue: undefined,
  fromValue: undefined,
  toValueFormatted: "",
  fromValueFormatted: "",
};

const Swap: FC<SwapProps> = ({ from, to }) => {
  const confirmationDialog = useDialog(ConfirmationDialog);
  const [dialogResult, setDialogResult] = useState<any>();
  const [txValues, setTxValues] = useState<ITxValues>(txInitialState);
  const [estimatesError, setEstimatesError] = useState<string>();
  const {
    balances,
    currentAddress,
    estimateTokenGain,
    estimateTokenCost,
    getMaxAllowance,
    getSwapCostEstimate,
    swap,
    addToPending,
    removeFromPending,
    getBalances,
    provider,
  } = useEthProvider();

  const handleClick = async () => {
    const source = txValues?.fromValue ? from : to;
    const gasFeeEstimate = await getSwapCostEstimate(
      source,
      txValues as ITxValues
    );
    const response = await confirmationDialog
      .show({
        from,
        to,
        txValues: txValues as ITxValues,
        action: Actions.SWAP,
        gasFeeEstimate: gasFeeEstimate,
      })
      .catch((e) => console.log(`e`, e));
    setDialogResult(response);
  };

  useEffect(() => {
    console.log(`dialogResult`, dialogResult);
    if (dialogResult) {
      swapTokens();
    }
  }, [dialogResult]);

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

  const swapTokens = async () => {
    const res = await swap(from, txValues.toValue as BigNumber).catch(
      (e: any) => {
        console.log(`approval error`, e);
        notify("error", ToastMessages.TRANSACTION_FAILED, "https://ecosia.org");
      }
    );
    if (res) {
      addToPending({ ...res, name: `${Actions.SWAP} ${from}` });
      const receipt: TransactionReceipt = await provider
        .waitForTransaction(res.hash)
        .catch((e: any) => {
          console.log(`e`, e);
          notify(
            "error",
            ToastMessages.TRANSACTION_FAILED,
            "https://ecosia.org"
          );
        });
      if (receipt) {
        removeFromPending(receipt);
        notify(
          "success",
          ToastMessages.TRANSACTION_SUCCESSFUL,
          "https://ecosia.org"
        );
        setDialogResult(false);
        if (currentAddress) {
          getBalances(currentAddress);
        }
        setTxValues(txInitialState);
      }
    }
  };

  const onChangeFrom = debounce(async (event: string) => {
    if (estimatesError) {
      setEstimatesError(undefined);
    }

    if (event === txValues.fromValueFormatted) {
      return;
    }

    if (!event) {
      setTxValues(txInitialState);
      return;
    }

    const fromValue: BigNumber = ethers.utils.parseUnits(event as string, 18);
    const estimate = await estimateTokenGain(fromValue).catch((error) => {
      setEstimatesError((error as ReasonError).reason);
    });
    if (estimate) {
      const newTxObj: ITxValues = {
        fromValue,
        fromValueFormatted: ethers.utils.formatEther(fromValue),
        toValue: estimate as BigNumber,
        toValueFormatted: ethers.utils.formatEther(estimate),
      };

      setTxValues(newTxObj);
    }
  }, 500);

  const onChangeTo = debounce(async (event: string) => {
    if (estimatesError) {
      setEstimatesError(undefined);
    }

    if (event === txValues.toValueFormatted) {
      return;
    }

    if (!event) {
      setTxValues(txInitialState);
      return;
    }

    const toValue: BigNumber = ethers.utils.parseUnits(event as string, 18);
    const estimate = await estimateTokenCost(toValue).catch((error) => {
      setEstimatesError((error as ReasonError).reason);
    });
    if (estimate) {
      const newTxObj: ITxValues = {
        fromValue: estimate as BigNumber,
        fromValueFormatted: ethers.utils.formatEther(estimate),
        toValue,
        toValueFormatted: ethers.utils.formatEther(toValue),
      };

      setTxValues(newTxObj);
    }
  }, 500);

  return (
    <section className="swap">
      <SwapInput label="Swap from">
        <TokenAvatar
          caption={from}
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/b/be/Ecosia-like_logo.svg"
        />
        <MaxCurrencyInput
          maxValue={balances && getMaxAllowance(balances, from)}
          name="from"
          onChange={onChangeFrom}
          placeholder="0.0"
          type="text"
          value={txValues.fromValueFormatted as string}
          error={!!estimatesError}
        />
      </SwapInput>
      <SwapInput label="Swap to">
        <TokenAvatar
          caption={to}
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/b/be/Ecosia-like_logo.svg"
        />
        <MaxCurrencyInput
          name="to"
          onChange={onChangeTo}
          placeholder="0.0"
          type="text"
          value={txValues.toValueFormatted as string}
          error={!!estimatesError}
        />
      </SwapInput>
      <SwapSummary>
        <SwapSummaryItem label={`Current ${to} Price`} value={`0.15 ${from}`}>
          <>
            <QuestionMarkCircleIcon
              className="w-6 h-6 text-gray-400 ml-2"
              data-tip
              data-for="tooltip-trigger1"
            />
            <ReactTooltip
              id="tooltip-trigger1"
              clickable={true}
              effect="solid"
              place="bottom"
            >
              <span>
                The price of 1 {to}. Price changes dynamically based on the
                amount you purchase.
              </span>
            </ReactTooltip>
          </>
        </SwapSummaryItem>
        <SwapSummaryItem
          label="Your receive"
          value={`${txValues.toValueFormatted || 0}  ${to}`}
        >
          <>
            <QuestionMarkCircleIcon
              className="w-6 h-6 text-gray-400 ml-2"
              data-tip
              data-for="tooltip-trigger2"
            />
            <ReactTooltip
              id="tooltip-trigger2"
              clickable={true}
              effect="solid"
              place="bottom"
            >
              <span>The amount of {to} you will recieve. </span>
            </ReactTooltip>
          </>
        </SwapSummaryItem>
      </SwapSummary>
      {!txValues.fromValue && !txValues.toValue && (
        <p className="text-sm text-gray-600 mb-10 text-right">
          Enter amount to see calculation
        </p>
      )}
      <Button
        variant="primary"
        disabled={!txValues.fromValue && !txValues.toValue}
        fullWidth
        classes="mb-4"
        onClick={handleClick}
      >
        {!txValues.fromValue && !txValues.toValue ? "Enter Amount" : "Swap"}
      </Button>
      {txValues && !estimatesError && (
        <p className="text-sm text-center font-medium text-gray-600">
          Click Swap to preview transaction.
        </p>
      )}
      {estimatesError && (
        <p className="text-sm text-center font-medium text-gray-600">
          {estimatesError}
        </p>
      )}
    </section>
  );
};

export default Swap;
