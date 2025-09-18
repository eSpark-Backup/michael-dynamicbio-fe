import { Box, Grid2, LinearProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { SuggestionPost } from "../../../components";
import { useGetGeneralPageQuery } from "../../../services/general";
import dayjs from "dayjs";
import { getDaysLeft } from "../../../utils";
import { user } from "../../../assets";
import Header from "../../../layout/private-layout/Header";
import Navbar from "../../../layout/private-layout/Navbar";

const GeneralPost = () => {
  const encodedData = useMemo(() => {
    const match = window.location.search.match(/data=([^&]*)/);
    return match ? match[1] : null;
  }, []);

  const [posts, setPosts] = useState([]);

  const {
    data: getGeneralData,
    isSuccess: getGeneralSuccess,
    isLoading: isGetGeneralLoading,
  } = useGetGeneralPageQuery(encodedData, {
    skip: !encodedData,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (getGeneralSuccess && getGeneralData) {
      const newPosts = transformPosts([getGeneralData?.data]);
      setPosts(newPosts);
    }
  }, [getGeneralSuccess, getGeneralData]);

  const transformPosts = (posts) => {
    return posts.map((item) => {
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
        isLiked: false,
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
        ownPost: false,
        isFriendPost: item?.isBond,
        lastUserLiked: item?.lastLikedUser,
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
        isUserPost: !item?.isPagePost,
        isPageFollowing: item?.isPageFollowing,
        pageId: item?.isPagePost ? item?.page?.id : "",
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
    const myVoteIndex = null;
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

  if (isGetGeneralLoading) {
    return <LinearProgress />;
  }
  return (
    <Box>
      <Header />
      <Navbar />
      <Box sx={{ p: "20px" }}>
        <Grid2 container spacing={5} sx={{ mt: "15px" }}>
          <Grid2
            size={{ xs: 12, lg: 2.5 }}
            sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
          ></Grid2>

          <Grid2
            size={{ xs: 12, lg: 6.5 }}
            sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
            >
              {posts.map((item) => (
                <SuggestionPost key={item.id} {...item} isGeneralPost={true} />
              ))}
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, lg: 3 }}></Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default GeneralPost;
