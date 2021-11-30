import React, { FC, useState } from "react";
import { useDialog } from "react-dialog-async";
import { Tokens } from "../../../Consts/tokens";
import Button from "../../Atoms/Button/Button";
import "./SwapApproval.css";
import SwapApprovalDialog from "./SwapApprovalDialog/SwapApprovalDialog";

export interface SwapApprovalProps {
  token: "SEC" | "CRD";
}
const SwapApproval: FC<SwapApprovalProps> = ({ token }) => {
  const confirmationDialog = useDialog(SwapApprovalDialog);
  const [dialogResult, setDialogResult] = useState<any>();
  const otherToken = Tokens.find(({ name }) => name !== token)?.name;
  console.log(`otherToken`, otherToken);
  const handleClick = async () => {
    const response = await confirmationDialog
      .show({ token, otherToken })
      .catch((e) => console.log(`dialog error`, e));
    setDialogResult(response);
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold mb-5">Unlock Access</h1>
      <p className="text-sm font-normal mb-14">
        First time swapping {token}? Please approve Delphia to swap your tokens
      </p>
      <Button fullWidth variant="primary" onClick={handleClick}>
        Continue
      </Button>
      <p className="text-grey-600 text-sm text-center mt-4">
        We will only ask you to do this once.
      </p>
    </section>
  );
};

export default SwapApproval;
