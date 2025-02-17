import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import OtpInput from "./otp-input";
import Button from "./button";

const NumberOtp = ({ number, onOtpVerify }) => {
  const [otp, setOtp] = useState("______");
  const theme = useTheme();

  const HandleSubmit = () => {
    if (otp.length === 6 && !otp.includes("_")) {
      onOtpVerify();
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Box
        sx={{
          width: "70%",
          ".MuiStack-root": {
            borderBottom: "1px solid #000",
            borderRadius: "0px",
          },
        }}
      >
        <Typography sx={{ fontSize: "17px", fontWeight: "300", mt: "80px" }}>
          Please enter 6-digit code you have received via text message on
          {` ${number}`}
        </Typography>
        <OtpInput value={otp} onChange={(val) => setOtp(val)} numInputs={6} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "250px", mt: "80px" }}>
            <Button type="submit" onClick={HandleSubmit}>
              Verify
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "27px",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", fontWeight: "300", textAlign: "center" }}
        >
          Already have an account?
          <Link
            style={{
              textDecoration: "none",
              width: "100%",
            }}
            to="/login"
          >
            <Typography
              ml={1}
              fontSize="18px"
              fontWeight={400}
              component="span"
              color={theme.palette.primary.dark}
              sx={{ textAlign: "center" }}
              variant="gradientText"
            >
              Login
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default NumberOtp;
