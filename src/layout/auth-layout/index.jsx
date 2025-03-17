import { Outlet, useLocation } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { authImage, icon, logo } from "../../assets";

const AuthLayout = () => {
  const { pathname } = useLocation();
  const welcomeScreens = ["/complete-profile", "/upload-image"];
  const isWelcomeScreen = welcomeScreens.includes(pathname);
  return !isWelcomeScreen ? (
    <Stack
      sx={{
        backgroundColor: "#FCFCFC !important",
        width: "100wh",
        height: "100vh",
        "> img": {
          width: "50%",
          height: "100%",
          objectFit: "cover",
          display: { xs: "none", md: "block" },
        },
      }}
      direction="row"
      alignItems="center"
      justifyItems="space-between"
    >
      <img src={authImage} />
      <Stack
        sx={{
          width: { xs: "100%", md: "50%" },
          height: "100%",
          overflowY: "auto",
        }}
        direction="column"
        alignItems="center"
        justifyItems="flex-start"
      >
        {/* <img
          style={{ width: "109px", height: "89px", marginTop: "43px" }}
          src={icon}
          alt="app-logo"
        /> */}
        <img
          style={{ width: "207px", height: "65px", marginTop: "200px" }}
          src={logo}
          alt="app-name-logo"
        />
        <Stack
          sx={{ width: "100%", marginTop: "37px" }}
          direction="column"
          alignItems="center"
          justifyItems="flex-start"
        >
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "56px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FDF8F2",
        }}
      >
        <img width={55} height={45} src={icon} alt="" />
      </Box>
      <img
        style={{ width: "207px", height: "48px", marginTop: "42px" }}
        src={logo}
        alt="app-name-logo"
      />
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
