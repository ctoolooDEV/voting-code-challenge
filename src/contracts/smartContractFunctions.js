import Web3 from "web3";
import { abi } from "./voting.json";
const CONTRACT_ADDRESS = "0x9298B2E081E7F604028d75dF5d15155353612d4c";

const web3 = new Web3(window.ethereum);
const votingContract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

export const fetchCandidates = async () => {
  const candidatesCount = await votingContract.methods.candidatesCount().call();
  const candidates = [] ;

  for (let i = 0; i < candidatesCount; i++) {
    const candidate = await votingContract.methods.candidates(i).call();

    candidates.push({
      id: i,
      name: candidate.name,
      voteCount:  Number(candidate.voteCount),
    });
  }

  return candidates;
};



export const castVote = async (candidateId, fromAddress) => {
  try {
    await votingContract.methods.vote(candidateId).send({ from: fromAddress });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const checkVoter = async (fromAddress) => {
  console.log(fromAddress)
  return await votingContract.methods.voters(fromAddress).call();
};
