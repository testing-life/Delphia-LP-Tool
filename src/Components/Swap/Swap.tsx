import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { BigNumber } from "ethers";
import { ethers } from "ethers";
import React, { FC, useState } from "react";
import { useDialog } from "react-dialog-async";
import ReactTooltip from "react-tooltip";
import { CRDabi } from "../../ABI/CRDabi";
import {
  ReasonError,
  TBalances,
  TTokens,
  useEthProvider,
} from "../../Context/web3.context";
import { Actions } from "../../Enums/actions";
import { TokenAddresses } from "../../Enums/tokensAddresses";
import debounce from "../../Utils/debounce";
import Button from "../Atoms/Button/Button";
import TokenAvatar from "../Atoms/TokenAvatar/TokenAvatar";
import MaxCurrencyInput from "../Molecules/MaxCurrencyInput/MaxCurrencyInput";
import SwapInput from "../Molecules/SwapInput/SwapInput";
import SwapSummary from "../Molecules/SwapSummary/SwapSummary";
import SwapSummaryItem from "../Molecules/SwapSummaryItem/SwapSummaryItem";
import "./Swap.css";
import ConfirmationDialog from "./SwapDialog/SwapDialog";

interface SwapProps {
  from: "SEC" | "CRD";
  to: "SEC" | "CRD";
}

export interface ITxValues {
  toValue?: BigNumber | undefined;
  fromValue?: BigNumber | undefined;
}

const Swap: FC<SwapProps> = ({ from, to }) => {
  const confirmationDialog = useDialog(ConfirmationDialog);
  const [dialogResult, setDialogResult] = useState<any>();
  const [txValues, setTxValues] = useState<ITxValues | undefined>(undefined);
  const [top, setTop] = useState<any>("");
  const [bottom, setBottom] = useState<any>("");
  const [estimatesError, setEstimatesError] = useState<string>();
  const {
    balances,
    estimateTokenGain,
    estimateTokenCost,
    getMaxAllowance,
    getSwapCostEstimate,
    swap,
    signer,
  } = useEthProvider();

  const handleClick = async () => {
    const gasFeeEstimate = await getSwapCostEstimate(
      from,
      txValues as ITxValues
    );
    const response = await confirmationDialog
      .show({
        from,
        to,
        txValues: txValues as ITxValues,
        action: Actions.SWAP,
        gasFeeEstimate: gasFeeEstimate,
        gainEstimate: bottom,
        priceEstimate: top,
      })
      .catch((e) => console.log(`e`, e));
    setDialogResult(response);
  };

  // const handleClick = async () => {
  //   const res = await swap("SEC", txValues as ITxValues).catch((e: any) =>
  //     console.log(`e`, e)
  //   );
  //   console.log(`res`, res);
  // };

  const onChangeTo = debounce(async (event: string) => {
    if (estimatesError) {
      setEstimatesError(undefined);
    }

    if (event === bottom) {
      return;
    }

    if (!event) {
      setTxValues(undefined);
      return;
    }

    const toValue: BigNumber = ethers.utils.parseUnits(event as string, 18);
    setTxValues({ toValue });
    const estimate = await estimateTokenCost(toValue).catch((error) => {
      setEstimatesError((error as ReasonError).reason);
    });
    if (estimate) {
      setTop(ethers.utils.formatEther(estimate));
    }
  }, 500);

  const onChangeFrom = debounce(async (event: string) => {
    if (estimatesError) {
      setEstimatesError(undefined);
    }

    if (event === top) {
      return;
    }

    if (!event) {
      setTxValues(undefined);
      return;
    }

    const fromValue: BigNumber = ethers.utils.parseUnits(event as string, 18);
    setTxValues({ fromValue });
    const estimate = await estimateTokenGain(fromValue).catch((error) => {
      setEstimatesError((error as ReasonError).reason);
    });
    if (estimate) {
      setBottom(ethers.utils.formatEther(estimate));
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
          value={top}
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
          value={bottom}
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
          value={`${bottom ? bottom : "0"} ${to}`}
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
      {!bottom && !top && (
        <p className="text-sm text-gray-600 mb-10 text-right">
          Enter amount to see calculation
        </p>
      )}
      <Button
        variant="primary"
        disabled={!txValues}
        fullWidth
        classes="mb-4"
        onClick={handleClick}
      >
        {!txValues ? "Enter Amount" : "Swap"}
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
