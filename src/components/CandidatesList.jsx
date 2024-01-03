import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const CandidatesList = ({ candidates, selectedCandidate, onSelectCandidate }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {candidates.map((candidate) => (
        <Card
          key={candidate.id}
          onClick={() => onSelectCandidate(candidate.id)}
          sx={{
            display: "flex",
            mx: 1,
            boxShadow: candidate.id === selectedCandidate ? "0 0 0 0.2rem rgba(0,125,255,.5)" : "none",
            transition: "transform 0.3s",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.1)",
            }
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={`https://api.dicebear.com/7.x/adventurer/svg?seed=sfund_${candidate.id}_${candidate.name}`}
            alt={candidate.name}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {candidate.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Votes: {candidate.voteCount}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default CandidatesList;
