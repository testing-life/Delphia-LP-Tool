import React, { FC } from "react";

interface IErrorFallback {
  error: Error;
}

const ErrorBoundaryFallback: FC<IErrorFallback> = ({ error }) => {
  return (
    <div>
      <p>An error occured. Please refresh.</p>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorBoundaryFallback;
