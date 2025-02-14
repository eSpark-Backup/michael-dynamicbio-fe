import { Link, useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { Button } from "../../../components";
import { userAvatar } from "../../../assets";

const SelectEmail = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    //select Email
    console.log(values, "values");
    navigate("/verify-email?type=reset");
  };
  return (
    <Stack
      sx={{ width: { xs: "100%", md: "90%", lg: "77%", xl: "706px" } }}
      direction="column"
      alignItems="center"
      justifyItems="flex-start"
    >
      <Typography fontSize="40px">Recognize Your profile</Typography>
      <Typography sx={{ width: "100%", textalign: "left", marginTop: "48px" }}>
        By continuing, you will receive a six-digit code at your email.
      </Typography>
      <Stack sx={{ width: "100%", marginTop: "20px" }} gap={2}>
        <Stack
          sx={{ width: "100%", padding: "20px" }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <img src={userAvatar} alt="user" />
            <Typography fontSize="24px">a***@gmail.com</Typography>
          </Stack>
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            to="/find-email"
          >
            <Typography>Not you?</Typography>
          </Link>
        </Stack>
      </Stack>

      <Box sx={{ marginTop: "132px", width: "250px" }}>
        <Button onClick={handleSubmit}>Continue</Button>
      </Box>
      <Typography sx={{ marginTop: "24px" }}>
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

export default SelectEmail;
