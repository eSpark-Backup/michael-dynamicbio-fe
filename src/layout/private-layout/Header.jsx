import { Box } from "@mui/material";
import { barIcon, icon } from "../../assets";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "56px",
        display: "flex",
        backgroundColor: "#FDF8F2",
      }}
    >
      <Box sx={{ width: "48%" }}></Box>
      <Box
        sx={{
          width: "52%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "30px",
        }}
      >
        <img src={icon} alt="" />
        <img src={barIcon} alt="" />
      </Box>
    </Box>
  );
};

export default Header;
