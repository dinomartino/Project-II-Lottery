import { useState, useEffect } from "react";
import ConnectContext from "./ConnectContext";
import Navbar from "./components/Navbar";
import IntroParagragh from "./components/IntroParagraph";
import MainFunction from "./components/mainFunction";
import Web3 from "web3";
import { abi, contractAddress } from "./contractInfo";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [prizepool, setPrizepool] = useState(0);
  const [winner, setWinner] = useState(null);

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

      if (!contractInstance) {
        console.log("Contract not initialized yet");
        return;
      }

      // Fetch initial participants
      const initialParticipants = await contractInstance.methods
        .getParticipants()
        .call();
      setParticipants(initialParticipants);

      // initial prize pool check
      const initialPrizepool = await contractInstance.methods.getPool().call();
      setPrizepool(initialPrizepool);
      console.log("Current prize pool:", initialPrizepool);

      // check last winner
      const initialWinner = await contractInstance.methods.getWinner().call();
      setWinner(initialWinner);
      console.log("Last winner is:", initialWinner);

      // console.log("Contract events:", contractInstance.events);

      // Subscribe to Enter_lottery event
      contractInstance.events.Enter_lottery().on("data", (event) => {
        console.log(event.returnValues.player);
      });

      // Subscribe to Picked_winner event
      contractInstance.events.Picked_winner().on("data", (event) => {
        console.log(event.returnValues.winner);
      });

      // Subscribe to Lottery_starts event
      contractInstance.events.Lottery_starts().on("data", (event) => {
        console.log(event.returnValues.startingTime);
      });
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
          participants,
          prizepool,
          winner,
          setIsConnected,
          setAccount,
          setParticipants,
        }}
      >
        <Navbar />
        <br />
        <br />
        <IntroParagragh />
        <br />
        <br />
        <MainFunction />
      </ConnectContext.Provider>
    </main>
  );
}

export default App;
