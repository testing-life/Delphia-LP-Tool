import React from "react";
import { AsyncDialogProps } from "react-dialog-async";
import Button from "../../../Atoms/Button/Button";

interface SwapApprovalDialogProps {
  token?: string;
  otherToken?: string;
}

const ConfirmationDialog: React.FC<
  AsyncDialogProps<SwapApprovalDialogProps, boolean>
> = ({ open, handleClose, data }) => {
  return (
    <>
      {open && (
        <div className={"absolute inset-0 flex items-start justify-center"}>
          <div
            className={"absolute w-full h-full bg-black bg-opacity-20"}
            onClick={() => handleClose()}
          ></div>
          <div
            className={
              "relative mx-auto shadow p-4 bg-white z-10 rounded mt-16"
            }
          >
            <h2 className="text-3xl font-semibold mb-5">
              Delphia would like permission to access the {data.token} in your
              wallet.
            </h2>
            <p className="text-sm font-normal mb-14">
              This allows our app to swap your {data.token} with{" "}
              {data.otherToken}. Changing permissions on the Ethereum blockchain
              requires a transaction.
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => handleClose(false)}
            >
              Confirm
            </Button>
            <p className="text-grey-600 text-sm text-center mt-4">
              We will only ask you to do this once.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationDialog;
