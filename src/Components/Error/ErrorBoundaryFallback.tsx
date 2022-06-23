import { ExclamationCircleIcon } from "@heroicons/react/solid";
import React, { FC } from "react";
import Card from "../Atoms/Card/Card";
import "./ErrorBoundaryFallback.css";

interface ErrorBoundaryFallbackProps {
  error: Error;
}

const ErrorBoundaryFallback: FC<ErrorBoundaryFallbackProps> = ({ error }) => {
  return (
    <div className="errorBoundaryFallback">
      <Card>
        <ExclamationCircleIcon className="h-10 w-10 mx-auto mb-5" />
        <p>
          {error?.message
            ? `${error.message}`
            : "A critical error occured. Please refresh the page."}
        </p>
      </Card>
    </div>
  );
};

export default ErrorBoundaryFallback;
