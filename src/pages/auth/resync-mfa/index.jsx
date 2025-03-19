import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Stack, Typography } from "@mui/material";
import { Button, OtpInput } from "../../../components";
import { useResyncMfaMutation } from "../../../services/auth";

const ResyncMfa = () => {
  const navigate = useNavigate();
  const [resync, { isLoading }] = useResyncMfaMutation();
  const [otp, setOtp] = useState("______");
  const [otp2, setOtp2] = useState("______");
  const handleResync = () => {
    if (otp === otp2) {
      toast.error("Codes should not be same");
      return;
    } else if (
      otp.length === 6 &&
      !otp.includes("_") &&
      otp2.length === 6 &&
      !otp2.includes("_")
    ) {
      resync({ firstToken: otp, secondToken: otp2 }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          localStorage.setItem("token", res?.data?.data?.token);
          localStorage.removeItem("temp-token");
          navigate("/");
        }
      });
    } else {
      toast.error("Please enter codes");
    }
  };
  return (
    <Stack
      sx={{
        width: { xs: "100%", md: "90%", lg: "77%", xl: "706px" },
        ".MuiStack-root": {
          borderBottom: "1px solid #000",
          borderRadius: "0px",
          justifyContent: "flex-start",
          padding: "0 20px",
        },
      }}
      direction="column"
      alignItems="center"
      justifyItems="flex-start"
    >
      <Typography
        textAlign="center"
        sx={{ fontSize: { xs: "28px", md: "40px" } }}
      >
        Re-sync Your Device
      </Typography>
      <Typography
        sx={{ marginTop: "48px" }}
        textAlign="center"
        fontWeight={300}
        fontSize="17px"
      >
        if you are multi-factor authentication(MFA) device appears to be
        functioning properly and you are not able to sign in, then the device
        might be out of Sync. First try to resync your device using the
        following instructions.
      </Typography>

      <Typography
        textAlign="left"
        sx={{ width: "100%", fontSize: "17px", fontWeight: "300", mt: "24px" }}
      >
        Type the first authentication code you see on your device
      </Typography>
      <OtpInput value={otp} onChange={(val) => setOtp(val)} numInputs={6} />

      <Typography
        textAlign="left"
        sx={{ width: "100%", fontSize: "17px", fontWeight: "300", mt: "24px" }}
      >
        Wait until the code gets updated or the display turns off. then turn on
        or type the second code you see on your device
      </Typography>
      <OtpInput
        placeholder={
          otp.length === 6 && !otp.includes("_") ? null : "Type Updated Code"
        }
        value={otp2}
        onChange={(val) => setOtp2(val)}
        numInputs={6}
      />

      <Box onClick={handleResync} sx={{ width: "250px", mt: "82px" }}>
        <Button loading={isLoading}>Done</Button>
      </Box>
      <Typography sx={{ marginTop: "53px", mb: 5 }}>
        Back to
        <Link
          style={{
            textDecoration: "none",
            marginLeft: "8px",
            width: "100%",
          }}
          to="/login"
        >
          <Typography
            variant="gradientText"
            fontSize="18px"
            fontWeight={500}
            component="span"
          >
            Login
          </Typography>
        </Link>
      </Typography>
    </Stack>
  );
};

export default ResyncMfa;
