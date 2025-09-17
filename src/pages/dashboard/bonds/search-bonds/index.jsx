import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import {
  PageCard,
  SuggestedBonds,
  SuggestionPost,
} from "../../../../components";
import { getDaysLeft, useQuery } from "../../../../utils";
import {
  useAllBondsReqQuery,
  useUpdateBondReqMutation,
} from "../../../../services/bonds";
import { addBond, deleteBond, userAvatar } from "../../../../assets";
import { useGetUniversalSearchQuery } from "../../../../services/general";
import {
  useDeletePageMutation,
  useFollowPageMutation,
} from "../../../../services/page";
import {
  useDeleteGroupMutation,
  useFollowGroupMutation,
} from "../../../../services/group";
import dayjs from "dayjs";

const SearchBonds = () => {
  const sent = false;
  const { user } = useSelector((state) => state.auth);
  const { search } = useSelector((state) => state.search);
  const query = useQuery();
  const q = query.get("q");
  const filter = query.get("filter");
  const {
    data,
    refetch: refetchSearch,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
  } = useGetUniversalSearchQuery(
    { page: 1, pageSize: 50, keyword: q, type: "all" },
    { refetchOnMountOrArgChange: true }
  );
  console.log(isSearchFetching, "isSearchFetching");

  const [followPage, { isLoading: isPageFollowLoading }] =
    useFollowPageMutation();

  const handleFollowPage = (id) => {
    followPage(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetchSearch();
      }
    });
  };

  const [deletePage, { isLoading: isPageDeleteLoading }] =
    useDeletePageMutation();

  const handleDeletePage = (id) => {
    deletePage(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetchSearch();
      }
    });
  };

  const [deleteGroup, { isLoading: isGroupDeleteLoading }] =
    useDeleteGroupMutation();

  const handleDeleteGroup = (id) => {
    deleteGroup(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetchSearch();
      }
    });
  };

  const [followGroup, { isLoading: isGroupFollowLoading }] =
    useFollowGroupMutation();

  const handleFollowGroup = (id) => {
    followGroup(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetchSearch();
      }
    });
  };

  console.log(data, "data");
  const [updateReq, { isLoading: isUpdateReqLoading }] =
    useUpdateBondReqMutation();
  const {
    data: reqData,
    isLoading: reqLoading,
    isFetching,
    error: reqError,
    refetch,
  } = useAllBondsReqQuery(
    { type: "received", search },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const requests = reqData?.data?.bonds;

  useEffect(() => {
    if (reqError) {
      toast.error(reqError?.data?.message);
      return;
    }
  }, [reqError]);

  const handleBond = (id, type) => {
    const bodyToSend = {
      bondId: id,
      action: type,
    };
    updateReq(bodyToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        refetch();
      }
    });
  };

  const transformPosts = (posts) => {
    return posts.map((item) => {
      const isOwnPost = item?.author?.id === user?.id;
      const isuserLiked =
        item?.likes &&
        Array.isArray(item?.likes) &&
        item?.likes?.some(
          (item) =>
            item?.user?.firstName?.toLowerCase() ===
              user?.firstName?.toLowerCase() &&
            item?.user?.lastName?.toLowerCase() ===
              user?.lastName?.toLowerCase()
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
              user?.firstName?.toLowerCase() &&
            item2?.user?.lastName?.toLowerCase() !==
              user?.lastName?.toLowerCase()
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
        postVisibility: item?.isGroupPost
          ? item?.group?.status
          : item?.visibility,
        commentVisibility: item?.commentVisibility,
        canComment: item?.canComment,
        isPagePost: item?.isPagePost,
        isUserPost: !isOwnPost && !item?.isPagePost,
        isPageFollowing: item?.isPageFollowing,
        pageId: item?.isPagePost ? item?.page?.id : "",
        shareableLink: item?.shareableLink,
        groupPost: item?.isGroupPost,
        pinned: false,
        isAdminPost: true,
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
    const isVote = item?.poll?.votes?.find((vote) => vote?.userId === user?.id);
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

  if (reqLoading || isSearchLoading) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress sx={{ color: "#1877F2" }} />
      </Stack>
    );
  }

  return (
    <>
      <Typography
        fontSize="22px"
        sx={{
          background: "#FFF",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
          padding: "18px 30px",
        }}
      >
        {q}
      </Typography>
      {filter === "all" || filter === "people" ? (
        isUpdateReqLoading || reqLoading || isFetching ? (
          <Stack direction="row" justifyContent="center" alignItems="center">
            <CircularProgress sx={{ color: "#1877F2" }} />
          </Stack>
        ) : requests?.length > 0 ? (
          <Box
            sx={{
              padding: "23px 32px",
              background: "#fff",
              border: "1px solid #E4E4E4",
              borderRadius: "4px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize="14px">Search Results</Typography>
            </Stack>
            {requests.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  border: "1px solid #DDE2E4",
                  background: "#F2F8FD",
                  borderRadius: "4px",
                  padding: "10px 26px 10px 22px",
                  mt: 2,
                  mb: 1,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  gap={1.5}
                >
                  <img
                    width={73}
                    height={73}
                    style={{ borderRadius: "50%" }}
                    src={
                      sent
                        ? item?.recipient?.profileImage
                        : item?.requester?.profileImage || userAvatar
                    }
                    alt="profile"
                  />
                  <Box>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      fontSize="17px"
                      fontWeight={300}
                    >
                      {`${
                        sent
                          ? item?.recipient?.firstName
                          : item?.requester?.firstName
                      } ${
                        sent
                          ? item?.recipient?.lastName
                          : item?.requester?.lastName
                      }`}
                    </Typography>
                    <Typography
                      sx={{ color: "#505050" }}
                      fontSize="14px"
                      fontWeight={400}
                    >
                      {`${
                        sent
                          ? item?.recipient?.designation
                          : item?.requester?.designation
                      } at “${
                        sent
                          ? item?.recipient?.company
                          : item?.requester?.company
                      }” `}
                    </Typography>
                    <Typography
                      sx={{ color: "#505050" }}
                      fontSize="14px"
                      fontWeight={400}
                    >
                      {`${
                        sent ? item?.recipient?.city : item?.requester?.city
                      }, ${
                        sent
                          ? item?.recipient?.country
                          : item?.requester?.country
                      }`}
                    </Typography>
                  </Box>
                </Stack>
                {sent ? (
                  <Typography
                    onClick={() => handleBond(item?.id, "canceled")}
                    fontSize="14px"
                    sx={{
                      cursor: "pointer",
                      background:
                        "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                      "-webkit-background-clip": "text",
                      "-webkit-text-fill-color": "transparent",
                    }}
                  >
                    Withdraw
                  </Typography>
                ) : (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={1.5}
                  >
                    <img
                      onClick={() => handleBond(item?.id, "rejected")}
                      style={{ cursor: "pointer" }}
                      src={deleteBond}
                      alt="trash"
                    />
                    <img
                      onClick={() => handleBond(item?.id, "accepted")}
                      style={{ cursor: "pointer" }}
                      src={addBond}
                      alt="bond"
                    />
                  </Stack>
                )}
              </Stack>
            ))}
          </Box>
        ) : null
      ) : null}
      {(filter === "all" || filter === "people") && (
        <SuggestedBonds refetch={refetch} search={search} />
      )}
      {(filter === "all" || filter === "group") &&
        data?.data?.group?.groups?.length > 0 && (
          <Paper>
            <Typography>Groups</Typography>
            {data?.data?.group?.groups.map((group, index) => (
              <Box mt={2} key={index}>
                <PageCard
                  bgNotWhite
                  mainType={"group"}
                  isFollowLoading={isGroupFollowLoading}
                  handleFollow={handleFollowGroup}
                  isDeleteLoading={isGroupDeleteLoading}
                  handleDelete={handleDeleteGroup}
                  type={
                    group?.creatorId === user?.id
                      ? "my-groups"
                      : group?.isFollowing
                        ? "joined-groups"
                        : "all-groups"
                  }
                  key={group.id}
                  {...group}
                />
              </Box>
            ))}
          </Paper>
        )}
      {(filter === "all" || filter === "page") &&
        data?.data?.page?.pages?.length > 0 && (
          <Paper>
            <Typography>Pages</Typography>
            {data?.data?.page?.pages.map((page, index) => (
              <Box mt={2} key={index}>
                <PageCard
                  isFollowLoading={isPageFollowLoading}
                  handleFollow={handleFollowPage}
                  isDeleteLoading={isPageDeleteLoading}
                  handleDelete={handleDeletePage}
                  type={page?.creatorId === user?.id ? "my-pages" : ""}
                  key={page.id}
                  {...page}
                />
              </Box>
            ))}
          </Paper>
        )}
      {(filter === "all" || filter === "post") &&
        data?.data?.post?.posts?.length > 0 && (
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            {transformPosts(data?.data?.post?.posts).map((item) => (
              <SuggestionPost
                key={item.id}
                {...item}
                handlePostDelete={refetchSearch}
              />
            ))}
          </Box>
        )}
    </>
  );
};
export default SearchBonds;
