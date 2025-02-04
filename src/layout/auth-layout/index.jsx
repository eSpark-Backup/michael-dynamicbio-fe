import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { authImage, icon, logo } from "../../assets";

const AuthLayout = () => {
  return (
    <Stack
      sx={{
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
        <img
          style={{ width: "109px", height: "89px", marginTop: "43px" }}
          src={icon}
          alt="app-logo"
        />
        <img
          style={{ width: "207px", height: "65px", marginTop: "80px" }}
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
  );
};

export default AuthLayout;
