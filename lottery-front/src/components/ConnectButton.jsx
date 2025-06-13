import { useState, useContext } from "react";
import ConnectContext from "../ConnectContext";
import Web3 from "web3";

function ConnectButton() {
  const { isConnected, setIsConnected } = useContext(ConnectContext);
  const [account, setAccount] = useState(null);

  async function connect() {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not install");
      }

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
    <button disabled={true} className="text-sm">
      Connected Wallet:
      <span className="text-gradient">{truncateAddress(account)}</span>
    </button>
  ) : (
    <button onClick={connect}>Connect</button>
  );
}

export default ConnectButton;
