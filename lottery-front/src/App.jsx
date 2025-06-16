import { useState, useEffect } from "react";
import ConnectContext from "./ConnectContext";
import Navbar from "./components/Navbar";
import IntroParagragh from "./components/IntroParagraph";
import Web3 from "web3";
import { abi, contractAddress } from "./contractInfo";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  let lottery;

  useEffect(() => {
    async function initWeb3() {
      if (!window.ethereum) {
        throw new Error("MetaMask is not install");
      }

      // Initialize Web3
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Initialize contract
      const contractInstance = new web3Instance.eth.Contract(
        abi,
        contractAddress
      );
      setContract(contractInstance);

      // Check chain ID
      const chainId = await web3Instance.eth.getChainId();
      console.log("Chain ID:", chainId);

      // Check owner
      const owner = await contractInstance.methods.getOwner().call();
      console.log("Contract owner:", owner);
    }
    initWeb3();
  }, []);

  return (
    <main>
      <ConnectContext.Provider
        value={{
          web3,
          contract,
          account,
          isConnected,
          setIsConnected,
          setAccount,
        }}
      >
        <Navbar isConnected={isConnected} setIsConnected={setIsConnected} />
        <br />
        <br />
        <IntroParagragh />
      </ConnectContext.Provider>
    </main>
  );
}

export default App;
