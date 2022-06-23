import { InformationCircleIcon } from "@heroicons/react/outline";
import { ExternalLinkIcon, XIcon } from "@heroicons/react/solid";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import IconButton from "../../Atoms/IconButton/IconButton";
import "./Toast.css";
export interface ToastProps {
  variant: "error" | "success";
  etherscanUrl?: string;
  message: string;
  onClose: () => void;
}
const Toast: FC<ToastProps> = ({
  variant,
  message,
  etherscanUrl,
  onClose,
}) => {
  console.log(`variant`, variant);
  return (
    <div
      className={`toast ${variant === "success" ? "toast--success" : "toast--error"
        }`}
    >
      <InformationCircleIcon className="toast__infoIcon" />
      <div className="toast__messageWrapper">
        {message}
        {etherscanUrl && <a
          target="_blank"
          rel="noreferrer noopener"
          className="flex"
          href={etherscanUrl}
        >
          <span className="text-sm text-blue-600 underline">
            View on Etherscan
          </span>
          <ExternalLinkIcon className="w-6 h-6 text-blue-600 ml-2" />
        </a>}
      </div>
      <IconButton onClick={onClose} classes="ml-auto -mr-4 -mt-4">
        <XIcon className="w-6 h-6 " />
      </IconButton>
    </div>
  );
};

export default Toast;
