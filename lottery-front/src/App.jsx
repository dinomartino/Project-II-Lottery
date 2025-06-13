import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Web3 from "web3";

function App() {
  const [Web3, setWeb3] = useState();

  async function initialiseWeb3() {
    setWeb3(new window.Web3(window.ethereum));
  }

  return (
    <main>
      <div>
        <Navbar />
      </div>
    </main>
  );
}

export default App;
