import { useEffect } from "react";
import { toast } from "react-toastify";
import { LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { CustomizeTabs, PostCard } from "../../../components";
import { settings } from "../../../assets";
import { useGetMyPostQuery } from "../../../services/post";

const Feed = ({ isPublicView }) => {
  const tabOptions = ["Posts", "Collaborations", "Events"];
  const { data, error, isLoading } = useGetMyPostQuery();
  console.log(data, "data");

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message);
    }
  },[error])

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        {[
          { title: "Bonds", count: 0 },
          { title: "Your Groups", count: 0 },
          { title: "Joined Groups", count: 0 },
        ].map((item) => {
          return (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              key={item.title}
              sx={{
                width: "315px",
                height: "61px",
                borderRadius: "4px",
                background: "#FFF",
              }}
            >
              <Typography
                sx={{ color: "#171717" }}
                fontSize="14px"
                fontWeight={500}
              >
                {item.count}
              </Typography>
              <Typography
                sx={{ color: "#505050" }}
                fontSize="14px"
                fontWeight={400}
              >
                {item.title}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
      <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Typography fontSize="14px" fontWeight={400}>
            Activity
          </Typography>
          {!isPublicView && (
            <img
              style={{ cursor: "pointer", width: "24px", height: "24px" }}
              src={settings}
              alt={"settings"}
            />
          )}
        </Stack>
        <CustomizeTabs tabs={tabOptions} />
        {!isPublicView && <PostCard />}
        {isLoading ? (
          <LinearProgress />
        ) : !data?.data?.posts?.length > 0 ? (
          "print data"
        ) : (
          <Typography my={2} textAlign="center" fontSize="18px" fontWeight={700}>
            No posts available
          </Typography>
        )}
      </Paper>
    </>
  );
};
export default Feed;
