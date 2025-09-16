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
import { getDaysLeft } from "../../../utils";

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
        lastLike = `${item?.lastLikedUser}`;
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
        isPagePost: true,
        canComment: true,
        userId: item?.author?.id,
        pageId: item?.page?.id,
        page: item?.page,
        userName: item?.page?.name,
        userRole: item?.pageFollowerCount,
        postTime: dayjs(item?.createdAt).fromNow(),
        userImage: item?.page?.logoUrl,
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
        postVisibility: item?.visibility,
        commentVisibility: item?.commentVisibility,
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
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
        }}
      >
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
