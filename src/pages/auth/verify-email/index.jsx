import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { Button } from "../../../components";
import { useQuery } from "../../../utils";
import { successTick } from "../../../assets";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const type = query.get("type");

  useEffect(() => {
    if (type === "reset") {
      /// reset password api
    } else {
      /// set password api
    }
  }, []);

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
      <Typography mt={4} fontSize="29px" textAlign="center">
        Verification link has been sent to ar*******@gmail.com Please check your
        email and verify.
      </Typography>
      <Box sx={{ width: "250px", mt: "75px" }}>
        <Button onClick={() => navigate(`/forget-password?type=${type}`)}>Resend</Button>
      </Box>
      <Typography sx={{ mt: "30px", cursor: "pointer" }} onClick={() => navigate(-1)}>
        Back
      </Typography>
    </Stack>
  );
};

export default VerifyEmail;
