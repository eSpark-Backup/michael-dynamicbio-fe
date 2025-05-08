import {
  Box,
  Divider,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { downArrowFilled, edit, like, noPosts, plus } from "../../../assets";
import { useGetPostsByPageQuery } from "../../../services/page";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import { SuggestionPost } from "../../../components";
import { useSelector } from "react-redux";

const PostSection = ({ data }) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { id } = useParams();
  const { user: userData } = useSelector((state) => state.auth);
  const skip = !id;

  const [activeItem, setActiveItem] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const {
    data: postsData,
    isLoading,
    isSuccess,
    error,
    isFetching,
  } = useGetPostsByPageQuery(
    { pageId: id, page, pageSize },
    {
      skip,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      if (!postsData?.data) {
        setPosts([]);
        setHasMore(false);
        return;
      }

      const newPosts = transformPosts(postsData.data.posts);

      if (page === 1) {
        setPosts(newPosts);
      } else {
        const existingIds = new Set(posts.map((p) => p.id));
        const uniqueNewPosts = newPosts.filter(
          (post) => !existingIds.has(post.id)
        );
        setPosts((prev) => [...prev, ...uniqueNewPosts]);
      }

      setHasMore(
        postsData.data.pagination.currentPage <
          postsData.data.pagination.totalPages
      );
    }
  }, [data, isSuccess, page]);

  const transformPosts = (posts) => {
    return posts?.map((item) => {
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
        lastLike = `${item?.lastLikedUser?.user?.firstName} ${item?.lastLikedUser?.user?.lastNaen}`;
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
        userName: `${item?.author?.firstName} ${item?.author?.lastName}`,
        userRole: item?.author?.company,
        postTime: dayjs(item?.createdAt).fromNow(),
        userImage: item?.author?.profileImage,
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
        eventPost: "bringback",
        id: item?.id,
        articleImage:
          item?.type === "ARTICLE" ? item?.media["ARTICLES"][0]?.url : "",
        articleTitle: item?.type === "ARTICLE" && item?.content?.articleTitle,
        articleDescription: item?.type === "ARTICLE" && item?.content?.content,
        ownPost: isOwnPost,
        isFriendPost: !isOwnPost,
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

  const fetchMoreData = () => {
    if (!isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        rowGap: "15px",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "25%" },
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: "500",
              color: "#171717",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {data?.name}
          </Typography>
        </Paper>
        {/* <Paper>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#171717",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              textOverflow: "ellipsis",
            }}
          >
            See a collection of active or past ads by {data?.name}.
          </Typography>
          <Typography
            variant="gradientText"
            sx={{ fontSize: "14px", fontWeight: "500" }}
          >
            View ad library
          </Typography>
        </Paper> */}
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "10px",
            flexWrap: "wrap",
            rowGap: "15px",
          }}
        >
          {["All", "Images", "Videos", "Articles", "Documents"]?.map(
            (item, index) => (
              <Box
                sx={{
                  p: ".8rem 1.2rem",
                  width: "fit-content",
                  background:
                    activeItem === item
                      ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04))"
                      : "transparent",
                  border: activeItem === item ? "none" : "1px solid #E4E4E4",
                  borderRadius: "1.9rem",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => setActiveItem(item)}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: activeItem === item ? "#fff" : "#505050",
                  }}
                >
                  {item}
                </Typography>
              </Box>
            )
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: "15px",
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "85%" } }}>
            <Divider />
          </Box>
          <Box sx={{ display: "flex", columnGap: "1px", alignItems: "center" }}>
            <Typography
              sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}
            >
              Sort by:{" "}
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: "500", color: "#171717" }}
            >
              Top{" "}
            </Typography>
            <img
              src={downArrowFilled}
              alt="Icon"
              style={{ cursor: "pointer" }}
              onClick={handleClick}
            />
          </Box>
        </Box>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={(isLoading || isFetching) && <LinearProgress />}
          endMessage={
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                rowGap: "20px",
              }}
            >
              {posts.length === 0 && <img src={noPosts} alt="Image" />}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "2px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "500",
                    color: "#171717",
                    textAlign: "center",
                  }}
                >
                  {posts.length === 0 ? "No posts available" : "No more posts"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontWeight: "400",
                    color: "#505050",
                    textAlign: "center",
                  }}
                >
                  Check back later for posts!
                </Typography>
              </Box>
            </Paper>
          }
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            {posts.map((item) => (
              <SuggestionPost key={item.id} {...item} />
            ))}
          </Box>
        </InfiniteScroll>
        {/* <Paper
          sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "500",
                color: "#171717",
                textAlign: "center",
              }}
            >
              Featured
            </Typography>
            <Box sx={{ display: "flex", columnGap: "10px", pr: "15px" }}>
              <img src={plus} alt="Icon" />
              <img src={edit} alt="Icon" />
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid #E4E4E4",
              borderRadius: "4px",
              p: "15px",
              display: "flex",
              flexDirection: "column",
              rowGap: "15px",
            }}
          >
            <Typography
              sx={{ fontSize: "17px", fontWeight: "500", color: "#505050" }}
            >
              Post
            </Typography>
            <Typography
              sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}
            >
              Hi
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#505050",
                display: "flex",
                alignItems: "center",
                columnGap: "4px",
                pl: "5px",
              }}
            >
              <img
                src={like}
                alt="Icon"
                style={{ width: "14px", height: "14px" }}
              />
              1
            </Typography>
          </Box>
        </Paper> */}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose} sx={{ width: "120px" }}>
          Top
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "120px" }}>
          Recent
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PostSection;
