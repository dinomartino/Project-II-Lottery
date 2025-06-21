import { createContext } from "react";

const ConnectContext = createContext({
  web3: null,
  contract: null,
  account: null,
  isConnected: false,
  participants: [],
  prizepool: 0,
  winner: null,
  setIsConnected: () => {},
  setAccount: () => {},
  setParticipants: () => {},
  setPrizepool: () => {},
});

export default ConnectContext;
