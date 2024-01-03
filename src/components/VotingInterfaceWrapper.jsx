import React, { useContext } from "react";
import { ConnectionContext } from "../contexts/ConnectionContext.jsx";
import VotingInterface from "./VotingInterface.jsx";

const VotingInterfaceWrapper = () => {
  const [connection] = useContext(ConnectionContext);

  if (!connection.isConnected) {
    return null;
  }

  return <VotingInterface />;
};

export default VotingInterfaceWrapper;
