import { Box, Paper, Typography } from "@mui/material";

import { noPosts, plus } from "../../../assets";
import { BoxWithTextIcon, PostCard } from "../../../components";
import PostSlider from "../../../components/postSlider";

const DashboardSection = ({ page, posts, refetch }) => {
  return (
    <>
      <Paper>
        <Box>
          <Typography
            sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}
          >
            Manage recent posts
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: "3px" }}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "500", color: "#505050" }}
            >
              {
                "Manage your page's content and amplify your reach with boosting."
              }
            </Typography>
          </Box>
        </Box>
        {posts?.length > 0 ? (
          <PostSlider refetch={refetch} page={page} posts={posts} />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <img src={noPosts} alt="Image" />
            <Typography
              sx={{ fontSize: "24px", fontWeight: "500", color: "#171717" }}
            >
              {"Your page doesn't have any posts"}
            </Typography>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
            >
              Pages that post 2x a week grow 5x faster
            </Typography>
            <PostCard
              page={page}
              adminPage={true}
              childComp={
                <Box sx={{ width: "220px" }}>
                  <BoxWithTextIcon icon={plus} text={"Start a post"} />
                </Box>
              }
            />
          </Box>
        )}
      </Paper>
    </>
  );
};

export default DashboardSection;
