import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import PageCard from "./page-card";
import { useFollowPageMutation, useGetAllPagesQuery } from "../services/page";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RightSideBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const {
    data: allPagesData,
    isLoading: isAllPagesLoading,
    isError: isAllPagesError,
    error: allPagesError,
    refetch: allPagesRefetch,
    isFetching: isAllPagesFetcing,
  } = useGetAllPagesQuery("", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isAllPagesError) toast.error(allPagesError?.data?.message);
  }, [isAllPagesError]);

  const allPages = allPagesData?.data?.pages || [];
  const filteredPages = allPages.filter(
    (item) =>
      item?.creatorId !== user?.id &&
      !item?.followers?.some((follower) => follower?.id === user?.id)
  );

  const [follow, { isLoading: isFollowLoading }] = useFollowPageMutation();

  const handleFollow = (id) => {
    follow(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        allPagesRefetch();
      }
    });
  };

  if (isAllPagesLoading || isAllPagesFetcing) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearProgress sx={{ width: "100%" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", rowGap: "25px", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: "15px",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#171717",
          }}
        >
          You might be interested in following
        </Typography>
        <Typography
          sx={{
            minWidth: "60px",
            fontSize: "14px",
            fontWeight: 400,
            cursor: "pointer",
          }}
          variant="gradientText"
          onClick={() => navigate(`/bonds?sub=page`)}
        >
          View all
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
        {filteredPages?.slice(0, 4)?.map((group) => (
          <PageCard
            rightBar
            isFollowLoading={isFollowLoading}
            handleFollow={handleFollow}
            key={group.id}
            {...group}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RightSideBar;
