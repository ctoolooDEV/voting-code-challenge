import { useEffect, useState } from "react";
import Web3 from "web3";

export function useWeb3Connector() {
  const [web3, setWeb3] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Request account access if needed
          const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
          setAccounts(accounts);
          setIsConnected(accounts && accounts.length > 0);
        } catch (err) {
          setError(err.message);
          setIsConnected(false);
        }
      } else {
        setError("Please install MetaMask!");
      }
    };

    initWeb3();
  }, []);

  return {web3, isConnected, accounts, error};
}
