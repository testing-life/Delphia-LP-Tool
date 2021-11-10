import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AvatarLink from "./Components/Atoms/AvatarLink/AvatarLink";

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
      </header>
      <AvatarLink
        imgSrc="https://upload.wikimedia.org/wikipedia/commons/b/be/Ecosia-like_logo.svg"
        onClick={() => console.log(`navigate somewhere`)}
      />
      <AvatarLink
        imgSrc="https://upload.wikimedia.org/wikipedia/commons/b/be/Ecosia-like_logo.svg"
        onClick={() => console.log(`navigate somewhere`)}
        size="large"
      />
    </div>
  );
}

export default App;
