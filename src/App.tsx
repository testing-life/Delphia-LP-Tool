import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Tabs from "./Components/Molecules/Tabs/Tabs";
import Tab from "./Components/Molecules/Tab/Tab";
import TabsNav from "./Components/Molecules/TabsNav/TabsNav";

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
          <Tabs>
            <Tab>tab1</Tab>
            <Tab>tab2</Tab>
            <Tab>tab3</Tab>
          </Tabs>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
