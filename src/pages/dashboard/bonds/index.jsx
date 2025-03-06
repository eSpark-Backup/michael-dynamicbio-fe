import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { RightSideBar } from "../../../components";
import MyBond from "./my-bonds";
import Groups from "./groups";
import Pages from "./pages";
import SearchBonds from "./search-bonds";
import { useQuery } from "../../../utils";
import { pageTypes } from "../../../constant";
import { handleChange } from "../../../store/slices/search";

const Bonds = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const sub = query.get("sub") || "bond";
  const q = query.get("q");
  const filter = query.get("filter");
  const pageType = query.get("pageType");
  const bondSidebar1 = [
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
  const bondSidebar2 = [
    {
      filter: "all",
      label: "All",
      component: <SearchBonds />,
    },
    {
      filter: "people",
      label: "People",
      component: <SearchBonds />,
    },
    {
      filter: "groups",
      label: "Groups",
      component: <SearchBonds />,
    },
    {
      filter: "pages",
      label: "Pages",
      component: <SearchBonds />,
    },
    {
      filter: "events",
      label: "Events",
      component: <SearchBonds />,
    },
    {
      filter: "school",
      label: "School",
      component: <SearchBonds />,
    },
    {
      filter: "posts",
      label: "Posts",
      component: <SearchBonds />,
    },
  ];
  const [mySidebar, setMySidebar] = useState(q ? bondSidebar2 : bondSidebar1);
  const [activeSidebar, setActiveSidebar] = useState(
    q
      ? mySidebar.find((item) => item.filter === filter)
      : mySidebar.find((item) => item.sub === sub)
  );

  useEffect(() => {
    dispatch(handleChange(q));
  }, []);
  const { search } = useSelector((state) => state.search);
  useEffect(() => {
    if (search !== null) {
      const delaySearch = setTimeout(() => {
        if (search === "") {
          navigate("/bonds?sub=bond");
          setMySidebar(bondSidebar1);
          setActiveSidebar(bondSidebar1.find((item) => item.sub === sub));
        } else {
          navigate(`/bonds?q=${search}&filter=${filter || "all"}`);
          setMySidebar(bondSidebar2);
          setActiveSidebar(bondSidebar2.find((item) => item.filter === filter));
        }
      }, 500);

      return () => clearTimeout(delaySearch);
    }
  }, [search, filter]);

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
              {q ? "On this Page" : "Manage my bonds"}
            </Typography>
            {mySidebar.map((item) => {
              return (
                <Typography
                  onClick={() => {
                    navigate(
                      q
                        ? `/bonds?q=${search}&filter=${item?.filter}`
                        : `/bonds?sub=${item.sub}`
                    );
                    setActiveSidebar(item);
                  }}
                  key={item.label}
                  sx={{
                    padding: "14px 20px",
                    cursor: "pointer",
                    background:
                      activeSidebar?.label === item.label
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
          {pageType && (
            <Stack
              mt={2}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              {pageTypes.map((item) => {
                return (
                  item.alt === pageType && (
                    <Box
                      key={item?.title}
                      sx={{
                        width: "300px",
                        height: "160px",
                        boxShadow: "0px 0px 6.1px 0px #00000026",
                        borderRadius: "4px",
                        background: "#FFF",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                    >
                      <img src={item?.icon} alt={item?.alt} />
                      <Typography
                        textAlign="center"
                        fontSize={21}
                        fontWeight={700}
                      >
                        {item?.title}
                      </Typography>
                      <Typography
                        textAlign="center"
                        fontSize={17}
                        fontWeight={300}
                      >
                        {item?.desc}
                      </Typography>
                    </Box>
                  )
                );
              })}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Bonds;
