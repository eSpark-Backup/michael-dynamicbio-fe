import { Stack } from "@mui/material";
import OTPInput from "react-otp-input";

const OtpInput = ({ numInputs, value, onChange }) => {
  const handleOtpChange = (val) => {
    const paddedOtp = val.padEnd(6, "_").slice(0, 6);
    onChange(paddedOtp);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        borderRadius: "16px",
        div: {
          gap: "8px",
          height: "70px",
        },
        input: {
          fontSize: "32px",
          fontWeight: 600,
          border: "none",
          outline: "none",
          color: "#000",
        },
      }}
    >
      <OTPInput
        value={value}
        onChange={handleOtpChange}
        numInputs={numInputs}
        renderInput={(props) => <input {...props} />}
      />
    </Stack>
  );
};

export default OtpInput;
