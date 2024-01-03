import React, { createContext, useState } from "react";

const defaultState = {
  web3: null,
  isConnected: false,
  accounts: [],
  error: null,
  hasVoted: false,
  balance: 0,
};

export const ConnectionContext = createContext([defaultState, () => {}]);

export const ConnectionProvider = ({ children }) => {
  const [connection, setConnection] = useState(defaultState);

  return (
    <ConnectionContext.Provider value={[connection, setConnection]}>
      {children}
    </ConnectionContext.Provider>
  );
};
