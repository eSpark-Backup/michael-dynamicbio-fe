import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Button } from "../../../components";
import { successTick } from "../../../assets";
import { useEffect, useState } from "react";
import { useQuery } from "../../../utils";
import { useVerifyEmailMutation } from "../../../services/auth";
import { toast } from "react-toastify";

const EmailVerified = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get("token");
  const expiresAt = query.get("expiresAt");
  const [verifyEmail] = useVerifyEmailMutation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token && expiresAt) {
      setLoading(true);
      verifyEmail({ token, expiresAt }).then((res) => {
        if (res?.error) {
          const message = res?.error?.data?.message || "Verification failed.";
          setError(message);
          toast.error(message);
          setLoading(false);
          return;
        }

        const statusCode = res?.data?.statusCode;
        const response = res?.data?.data;

        if (statusCode === 200 && response) {
          const user = response?.user || {};
          const newToken = response?.token || "";

          if (!newToken) {
            setError("Token missing in response.");
            toast.error("Token missing in response.");
            setLoading(false);
            return;
          }

          // ✅ Save token
          localStorage.setItem("token", newToken);
          const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            about: user.about,
          };
          localStorage.setItem("temp_user_data", JSON.stringify(userData));

          toast.success("Email verified successfully!");
          setLoading(false);
          localStorage.removeItem("temp_user_data");

          // ✅ Redirect to dashboard
          navigate("/complete-profile");
        } else {
          const message =
            res?.data?.message ||
            "Email verification failed. Please try again.";
          setError(message);
          toast.error(message);
          setLoading(false);
        }
      });
    } else {
      setError("Invalid verification link.");
      setLoading(false);
    }
  }, [token, expiresAt, navigate, verifyEmail]);

  return (
    <>
      {loading ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%", height: "500px" }}
        >
          <CircularProgress sx={{ mt: "50px", color: "#1877F2" }} />
        </Stack>
      ) : (
        <Stack
          sx={{
            width: { xs: "100%", md: "90%", lg: "77%", xl: "706px" },
          }}
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
        >
          {!error && (
            <img
              style={{ marginTop: "184px" }}
              src={successTick}
              alt="success"
            />
          )}
          <Typography mb="75px" mt={4} fontSize="29px" textAlign="center">
            {error ? error : "Your account has been created successfully"}
          </Typography>
          {!error && (
            <Box sx={{ width: "250px", mb: "75px" }}>
              <Button onClick={() => navigate("/complete-profile")}>
                Next
              </Button>
            </Box>
          )}
        </Stack>
      )}
    </>
  );
};

export default EmailVerified;
