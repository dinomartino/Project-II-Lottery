import React from "react";
import Web3 from "web3";

function ConnectButton() {
  async function connect() {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not install");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button
        className="text-cyan-300 flex flex-col cursor-pointer z-0"
        onClick={connect}
      >
        Connect
      </button>
    </div>
  );
}

export default ConnectButton;
