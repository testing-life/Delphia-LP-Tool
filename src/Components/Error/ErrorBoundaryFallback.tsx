import { ExclamationCircleIcon } from "@heroicons/react/solid";
import React, { FC } from "react";
import Card from "../Atoms/Card/Card";
import "./ErrorBoundaryFallback.css";

const ErrorBoundaryFallback: FC = () => {
  return (
    <div className="errorBoundaryFallback">
      <Card>
        <ExclamationCircleIcon className="h-10 w-10 mx-auto mb-5" />
        <p>A critical error occured. Please refresh the page.</p>
      </Card>
      ;
    </div>
  );
};

export default ErrorBoundaryFallback;
