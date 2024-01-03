import React from "react";
import "./App.css";
import { ConnectionProvider } from "./contexts/ConnectionContext.jsx";

import WalletConnection from "./components/WalletConnection.jsx";
import { Container, Typography, Box, createTheme, ThemeProvider } from "@mui/material";
import VotingInterfaceWrapper from "./components/VotingInterfaceWrapper.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ConnectionProvider>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          bgcolor="background.default"
          sx={{
            border: "1px solid #ddd",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            backgroundColor: "indigo",
          }}
        >
          <Container component="main" maxWidth="sm" sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
            <Typography variant="h4" align="center" gutterBottom>
                    🗳️ Decentralized Voting Application 🚀
            </Typography>
            <WalletConnection />
            <VotingInterfaceWrapper />
          </Container>
        </Box>
      </ConnectionProvider>
    </ThemeProvider>
  );
}

export default App;
