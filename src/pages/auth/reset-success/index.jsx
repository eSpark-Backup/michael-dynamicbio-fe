import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { Button } from "../../../components";
import { successTick } from "../../../assets";

const ResetSuccess = () => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        width: { xs: "100%", md: "90%", lg: "77%", xl: "706px" },
      }}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <img style={{ marginTop: "184px" }} src={successTick} alt="success" />
      <Typography mt={4} fontSize="29px" textAlign="center">
        Password Successfully Reset!
      </Typography>
      <Box sx={{ width: "250px", mt: "75px" }}>
        <Button onClick={() => navigate("/")}>Login</Button>
      </Box>
    </Stack>
  );
};

export default ResetSuccess;
