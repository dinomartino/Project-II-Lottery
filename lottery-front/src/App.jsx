import { useState, useEffect } from "react";
import ConnectContext from "./ConnectContext";
import Navbar from "./components/Navbar";
import IntroParagragh from "./components/IntroParagraph";
import Web3 from "web3";
import { abi, contractAddress } from "./contractInfo";

function App() {
  const [web3, setWeb3] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    } else {
      console.log("Please install Meta Mask");
    }
  }, []);
  async function checkid() {
    console.log(await web3.eth.getChainId());
  }
  checkid();
  return (
    <main>
      <ConnectContext.Provider value={{ isConnected, setIsConnected }}>
        <Navbar isConnected={isConnected} setIsConnected={setIsConnected} />
        <br />
        <br />
        <IntroParagragh />
      </ConnectContext.Provider>
    </main>
  );
}

export default App;
