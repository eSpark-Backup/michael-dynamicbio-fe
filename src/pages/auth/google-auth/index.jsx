import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Button, OtpInput } from "../../../components";
import {
  useGenerateQrMutation,
  useReverifymfaWithEmailMutation,
  useVerifyQrMutation,
} from "../../../services/auth";
import { useQuery } from "../../../utils";

const GoogleAuth = () => {
  const query = useQuery();
  const token2 = query.get("token");
  const expiresAt = query.get("expiresAt");
  const reverifyMfa = token2 && expiresAt;
  const token = localStorage.getItem("token");
  const [generateQr, { isLoading }] = useGenerateQrMutation();
  const [reVerifyMfa, { isLoading: reverifyLoading }] =
    useReverifymfaWithEmailMutation();
  const [verifyQr, { isLoading: verifyLoading }] = useVerifyQrMutation();
  const isMfaActive = reverifyMfa ? false : !token;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("______");
  const [qrcode, setQrcode] = useState(null);

  useEffect(() => {
    if (otp.length === 6 && !otp.includes("_")) {
      verifyQr({ token: otp }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          localStorage.setItem("token", res?.data?.data?.token);
          localStorage.removeItem("temp-token");
          navigate("/otp-verified");
        }
      });
    }
  }, [otp, navigate]);

  useEffect(() => {
    if (reverifyMfa) {
      reVerifyMfa({ token: token2, expiresAt }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          setQrcode(res?.data?.data?.qrcode);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.removeItem("temp-token");
      generateQr().then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          setQrcode(res?.data?.data?.qrcode);
          localStorage.setItem("temp-token", res?.data?.data?.token);
        }
      });
    }
  }, []);
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
      {isLoading || reverifyLoading ? (
        <CircularProgress sx={{ color: "#37A1F7", my: 10 }} />
      ) : (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "55px", width: "424px" }}
        >
          {qrcode && <img src={qrcode} />}
          {verifyLoading ? (
            <CircularProgress sx={{ color: "#37A1F7", my: 5 }} />
          ) : (
            <Box sx={{ mt: 2 }}>
              <OtpInput
                value={otp}
                onChange={(val) => setOtp(val)}
                numInputs={6}
              />
            </Box>
          )}
        </Stack>
      )}

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
        <Button onClick={() => navigate(reverifyMfa || isMfaActive ? "/login" : "/")}>
          {reverifyMfa || isMfaActive ? "Back to login" : "Skip for now"}
        </Button>
      </Box>
    </Stack>
  );
};

export default GoogleAuth;
