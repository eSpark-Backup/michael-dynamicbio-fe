import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid2,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { close, dummyPhoto, verticleDots } from "../../../assets";
import AboutSection from "./AboutSection";
import PostSection from "./PostSection";
import { useNavigate, useParams } from "react-router-dom";
import { RightSideBar } from "../../../components";
import {
  useFollowPageMutation,
  useGetPageByIdQuery,
} from "../../../services/page";
import { toCapitalized } from "../../../utils";

const PageDetailsPage = () => {
  const [selectedOption, setSelectedOption] = useState("relevant");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useGetPageByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const { user } = useSelector((state) => state.auth);
  const isMyPage = data?.data?.creatorId === user?.id;

  const [follow, { isLoading: isFollowLoading }] = useFollowPageMutation();

  const handleFollow = () => {
    follow(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetch();
      }
    });
  };

  useEffect(() => {
    if (isError) toast.error(error?.data?.message);
  }, [isError]);

  const tabs = useMemo(() => {
    return [
      {
        label: "Home",
        component: <PostSection data={data?.data} />,
      },
      {
        label: "About",
        component: <AboutSection data={data?.data} />,
      },
    ];
  }, [data?.data]);
  const [activeTabLabel, setActiveTabLabel] = useState("Home");
  const activeTab = tabs.find((tab) => tab.label === activeTabLabel);
  const [bar, setBar] = useState(true);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 150px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#1877F2" }} />
      </Box>
    );
  }

  return (
    <>
      {isMyPage && (
        <Box
          sx={{
            background:
              "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04))",
            py: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "98%", md: "85%", lg: "80%", xl: "75%" },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: "500", color: "#fff" }}
            >
              You are viewing this page as a member
            </Typography>
            <Box sx={{ minWidth: "180px" }}>
              <Button
                sx={{
                  height: "36px",
                  backgroundColor: "transparent",
                  border: "1px solid white",
                  color: "white",
                  borderRadius: "15px",
                  cursor: "pointer !important",
                }}
                onClick={() => navigate(`/page/${id}/admin`)}
              >
                View as admin
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid2
          container
          spacing={3}
          sx={{
            width: { xs: "98%", md: "85%", lg: "80%", xl: "75%" },
            py: "25px",
          }}
        >
          <Grid2 size={{ xs: 12, lg: 8, xl: 9 }}>
            <Paper sx={{ p: "0px" }}>
              <Box
                sx={{
                  height: "134px",
                  backgroundImage: `url(${dummyPhoto})`,
                  backgroundPosition: "center",
                  backgroundSize: "101% auto",
                  backgroundRepeat: "no-repeat",
                  position: "relative",
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "4px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "128px",
                    height: "128px",
                    border: "4px solid #fff",
                    position: "absolute",
                    top: "70px",
                    left: "25px",
                    backgroundImage: `url(${
                      data?.data?.logoUrl || dummyPhoto
                    })`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></Box>
              </Box>
              <Box
                sx={{
                  mt: "90px",
                  px: "25px",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                  mb: "30px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: "500",
                      color: "#171717",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                    }}
                  >
                    {data?.data?.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#505050",
                    }}
                  >
                    {toCapitalized(data?.data?.industry) || ""}{" "}
                    {data?.data?.organizationSize}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "10px" }}>
                  <Button
                    disabled={isFollowLoading}
                    onClick={handleFollow}
                    type="submit"
                    sx={{
                      maxWidth: "150px",
                      height: "36px",
                      fontSize: "16px",
                      minWidth: { md: "150px" },
                    }}
                  >
                    {data?.data?.isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                  <Box
                    sx={{
                      width: "150px",
                      height: "36px",
                      borderRadius: "2px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "white",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "8px",
                        padding: "1px",
                        background:
                          "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                        mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                        WebkitMask:
                          "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                        WebkitMaskComposite: "destination-out",
                        maskComposite: "exclude",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <Typography variant="gradientText">Use AI</Typography>
                  </Box>
                  <Box
                    onClick={(e) => handleClick2(e)}
                    sx={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "white",
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "50%",
                        padding: "1px",
                        background:
                          "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                        mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                        WebkitMask:
                          "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                        WebkitMaskComposite: "destination-out",
                        maskComposite: "exclude",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <img src={verticleDots} alt="menu" />
                  </Box>
                </Box>
                {bar && (
                  <Box
                    sx={{
                      p: "25px",
                      border: "1px solid #E4E4E4",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "20px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#505050",
                        width: "75%",
                      }}
                    >
                      Follow other organizations as your Page to grow visibility
                      for{" "}
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#171717",
                          display: "inline-block",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          width: "100%",
                          textTransform: "capitalize",
                        }}
                      >
                        {data?.data?.name}
                      </span>
                    </Typography>
                    <Box sx={{ display: "flex", columnGap: "10px" }}>
                      <Box
                        onClick={() => navigate("/bonds?sub=page")}
                        sx={{
                          width: "150px",
                          height: "36px",
                          borderRadius: "2px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: "white",
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: "8px",
                            padding: "1px",
                            background:
                              "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                            mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                            WebkitMask:
                              "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                            WebkitMaskComposite: "destination-out",
                            maskComposite: "exclude",
                          },
                          cursor: "pointer",
                        }}
                      >
                        <Typography variant="gradientText">
                          Get Started
                        </Typography>
                      </Box>
                      <img
                        onClick={() => setBar(false)}
                        src={close}
                        alt="Icon"
                      />
                    </Box>
                  </Box>
                )}
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                gap={5}
                sx={{
                  background: "#FFF",
                  border: "1px solid #E4E4E4",
                  borderRadius: "4px",
                  padding: "18px 30px",
                }}
              >
                {tabs.map((tab) => (
                  <Typography
                    sx={{
                      cursor: "pointer",
                      position: "relative",
                      background:
                        "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                      "-webkit-background-clip": "text",
                      "-webkit-text-fill-color":
                        tab?.label === activeTab?.label
                          ? "transparent"
                          : "#000",
                      textAlign: "center",
                      "&::after": {
                        content: '""',
                        display:
                          tab?.label === activeTab?.label ? "block" : "none",
                        width: "90px",
                        height: "4px",
                        background:
                          "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                        position: "absolute",
                        bottom: "-20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        borderRadius: "2px",
                      },
                    }}
                    fontSize="14px"
                    fontWeight={500}
                    onClick={() => setActiveTabLabel(tab?.label)}
                    key={tab.label}
                  >
                    {tab.label}
                  </Typography>
                ))}
              </Stack>
            </Paper>
            <Box sx={{ marginTop: "10px" }}>{activeTab?.component}</Box>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 4, xl: 3 }}>
            <Paper>
              <RightSideBar hideResearch type="bonds" />
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ maxWidth: { xs: "300px", md: "420px" } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem disabled>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "100%",
              textTransform: "capitalize",
            }}
          >
            {`Manage notifications about ${data?.data?.name}`}
          </Typography>
        </MenuItem>
        <Divider />
        <RadioGroup
          value={selectedOption}
          onChange={handleRadioChange}
          sx={{ pl: 2, pr: 2, pt: 1, pb: 1 }}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel
            value="relevant"
            control={<Radio />}
            label="Most relevant"
          />
          <FormControlLabel value="off" control={<Radio />} label="Off" />
        </RadioGroup>
      </Menu>
      <Menu
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose}
        sx={{ maxWidth: { xs: "300px", md: "420px" } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <>
          <MenuItem
            onClick={(e) => {
              navigate("/bonds?sub=page&edit=true");
              handleClose(e);
            }}
          >
            Create a page
          </MenuItem>
        </>
      </Menu>
    </>
  );
};

export default PageDetailsPage;
