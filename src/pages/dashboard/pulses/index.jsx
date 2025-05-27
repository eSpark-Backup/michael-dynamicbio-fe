import {
  Box,
  CircularProgress,
  Grid2,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { notification, profilePicture, userAvatar } from "../../../assets";
import {
  CustomizeTabs,
  PulseProfileCard,
  RightSideBar,
} from "../../../components";
import { pulseCardContent } from "../../../constant";
import { useGetAllNotificationsQuery } from "../../../services/notification";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { eventBus } from "../../../utils";
import { useNavigate } from "react-router-dom";

const Pulses = () => {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const { isLoading, isError, error, refetch, isFetching } =
    useGetAllNotificationsQuery({
      page,
      pageSize,
    });

  useEffect(() => {
    if (isError) toast.error(error?.response?.data?.message);
  }, [isError]);

  useEffect(() => {
    const handleRefetch = () => {
      refetch();
    };

    eventBus.on("refetchnotifications", handleRefetch);

    return () => {
      eventBus.off("refetchnotifications", handleRefetch);
    };
  }, []);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { notifications, totalItems } = useSelector(
    (state) => state.notifications
  );

  const tabOptions = ["All", "Mention/Research", "Group", "Company", "Pages"];
  const [activeIndex, setActiveIndex] = useState(1);
  const HandleClick = (id, metadata) => {
    if(metadata?.event === "NEW_GROUP_REQUEST" || metadata?.event === "NEW_GROUP_POST_REQUEST") {
      navigate(`/group/${metadata?.groupId}/manage`)
    } else if (metadata?.event === "GROUP_REQUEST_UPDATED" || metadata?.event === "GROUP_POST_REQUEST_UPDATED") {
      navigate(`/group/${metadata?.groupId}`)
    } else if (metadata?.event === "NEW_BOND_REQUEST") {
      navigate(`/bonds?sub=bond`)
    } else if (metadata?.event === "BOND_REQUEST_UPDATED") {
      navigate(`/bonds?sub=bonded-synergy`)
    }
  };

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
    <Box sx={{ p: "20px" }}>
      <Grid2 container spacing={5}>
        <Grid2
          size={{ xs: 12, lg: 2.5 }}
          sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
        >
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              rowGap: "10px",
            }}
          >
            <Box
              sx={{
                background: user?.coverImage
                  ? `url(${user?.coverImage})`
                  : "#D9D9D9",
                height: "71px",
                position: "relative",
                width: "100%",
              }}
            >
              <img
                src={user?.profileImage || userAvatar}
                alt="Profile"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "75%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Box>
            <Box sx={{ pt: "25px" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: theme.palette.primary.dark,
                  textAlign: "center",
                }}
              >
                {`${user?.firstName} ${user?.lastName}`}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#505050",
                  textAlign: "center",
                }}
              >
                {`${user?.designation} at ${user?.company}`}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#505050",
                  textAlign: "center",
                }}
              >
                {`${user?.city}, ${user?.country}`}
              </Typography>
            </Box>
          </Paper>
          {/* <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 400, color: theme.palette.primary.dark }}>Manage pulses</Typography>
            <img src={notification} alt="Notification" />
          </Paper> */}
        </Grid2>
        <Grid2
          size={{ xs: 12, lg: 6.5 }}
          sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
        >
          {/* <Paper>
            <CustomizeTabs tabs={tabOptions} />
          </Paper> */}
          <Paper
            sx={{
              maxHeight: "700px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              rowGap: "15px",
            }}
          >
            {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>You can change your pulse setting</Typography>
              <img src={notification} alt="notification" />
            </Box> */}
            {notifications?.length > 0 ? (
              <>
                {(() => {
                  const NotToShow = showAll
                    ? notifications
                    : notifications?.slice(0, 5);
                  return NotToShow?.map((item) => (
                    <PulseProfileCard
                      key={item?._id}
                      userRole={item?.title}
                      userImage={item?.metadata?.image}
                      description={item?.message}
                      time={dayjs(item?.createdAt).fromNow()}
                      id={item?._id}
                      metadata={item?.metadata}
                      HandleClick={HandleClick}
                      activeItem={activeIndex}
                    />
                  ));
                })()}
                {isFetching ? (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress sx={{ color: "#1877F2" }} />
                  </Box>
                ) : (
                  notification?.length > 5 &&
                  notifications?.length !== totalItems && (
                    <Typography
                      onClick={
                        !showAll
                          ? () => setShowAll(true)
                          : () => setPage((prev) => prev + 1)
                      }
                      variant="gradientText"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        textAlign: "center",
                        pt: "10px",
                      }}
                    >
                      {showAll ? "View More" : "View all"}
                    </Typography>
                  )
                )}
              </>
            ) : (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  textAlign: "center",
                  pt: "10px",
                }}
              >
                No new notifications
              </Typography>
            )}
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 3 }}>
          {/* <Paper> */}
          <RightSideBar hideResearch={true} />
          {/* </Paper> */}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Pulses;
