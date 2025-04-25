import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Button } from "../../../components";
import { successTick } from "../../../assets";
import { useEffect, useState } from "react";
import { useQuery } from "../../../utils";
import { useVerifyEmailMutation } from "../../../services/auth";

const EmailVerified = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get("token");
  const expiresAt = query.get("expiresAt");
  const [verifyEmail] = useVerifyEmailMutation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (token && expiresAt) {
      setLoading(true);
      verifyEmail({ token, expiresAt }).then((res) => {
        if (res?.error) {
          setError(res?.error?.data?.message);
          setLoading(false);
          return;
        }
        if (res) {
          const data = {
            firstName: res?.data?.data?.user?.firstName,
            lastName: res?.data?.data?.user?.lastName,
            about: res?.data?.data?.user?.about,
          }
          setLoading(false);
          localStorage.setItem("temp_user_data", JSON.stringify(data));
          localStorage.setItem("token", res?.data?.data?.token);
        }
      });
    }
  }, [token, expiresAt]);
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
