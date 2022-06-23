import React, { FC, useEffect } from "react";
import { AsyncDialogProps } from "react-dialog-async";
import { ExternalLinkIcon, XIcon } from "@heroicons/react/solid";
import Card from "../../../Atoms/Card/Card";
import IconButton from "../../../Atoms/IconButton/IconButton";
import "./PendingDialog.css";
import { NamedTransactionResponse } from "../../../../Context/web3.context";

interface PendingDialogData {
  pending?: any[];
}

const PendingDialog: FC<AsyncDialogProps<PendingDialogData, void>> = ({
  open,
  handleClose,
  data,
}) => {
  return (
    <>
      {open && (
        <div className={"pendingDialog"}>
          <div
            className={"absolute w-full h-full bg-black bg-opacity-70"}
            onClick={() => handleClose()}
          ></div>
          <div className={"pendingDialog__contentWrapper"}>
            <Card>
              <header className="flex">
                <h2 className="text-3xl font-semibold mb-5">
                  Pending transactions
                </h2>
                <IconButton
                  onClick={() => handleClose()}
                  classes="ml-auto -mr-12 -mt-8"
                >
                  <XIcon className="w-8 h-8 " />
                </IconButton>
              </header>
              {data?.pending?.length ? (
                <>
                  <Card variant="grey">
                    <ul>
                      {data.pending.map((tx: NamedTransactionResponse) => (
                        <li className="flex justify-between">
                          <span>{tx.name} </span>
                          <a
                            href={`https://rinkeby.etherscan.io/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferer"
                            className="flex text-blue-600 underline items-center"
                          >
                            View on Etherscan{" "}
                            <ExternalLinkIcon className="w-5 h-5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </>
              ) : (
                <p className="text-sm font-normal">
                  You don't have any pending transactions.
                </p>
              )}
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingDialog;
