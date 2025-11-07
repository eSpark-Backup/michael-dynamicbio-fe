import { Box, IconButton, Stack } from "@mui/material";
import SideNav from "./SideNav";
import { productData } from "../../constant";
import { MARKET_PLACE_STYLE } from "./Styles";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import WidgetsIcon from "@mui/icons-material/Widgets";

const Index = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { mainWrapper, childWrapper, sideNavBox, stack, iconStyle } =
    MARKET_PLACE_STYLE || {};
  const { sideNavData } = productData || {};

  return (
    <Box sx={mainWrapper}>
      <Box sx={sideNavBox}>
        <SideNav
          data={sideNavData}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
      </Box>
      <Box sx={childWrapper}>
        <Stack sx={stack}>
          <Outlet />
        </Stack>
      </Box>
      <IconButton
        onClick={() => setMobileSidebarOpen((prev) => !prev)}
        sx={iconStyle}
      >
        <WidgetsIcon />
      </IconButton>
    </Box>
  );
};

export default Index;
