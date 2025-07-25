import { useState, useContext } from "react";
import ConnectContext from "../ConnectContext";

function ConnectButton() {
  const { isConnected, setIsConnected } = useContext(ConnectContext);
  const { account, setAccount } = useContext(ConnectContext);

  async function connect() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const selectedAccount = accounts[0];
      setAccount(selectedAccount);
      setIsConnected(true);
    } catch (error) {
      console.error(error);
    }
  }

  function truncateAddress(address) {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
  }

  return isConnected ? (
    <>
      {console.log("wallet is connected!")}
      <button disabled={true} className="text-sm ">
        Connected Wallet:
        <span className="text-gradient">{truncateAddress(account)}</span>
      </button>
    </>
  ) : (
    <button onClick={connect}>Connect</button>
  );
}

export default ConnectButton;
