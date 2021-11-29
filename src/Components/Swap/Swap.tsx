import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { BigNumber } from "ethers";
import { ethers } from "ethers";
import React, { ChangeEvent, FC, useState } from "react";
import { useDialog } from "react-dialog-async";
import ReactTooltip from "react-tooltip";
import { CRDabi } from "../../ABI/CRDabi";
import { Tokens } from "../../Consts/tokens";
import { TBalances, TTokens, useEthProvider } from "../../Context/web3.context";
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

interface ITxValues {
  toValue?: BigNumber | undefined;
  fromValue?: BigNumber | undefined;
}

interface ReasonError extends Error {
  reason: string;
}
const Swap: FC<SwapProps> = ({ from, to }) => {
  const confirmationDialog = useDialog(ConfirmationDialog);
  const [dialogResult, setDialogResult] = useState<any>();
  const [txValues, setTxValues] = useState<ITxValues | undefined>(undefined);
  const [tokenEstimates, setTokenEstimates] = useState<
    { costEstimate?: string; gainEstimate?: string } | undefined
  >(undefined);
  const [swapError, setSwapError] = useState<string>();
  const [estimatesError, setEstimatesError] = useState<string>();
  const { balances, signer } = useEthProvider();
  const handleClick = async () => {
    const response = await confirmationDialog
      .show({})
      .catch((e) => console.log(`e`, e));
    setDialogResult(response);
  };

  const getMax = (balances: TBalances[], from: TTokens): string => {
    const fromMaxValue = balances?.find((balance) => balance[from]);
    return fromMaxValue ? fromMaxValue[from] : "0";
  };

  const estimateTokenGain = async (val: BigNumber) => {
    const contract = new ethers.Contract(TokenAddresses.CRD, CRDabi, signer);
    try {
      const res = await contract
        .calculateCurvedMintReturn(val)
        .catch((err: any) => console.log(`err`, err));
      setTokenEstimates({ gainEstimate: ethers.utils.formatEther(res) });
      console.log(`res gain`, ethers.utils.formatEther(res));
    } catch (error) {
      console.log(`error`, typeof error);
      setEstimatesError((error as ReasonError).reason);
    }
  };

  const estimateTokenCost = async (val: BigNumber) => {
    const contract = new ethers.Contract(TokenAddresses.CRD, CRDabi, signer);
    try {
      const res = await contract
        .calculateCurvedBurnReturn(val)
        .catch((err: any) => console.log(`err`, err));
      console.log(`res cost`, ethers.utils.formatEther(res));
      setTokenEstimates({ costEstimate: ethers.utils.formatEther(res) });
    } catch (error) {
      console.log(`error`, error);
      console.log(`error`, typeof error);
      setEstimatesError((error as ReasonError).reason);
    }
  };

  const onChangeTo = debounce((event: string) => {
    console.log(`event`, event);
    if (estimatesError) {
      setEstimatesError(undefined);
    }
    if (!event) {
      setTxValues({ toValue: undefined });
      return;
    }
    const toValue: BigNumber = ethers.utils.parseUnits(event as string, 18);
    setTxValues({ toValue });
    estimateTokenCost(toValue);
  }, 250);

  const onChangeFrom = debounce((event: string) => {
    if (estimatesError) {
      setEstimatesError(undefined);
    }
    if (!event) {
      setTxValues({ fromValue: undefined });
      return;
    }
    const fromValue: BigNumber = ethers.utils.parseUnits(event as string, 18);
    estimateTokenGain(fromValue);
    setTxValues({ fromValue });
  }, 250);

  return (
    <section className="swap">
      <SwapInput label="Swap from">
        <TokenAvatar
          caption={from}
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/b/be/Ecosia-like_logo.svg"
        />
        <MaxCurrencyInput
          maxValue={balances && getMax(balances, from)}
          name="from"
          onChange={onChangeFrom}
          placeholder="0.0"
          type="text"
          value={
            txValues?.fromValue
              ? ethers.utils.formatEther(txValues?.fromValue as BigNumber)
              : ""
          }
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
          value={
            txValues?.toValue
              ? ethers.utils.formatEther(txValues?.toValue as BigNumber)
              : ""
          }
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
          value={`${
            tokenEstimates?.gainEstimate ? tokenEstimates?.gainEstimate : "0"
          } ${to}`}
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
      {!tokenEstimates && (
        <p className="text-sm text-gray-600 mb-10 text-right">
          Enter amount to see calculation
        </p>
      )}
      <Button
        variant="primary"
        disabled={!txValues?.fromValue || !txValues.toValue}
        fullWidth
        classes="mb-4"
        onClick={handleClick}
      >
        {!txValues?.fromValue || !txValues.toValue ? "Enter Amount" : "Swap"}
      </Button>
      {txValues?.fromValue && txValues?.toValue && !estimatesError && (
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
