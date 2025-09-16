import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  Box,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid2,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GroupSlider from "./GroupSlider";
import PostCard from "./post-card";
import GroupSidebar from "./GroupSidebar";
import DynamicModal from "./dynamic-modal";
import AboutGroupModal from "./AboutGroupModal";
import NotificationSettingsModal from "./NotificationSettingsModal";
import GroupPostSettingModal from "./GroupPostSettingModal";
import { suggestionPostContent } from "../constant";
import SuggestionPost from "./SuggestionPost";
import EditGroupModal from "./EditGroupModal";
import {
  useDeleteGroupMutation,
  useFollowGroupMutation,
  useGetGroupDetailQuery,
  useGetGroupPostsQuery,
} from "../services/group";
import { copyToClipboard, getDaysLeft } from "../utils";
import {
  arrowUpRight,
  bell,
  bulb,
  calendarEvent,
  cancelIcon,
  close,
  conversation,
  deleteIcon,
  dummyPhoto,
  editBlue,
  group,
  info,
  leave,
  link2,
  plus,
  send2,
  settings,
  three_vertical_dots,
} from "../assets";
import InfiniteScroll from "react-infinite-scroll-component";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const bellRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open3 = Boolean(anchorEl3);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const open4 = Boolean(anchorEl4);

  const [editModal, setEditModal] = useState(null);
  const [showSlider, setShowSlider] = useState(true);
  const [showTip, setShowTip] = useState(true);
  const [choice, setChoice] = useState("All");
  const [aboutModal, setAboutModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [postSettingsModal, setPostSettingsModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("relevant");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (bellRef.current) {
      setAnchorEl3(bellRef.current);
    }
  }, []);

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setAnchorEl4(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = (event) => {
    event.stopPropagation();
    setAnchorEl2(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleNotiSetting = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetGroupDetailQuery(id, {
      refetchOnMountOrArgChange: true,
    });

  const { user } = useSelector((state) => state.auth);
  const isMyGroup = data?.data?.creatorId === user?.id;

  useEffect(() => {
    if (isError) toast.error(error?.data?.message);
  }, [isError]);

  const [follow, { isLoading: isFollowLoading }] = useFollowGroupMutation();
  const [deleteGroup, { isLoading: isDeleteLoading }] =
    useDeleteGroupMutation();

  const handleFollow = (id) => {
    follow(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    deleteGroup(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        navigate("/bonds?sub=group");
      }
    });
  };

  const handleAction = (id, type) => {
    type === "delete" ? handleDelete(id) : handleFollow(id);
  };

  const skip = !id;
  const {
    data: groupPostsData,
    error: groupPostsError,
    isLoading: groupPostsLoading,
    isSuccess: groupPostsSuccess,
    isFetching: groupPostsfetching,
    refetch: groupPostRefetch,
  } = useGetGroupPostsQuery(
    { page, limit: 15, groupId: id },
    {
      skip,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [id]);

  useEffect(() => {
    if (groupPostsSuccess) {
      if (!groupPostsData?.data) {
        setPosts([]);
        setHasMore(false);
        return;
      }

      const newPosts = transformPosts(groupPostsData.data.posts);

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
        groupPostsData.data.pagination.currentPage <
          groupPostsData.data.pagination.totalPages
      );
    }
  }, [groupPostsData, groupPostsSuccess, page]);

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

      const isAdminPost = groupPostsData?.data?.group?.admins?.some(
        (admin) => admin?.adminId === item?.author?.id
      );

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
        isUserPost: !isOwnPost && !item?.isPagePost && !item?.isGroupPost,
        isPageFollowing: item?.isPageFollowing,
        pageId: item?.isPagePost ? item?.page?.id : "",
        shareableLink: item?.shareableLink,
        pinned: false,
        groupPost: true,
        isAdminPost: isAdminPost,
        groupName: item?.isGroupPost ? item?.group?.name : "",
        groupId: item?.isGroupPost ? item?.group?.id : "",
        groupImage: item?.isGroupPost ? item?.group?.logoUrl : "",
        isUserAdmin:
          groupPostsData?.data?.group?.isAdmin ||
          groupPostsData?.data?.group?.isCreator,
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

  const handlePostDelete = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  const fetchMoreData = () => {
    if (!groupPostsLoading) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading || groupPostsLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 150px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#1877F2" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Grid2
        container
        spacing={3}
        sx={{
          width: { xs: "98%", md: "85%", lg: "95%" },
          py: "25px",
          "@media(min-width:1900px)": {
            width: "75%",
          },
        }}
      >
        <Grid2
          size={{ xs: 12, lg: 3 }}
          sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
        >
          <Paper sx={{ p: "0px" }}>
            <Box
              sx={{
                height: "90px",
                borderTopRightRadius: "4px",
                borderTopLeftRadius: "4px",
                position: "relative",
                backgroundImage: `url(${user?.coverImage || dummyPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100.1%",
              }}
            >
              <Box
                sx={{
                  width: "100px",
                  height: "100px",
                  border: "2px solid #fff",
                  position: "absolute",
                  top: "40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundImage: `url(${user?.profileImage || dummyPhoto})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Box
              sx={{
                mt: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                rowGap: "4px",
                mb: 1,
              }}
            >
              <Box
                sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}
              >
                <Typography
                  sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}
                >
                  {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                {isMyGroup && (
                  <Box sx={{ p: "5px 15px", backgroundColor: "#d3d3d3" }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#171717",
                      }}
                    >
                      Owner
                    </Typography>
                  </Box>
                )}
              </Box>
              <Typography
                sx={{ fontSize: "13px", fontWeight: "400", color: "#505050" }}
              >
                Group created:{" "}
                {data?.data?.createdAt &&
                  dayjs(data?.data?.createdAt).format("MMM YYYY")}
              </Typography>
            </Box>
            {data?.data?.isAdmin && (
              <>
                <Box
                  sx={{
                    mt: "40px",
                    px: "20px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                    pb: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#505050",
                      }}
                    >
                      Pending posts
                    </Typography>
                    <Typography
                      sx={{ fontSize: "13px", fontWeight: "400" }}
                      variant="gradientText"
                    >
                      {data?.data?.pendingPostRequest}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#505050",
                      }}
                    >
                      Requests to join
                    </Typography>
                    <Typography
                      sx={{ fontSize: "13px", fontWeight: "400" }}
                      variant="gradientText"
                    >
                      {data?.data?.pendingJoinRequest}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    height: "60px",
                    borderTop: "1px solid #E5E5E5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(
                      `/group/${id}/manage?tab=Membership&sub-tab=Members`
                    )
                  }
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#171717",
                    }}
                  >
                    Manage group
                  </Typography>
                </Box>
                {isMyGroup && (
                  <Box
                    onClick={() => setEditModal(data?.data)}
                    sx={{
                      height: "60px",
                      borderTop: "1px solid #E5E5E5",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#171717",
                      }}
                    >
                      Edit group
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Paper>
        </Grid2>
        <Grid2
          size={{ xs: 12, lg: 6 }}
          sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
        >
          <Paper sx={{ p: "0px" }}>
            <Box
              sx={{
                height: "200px",
                borderTopRightRadius: "4px",
                borderTopLeftRadius: "4px",
                position: "relative",
                backgroundImage: `url(${
                  data?.data?.coverImageUrl || dummyPhoto
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100.1%",
              }}
            >
              <Box
                sx={{
                  width: "128px",
                  height: "128px",
                  border: "2px solid #fff",
                  position: "absolute",
                  top: "128px",
                  left: "15px",
                  backgroundImage: `url(${data?.data?.logoUrl || dummyPhoto})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></Box>
            </Box>
            <Box sx={{ p: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  columnGap: "15px",
                }}
              >
                {(data?.data?.isAdmin || data?.data?.isFollowing) && (
                  <img
                    src={info}
                    alt="Icon"
                    onClick={() => setAboutModal(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
                <img
                  src={arrowUpRight}
                  alt="Icon"
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                />
                {isMyGroup && (
                  <img
                    onClick={() => setEditModal(data?.data)}
                    style={{ cursor: "pointer" }}
                    src={editBlue}
                    alt="Icon"
                  />
                )}
                <img
                  src={three_vertical_dots}
                  alt="Icon"
                  style={{ cursor: "pointer" }}
                  onClick={handleClick2}
                />
              </Box>
              <Box
                sx={{
                  mt: "70px",
                  p: "0px",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "5px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "#171717",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                  }}
                >
                  {data?.data?.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "5px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={group}
                    alt="Icon"
                    style={{ width: "14px", height: "14px" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "17px",
                      fontWeight: "400",
                      color: "#505050",
                    }}
                  >
                    {data?.data?.status === "PUBLIC"
                      ? "Public group"
                      : "Private group"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
          {(isMyGroup || data?.data?.isAdmin || data?.data?.isFollowing) && (
            <Paper>
              <PostCard
                refetch={refetch}
                group={data?.data}
                groupAdmin={true}
                adminPage={true}
                handleDropDown={() => setPostSettingsModal(true)}
              />
            </Paper>
          )}
          {showTip &&
            (isMyGroup ||
              data?.data?.status === "PUBLIC" ||
              data?.data?.isFollowing) && (
              <Paper sx={{ display: "flex", columnGap: "10px" }}>
                <img
                  src={bulb}
                  alt="Icon"
                  style={{ width: "64px", height: "64px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "2px",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "#171717",
                      }}
                    >
                      Your comments matter to group members
                    </Typography>
                    <img
                      src={close}
                      alt="Icon"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowTip(false)}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#505050",
                    }}
                  >
                    Group members are likely to create more posts when they get
                    comments on their posts.
                  </Typography>
                </Box>
              </Paper>
            )}
          {(isMyGroup ||
            data?.data?.status === "PUBLIC" ||
            data?.data?.isFollowing) && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
                width: "100%",
              }}
            >
              <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  (groupPostsLoading || groupPostsfetching) && (
                    <LinearProgress />
                  )
                }
                endMessage={
                  <Typography
                    my={2}
                    textAlign="center"
                    fontSize="18px"
                    fontWeight={700}
                  >
                    {posts.length === 0
                      ? "No posts available"
                      : "No more posts"}
                  </Typography>
                }
                style={{ width: "100%" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "20px",
                    width: "100%",
                  }}
                >
                  {posts.map((item) => (
                    <SuggestionPost
                      key={item.id}
                      {...item}
                      handlePostDelete={handlePostDelete}
                      isGroupPost={true}
                      isGroupfeed={true}
                    />
                  ))}
                </Box>
              </InfiniteScroll>
            </Box>
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 3 }}>
          <GroupSidebar data={data?.data} />
        </Grid2>
      </Grid2>

      <EditGroupModal
        data={editModal}
        refetch={refetch}
        open={editModal?.id}
        handleClose={() => setEditModal(null)}
      />

      <DynamicModal
        open={aboutModal}
        handleClose={() => setAboutModal(false)}
        title={"About this group"}
        postModal={true}
        styledHeader={true}
        hideFooter={true}
        smallModal={true}
      >
        <AboutGroupModal
          data={data?.data}
          onSuccess={() => setAboutModal(false)}
        />
      </DynamicModal>

      <DynamicModal
        open={notificationModal}
        handleClose={() => setNotificationModal(false)}
        title={"Notification settings disabled"}
        postModal={true}
        styledHeader={true}
        hideFooter={true}
        smallModal={true}
      >
        <NotificationSettingsModal
          onSuccess={() => setNotificationModal(false)}
        />
      </DynamicModal>

      <DynamicModal
        open={postSettingsModal}
        handleClose={() => setPostSettingsModal(false)}
        title={"Post settings"}
        postModal={true}
        styledHeader={true}
        hideFooter={true}
        smallModal={true}
      >
        <GroupPostSettingModal
          handleClose={() => setPostSettingsModal(false)}
        />
      </DynamicModal>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "bottom",
        }}
      >
        <MenuItem
          onClick={(e) => {
            copyToClipboard(data?.data?.shareableLink);
            handleClose(e);
          }}
          sx={{ width: "195px", display: "flex", columnGap: "5px" }}
        >
          <img src={link2} alt="" />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
          >
            Copy link
          </Typography>
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "bottom",
        }}
      >
        <MenuItem
          onClick={(e) => {
            if (!isFollowLoading || !isDeleteLoading) {
              handleAction(data?.data?.id, isMyGroup ? "delete" : "follow");
              handleClose2(e);
            }
          }}
          sx={{ width: "195px", display: "flex", columnGap: "5px" }}
        >
          <img
            src={
              isMyGroup
                ? deleteIcon
                : data?.data?.isFollowing
                  ? leave
                  : data?.data?.requestSent
                    ? cancelIcon
                    : plus
            }
            alt=""
          />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
          >
            {isMyGroup
              ? "Delete this group"
              : data?.data?.isFollowing
                ? "Leave this group"
                : data?.data?.requestSent
                  ? "Withdraw join request"
                  : "Join this group"}
          </Typography>
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl4}
        open={open4}
        onClose={handleClose}
        sx={{ maxWidth: { xs: "300px", md: "420px" } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem disabled>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "100%",
              textTransform: "capitalize",
            }}
          >
            {`Manage notifications about ${data?.data?.name}`}
          </Typography>
        </MenuItem>
        <Divider />
        <RadioGroup
          value={selectedOption}
          onChange={handleRadioChange}
          sx={{ pl: 2, pr: 2, pt: 1, pb: 1 }}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel
            value="relevant"
            control={<Radio />}
            label="Most relevant"
          />
          <FormControlLabel value="off" control={<Radio />} label="Off" />
        </RadioGroup>
      </Menu>
    </Box>
  );
};

export default GroupDetails;
