import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MaxCurrencyInput from "./Components/Molecules/MaxCurrencyInput/MaxCurrencyInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MaxCurrencyInput
          onChange={(e) => console.log(`e in app tsx`, e)}
          type="number"
          maxValue={0.666}
          name={"this be monies"}
        />
      </header>
    </div>
  );
}

export default App;
