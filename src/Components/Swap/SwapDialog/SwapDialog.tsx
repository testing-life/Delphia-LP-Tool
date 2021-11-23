import React from "react";
import { AsyncDialogProps } from "react-dialog-async";
import Button from "../../Atoms/Button/Button";

interface ConfirmationDialogData {
  title?: string;
  message?: string;
}

const ConfirmationDialog: React.FC<
  AsyncDialogProps<ConfirmationDialogData, boolean>
> = ({ open, handleClose }) => {
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
            <h2>
              Delphia would like permission to access the SEC in your wallet.
            </h2>
            <p>
              This allows our app to swap your SEC with CRD. Changing
              permissions on the Ethereum blockchain requires a transaction.
            </p>
            <div className={"flex justify-end"}>
              <Button
                variant="primary"
                fullWidth
                onClick={() => handleClose(false)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationDialog;
