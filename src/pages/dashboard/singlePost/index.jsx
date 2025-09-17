import {
  Box,
  Grid2,
  LinearProgress,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Button, RightSideBar, SuggestionPost } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../../services/post";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { bondMain, user } from "../../../assets";
import { getDaysLeft } from "../../../utils";

const SinglePost = () => {
  const { id } = useParams();
  const { data, isSuccess, isLoading } = useGetPostByIdQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [posts, setPosts] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const { user: userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && data) {
      const newPosts = transformPosts([data?.data]);
      setPosts(newPosts);
    }
  }, [isSuccess, data]);

  const transformPosts = (posts) => {
    return posts.map((item) => {
      const isOwnPost = item?.author?.id === userData?.id;
      const isuserLiked =
        item?.likes &&
        Array.isArray(item?.likes) &&
        item?.likes?.some(
          (item) =>
            item?.user?.firstName?.toLowerCase() ===
              userData?.firstName?.toLowerCase() &&
            item?.user?.lastName?.toLowerCase() ===
              userData?.lastName?.toLowerCase()
        );

      let lastLike = "";

      const isOnlyUserLiked = item?.likes?.length === 1;
      if (isuserLiked && isOnlyUserLiked) {
        lastLike = "";
      } else if (!isuserLiked) {
        lastLike = item?.lastLikedUser;
      } else if (Array.isArray(item?.likes)) {
        const newItem = item?.likes?.find(
          (item2) =>
            item2?.user?.firstName?.toLowerCase() !==
              userData?.firstName?.toLowerCase() &&
            item2?.user?.lastName?.toLowerCase() !==
              userData?.lastName?.toLowerCase()
        );
        lastLike = `${newItem?.user?.firstName} ${newItem?.user?.lastName}`;
      }

      return {
        userId: item?.author?.id,
        userName: item?.isPagePost
          ? item?.page?.name
          : `${item?.author?.firstName} ${item?.author?.lastName}`,
        userRole: item?.isPagePost
          ? item?.pageFollowerCount
          : item?.author?.company,
        postTime: dayjs(item?.createdAt).fromNow(),
        userImage: item?.isPagePost
          ? item?.page?.logoUrl
          : item?.author?.profileImage,
        numberofLikes: item?.likesCount,
        isLiked: isuserLiked,
        comments: item?.commentsCount,
        activity: "",
        postPic: item?.media?.IMAGES?.map((mediaItem) => mediaItem?.url) || [],
        postContent: item?.content?.title,
        commentsContent: [],
        type: getPostType(item?.type),
        videoUrl: item?.type === "VIDEO" ? item?.media["VIDEOS"][0]?.url : "",
        thumbnail:
          item?.type === "VIDEO" ? item?.media["THUMBNAILS"][0]?.url : "",
        question: item?.type === "POLL" ? item?.poll?.question : "",
        options: getPollOptions(item),
        voteCount: item?.poll?.votes?.length || 0,
        endDate: item?.poll?.endDate ? getDaysLeft(item?.poll?.endDate) : "",
        pollId: item?.poll?.id || "",
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
        articleImage:
          item?.type === "ARTICLE" ? item?.media["ARTICLES"][0]?.url : "",
        articleTitle: item?.type === "ARTICLE" && item?.content?.articleTitle,
        articleDescription: item?.type === "ARTICLE" && item?.content?.content,
        ownPost: isOwnPost,
        isFriendPost: item?.isBond,
        lastUserLiked: lastLike,
        allLikesData:
          item?.likes?.map((like) => ({
            id: like?.user?.id,
            firstName: like?.user?.firstName,
            lastName: like?.user?.lastName,
            profileImage: like?.user?.profileImage,
            designation: like?.user?.designation,
            isBond: like.isBond,
          })) || [],
        isSaved: item?.isSaved,
        postVisibility: item?.visibility,
        commentVisibility: item?.commentVisibility,
        canComment: item?.canComment,
        isPagePost: item?.isPagePost,
        isUserPost: !isOwnPost && !item?.isPagePost,
        isPageFollowing: item?.isPageFollowing,
        pageId: item?.isPagePost ? item?.page?.id : "",
        shareableLink: item?.shareableLink,
        groupPost: item?.isGroupPost,
        pinned: false,
        isAdminPost: false,
        groupName: item?.isGroupPost ? item?.group?.name : "",
        groupId: item?.isGroupPost ? item?.group?.id : "",
        groupImage: item?.isGroupPost ? item?.group?.logoUrl : "",
        isUserAdmin: item?.isAdmin || item?.isCreator,
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
      ARTICLE: "article",
    };
    return typeMap[type] || "";
  };

  const getPollOptions = (item) => {
    if (item?.type !== "POLL") return [];
    const isVote = item?.poll?.votes?.find(
      (vote) => vote?.userId === userData?.id
    );
    const myVoteIndex = isVote ? isVote?.optionIndex : null;
    return [
      ...(item?.pollResults?.map((option, index) => ({
        id: index + 3,
        value: option?.option,
        isChecked: myVoteIndex === index,
        numbersVoted: option?.count,
        voteBy: option?.voters,
      })) || []),
    ];
  };

  if (isLoading) {
    return <LinearProgress />;
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
                  cursor: "pointer",
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
                  cursor: "pointer",
                }}
                onClick={() => navigate("/bonds")}
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
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#171717",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/bonds?sub=group")}
                >
                  Groups
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#171717",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/bonds?sub=events")}
                >
                  Events
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#171717",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/save-posts")}
                >
                  Saved Items
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
                  onClick={() => navigate("/bonds")}
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
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            {posts.map((item) => (
              <SuggestionPost key={item.id} {...item} />
            ))}
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 3 }}>
          <RightSideBar />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default SinglePost;
