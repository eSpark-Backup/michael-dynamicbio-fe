import { Box, Stack } from "@mui/material";
import SideNav from "./SideNav";
import { productData } from "../../constant";
import { MARKET_PLACE_STYLE } from "./Styles";
import { Outlet } from "react-router-dom";

const Index = () => {
  const { mainWrapper, childWrapper, sideNavBox, stack } =
    MARKET_PLACE_STYLE || {};
  const { sideNavData } = productData || {};

  return (
    <Box sx={mainWrapper}>
      <Box sx={sideNavBox}>
        <SideNav data={sideNavData} />
      </Box>
      <Box sx={childWrapper}>
        <Stack sx={stack}>
          <Outlet />
        </Stack>
      </Box>
    </Box>
  );
};

export default Index;
