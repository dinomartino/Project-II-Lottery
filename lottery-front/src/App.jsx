import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import IntroParagragh from "./components/IntroParagraph";
import Web3 from "web3";
import { abi, contractAddress } from "./contractInfo";

function App() {
  async function initialiseWeb3() {
    const web3 = new Web3(window.ethereum);
  }
  initialiseWeb3();

  return (
    <main>
      <Navbar />
      <br />
      <IntroParagragh />
    </main>
  );
}

export default App;
