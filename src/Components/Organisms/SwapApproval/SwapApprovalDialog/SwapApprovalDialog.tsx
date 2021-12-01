import { QuestionMarkCircleIcon, XIcon } from "@heroicons/react/solid";
import { BigNumber, ethers } from "ethers";
import React from "react";
import { AsyncDialogProps } from "react-dialog-async";
import ReactTooltip from "react-tooltip";
import Button from "../../../Atoms/Button/Button";
import Card from "../../../Atoms/Card/Card";
import IconButton from "../../../Atoms/IconButton/IconButton";
import SwapSummary from "../../../Molecules/SwapSummary/SwapSummary";
import SwapSummaryItem from "../../../Molecules/SwapSummaryItem/SwapSummaryItem";
import "./SwapApprovalDialog.css";
interface SwapApprovalDialogProps {
  token?: string;
  otherToken?: string;
  gasEstimate: BigNumber;
}

const ConfirmationDialog: React.FC<
  AsyncDialogProps<SwapApprovalDialogProps, boolean>
> = ({ open, handleClose, data }) => {
  return (
    <>
      {open && (
        <div className={"swapApprovalDialog"}>
          <div
            className={"absolute w-full h-full bg-black bg-opacity-20"}
            onClick={() => handleClose()}
          ></div>
          <div className={"swapApprovalDialog__contentWrapper"}>
            <Card>
              <header className="flex">
                <h2 className="text-3xl font-semibold mb-5">
                  Delphia would like permission to access the {data.token} in
                  your wallet.
                </h2>
                <IconButton
                  onClick={() => handleClose()}
                  classes="ml-auto -mr-12 -mt-8"
                >
                  <XIcon className="w-8 h-8 " />
                </IconButton>
              </header>
              <p className="text-sm font-normal mb-14">
                This allows our app to swap your {data.token} with{" "}
                {data.otherToken}. Changing permissions on the Ethereum
                blockchain requires a transaction.
              </p>
              <Card variant="grey" classes="mb-9">
                <p className="font-semibold text-lg pb-3 mb-3 border-gray-200 border-b">
                  Transaction Details
                </p>
                <SwapSummary>
                  <SwapSummaryItem
                    label="Action"
                    value={`Allow access to ${data.token}`}
                  ></SwapSummaryItem>
                  <SwapSummaryItem
                    label="Estimated Gas Fee"
                    value={`${ethers.utils.formatEther(data.gasEstimate)}`}
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
                onClick={() => handleClose(false)}
              >
                Confirm
              </Button>
              <p className="text-gray-600 text-sm text-center mt-4">
                We will only ask you to do this once.
              </p>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationDialog;
