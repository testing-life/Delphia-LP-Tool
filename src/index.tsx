import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppProviders from "./Context/app.context";

ReactDOM.render(
  <React.StrictMode>
    {/* <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}> */}
    <AppProviders>
      <App />
    </AppProviders>
    {/* </ErrorBoundary> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
