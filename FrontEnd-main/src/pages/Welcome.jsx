import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const onReturnLogin = () => {
    fetch("http://localhost:8000/api/auth/logout").then(() =>
      navigate("/login")
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Cambia el color de fondo según tus preferencias
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome, [First Name Last Name]
      </Typography>
      <Button
        variant="contained"
        sx={{
          width: "30%",
          height: "45px",
          margin: "15px 0",
          fontWeight: "700",
          fontSize: "20px",
          textTransform: "capitalize",
          backgroundColor: "#007bff", // Cambia el color de fondo del botón según tus preferencias
          color: "white", // Cambia el color del texto del botón según tus preferencias
        }}
        onClick={onReturnLogin}
      >
        Back
      </Button>
    </Box>
  );
};

export default Welcome;
