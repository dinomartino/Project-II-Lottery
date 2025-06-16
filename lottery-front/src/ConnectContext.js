import { createContext } from "react";

const ConnectContext = createContext({
  web3: null,
  contract: null,
  account: null,
  isConnected: false,
  setIsConnected: () => {},
  setAccount: () => {},
});

export default ConnectContext;
