import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";

const EmailMfa = () => {
  return (
    <Stack
      sx={{ width: { xs: "100%", md: "90%", lg: "77%", xl: "706px" } }}
      direction="column"
      alignItems="center"
      justifyItems="flex-start"
    >
      <Typography textAlign="center" fontSize="40px">
        Email Address Verification
      </Typography>
      <Typography
        sx={{ marginTop: "48px" }}
        textAlign="center"
        fontWeight={300}
        fontSize="17px"
      >
        Authenticate your account by verifying the email address. You will
        receive an email at a***@gmail.com, which will include instructions to
        verify your identity.
      </Typography>

      <Box sx={{ width: "250px", mt: "55px" }}>
        <Button>Resend</Button>
      </Box>
      <Typography sx={{ marginTop: "192px" }}>
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

export default EmailMfa;
