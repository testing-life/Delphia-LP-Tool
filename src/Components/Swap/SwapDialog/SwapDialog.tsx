import { QuestionMarkCircleIcon, XIcon } from "@heroicons/react/solid";
import { BigNumber, ethers } from "ethers";
import React from "react";
import { AsyncDialogProps } from "react-dialog-async";
import ReactTooltip from "react-tooltip";
import { Actions } from "../../../Enums/actions";
import Button from "../../Atoms/Button/Button";
import Card from "../../Atoms/Card/Card";
import IconButton from "../../Atoms/IconButton/IconButton";
import SwapSummary from "../../Molecules/SwapSummary/SwapSummary";
import SwapSummaryItem from "../../Molecules/SwapSummaryItem/SwapSummaryItem";
import { ITxValues } from "../Swap";
import "./SwapDialog.css";

interface SwapSummaryDialogProps {
  from?: string;
  to?: string;
  txValues: ITxValues;
  action: Actions;
  priceEstimate?: string;
  gainEstimate?: string;
  gasFeeEstimate?: BigNumber;
}

const ConfirmationDialog: React.FC<
  AsyncDialogProps<SwapSummaryDialogProps, boolean>
> = ({ open, handleClose, data }) => {
  return (
    <>
      {open && (
        <div className={"absolute inset-0 flex items-start justify-center"}>
          {console.log(`object`, data)}
          <div
            className={"absolute w-full h-full bg-black bg-opacity-20"}
            onClick={() => handleClose()}
          ></div>
          <div className={"swapDialog__contentWrapper"}>
            <Card>
              <header className="flex">
                <h2 className="text-3xl font-semibold mb-5">Swap Tokens</h2>
                <IconButton
                  onClick={() => handleClose()}
                  classes="ml-auto -mr-12 -mt-8"
                >
                  <XIcon className="w-8 h-8 " />
                </IconButton>
              </header>
              <Card variant="grey" classes="mb-9">
                <h3 className="font-semibold text-lg pb-3 mb-3 border-gray-200 border-b">
                  Transaction Details
                </h3>
                <SwapSummary>
                  <SwapSummaryItem
                    label="Action"
                    value={data.action}
                  ></SwapSummaryItem>
                  <SwapSummaryItem label={`${data.to} price`} value={"0.fixME"}>
                    <>
                      <QuestionMarkCircleIcon
                        className="w-6 h-6 text-gray-400 ml-2"
                        data-tip
                        data-for="tooltip-trigger1"
                      />
                      <ReactTooltip
                        clickable={true}
                        id="tooltip-trigger1"
                        effect="solid"
                        place="bottom"
                        className="max-w-sm"
                      >
                        <span>
                          The price of 1 {data.to}, based on your current
                          purchase order.
                        </span>
                      </ReactTooltip>
                    </>
                  </SwapSummaryItem>
                  <SwapSummaryItem
                    label={`You receive`}
                    value={
                      data.priceEstimate
                        ? (data.priceEstimate as string)
                        : (data.gainEstimate as string)
                    }
                  >
                    <>
                      <QuestionMarkCircleIcon
                        className="w-6 h-6 text-gray-400 ml-2"
                        data-tip
                        data-for="tooltip-trigger1"
                      />
                      <ReactTooltip
                        clickable={true}
                        id="tooltip-trigger1"
                        effect="solid"
                        place="bottom"
                        className="max-w-sm"
                      >
                        <span>The amount of {data.to} you will recieve.</span>
                      </ReactTooltip>
                    </>
                  </SwapSummaryItem>
                  <SwapSummaryItem
                    label="Estimated Gas Fee"
                    value={`${ethers.utils.formatEther(
                      data.gasFeeEstimate as BigNumber
                    )}`}
                  >
                    <>
                      <QuestionMarkCircleIcon
                        className="w-6 h-6 text-gray-400 ml-2"
                        data-tip
                        data-for="tooltip-trigger1"
                      />
                      <ReactTooltip
                        clickable={true}
                        id="tooltip-trigger1"
                        effect="solid"
                        place="bottom"
                        className="max-w-sm"
                      >
                        <span>
                          A required fee when making any transaction on the
                          Ethereum blockchain, paid in ETH. Prices are dynamic
                          based on network congestion.
                        </span>
                      </ReactTooltip>
                    </>
                  </SwapSummaryItem>
                </SwapSummary>
              </Card>
              <Button
                variant="primary"
                fullWidth
                onClick={() => handleClose(true)}
              >
                Confirm swap
              </Button>
              <p className="text-gray-600 text-sm text-center mt-4">
                Clicking confirm will launch your wallet.
              </p>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationDialog;
