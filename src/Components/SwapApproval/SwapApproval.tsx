import React, { FC } from "react";
import Button from "../Atoms/Button/Button";
import "./SwapApproval.css";

interface SwapApprovalProps {
  tokenToUnlock: string;
}

const SwapApproval: FC<SwapApprovalProps> = ({ tokenToUnlock }) => {
  return (
    <div className="swapApproval">
      <h1 className="heading">Unlock Access</h1>
      <p className="para">
        First time swapping {tokenToUnlock}? Please approve Delphia to swap your
        tokens.
      </p>
      <Button variant="primary" fullWidth classes="mb-4">
        Continue
      </Button>
      <p className="text-sm font-medium text-gray-600 text-center">
        We will only ask you to do this once.
      </p>
    </div>
  );
};

export default SwapApproval;
