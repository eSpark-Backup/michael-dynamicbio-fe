import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { CustomizeTabs, PostCard, SuggestionPost } from "../../../components";
import { settings, user } from "../../../assets";
import { useGetMyPostQuery } from "../../../services/post";
import { suggestionPostContent } from "../../../constant";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

dayjs.extend(relativeTime);

const Feed = ({ isPublicView }) => {
  const tabOptions = ["Posts", "Collaborations", "Events"];
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useSelector(state => state.auth);

  // Modify your query to accept page parameter
  const { data, error, isLoading, isSuccess, isFetching } = useGetMyPostQuery({ page, limit: 15 }, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true });


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

      if (user.id !== data?.data?.posts[0]?.author?.id) {
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
  }, [data, isSuccess, page, user.id]);

  const transformPosts = (posts) => {
    return posts?.map((item) => {
      const isOwnPost = item?.author?.id === user?.id;
      const isuserLiked = item?.likes && Array.isArray(item?.likes) && item?.likes?.some((item) => item?.user?.firstName?.toLowerCase() === user?.firstName?.toLowerCase() && item?.user?.lastName?.toLowerCase() === user?.lastName?.toLowerCase())

      let lastLike = ""

      const isOnlyUserLiked = item?.likes?.length === 1;
      if (isuserLiked && isOnlyUserLiked) {
        lastLike = ""
      }
      else if (!isuserLiked) {
        lastLike = item?.lastLikedUser
      }

      else if (Array.isArray(item?.likes)) {
        const newItem = item?.likes?.find((item2) => item2?.user?.firstName?.toLowerCase() !== user?.firstName?.toLowerCase() && item2?.user?.lastName?.toLowerCase() !== user?.lastName?.toLowerCase())

        lastLike = `${newItem?.user?.firstName} ${newItem?.user?.lastName}`
      }

      return {
        userName: `${item?.author?.firstName} ${item?.author?.lastName}`,
        userRole: item?.author?.company,
        postTime: dayjs(item?.createdAt).fromNow(),
        userImage: item?.author?.profileImage,
        numberofLikes: item?.likesCount,
        isLiked: isuserLiked,
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
        isFriendPost: !isOwnPost,
        lastUserLiked: lastLike
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

  if (isLoading && posts.length === 0) {
    return <LinearProgress />;
  }

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

      </Paper>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore && !isLoading}
        loader={(isLoading || isFetching) && <LinearProgress />}
        endMessage={
          <Typography my={2} textAlign="center" fontSize="18px" fontWeight={700}>
            {posts.length === 0 ? 'No posts available' : 'No more posts'}
          </Typography>
        }
        scrollThreshold="100px"
        style={{ overflow: 'visible' }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
          {posts.map((item) => (
            <SuggestionPost key={item.id} {...item} />
          ))}
        </Box>
      </InfiniteScroll>
    </>
  );
};
export default Feed;
