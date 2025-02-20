import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { Button, OtpInput } from "../../../components";
import { qrcode } from "../../../assets";

const GoogleAuth = () => {
  const isMfaActive = false;
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
        {isMfaActive
          ? "Authentication using Google Authenticator. Enter the 6-digit code from your Google Authenticator."
          : "For enhanced security, use Google Authenticator and scan the QR code. This trusted app generates unique login codes, safeguarding youraccount. Get Google Authenticator"}
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "55px", width: "424px" }}
      >
        {!isMfaActive && <img src={qrcode} />}
        <Box sx={{ mt: 2 }}>
          <OtpInput value={otp} onChange={(val) => setOtp(val)} numInputs={6} />
        </Box>
      </Stack>

      {isMfaActive && (
        <Link
          style={{
            marginTop: "40px",
            color: "#505050",
            textDecoration: "none",
          }}
          to="/troubleshoot-mfa"
        >
          <Typography>Troubleshoot device?</Typography>
        </Link>
      )}

      <Box sx={{ width: "250px", mt: isMfaActive ? 10 : 2 }}>
        <Button onClick={() => navigate(isMfaActive ? "/login" : "/")}>
          {isMfaActive ? "Back to login" : "Skip for now"}
        </Button>
      </Box>
    </Stack>
  );
};

export default GoogleAuth;
