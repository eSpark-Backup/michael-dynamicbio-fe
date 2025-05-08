import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { CustomizeTabs, PostCard, SuggestionPost } from "../../../components";
import { email, settings, user } from "../../../assets";
import { useGetMyPostQuery } from "../../../services/post";
import { suggestionPostContent } from "../../../constant";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { getDaysLeft } from "../../../utils";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);

const Feed = ({ userData, isPublicView, isPublic, userId }) => {
  const navigate = useNavigate();
  const tabOptions = ["Posts", "Collaborations", "Events"];
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useSelector(state => state.auth);

  // Modify your query to accept page parameter
  const { data, error, isLoading, isSuccess, isFetching, refetch } = useGetMyPostQuery({ page, limit: 15, id: isPublic ? userId : null }, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true });


  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  useEffect(() => {
    setPage(1);
    setPosts([]);
    setHasMore(true);
  }, [user.id]);

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
  }, [data, isSuccess, page, user.id]);

  const transformPosts = (posts) => {
    return posts
      // ?.filter(item => !item?.isPagePost)   // Remove this line to show page posts
      .map((item) => {
        const isOwnPost = item?.author?.id === userData?.id;
        const isuserLiked = item?.likes && Array.isArray(item?.likes) &&
          item?.likes?.some((item) =>
            item?.user?.firstName?.toLowerCase() === userData?.firstName?.toLowerCase() &&
            item?.user?.lastName?.toLowerCase() === userData?.lastName?.toLowerCase()
          );

        let lastLike = "";

        const isOnlyUserLiked = item?.likes?.length === 1;
        if (isuserLiked && isOnlyUserLiked) {
          lastLike = "";
        } else if (!isuserLiked) {
          lastLike = item?.lastLikedUser;
        } else if (Array.isArray(item?.likes)) {
          const newItem = item?.likes?.find((item2) =>
            item2?.user?.firstName?.toLowerCase() !== userData?.firstName?.toLowerCase() &&
            item2?.user?.lastName?.toLowerCase() !== userData?.lastName?.toLowerCase()
          );
          lastLike = `${newItem?.user?.firstName} ${newItem?.user?.lastName}`;
        }

        return {
          userId: item?.author?.id,
          userName: item?.isPagePost ? item?.page?.name : `${item?.author?.firstName} ${item?.author?.lastName}`,
          userRole: item?.isPagePost ? item?.pageFollowerCount : item?.author?.company,
          postTime: dayjs(item?.createdAt).fromNow(),
          userImage: item?.isPagePost ? item?.page?.logoUrl : item?.author?.profileImage,
          numberofLikes: item?.likesCount,
          isLiked: isuserLiked,
          comments: item?.commentsCount,
          activity: "",
          postPic: item?.media?.IMAGES?.map((mediaItem) => mediaItem?.url) || [],
          postContent: item?.content?.title,
          commentsContent: [],
          type: getPostType(item?.type),
          videoUrl: item?.type === "VIDEO" ? item?.media["VIDEOS"][0]?.url : '',
          thumbnail: item?.type === "VIDEO" ? item?.media["THUMBNAILS"][0]?.url : '',
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
          articleImage: item?.type === "ARTICLE" ? item?.media["ARTICLES"][0]?.url : "",
          articleTitle: item?.type === "ARTICLE" && item?.content?.articleTitle,
          articleDescription: item?.type === "ARTICLE" && item?.content?.content,
          ownPost: isOwnPost,
          isFriendPost: item?.isBond,
          lastUserLiked: lastLike,
          allLikesData: item?.likes?.map((like) => ({
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
          sharedUrl: item?.shareableLink
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
    const isVote = item?.poll?.votes?.find(
      (vote) => vote?.userId === user?.id
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

  const fetchMoreData = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, isFetching]);

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
          { title: "Bonds", count: userData?.bondCount, link: "/bonds?sub=bonded-synergy" },
          { title: "Your Groups", count: 0 },
          { title: "Joined Groups", count: 0 },
        ].map((item) => {
          return (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              key={item.title}
              onClick={!isPublic && item?.link ? () => navigate(item?.link) : () => { }}
              sx={{
                cursor: !isPublic && item?.link ? "pointer" : "default",
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
        {!isPublicView && <PostCard refetch={refetch} />}

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
