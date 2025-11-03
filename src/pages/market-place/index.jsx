import { Box, Stack, styled } from "@mui/material";
import { useState } from "react";
import SideNav from "./SideNav";
import ProductForm from "./ProductForm";
import { productData } from "../../constant";

const Index = () => {
  const { sideNavData } = productData || {};
  const [value, setValue] = useState(0);
  const [innerValue, setInnerValue] = useState(0);

  const handleChangeTab = (_, newValue) => setValue(newValue);
  const handleChangeInnerTab = (_, newValue) => setInnerValue(newValue);

  const MainWrapper = styled("div")(() => ({
    display: "flex",
    width: "100%",
    height: "100%",
    minHeight: "calc(100vh - 131px)",
    overflow: "hidden",
  }));

  const PageWrapper = styled("div")(() => ({
    width: "100%",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    zIndex: 1,
    overflow: "hidden",
  }));

  return (
    <MainWrapper>
      <Box sx={{ maxheight: "100%" }}>
        <SideNav
          data={sideNavData}
          tabValue={value}
          onChange={handleChangeTab}
          innerTabValue={innerValue}
          onInnerChange={handleChangeInnerTab}
        />
      </Box>
      <PageWrapper>
        <Stack
          sx={{
            p: 3,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value === 1 && innerValue === 0 && (
            <ProductForm setValue={setValue} setInnerValue={setInnerValue} />
          )}
        </Stack>
      </PageWrapper>
    </MainWrapper>
  );
};

export default Index;
