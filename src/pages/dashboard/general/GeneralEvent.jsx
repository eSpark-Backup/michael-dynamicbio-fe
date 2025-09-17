import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  calendar,
  comment,
  dummyPhoto,
  earth,
  like,
  location,
  send,
  user,
  videoIcon,
} from "../../../assets";
import { formatEventPostTime, formatEventTimeLocal } from "../../../utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "../../../components/button";
import { useGetGeneralPageQuery } from "../../../services/general";
import { toast } from "react-toastify";
import Header from "../../../layout/private-layout/Header";
import Navbar from "../../../layout/private-layout/Navbar";

const GeneralEvent = () => {
  const encodedData = useMemo(() => {
    const match = window.location.search.match(/data=([^&]*)/);
    return match ? match[1] : null;
  }, []);

  const {
    data: getGeneralData,
    isSuccess: getGeneralSuccess,
  } = useGetGeneralPageQuery(encodedData, {
    skip: !encodedData,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [postData, setPostData] = useState({
    eventImage: null,
    startTime: "",
    endTime: "",
    eventName: "",
    eventMaker: "",
    eventType: "",
    eventLink: "",
    attendees: [{ image: user }],
    eventPost: "bringback",
    venue: "",
    address: "",
    authorId: "",
  });

  useEffect(() => {
    if (getGeneralSuccess && getGeneralData?.data) {
      setPostData((prev) => ({
        ...prev,
        eventImage: getGeneralData?.data?.media["EVENTS"][0]?.url,
        startTime: getGeneralData?.data?.content?.startTime,
        endTime:
          getGeneralData?.data?.content?.showEndTime &&
          getGeneralData?.data?.content?.endTime,
        eventName: getGeneralData?.data?.content?.name,
        eventMaker: getGeneralData?.data?.isPagePost
          ? getGeneralData?.data?.page?.name
          : getGeneralData?.data?.author?.firstName +
            " " +
            getGeneralData?.data?.author?.lastName,
        eventType: getGeneralData?.data?.content?.eventType,
        eventLink: getGeneralData?.data?.content?.externalLink,
        venue:
          getGeneralData?.data?.content?.eventType === "Inperson"
            ? getGeneralData?.data?.content?.venue
            : "",
        address:
          getGeneralData?.data?.content?.eventType === "Inperson"
            ? getGeneralData?.data?.content?.address
            : "",
        authorId: getGeneralData?.data?.author?.id,
      }));
    }
  }, [getGeneralData, getGeneralSuccess]);

  const HandleClick = () => {
    toast.warning("Please login for actions");
  };

  return (
    <>
      <Header />
      <Navbar />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid2
          container
          spacing={3}
          sx={{
            width: { xs: "98%", md: "85%", lg: "85%", xl: "75%" },
            py: "25px",
          }}
        >
          <Grid2 size={{ xs: 12, lg: 8.3, xl: 9 }}>
            <Paper sx={{ p: "0px" }}>
              <Box
                sx={{
                  paddingTop: "56.25%",
                  backgroundImage: `url("${
                    postData?.eventImage ? postData?.eventImage : dummyPhoto
                  }")`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  width: "100.1%",
                }}
              ></Box>
              <Box
                sx={{
                  p: "40px 25px",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "500", color: "#ad4601" }}
                >
                  {formatEventPostTime(postData?.startTime)}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#171717",
                      textTransform: "capitalize",
                    }}
                  >
                    {postData?.eventName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#505050",
                    }}
                  >
                    Event by {postData?.eventMaker}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "10px",
                      alignItems: "center",
                      flexWrap: "wrap",
                      rowGap: "4px",
                    }}
                  >
                    <img src={calendar} alt="" />
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#505050",
                      }}
                    >
                      {formatEventTimeLocal(
                        postData?.startTime,
                        !postData?.endTime
                          ? postData?.startTime
                          : postData?.endTime
                      )}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={
                        postData?.eventType === "online" ? videoIcon : location
                      }
                      alt=""
                    />
                    {postData?.eventType === "online" && (
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#505050",
                          textTransform: "capitalize",
                        }}
                      >
                        {postData?.eventType}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "3px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "#171717",
                          textTransform: "capitalize",
                        }}
                      >
                        {postData?.address}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#505050",
                          textTransform: "capitalize",
                        }}
                      >
                        {postData?.venue}
                      </Typography>
                    </Box>
                  </Box>
                  {postData?.eventLink !== "" && (
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#505050",
                      }}
                    >
                      Event link •{" "}
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "#505050",
                        }}
                      >
                        {postData?.eventLink}
                      </span>
                    </Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={user}
                      alt="Avatar"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#505050",
                      }}
                    >
                      {"rotten ria is an attendee"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      sx={{
                        display: "flex",
                        columnGap: "3px",
                        width: "150px",
                        height: "50px",
                      }}
                      onClick={HandleClick}
                    >
                      <Typography sx={{ color: "white" }}>
                        {"Attend"}
                      </Typography>
                    </Button>
                    <Button
                      sx={{
                        display: "flex",
                        columnGap: "3px",
                        width: "150px",
                        height: "50px",
                        background: "white !important",
                        border: "1px solid black",
                      }}
                      onClick={HandleClick}
                    >
                      <Typography sx={{ color: "black" }}>{"Share"}</Typography>
                      <KeyboardArrowDownIcon sx={{ color: "black" }} />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
            <Box sx={{ marginTop: "10px" }}>
              {
                <Paper
                  sx={{
                    borderTopRightRadius: "0px",
                    borderTopLeftRadius: "0px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px",
                  }}
                >
                  <Box sx={{ display: "flex", columnGap: "20px" }}>
                    <img
                      src={user}
                      alt="Image"
                      style={{ width: "73px", height: "73px" }}
                    />
                    <Stack sx={{ width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "17px",
                            fontWeight: "500",
                            color: "#171717",
                          }}
                        >
                          RottenRia
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#505050",
                        }}
                      >
                        --
                      </Typography>
                      <Box sx={{ display: "flex", columnGap: "4px" }}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#505050",
                          }}
                        >
                          now .{" "}
                        </Typography>
                        <img src={earth} alt="Icon" style={{ width: "14px" }} />
                      </Box>
                    </Stack>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#505050",
                    }}
                  >
                    bringback
                  </Typography>
                  <Box
                    sx={{
                      borderTop: "1px solid #E4E4E4",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#F8FCFF",
                      height: "50px",
                      px: { xs: "10px", md: "0px" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        columnGap: "15px",
                        cursor: "pointer",
                        width: { md: "20%" },
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={HandleClick}
                    >
                      <img src={like} alt="Like" />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          display: { xs: "none", md: "block" },
                          color: "#505050",
                        }}
                      >
                        Like
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        columnGap: "15px",
                        cursor: "pointer",
                        backgroundColor: "inherit",
                        width: { md: "20%" },
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={HandleClick}
                    >
                      <img src={comment} alt="Like" />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          display: { xs: "none", lg: "block" },
                          color: "#505050",
                        }}
                      >
                        Comment
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        columnGap: "15px",
                        cursor: "pointer",
                        width: { md: "20%" },
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={HandleClick}
                    >
                      <img src={send} alt="Repost" />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          display: { xs: "none", md: "block" },
                          color: "#505050",
                        }}
                      >
                        Send
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              }
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 3.7, xl: 3 }}></Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default GeneralEvent;
