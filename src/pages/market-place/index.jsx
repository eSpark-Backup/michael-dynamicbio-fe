import { Box, Stack } from "@mui/material";
import { useState } from "react";
import SideNav from "./SideNav";
import ProductForm from "./ProductForm";
import { productData } from "../../constant";
import { MARKET_PLACE_STYLE } from "./Styles";
import MessageCenter from "./MessageCenter";
import MyProducts from "./MyProducts";
import Favourite from "./Favourite";
import ProductListing from "./ProductListing";

const Index = () => {
  const { mainWrapper, childWrapper, sideNavBox, stack } =
    MARKET_PLACE_STYLE || {};
  const { sideNavData } = productData || {};
  const [value, setValue] = useState(0);
  const [innerValue, setInnerValue] = useState(0);

  const handleChangeTab = (_, newValue) => setValue(newValue);
  const handleChangeInnerTab = (_, newValue) => setInnerValue(newValue);

  const renderContent = () => {
    if (value === 0) return <ProductListing />;

    if (value === 1) {
      switch (innerValue) {
        case 0:
          return (
            <ProductForm setValue={setValue} setInnerValue={setInnerValue} />
          );
        case 1:
          return <MyProducts />;
        case 2:
          return <MessageCenter />;
        default:
          return null;
      }
    }

    if (value === 2) return <Favourite />;

    return null;
  };

  return (
    <Box sx={mainWrapper}>
      <Box sx={sideNavBox}>
        <SideNav
          data={sideNavData}
          tabValue={value}
          onChange={handleChangeTab}
          innerTabValue={innerValue}
          onInnerChange={handleChangeInnerTab}
        />
      </Box>
      <Box sx={childWrapper}>
        <Stack sx={stack}>{renderContent()}</Stack>
      </Box>
    </Box>
  );
};

export default Index;
