import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import React, { FC, useState } from "react";
import { useDialog } from "react-dialog-async";
import ReactTooltip from "react-tooltip";
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

const Swap: FC<SwapProps> = ({ from, to }) => {
  const confirmationDialog = useDialog(ConfirmationDialog);
  const [result, setResult] = useState<any>();
  const handleClick = async () => {
    const response = await confirmationDialog
      .show({})
      .catch((e) => console.log(`e`, e));

    setResult(response);
  };
  return (
    <section className="swap">
      <SwapInput label="Swap from">
        <TokenAvatar
          caption={from}
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/b/be/Ecosia-like_logo.svg"
        />
        <MaxCurrencyInput
          maxValue="123"
          name="from"
          onChange={() => console.log()}
          placeholder="0.0"
          type="text"
          value="0.0"
        />
      </SwapInput>
      <SwapInput label="Swap to">
        <TokenAvatar
          caption={to}
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/b/be/Ecosia-like_logo.svg"
        />
        <MaxCurrencyInput
          name="to"
          onChange={() => console.log()}
          placeholder="0.0"
          type="text"
          value="0.0"
        />
      </SwapInput>
      <SwapSummary>
        <SwapSummaryItem label="Current CRD Price" value="0.15 SEC">
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
              <span>Issa tooltip</span>
            </ReactTooltip>
          </>
        </SwapSummaryItem>
        <SwapSummaryItem label="Your receive" value="0.15 SEC">
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
              <span>Issa tooltip</span>
            </ReactTooltip>
          </>
        </SwapSummaryItem>
      </SwapSummary>
      <p className="text-sm text-gray-600 mb-10 text-right">
        Enter amount to see calculation
      </p>
      <Button variant="primary" fullWidth classes="mb-4" onClick={handleClick}>
        Continue
      </Button>
    </section>
  );
};

export default Swap;
