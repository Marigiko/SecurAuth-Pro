import { Box, Button, Typography } from "@mui/material";
import QRcodeGenerator from "../components/QRcodeGenerator";
import { useNavigate } from "react-router-dom";

const QRcode = () => {
  const navigate = useNavigate(); // Obtén la función navigate

  const handleContinueClick = () => {
    // Maneja el clic en el botón "Continue"
    console.log("Clicked Continue");
    navigate("/authtoken"); // Redirige a la página /authtoken
  };

  return (
    <Box
      sx={{
        width: "70%",
        height: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Typography>
          In order to protect your account from unauthorized acces, we require
          both a password and possession of your phone to access your account.
          Please install Microsoft Authenticator app through the following steps
          for us to verify that you have possession of your phone.
        </Typography>
        <ol
          style={{
            margin: "0",
          }}
        >
          <li>
            Install the Microsoft Authenticator App from{" "}
            <span style={{ fontWeight: "700" }}>
              {" "}
              IOS App Store/Android Play Store.
            </span>
          </li>
          <li>Open the Microsoft Authenticator App.</li>
          <li>
            Click <span style={{ fontWeight: "700" }}> I agree</span> for
            permissions to use the app.
          </li>
          <li>
            Click <span style={{ fontWeight: "700" }}> Scan a QR Code.</span>
          </li>
          <li>Scan the image below.</li>
        </ol>
        <Box
          sx={{
            width: "170px",
            height: "170px",
            border: "3px solid #389820",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRcodeGenerator />
        </Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <Typography>
          When Microsoft Authenticator app displays a six-digit code, click the{" "}
          <span style={{ fontWeight: "700" }}> Continue</span>
          button below.
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        sx={{
          height: "45px",
          fontWeight: "700",
          fontSize: "20px",
          textTransform: "capitalize",
        }}
        onClick={handleContinueClick}
      >
        Continue
      </Button>
    </Box>
  );
};

export default QRcode;
