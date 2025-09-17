import { Box, Paper, Typography } from "@mui/material";
import { toCapitalized } from "../../../utils";

const AboutSection = ({ data }) => {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
      <Typography
        sx={{ fontSize: "24px", fontWeight: "500", color: "#171717" }}
      >
        Overview
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3px" }}>
        <Typography
          sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}
        >
          Industry
        </Typography>
        <Typography
          sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
        >
          {toCapitalized(data?.industry)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3px" }}>
        <Typography
          sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}
        >
          Company size
        </Typography>
        <Typography
          sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
        >
          {data?.organizationSize}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AboutSection;
