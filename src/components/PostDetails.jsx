import {
  Avatar,
  Box,
  LinearProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  nextArrow,
  prevArrow,
  close,
  like,
  comment,
  send,
  user,
  unlike,
} from "../assets";
import BondCard2 from "./BondCard";
import DynamicModal from "./dynamic-modal";
import RepostWithThoughts from "./RepostWithThoughts";
import GroupShareModal from "./GroupShareModal";
import ConfirmationModal from "./ConfirmationModal";
import ShareModal from "./ShareModal";
import ScheduleModal from "./ScheduleModal";
import OutlinedInput from "./outline-input";
import Comment from "./Comment";
import {
  useCommentMutation,
  useGetPostCommentsQuery,
} from "../services/interaction";
import { useSelector } from "react-redux";
import Button from "./button";
import { toast } from "react-toastify";
import ShowLikesModal from "./ShowLikesModal";
import EditModal from "./EditModal";

const PostDetails = ({
  images,
  userName,
  userRole,
  postTime,
  userImage,
  postContent,
  numberofLikes,
  isLiked,
  comments,
  handleModalClose,
  handleLike,
  lastUserLiked,
  id,
  isLoading,
  handleCommentCounter,
  likesData,
  ownPost,
  friendPost,
  isSaved,
  isUserPost,
  isPagePost,
  isPageFollowing,
  visibility,
  commentSetting,
  pageId,
  userId,
  isGeneralPost,
  shareableLink,
  groupPost,
  isAdminPost,
  isGroupfeed,
  groupId,
  groupName,
  groupImage,
  isUserAdmin,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showComments, setShowComments] = useState(false);
  const [showThoughtsModal, setShowThoughtsModal] = useState(false);
  const [groupShareModal, setGroupShareModal] = useState(false);
  const [thoughts, setThoughts] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [postId, setPostId] = useState("");
  const [postComments, setPostComments] = useState([]);
  const { user: userData } = useSelector((state) => state.auth);
  const [totalComments, setTotalComments] = useState(comments);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [postVisibility, setPostVisibility] = useState(visibility);
  const [commentSettings, setCommentSettings] = useState(commentSetting);
  const [editTitle, setEditTitle] = useState(postContent);
  console.log(setEditTitle, setCommentSettings);

  const {
    data: getCommentsData,
    isSuccess: getCommentsSuccess,
    isLoading: isGetCommentsLoading,
    refetch,
  } = useGetPostCommentsQuery(postId, {
    skip: !postId,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [
    commentData,
    {
      isLoading: postCommentLoading,
    },
  ] = useCommentMutation();


  useEffect(() => setTotalComments(comments), [comments]);

  useEffect(() => {
    if (getCommentsSuccess && getCommentsData?.data) {
      const comments = getCommentsData.data.map((item) => {
        const hasLiked = item?.likes?.some(
          (like) => like?.user?.id === userData?.id
        );

        return {
          userImage: item?.user?.profileImage,
          userName: `${item?.user?.firstName} ${item?.user?.lastName}`,
          comment: item?.content,
          time: item?.createdAt,
          commentId: item?.id,
          allLikes:
            item?.likes?.map((like) => ({
              ...like.user,
              isBond: like.isBond,
            })) || [],
          likesCount: item?.likesCount,
          hasLiked: hasLiked,
        };
      });

      setPostComments(comments);
    }
  }, [getCommentsSuccess, getCommentsData]);

  const HandlePrevClick = () => {
    if (activeIndex === 0) {
      setActiveIndex(images?.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const HandleNextClick = () => {
    if (activeIndex === images?.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const HandleComment = (id) => {
    const data = {
      content: commentContent,
      postId: id,
    };
    commentData(data).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success("Comment added successfully");
        setCommentContent("");
        refetch();
        setTotalComments((prev) => prev + 1);
        handleCommentCounter();
      }
    });
  };

  const CommentHandler = (id) => {
    setPostId(id);
    setShowComments(true);
  };

  const HandleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      HandleComment(id);
    }
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const HandleRepost = (event) => {
    if (event === "thoughts") {
      setShowThoughtsModal(true);
      handleCloseMenu();
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const HandleSuccess = () => {
    if (thoughts === "") {
      setShowConfirmModal(true);
    } else {
      setShowThoughtsModal(false);
    }
  };

  const ALertHandler = () => {
    toast.warning("Please login for actions");
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", columnGap: "4px", alignItems: "center" }}>
          <img
            src={close}
            alt="Icon"
            style={{ width: "24px", height: "44px", cursor: "pointer" }}
            onClick={handleModalClose}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          flexDirection: { xs: "column", md: "row" },
          mt: { xs: "15px", md: "0px" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            height: "70vh",
            position: "relative",
            backgroundImage: `url("${images[activeIndex]}")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
          }}
        >
          {Array.isArray(images) && images?.length > 1 && (
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                top: "50%",
                transform: "translateY(-50%)",
                px: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <img
                src={prevArrow}
                alt="Icon"
                style={{ width: "24px", height: "24px", cursor: "pointer" }}
                onClick={HandlePrevClick}
              />
              <img
                src={nextArrow}
                alt="Icon"
                style={{ width: "24px", height: "24px", cursor: "pointer" }}
                onClick={HandleNextClick}
              />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "44%" },
            display: "flex",
            flexDirection: "column",
            rowGap: "15px",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                columnGap: "4px",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <img
                src={close}
                alt="Icon"
                style={{ width: "24px", height: "44px", cursor: "pointer" }}
                onClick={handleModalClose}
              />
            </Box>
          </Box>
          <BondCard2
            userImage={userImage}
            userName={userName}
            userRole={userRole}
            time={postTime}
            showWorldIcon
            postId={id}
            ownPost={ownPost}
            isFriendPost={friendPost}
            isSaved={isSaved}
            isUserPost={isUserPost}
            isPageFollowing={isPageFollowing}
            isPagePost={isPagePost}
            isDetails={true}
            handleDetailsClose={handleModalClose}
            visibility={visibility}
            commentSetting={commentSetting}
            type={"IMAGE"}
            pageId={pageId}
            handleEdit={() => setEditModal(true)}
            id={userId}
            isGeneralPost={isGeneralPost}
            shareableLink={shareableLink}
            isAdminPost={isAdminPost}
            groupPost={groupPost}
            isGroupfeed={isGroupfeed}
            groupId={groupId}
            groupName={groupName}
            groupImage={groupImage}
            isUserAdmin={isUserAdmin}
          />
          {postContent && (
            <Typography
              sx={{ fontSize: "20px", fontWeight: 400, color: "#171717" }}
              dangerouslySetInnerHTML={{ __html: postContent }}
            ></Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", columnGap: "6px" }}
            >
              {numberofLikes >= 1 && (
                <img
                  src={like}
                  alt="Like"
                  style={{ width: "13.43px", height: "12px" }}
                />
              )}
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#505050",
                  cursor: numberofLikes > 0 ? "pointer" : "text",
                }}
                onClick={
                  isGeneralPost
                    ? ALertHandler
                    : numberofLikes > 0 && !isLoading
                      ? () => setShowLikesModal(true)
                      : () => {}
                }
              >
                {numberofLikes === 0
                  ? "Be first to like this"
                  : isLiked && numberofLikes === 1
                    ? "You liked this post"
                    : isLiked && numberofLikes > 1
                      ? `You and ${numberofLikes - 1} more like this`
                      : numberofLikes === 1
                        ? `${lastUserLiked} likes this`
                        : `${lastUserLiked} and ${numberofLikes - 1} like this`}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", columnGap: "10px" }}>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}
              >
                {totalComments} comments
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}
              >
                •
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}
              >
                0 reposts
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              borderTop: "1px solid #E4E4E4",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#F8FCFF",
              height: "50px",
              px: { xs: "10px", md: "0px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                columnGap: "15px",
                cursor: "pointer",
                width: { md: "20%" },
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={
                isGeneralPost
                  ? ALertHandler
                  : isLoading
                    ? () => {}
                    : () => handleLike(id)
              }
            >
              <img
                src={isLiked ? like : unlike}
                alt="Like"
                style={{ width: "24px", height: "24px" }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  display: { xs: "none", md: "block" },
                  color: "#505050",
                }}
              >
                {isLiked ? "Liked" : "Like"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                columnGap: "15px",
                cursor: "pointer",
                backgroundColor: showComments ? "#FFFFFF" : "inherit",
                width: { md: "20%" },
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={isGeneralPost ? ALertHandler : () => CommentHandler(id)}
            >
              <img src={comment} alt="Like" />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  display: { xs: "none", lg: "block" },
                  color: "#505050",
                }}
              >
                Comment
              </Typography>
            </Box>
            {visibility === "PUBLIC" && (
              <Box
                sx={{
                  display: "flex",
                  columnGap: "15px",
                  cursor: "pointer",
                  width: { md: "20%" },
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={
                  isGeneralPost ? ALertHandler : () => setShowShareModal(true)
                }
              >
                <img src={send} alt="Like" />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    display: { xs: "none", lg: "block" },
                    color: "#505050",
                  }}
                >
                  Share
                </Typography>
              </Box>
            )}
          </Box>
          {showComments && (
            <Box
              sx={{
                px: { xs: "0px", md: "10px" },
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  columnGap: "5px",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                {isGetCommentsLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <LinearProgress
                      sx={{
                        width: "100%",
                        height: 6,
                        bgcolor: "#F2F8FD",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <>
                    <Avatar
                      src={
                        userData?.profileImage ? userData.profileImage : user
                      }
                      alt="User"
                      sx={{ width: 60, height: 60, objectFit: "fill" }}
                    />
                    <Box
                      sx={{
                        border: "1px solid #DDE2E4",
                        width: "100%",
                        display: "flex",
                        pr: "10px",
                        minHeight: "60px",
                        flexDirection: commentContent ? "column" : "row",
                        pb: commentContent ? "10px" : "0px",
                        rowGap: "13px",
                        maxHeight: "120px",
                        overflowY: "auto",
                      }}
                    >
                      <OutlinedInput
                        sx={{
                          height: "100%",
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            border: "none !important",
                            height: "100%",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none !important",
                          },
                          p: "10px",
                        }}
                        placeholder={"Add a comment"}
                        onInputChange={(e) => setCommentContent(e.target.value)}
                        value={commentContent}
                        multiline={true}
                        onKeyDown={HandleKeyDown}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        {commentContent && (
                          <Button
                            loading={postCommentLoading}
                            onClick={() => HandleComment(id)}
                            sx={{
                              width: "150px",
                              height: "36px",
                              color: "white",
                            }}
                          >
                            Comment
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "20px",
                }}
              >
                {Array.isArray(postComments) &&
                  postComments?.length > 0 &&
                  postComments?.map((item) => (
                    <Comment
                      key={item?.commentId}
                      userImage={item?.userImage}
                      userName={item?.userName}
                      comment={item?.comment}
                      time={item?.time}
                      hasLiked={item?.hasLiked}
                      likesCount={item?.likesCount}
                      allLikes={item?.allLikes}
                      commentId={item?.commentId}
                    />
                  ))}
              </Box>
            </Box>
          )}
        </Box>
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
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={() => HandleRepost("thoughts")}
            sx={{ width: "245px" }}
          >
            Repost with your thoughts
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ width: "245px" }}>
            Repost
          </MenuItem>
        </Menu>

        <DynamicModal
          open={showThoughtsModal}
          handleClose={() => setShowThoughtsModal(false)}
          buttonText={"Post"}
          postModal={true}
          userName={"Areeba Shakeel"}
          handleScheduleClick={() => setShowScheduleModal(true)}
          dropdownHeader={true}
          footerDirection={"flex-end"}
          onSuccess={HandleSuccess}
          handleGroupClick={() => setGroupShareModal(true)}
        >
          <RepostWithThoughts onChange={(e) => setThoughts(e.target.value)} />
        </DynamicModal>

        <DynamicModal
          open={groupShareModal}
          handleClose={() => setGroupShareModal(false)}
          title={"Repost to group"}
          buttonText={"Save"}
          postModal={true}
          userName={"Areeba Shakeel"}
          footerDirection={"space-between"}
          hideFooter={true}
        >
          <GroupShareModal />
        </DynamicModal>

        <ConfirmationModal
          open={showConfirmModal}
          handleClose={() => setShowConfirmModal(false)}
          title={"Repost without adding your thoughts?"}
          cancelButtonText={"Back"}
          acceptButtonText={"Yes, repost"}
          handleAccept={() => setShowConfirmModal(false)}
          handleCancel={() => setShowConfirmModal(false)}
        >
          <Typography
            sx={{ fontSize: "17px", fontWeight: "300", color: "#595959" }}
          >
            If you repost without adding your thoughts, all new comments &
            reactions will be added to XYZ’s post.
          </Typography>
        </ConfirmationModal>

        <DynamicModal
          open={showShareModal}
          handleClose={() => setShowShareModal(false)}
          title={`Share ${userName} Post`}
          postModal={true}
          dropdownHeader={false}
          hideFooter={true}
        >
          <ShareModal
            shareableLink={shareableLink}
            handleClose={() => setShowShareModal(false)}
          />
        </DynamicModal>

        <DynamicModal
          open={showScheduleModal}
          handleClose={() => setShowScheduleModal(false)}
          title={"Schedule post"}
          buttonText={"Post"}
          postModal={true}
          userName={"Areeba Shakeel"}
          handleScheduleClick={() => {}}
          smallModal={true}
          styledHeader={true}
          footerDirection={"space-between"}
        >
          <ScheduleModal />
        </DynamicModal>

        <DynamicModal
          open={showLikesModal}
          handleClose={() => setShowLikesModal(false)}
          title={"Likes"}
          hideFooter={true}
          smallModal={true}
          styledHeader={true}
        >
          <ShowLikesModal allLikes={likesData} />
        </DynamicModal>

        <DynamicModal
          open={showEditModal}
          handleClose={() => setEditModal(false)}
          dropdownHeader={true}
          userData={userData}
          userName={`${userData?.firstName} ${userData?.lastName}`}
          hideFooter={true}
          visibility={postVisibility}
          setVisibility={setPostVisibility}
          isEditModal={true}
          groupAdmin={groupPost ? true : false}
          group={{ name: groupName, logoUrl: groupImage }}
        >
          <EditModal
            type={"normal"}
            title={editTitle}
            id={id}
            normalPostData={{ images }}
            handleClose={() => setEditModal(false)}
            visibility={postVisibility}
            commentSetting={commentSettings}
          />
        </DynamicModal>
      </Box>
    </>
  );
};

export default PostDetails;
