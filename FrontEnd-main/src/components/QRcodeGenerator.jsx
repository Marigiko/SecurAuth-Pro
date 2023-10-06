import React, { useEffect, useState, useContext } from "react";
import QRCode from "react-qr-code";
import { DataUserContext } from "../context/DataUserContext";

const QRcodeGenerator = () => {
  const { qrCodeKey, setQRCodeKey } = useContext(DataUserContext);

  useEffect(() => {
    // Realizar una solicitud GET al backend para obtener la clave del código QR
    fetch("http://localhost:8000/api/auth/two_auth_qr")
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado con la clave generada
        setQRCodeKey(data.key);
      })
      .catch((error) => {
        console.error("Error fetching QR code key:", error);
      });
  }, []);

  return (
    <div>
      {qrCodeKey && (
        <QRCode value={`otpauth://totp/API?secret=${qrCodeKey}`} size={150} />
      )}
    </div>
  );
};

export default QRcodeGenerator;
