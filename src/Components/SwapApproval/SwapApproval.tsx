import React, { FC, useState } from "react";
import { useDialog } from "react-dialog-async";
import Button from "../Atoms/Button/Button";
import "./SwapApproval.css";
import ConfirmationDialog from "./SwapApprovalDialog/SwapApprovalDialog";

interface SwapApprovalProps {
  tokenToUnlock: string;
}

const SwapApproval: FC<SwapApprovalProps> = ({ tokenToUnlock }) => {
  const confirmationDialog = useDialog(ConfirmationDialog);
  const [result, setResult] = useState<any>();
  const handleClick = async () => {
    const response = await confirmationDialog
      .show({})
      .catch((e) => console.log(`e`, e));

    setResult(response);
  };
  return (
    <div className="swapApproval">
      <h1 className="heading">Unlock Access</h1>
      <p className="para">
        First time swapping {tokenToUnlock}? Please approve Delphia to swap your
        tokens.
      </p>
      <Button variant="primary" fullWidth classes="mb-4" onClick={handleClick}>
        Continue
      </Button>

      <p className="text-sm font-medium text-gray-600 text-center">
        We will only ask you to do this once.
      </p>
    </div>
  );
};

export default SwapApproval;
