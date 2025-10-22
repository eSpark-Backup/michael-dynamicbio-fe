import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Stack, Typography } from "@mui/material";
import { Button, Input } from "../../../components";
import { maskEmail, useQuery } from "../../../utils";
import { successTick } from "../../../assets";
import {
  useForgotPasswordMutation,
  useResendEmailMutation,
} from "../../../services/auth";
import { useState, useEffect } from "react";

const VerifyEmail = () => {
  const [resendEmail, { isLoading }] = useResendEmailMutation();
  const [forgotPw, { isLoading: resetLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const query = useQuery();

  const queryEmail = query.get("email");
  const queryReset = query.get("reset");

  const [email, setEmail] = useState(queryEmail || "");
  const [showManualInput, setShowManualInput] = useState(false);

  useEffect(() => {
    if (!queryEmail && !queryReset) {
      setShowManualInput(true);
    } else {
      setShowManualInput(false);
    }
  }, [queryEmail, queryReset]);

  const handleResend = () => {
    if (!email) return toast.error("Please enter an email");

    resendEmail({ email }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }

      toast.success(res?.data?.message || "Verification email sent!");
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    });
  };

  const handleReset = () => {
    if (!email) return toast.error("Please enter an email");

    forgotPw({ email }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }

      toast.success(res?.data?.message || "Password reset email sent!");
      navigate(`/verify-email?reset=${encodeURIComponent(email)}`);
    });
  };

  return (
    <Stack
      sx={{
        width: { xs: "100%", md: "90%", lg: "77%", xl: "706px" },
      }}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <img style={{ marginTop: "134px" }} src={successTick} alt="success" />

      {!showManualInput ? (
        <>
          <Typography mt={4} fontSize="29px" textAlign="center">
            Verification link has been sent to {maskEmail(email)}. <br />
            Please check your email and verify.
          </Typography>

          <Box sx={{ width: "250px", mt: "75px" }}>
            <Button
              loading={isLoading || resetLoading}
              onClick={queryReset ? handleReset : handleResend}
            >
              Resend
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography mt={4} fontSize="26px" textAlign="center">
            Enter your email to resend verification or reset password
          </Typography>

          <Box sx={{ width: "100%", maxWidth: 400, mt: 4 }}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button
              loading={isLoading}
              onClick={handleResend}
              disabled={!email}
            >
              Verify
            </Button>
            <Button
              loading={resetLoading}
              onClick={handleReset}
              disabled={!email}
            >
              Reset
            </Button>
          </Box>
        </>
      )}

      <Typography
        sx={{ mt: "30px", cursor: "pointer", mb: 5 }}
        onClick={() => navigate(-1)}
      >
        Back
      </Typography>
    </Stack>
  );
};

export default VerifyEmail;
