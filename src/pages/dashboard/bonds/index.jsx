import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { RightSideBar } from "../../../components";
import MyBond from "./my-bonds";
import Groups from "./groups";
import Pages from "./pages";

const Bonds = () => {
  const sidebar = [
    {
      label: "Bonds",
      component: <MyBond />,
    },
    {
      label: "Groups",
      component: <Groups />,
    },
    {
      label: "Pages",
      component: <Pages />,
    },
  ];
  const [activeSidebar, setActiveSidebar] = useState(sidebar[0]);

  return (
    <Box sx={{ p: "20px" }}>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={2.2}
          sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
        >
          <Box
            sx={{
              background: "#fff",
              padding: "36px 16px 5px 16px",
              border: "1px solid #E4E4E4",
              borderRadius: "4px",
            }}
          >
            <Typography fontSize="24px" textAlign="center">
              Manage my bonds
            </Typography>
            {sidebar.map((item) => {
              return (
                <Typography
                  onClick={() => setActiveSidebar(item)}
                  key={item.label}
                  sx={{
                    padding: "14px 20px",
                    cursor: "pointer",
                    background:
                      activeSidebar.label === item.label
                        ? "#F2F8FD"
                        : "transparent",
                    ":hover": { background: "#F2F8FD" },
                  }}
                  mt={3}
                  fontSize="14px"
                  textAlign="left"
                >
                  {item.label}
                </Typography>
              );
            })}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6.9}
          sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
        >
          {activeSidebar?.component}
        </Grid>
        <Grid item xs={12} md={2.9}>
          <RightSideBar hideResearch type="bonds" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Bonds;
