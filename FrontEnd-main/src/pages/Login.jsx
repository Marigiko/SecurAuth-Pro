import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Checkbox,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { DataUserContext } from "../context/DataUserContext";

const initialForm = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialForm);
  const [showPass, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({
    email: false,
    password: false,
  });
  const { setNotification } = useContext(DataUserContext);

  const regEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPass);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (regEmail.test(values.email)) {
      setValidation({ password: false, email: false });
      fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            navigate("/qrcode");
            setNotification({
              message: "Correct authenticated.",
              open: true,
              type: "success",
            });
          } else {
            // Mostrar mensaje de error al usuario
            setNotification({
              message: "Failed authenticated",
              open: true,
              type: "error",
            });
          }
        })
        .catch(() => {
          // Mostrar mensaje de error al usuario
          setNotification({
            message: "Failed authenticated",
            open: true,
            type: "error",
          });
        });
    } else {
      setValidation({ password: true, email: true });
    }
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
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <TextField
          required
          error={validation.email}
          label="Email"
          type="email"
          fullWidth
          value={values.email}
          onChange={handleChange("email")}
          variant="outlined"
          margin="normal"
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            autoComplete="on"
            fullWidth
            error={validation.password}
            type={showPass ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Checkbox
            aria-label="Checkbox demo"
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
          <Typography
            sx={{
              color: "#555",
              fontWeight: "700",
            }}
          >
            Remember me
          </Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            height: "45px",
            fontWeight: "700",
            fontSize: "20px",
            textTransform: "capitalize",
            marginTop: "10px",
          }}
        >
          Login
        </Button>
        {/* Mensaje de error */}
        {validation.email && (
          <Typography variant="body2" color="error" sx={{ marginTop: "5px" }}>
            Invalid email or password.
          </Typography>
        )}
      </form>
      <Typography variant="h6" style={{ marginTop: "15px" }}>
        Not a Member? <Link to="/register">Create an Account</Link>
      </Typography>
    </Box>
  );
};

export default Login;
