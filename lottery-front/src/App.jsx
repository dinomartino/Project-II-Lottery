import React from "react";
import ConnectButton from "./components/ConnectButton";
import Web3 from "web3";

function App() {
  return (
    <main>
      <div className="gap-1">
        <h1 className="text-6xl text-gradient">Lottery Dapp</h1>
        <ConnectButton />
      </div>
    </main>
  );
}

export default App;
