import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useVerifymfaWithEmailMutation } from "../../../services/auth";
import { email, mobile } from "../../../assets";

const TroubleshootMfa = () => {
  const navigate = useNavigate();
  const [verifymfaWithEmail] = useVerifymfaWithEmailMutation();

  const handleEmailMfa = () => {
    verifymfaWithEmail().then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        navigate(`/email-mfa?email=${res?.data?.data?.email}`)
      }
    });
  };
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
        Choose the method you want to use for troubleshoot.
      </Typography>

      <Box sx={{ maxWidth: "424px", width: "100%", marginTop: "46px" }}>
        <Stack
          onClick={() => navigate("/resync-mfa")}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
          sx={{ padding: "18px 60px", cursor: "pointer" }}
        >
          <img src={mobile} alt="mobile" />
          <Typography>Re-sync with server</Typography>
        </Stack>
        <Stack
          onClick={handleEmailMfa}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
          sx={{ padding: "18px 60px", marginTop: "28px", cursor: "pointer" }}
        >
          <img src={email} alt="email" />
          <Typography>Verify device via email</Typography>
        </Stack>
      </Box>

      <Box sx={{ width: "250px", mt: 10 }}>
        <Button onClick={() => navigate("/login")}>Back to login</Button>
      </Box>
    </Stack>
  );
};

export default TroubleshootMfa;
