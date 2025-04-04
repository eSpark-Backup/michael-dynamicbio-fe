import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
  Grid2,
} from "@mui/material";
import {
  BondCard2,
  RightSideBar,
  SuggestionPost,
  PostCard,
} from "../../../components";
import { bondSuggestions, suggestionPostContent } from "../../../constant";
import { bondMain, user } from "../../../assets";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [showMore, setShowMore] = useState(false);

  const { user: userData } = useSelector((state) => state.auth);

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
                backgroundColor: "#D9D9D9",
                height: "71px",
                position: "relative",
                width: "100%",
              }}
            >
              {userData && userData?.coverImage && (
                <img
                  style={{ height: "71px", width: "100%", objectFit: "cover" }}
                  src={userData?.coverImage}
                />
              )}
              <img
                src={
                  userData && userData?.profileImage
                    ? userData?.profileImage
                    : user
                }
                alt="Profile"
                style={{
                  position: "absolute",
                  top: "75%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box sx={{ pt: "25px" }}>
              <Typography
                onClick={() => navigate(`/profile/${userData?.id}`)}
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: theme.palette.primary.dark,
                  textAlign: "center",
                }}
              >
                {userData?.firstName} {userData?.lastName}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#505050",
                  textAlign: "center",
                }}
              >
                {userData?.designation} at {userData?.company}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#505050",
                  textAlign: "center",
                }}
              >
                {userData?.country}
              </Typography>
            </Box>
          </Paper>

          {(showMore || !isSmallScreen) && (
            <>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: theme.palette.primary.dark,
                  }}
                >
                  Make more bonds
                </Typography>
                <img src={bondMain} alt="Bond" />
              </Paper>

              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "20px",
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
                >
                  Groups
                </Typography>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
                >
                  Events
                </Typography>
                <Box
                  sx={{
                    borderTop: "1px solid #E4E4E4",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50px",
                    cursor: "pointer",
                    color: theme.palette.primary.dark,
                  }}
                >
                  <Typography
                    variant="gradientText"
                    sx={{ fontSize: "14px", fontWeight: 400 }}
                  >
                    Discover more
                  </Typography>
                </Box>
              </Paper>
            </>
          )}

          {isSmallScreen && (
            <Button onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          )}
        </Grid2>

        <Grid2
          size={{ xs: 12, lg: 6.5 }}
          sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
        >
          <Paper
            sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
          >
            <PostCard />
          </Paper>

          <Paper
            sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
              >
                Suggestion for you to create bonds
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 400, cursor: "pointer" }}
                variant="gradientText"
              >
                View all
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
            >
              {bondSuggestions?.map((item, index) => (
                <BondCard2
                  key={index}
                  userImage={item?.img}
                  userName={item?.name}
                  userAddress={item?.address}
                  userRole={item?.role}
                />
              ))}
            </Box>
          </Paper>
          {suggestionPostContent?.map((item, index) => (
            <SuggestionPost
              userName={item?.userName}
              userImage={item?.userImage}
              userRole={item?.userRole}
              postTime={item?.postTime}
              numberofLikes={item?.numberofLikes}
              isLiked={item?.isLiked}
              comments={item?.comments}
              activity={item?.activity}
              postPic={item?.postPic}
              postContent={item?.postContent}
              commentsContent={item?.commentsContent}
              key={index}
              index={index}
              length={suggestionPostContent?.length}
            />
          ))}
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 3 }}>
          <RightSideBar />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Home;
