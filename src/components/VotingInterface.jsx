import React, { useState, useEffect, useContext } from "react";
import { Typography, Button, Box, CircularProgress  } from "@mui/material";
import { fetchCandidates, castVote } from "../contracts/smartContractFunctions.js";
import { ConnectionContext } from "../contexts/ConnectionContext.jsx";
import CandidatesList from "./CandidatesList.jsx";

const VotingInterface = () => {
  const [connection, setConnection] = useContext(ConnectionContext);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCandidates = async (showLoadingIndicator = true) => {
      if(isLoading) return;
      console.debug("loadCandidates");
      if(showLoadingIndicator) setIsLoading(true);
      try {
        const candidateList = await fetchCandidates(connection.web3);
        setCandidates(candidateList);
      } catch (err) {
        setError("Failed to load candidates");
        console.error(err);
      } finally {
        if(showLoadingIndicator) setIsLoading(false);
      }
    };

    loadCandidates();

    const intervalId = setInterval(() =>  loadCandidates(false), 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const handleVote = async () => {
    if (!selectedCandidate) {
      setError("Please select a candidate");
      return;
    }
    setIsLoading(true);
    try {
      const voteSuccessful = await castVote(selectedCandidate, connection.accounts[0]);
      if (voteSuccessful) {
        setConnection(prevState => ({ ...prevState, hasVoted: true }));
      }
    } catch (err) {
      setError("Error casting vote");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );


  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        🗳️ Cast Your Vote
      </Typography>
      {error && <Typography color="error" sx={{m: 2}}>{error}</Typography>}
      <CandidatesList
        candidates={candidates}
        selectedCandidate={selectedCandidate}
        onSelectCandidate={setSelectedCandidate}
      />


      {connection.hasVoted ? <Typography color="success" align="center" sx={{ mt: 2, mb: 2 }}>
        🎉 You have already voted! 🥳
      </Typography> :<Button
        variant="contained"
        color="primary"
        onClick={handleVote}
        sx={{
          width: "100%",
          mt: 2,
          mb: 2,
          fontSize: "1.2rem",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.1)",
          }
        }}
      >
            🗳️ Vote {candidates[selectedCandidate]?.name || ""}
      </Button>}
    </Box>
  );
};

export default VotingInterface;
