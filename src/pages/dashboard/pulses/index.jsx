import {
  Box,
  CircularProgress,
  Grid2,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { userAvatar } from "../../../assets";
import { PulseProfileCard, RightSideBar } from "../../../components";
import { useGetAllNotificationsQuery } from "../../../services/notification";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { eventBus, toTitleCase } from "../../../utils";
import { useNavigate } from "react-router-dom";

const Pulses = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const { isLoading, isError, error, refetch, isFetching } =
    useGetAllNotificationsQuery(
      {
        page,
        pageSize,
      },
      { refetchOnMountOrArgChange: true }
    );

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
  const { notifications, totalPage } = useSelector(
    (state) => state.notifications
  );
  const [activeIndex, setActiveIndex] = useState(1);
  console.log(setActiveIndex);
  const HandleClick = (id, metadata) => {
    if (metadata?.event === "NEW_GROUP_REQUEST") {
      navigate(
        `/group/${metadata?.groupId}/manage?tab=Membership&sub-tab=Requests`
      );
    } else if (metadata?.event === "NEW_GROUP_POST_REQUEST") {
      navigate(`/group/${metadata?.groupId}/manage?tab=Content`);
    } else if (
      metadata?.event === "GROUP_REQUEST_UPDATED" ||
      metadata?.event === "GROUP_POST_REQUEST_UPDATED"
    ) {
      navigate(`/group/${metadata?.groupId}`);
    } else if (metadata?.event === "NEW_BOND_REQUEST") {
      navigate(`/bonds?sub=bond`);
    } else if (metadata?.event === "BOND_REQUEST_UPDATED") {
      navigate(`/bonds?sub=bonded-synergy`);
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
                {`${toTitleCase(user?.firstName)} ${toTitleCase(user?.lastName)}`}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#505050",
                  textAlign: "center",
                }}
              >
                {`${toTitleCase(user?.designation)} at ${user?.company}`}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#505050",
                  textAlign: "center",
                }}
              >
                {`${toTitleCase(user?.city)}, ${toTitleCase(user?.country)}`}
              </Typography>
            </Box>
          </Paper>
        </Grid2>
        <Grid2
          size={{ xs: 12, lg: 6.5 }}
          sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
        >
          <Paper
            sx={{
              maxHeight: "700px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              rowGap: "15px",
              alignItems: "center",
            }}
          >
            {notifications?.length > 0 ? (
              <>
                {notifications?.map((item) => (
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
                ))}
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
                  page < totalPage && (
                    <Typography
                      onClick={() => setPage((prev) => prev + 1)}
                      variant="gradientText"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        textAlign: "center",
                        pt: "10px",
                        cursor: "pointer",
                        width: "max-content",
                      }}
                    >
                      View More
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
          <RightSideBar hideResearch={true} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Pulses;
