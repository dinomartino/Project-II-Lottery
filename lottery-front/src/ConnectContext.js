import { createContext } from "react";

const ConnectContext = createContext({
  web3: null,
  contract: null,
  account: null,
  isConnected: false,
  participants: [],
  setIsConnected: () => {},
  setAccount: () => {},
  setParticipants: () => {},
});

export default ConnectContext;
