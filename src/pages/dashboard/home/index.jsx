import { useEffect, useState } from "react";
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
  LinearProgress,
} from "@mui/material";
import {
  BondCard2,
  RightSideBar,
  SuggestionPost,
  PostCard,
} from "../../../components";
import { bondSuggestions, suggestionPostContent } from "../../../constant";
import { bondMain, user } from "../../../assets";
import { useGetFeedPostsQuery } from "../../../services/feed";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [showMore, setShowMore] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { user: userData } = useSelector((state) => state.auth);

  const { data, error, isLoading, isSuccess, isFetching } = useGetFeedPostsQuery({ page, limit: 15, userId: userData?.id }, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true });

  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [userData?.id]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {

      if (!data?.data) {
        setPosts([]);
        setHasMore(false);
        return;
      }

      const newPosts = transformPosts(data.data.posts);

      if (page === 1) {
        setPosts(newPosts);
      } else {
        const existingIds = new Set(posts.map(p => p.id));
        const uniqueNewPosts = newPosts.filter(post => !existingIds.has(post.id));
        setPosts(prev => [...prev, ...uniqueNewPosts]);
      }

      setHasMore(
        data.data.pagination.currentPage < data.data.pagination.totalPages
      );
    }
  }, [data, isSuccess, page]);

  const transformPosts = (posts) => {
    return posts?.map((item) => {
      const isOwnPost = item?.author?.id === userData?.id;
      return {
        userName: `${item?.author?.firstName} ${item?.author?.lastName}`,
        userRole: item?.author?.company,
        postTime: dayjs(item?.createdAt).fromNow(),
        userImage: item?.author?.profileImage,
        numberofLikes: 0,
        isLiked: false,
        comments: 0,
        activity: "",
        postPic: item?.media["IMAGES"]?.map((mediaItem) => mediaItem?.url) || [],
        postContent: item?.content?.title,
        commentsContent: [],
        type: getPostType(item?.type),
        videoUrl: item?.type === "VIDEO" ? item?.media["VIDEOS"][0]?.url : '',
        thumbnail: item?.type === "VIDEO" ? item?.media["THUMBNAILS"][0]?.url : '',
        question: item?.type === "POLL" ? item?.content?.question : "",
        options: getPollOptions(item),
        isVoted: false,
        eventName: item?.content?.name,
        eventImage: item?.type === "EVENT" && item?.media["EVENTS"][0]?.url,
        startTime: item?.content?.startTime,
        endTime: item?.content?.showEndTime && item?.content?.endTime,
        eventType: item?.content?.eventType,
        eventLink: item?.content?.externalLink,
        attendees: [{ image: user }],
        eventPost: "bringback",
        id: item?.id,
        articleImage: item?.type === "ARTICLE" ? item?.media["ARTICLES"][0]?.url : "",
        articleTitle: item?.type === "ARTICLE" && item?.content?.articleTitle,
        articleDescription: item?.type === "ARTICLE" && item?.content?.content,
        ownPost: isOwnPost,
        isFriendPost: !isOwnPost
      };
    });
  };

  const getPostType = (type) => {
    const typeMap = {
      IMAGE: "normal",
      VIDEO: "video",
      TEXT: "normal",
      POLL: "poll",
      EVENT: "event",
      ARTICLE: "article"
    };
    return typeMap[type] || "";
  };

  const getPollOptions = (item) => {
    if (item?.type !== "POLL") return [];

    return [
      { id: 1, value: item?.content?.opt1, isChecked: false, numbersVoted: 0 },
      { id: 2, value: item?.content?.opt2, isChecked: false, numbersVoted: 0 },
      ...(item?.content?.options?.map((option, index) => ({
        id: index + 3,
        value: option,
        isChecked: false,
        numbersVoted: 0,
      })) || [])
    ];
  };

  const fetchMoreData = () => {
    if (!isLoading) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    console.log(isLoading, "ISLOADING")
    console.log(data, "Data")
  }, [isLoading, data])

  if (isLoading) {
    return (
      <LinearProgress />
    )
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
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={(isLoading || isFetching) && <LinearProgress />}
            endMessage={
              <Typography my={2} textAlign="center" fontSize="18px" fontWeight={700}>
                {posts.length === 0 ? 'No posts available' : 'No more posts'}
              </Typography>
            }
          >
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
              {posts.map((item) => (
                <SuggestionPost key={item.id} {...item} />
              ))}
            </Box>
          </InfiniteScroll>
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 3 }}>
          <RightSideBar />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Home;
