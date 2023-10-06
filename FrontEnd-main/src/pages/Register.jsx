import React, { useState } from "react";
import { Box, Button, Typography, TextField, Grid, Paper } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState(null);

  const validateForm = () => {
    const errors = {};

    // Validar que el campo de nombre no esté vacío
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    // Validar que el campo de apellido no esté vacío
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    // Validar el formato de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Validar que la contraseña tenga al menos 8 caracteres
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      // Enviar el formulario
      fetch("http://localhost:8000/api/auth/singup", {
        method: "POST",
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // La creación de la cuenta fue exitosa
            setNotification({
              type: "success",
              message: "Account created successfully. Redirecting to Login...",
            });
            setTimeout(() => {
              navigate("/login");
            }, 2000); // Redirige a la página de inicio de sesión después de 2 segundos
          } else {
            // La creación de la cuenta falló
            setNotification({
              type: "error",
              message: "Account creation failed. Please try again.",
            });
          }
        })
        .catch(() => {
          // Manejar errores de red u otros errores imprevistos
          setNotification({
            type: "error",
            message: "An error occurred. Please try again later.",
          });
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar el mensaje de error cuando se cambia el valor del campo
    setFormErrors({ ...formErrors, [name]: "" });
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
        backgroundColor: "#f0f0f0",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form
          onSubmit={onSubmitForm}
          noValidate
          autoComplete="off"
          style={{ width: "100%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="First Name"
                fullWidth
                variant="outlined"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Last Name"
                fullWidth
                variant="outlined"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Email"
                fullWidth
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              marginTop: "15px",
            }}
          >
            <Typography>
              <CheckIcon /> Lowercase
            </Typography>
            <Typography>
              <CheckIcon /> Uppercase
            </Typography>
            <Typography>
              <CheckIcon /> Special characters
            </Typography>
            <Typography>
              <CheckIcon /> Number
            </Typography>
            <Typography>
              <CheckIcon /> Min 8 characters
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              height: "45px",
              marginTop: "20px",
              fontWeight: "700",
              fontSize: "20px",
              textTransform: "capitalize",
            }}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
      {notification && (
        <Typography
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            fontSize: "16px",
            color: notification.type === "success" ? "green" : "red",
          }}
        >
          {notification.message}
        </Typography>
      )}
      <Typography
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          fontSize: "24px",
        }}
      >
        Have an account? <Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
};

export default Register;
