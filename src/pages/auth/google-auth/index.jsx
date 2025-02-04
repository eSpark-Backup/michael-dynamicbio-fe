import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { Button, OtpInput } from "../../../components";
import { qrcode } from "../../../assets";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("______");

  useEffect(() => {
    if (otp.length === 6 && !otp.includes("_")) {
      navigate("/otp-verified");
    }
  }, [otp, navigate]);
  return (
    <Stack
      sx={{ width: { xs: "100%", md: "90%", lg: "77%", xl: "706px" } }}
      direction="column"
      alignItems="center"
      justifyItems="flex-start"
    >
      <Typography textAlign="center" fontSize="40px">
        Multi Factor Authentication
      </Typography>
      <Typography
        sx={{ marginTop: "48px" }}
        textAlign="center"
        fontWeight={300}
        fontSize="17px"
      >
        For enhanced security, use Google Authenticator and scan the QR code.
        This trusted app generates unique login codes, safeguarding your
        account. Get Google Authenticator
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "55px", width: "424px" }}
      >
        <img src={qrcode} />
        <Box sx={{ mt: 2 }}>
          <OtpInput value={otp} onChange={(val) => setOtp(val)} numInputs={6} />
        </Box>
      </Stack>

      <Box sx={{ width: "250px", mt: 2 }}>
        <Button onClick={() => navigate("/")}>Skip for now</Button>
      </Box>
    </Stack>
  );
};

export default GoogleAuth;
