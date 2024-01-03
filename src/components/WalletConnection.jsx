import React, {useEffect, useContext} from "react";
import Web3 from "web3";
import { Box, Button, Typography } from "@mui/material";
import { ConnectionContext } from "../contexts/ConnectionContext.jsx";
import { checkVoter } from "../contracts/smartContractFunctions.js";
const WalletConnection = () => {
  const [connection, setConnection] = useContext(ConnectionContext);


  useEffect(() => {


    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setConnection(prevState => ({ ...prevState, web3: web3Instance }));


      window.ethereum.on("accountsChanged", (accounts) => {
        setConnection(prevState => ({ ...prevState, accounts: accounts, isConnected: accounts.length > 0 }));

      });
    } else {
      console.log("MetaMask is not installed");
    }
  }, [setConnection]);

  useEffect(() => {
    if (connection.isConnected) {
      checkBalance();
      checkIfWalletVoted();
    }
  }, [connection.isConnected, connection.accounts]);

  const checkIfWalletVoted = async () => {
    const hasVoted = await checkVoter(connection.accounts[0]);
    setConnection(prevState => ({ ...prevState, hasVoted }));
  }

  const checkBalance = async () => {
    const balanceWei = await connection.web3.eth.getBalance(connection.accounts[0]);
    const balanceEth = connection.web3.utils.fromWei(balanceWei, "ether");
    setConnection(prevState => ({ ...prevState, balance: balanceEth }));
  }

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setConnection(prevState => ({ ...prevState, accounts: accounts, isConnected: true }));
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
    }
  };

  const disconnectWallet = () => {
    setConnection(prevState => ({ ...prevState, accounts: [], isConnected: false }));

  };

  return (
    <Box textAlign="center" my={4}>
      {connection.isConnected ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            💼 {connection.accounts[0]}
          </Typography>
          <Typography variant="body1">
            💰 {connection.balance} ETH
          </Typography>
          <Button variant="contained" color="error" onClick={disconnectWallet}>
                        Disconnect Wallet
          </Button>
        </Box>
      ) : (
        <Button variant="contained" color="primary" onClick={connectWallet}>
                    Connect Wallet
        </Button>
      )}
    </Box>
  );
};

export default WalletConnection;
