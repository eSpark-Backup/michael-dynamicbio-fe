import React, { useState } from "react";
import { Box, Button, Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ai, logo2, marketplace, world } from "../../assets";
import { BoxWithTextIcon } from "../../components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:1280px)");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        width: "100%",
        height: "66px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <img src={logo2} alt="Logo" />

      {isMobile ? (
        // Mobile: Show Menu Icon
        <>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon sx={{ fontSize: 30, color: theme.palette.primary.dark }} />
          </IconButton>
          {/* Drawer */}
          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <Box
              sx={{
                width: "250px",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                rowGap: "15px",
              }}
            >
              <Button
                sx={{
                  display: "flex",
                  columnGap: "15px",
                  fontSize: "18px",
                  fontWeight: 400,
                  color: theme.palette.primary.light,
                  justifyContent: "flex-start",
                }}
              >
                <img src={world} alt="World" />
                Network
              </Button>
              <Box sx={{ width: "204px" }}>
                <BoxWithTextIcon text={"Marketplace"} icon={marketplace} />
              </Box>
              <Box sx={{ width: "204px" }}>
                <BoxWithTextIcon text={"DDT"} icon={ai} onClick={() => navigate("/ddt")} />
              </Box>
            </Box>
          </Drawer>
        </>
      ) : (
        // Desktop: Show Buttons
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "20px",
          }}
        >
          <Button
            sx={{
              display: "flex",
              columnGap: "15px",
              fontSize: "18px",
              fontWeight: 400,
              color: theme.palette.primary.light,
              height: "46px",
              width: { xs: "100%", lg: "204px" },
            }}
          >
            <img src={world} alt="World" />
            Network
          </Button>
          <Box sx={{ width: { xs: "100%", lg: "204px" } }}>
            <BoxWithTextIcon text={"Marketplace"} icon={marketplace} />
          </Box>
          <Box sx={{ width: { xs: "100%", lg: "204px" } }}>
            <BoxWithTextIcon text={"DDT"} icon={ai} onClick={() => navigate("/ddt")} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Header;
