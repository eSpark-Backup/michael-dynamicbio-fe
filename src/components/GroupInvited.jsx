import { Box, Paper, Typography } from "@mui/material";
import { noUser } from "../assets";

const GroupInvited = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={noUser} alt="" />
      <Typography
        sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}
      >
        Build your community
      </Typography>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "400",
          color: "#505050",
          textAlign: "center",
        }}
      >
        Invite your connections to join the group
      </Typography>
      <Box
        sx={{
          width: "150px",
          height: "36px",
          borderRadius: "2px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
          position: "relative",
          cursor: "pointer",
          mt: "20px",
        }}
      >
        <Typography sx={{ color: "white" }}>Invite connections</Typography>
      </Box>
    </Paper>
  );
};

export default GroupInvited;
