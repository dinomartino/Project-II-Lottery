import React from "react";
import ConnectButton from "./components/ConnectButton";
import Web3 from "web3";

function App() {
  return (
    <main>
      <div className="bg-black w-full h-screen bg-center bg-cover absolute z-0">
        <h1 className="text-white">Lottery Dapp</h1>
        <ConnectButton />
      </div>
    </main>
  );
}

export default App;
