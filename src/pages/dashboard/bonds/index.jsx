import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { RightSideBar } from "../../../components";
import MyBond from "./my-bonds";
import Groups from "./groups";
import Pages from "./pages";
import { useQuery } from "../../../utils";
import { useNavigate } from "react-router-dom";

const Bonds = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const sub = query.get("sub") || "bond";
  const sidebar = [
    {
      sub: "bond",
      label: "Bonds",
      component: <MyBond />,
    },
    {
      sub: "group",
      label: "Groups",
      component: <Groups />,
    },
    {
      sub: "page",
      label: "Pages",
      component: <Pages />,
    },
  ];
  const [activeSidebar, setActiveSidebar] = useState(
    sidebar.find((item) => item.sub === sub)
  );
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
                  onClick={() => {
                    navigate(`/bonds?sub=${item.sub}`);
                    setActiveSidebar(item);
                  }}
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
