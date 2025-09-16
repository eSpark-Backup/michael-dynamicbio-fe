import {
  Avatar,
  Box,
  CircularProgress,
  Grid2,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  camera,
  comment,
  downArrowFilled,
  dummyPhoto,
  editBlue,
  emoji,
  like,
  noComments,
  primaryEye,
  reading,
  repost,
  save,
  saveUnfilled,
  send,
  unlike,
  user,
} from "../assets";
import { articleDummyContent } from "../constant";
import OutlinedInput from "./outline-input";
import DynamicModal from "./dynamic-modal";
import ShareModal from "./ShareModal";
import PostChoiceModal from "./PostChoiceModal";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostByIdQuery, useSavePostMutation } from "../services/post";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import ReportArticle from "./ReportArticle";
import Button from "./button";
import {
  useCommentMutation,
  useGetPostCommentsQuery,
  useLikeMutation,
} from "../services/interaction";
import Comment from "./Comment";
import { toast } from "react-toastify";
import {
  useSendBondReqMutation,
  useUpdateBondReqMutation,
} from "../services/bonds";
import { useFollowPageMutation } from "../services/page";

const ArticleDetails = () => {
  const [showComments, setShowComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showShareModal, setShowShareModal] = useState(false);
  const [postChoiceModal, setPostChoiceModal] = useState(false);
  const { id } = useParams();
  const { data, isSuccess, isLoading, isError, error } = useGetPostByIdQuery(
    id,
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const navigate = useNavigate();
  const { user: userData } = useSelector((state) => state.auth);
  const [showReportArticle1, setReportArticle1] = useState(false);
  const [hasLiked, setHasLiked] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [focus, setFocus] = useState(false);

  const [
    likeData,
    {
      data: likeDataReceived,
      isSuccess: isLikeSucess,
      isError: isLikeError,
      error: likeError,
      isLoading: isLikeloading,
    },
  ] = useLikeMutation();

  const [updateReq, { isLoading: isUpdateReqLoading }] =
    useUpdateBondReqMutation();
  const [sendReq, { isLoading: isReqLoading }] = useSendBondReqMutation();
  const [follow, { isLoading: isFollowLoading }] = useFollowPageMutation();
  const inputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const HandleFocus = () => {
    console.log("Ref on click:", inputRef.current);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const [articleContent, setArticleContent] = useState({
    articleImage: null,
    articleTitle: "",
    articleMaker: "",
    articleMakerRole: "",
    time: "",
    content: "",
    articleMakerImage: "",
    authorId: "",
    postId: null,
    isSaved: null,
    bondId: null,
    isFriend: null,
    isFollowed: null,
    pageId: null,
    shareableLink: null,
    visibility: null,
  });

  const [postComments, setPostComments] = useState([]);
  const [commentId, setCommentId] = useState("");

  const {
    data: getCommentsData,
    isSuccess: getCommentsSuccess,
    isError: isGetCommentsError,
    error: getCommentsError,
    isLoading: isGetCommentsLoading,
    refetch,
  } = useGetPostCommentsQuery(commentId, {
    skip: !commentId,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [savePostData, { isLoading: isSavingPostLoading }] =
    useSavePostMutation();

  const [
    commentData,
    {
      data: postCommentData,
      isSuccess: postCommentSucces,
      isError: isPostCommentError,
      error: postCommentError,
      isLoading: postCommentLoading,
    },
  ] = useCommentMutation();

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

  const CommentHandler = () => {
    setCommentId(articleContent?.postId);
    setShowComments(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (isSuccess && data?.data) {
      setArticleContent((prev) => ({
        ...prev,
        articleImage: data?.data?.media["ARTICLES"][0]?.url,
        articleTitle: data?.data?.content?.articleTitle,
        articleMaker: data?.data?.isPagePost
          ? data?.data?.page?.name
          : data?.data?.author?.firstName + " " + data?.data?.author?.lastName,
        articleMakerRole: data?.data?.isPagePost
          ? data?.data?.pageFollowerCount
          : data?.data?.author?.company,
        time: dayjs(data?.data?.createdAt).format("LL"),
        content: data?.data?.content?.content,
        articleMakerImage: data?.data?.isPagePost
          ? data?.data?.page?.logoUrl
          : data?.data?.author?.profileImage,
        authorId: data?.data?.author?.id,
        postId: data?.data?.id,
        isSaved: data?.data?.isSaved,
        bondId: data?.data?.bondId,
        isFriend: data?.data?.bondId ? true : false,
        isFollowed: data?.data?.isPageFollowing,
        pageId: data?.data?.page?.id,
        shareableLink: data?.data?.shareableLink,
        visibility: data?.data?.visibility,
      }));
      const isPostLiked = data?.data?.likes?.some(
        (item) => item?.user?.id === userData?.id
      );
      if (isPostLiked) {
        setHasLiked(true);
      } else {
        setHasLiked(false);
      }
    }
  }, [data, isSuccess]);

  const LikeHandler = () => {
    const newLike = !hasLiked;
    setHasLiked(newLike);
    likeData({ entityId: articleContent?.postId, type: "POST" });
  };

  useEffect(() => {
    if (isLikeError && likeError?.data?.status === false) {
      const newLike = !hasLiked;
      setIsPostLiked(newLike);
    }
  }, [likeError, isLikeError]);

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
      console.log(res);
      if (res?.data) {
        toast.success("Comment added successfully");
        setCommentContent("");
        refetch();
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      HandleComment(articleContent?.postId);
    }
  };

  const SavePostHandler = async () => {
    const res = await savePostData({
      postId: articleContent?.postId,
      type: "POST",
    });
    if (res?.error) {
      toast.error(res?.error?.data?.message || "Something went wrong");
      return;
    } else if (res?.data) {
      toast.success(res?.data?.message);
      setArticleContent((prev) => ({
        ...prev,
        isSaved: !prev?.isSaved,
      }));
    }
  };

  const BondHandler = async () => {
    const bodyToSend = {
      otherUserId: articleContent?.authorId,
      action: "unfriend",
    };
    updateReq(bodyToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        toast?.success(res?.data?.message);
        setArticleContent((prev) => ({
          ...prev,
          isFriend: !prev?.isFriend,
        }));
      }
    });
  };

  const SendRequestHandler = async () => {
    const bodyToSend = {
      recipientId: articleContent?.authorId,
    };
    sendReq(bodyToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        toast.success("Your Request sent successfully");
        setArticleContent((prev) => ({
          ...prev,
          isFriend: !prev?.isFriend,
        }));
      }
    });
  };

  const FollowHandler = () => {
    follow(articleContent?.pageId).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        setArticleContent((prev) => ({
          ...prev,
          articleMakerRole: prev?.isFollowed
            ? prev?.articleMakerRole - 1
            : prev?.articleMakerRole + 1,
          isFollowed: !prev?.isFollowed,
        }));
      }
    });
  };

  if (isLoading) {
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

  if (!isLoading && isSuccess && !data?.data) {
    return <Typography>No data Found</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        rowGap: "10px",
        mt: "20px",
      }}
    >
      {articleContent?.authorId === userData?.id && (
        <Box
          sx={{
            width: { xs: "98%", md: "85%", lg: "80%" },
            backgroundColor: "#F2F8FD",
            border: "1px solid #E4E4E4",
            borderRadius: "8px",
            p: "25px",
            display: "flex",
            columnGap: "20px",
          }}
        >
          <Box
            sx={{ display: "flex", columnGap: "3px", cursor: "pointer" }}
            onClick={() => navigate(`/article/edit/${id}`)}
          >
            <img src={editBlue} alt="Icon" style={{ width: "16px" }} />
            <Typography
              sx={{ fontSize: "16px", fontWeight: "400" }}
              variant="gradientText"
            >
              Edit article
            </Typography>
          </Box>
        </Box>
      )}

      <Grid2
        container
        spacing={3}
        sx={{ width: { xs: "98%", md: "85%", lg: "80%" }, py: "25px" }}
      >
        <Grid2 size={{ xs: 12, lg: 8, xl: 9 }}>
          <Paper sx={{ p: "0px" }}>
            <Box
              sx={{
                paddingTop: "46.25%",
                backgroundImage: `url("${
                  articleContent?.articleImage
                    ? articleContent?.articleImage
                    : dummyPhoto
                }")`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "100.1%",
              }}
            ></Box>
            <Box sx={{ p: "30px 20px" }}>
              <Typography
                sx={{ fontSize: "24px", fontWeight: "600", color: "#171717" }}
              >
                {articleContent?.articleTitle}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "3px",
                    width: "100%",
                    p: "20px 0px 40px 0px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        columnGap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={
                          articleContent?.articleMakerImage
                            ? articleContent?.articleMakerImage
                            : user
                        }
                        alt="Avatar"
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: "2px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#171717",
                          }}
                        >
                          {articleContent?.articleMaker}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#505050",
                          }}
                        >
                          {typeof articleContent?.articleMakerRole === "string"
                            ? articleContent?.articleMakerRole
                            : `${articleContent?.articleMakerRole} ${
                                articleContent?.articleMakerRole > 1
                                  ? "followers"
                                  : "follower"
                              }`}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", columnGap: "15px" }}>
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          border: "1px solid #E4E4E4",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={SavePostHandler}
                      >
                        <img
                          src={articleContent?.isSaved ? save : saveUnfilled}
                          alt="Icon"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}
              >
                {articleContent?.time}
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 400,
                  color: "#171717",
                  pt: "15px",
                  "& img": {
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                  },
                }}
                dangerouslySetInnerHTML={{ __html: articleContent?.content }}
              ></Typography>
              {articleContent?.authorId !== userData?.id && (
                <Box
                  sx={{ mt: "20px" }}
                  onClick={() => setReportArticle1(true)}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#171717",
                      cursor: "pointer",
                      width: "fit-content",
                    }}
                  >
                    Report this article
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    rowGap: "10px",
                  }}
                >
                  <img
                    src={
                      articleContent?.articleMakerImage
                        ? articleContent?.articleMakerImage
                        : user
                    }
                    alt="Avatar"
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography sx={{ textAlign: "center" }}>
                    {articleContent?.articleMaker}
                  </Typography>
                  <Typography sx={{ textAlign: "center" }}>
                    {typeof articleContent?.articleMakerRole === "string"
                      ? articleContent?.articleMakerRole
                      : `${articleContent?.articleMakerRole} ${
                          articleContent?.articleMakerRole > 1
                            ? "followers"
                            : "follower"
                        }`}
                  </Typography>
                  {articleContent?.authorId !== userData?.id &&
                    !data?.data?.isPagePost && (
                      <Button
                        sx={{ width: "150px", height: "36px" }}
                        onClick={
                          articleContent?.isFriend
                            ? BondHandler
                            : SendRequestHandler
                        }
                        loading={isUpdateReqLoading || isReqLoading}
                      >
                        {articleContent?.isFriend ? "Unbond" : "Bond"}
                      </Button>
                    )}

                  {articleContent?.authorId !== userData?.id &&
                    data?.data?.isPagePost && (
                      <Button
                        sx={{ width: "150px", height: "36px" }}
                        onClick={FollowHandler}
                        loading={isFollowLoading}
                      >
                        {articleContent?.isFollowed ? "Unfollow" : "Follow"}
                      </Button>
                    )}
                </Box>
              </Box>
              <Box
                sx={{
                  pt: "35px",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "15px",
                }}
              >
                <Typography
                  sx={{ fontSize: "24px", fontWeight: "600", color: "#171717" }}
                >
                  More articles for you
                </Typography>
                <Box
                  sx={{
                    width: "400px",
                    height: "350px",
                    border: "1px solid #E4E4E4",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundImage: `url(${dummyPhoto})`,
                      height: "70%",
                      borderTopRightRadius: "8px",
                      borderTopLeftRadius: "8px",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      width: "100.1%",
                    }}
                  ></Box>
                  <Box sx={{ p: "10px" }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#171717",
                      }}
                    >
                      Basic
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "300",
                        color: "#505050",
                      }}
                    >
                      rotten ria
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4, xl: 3 }}>
          <Paper>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
            >
              Comments
            </Typography>
            <Box
              sx={{
                borderTop: "1px solid #E4E4E4",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#F8FCFF",
                height: "50px",
                px: { xs: "10px", md: "0px" },
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  columnGap: "15px",
                  cursor: "pointer",
                  width: { md: "25%" },
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={!isLikeloading ? LikeHandler : () => {}}
              >
                <img
                  src={hasLiked ? like : unlike}
                  alt="Like"
                  style={{ width: "24px", height: "24px" }}
                />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    display: { xs: "none" },
                    color: "#505050",
                    "@media (min-width:1750px)": { display: "block" },
                  }}
                >
                  {hasLiked ? "Liked" : "Like"}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "15px",
                  cursor: "pointer",
                  backgroundColor: showComments ? "#FFFFFF" : "inherit",
                  width: { md: "25%" },
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={CommentHandler}
              >
                <img src={comment} alt="Like" />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    display: { xs: "none" },
                    color: "#505050",
                    "@media (min-width:1750px)": { display: "block" },
                  }}
                >
                  Comment
                </Typography>
              </Box>
              {articleContent?.visibility === "PUBLIC" && (
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "15px",
                    cursor: "pointer",
                    width: { md: "25%" },
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => setShowShareModal(true)}
                >
                  <img src={send} alt="Repost" />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      display: { xs: "none" },
                      color: "#505050",
                      "@media (min-width:1750px)": { display: "block" },
                    }}
                  >
                    Send
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
                  mt: "25px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "5px",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "5px",
                      flexDirection: { xs: "column", md: "row" },
                      width: "100%",
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
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          columnGap: "3px",
                        }}
                      >
                        <Avatar
                          src={
                            userData?.profileImage
                              ? userData.profileImage
                              : user
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
                            onInputChange={(e) =>
                              setCommentContent(e.target.value)
                            }
                            value={commentContent}
                            multiline={true}
                            onKeyDown={handleKeyDown}
                            name={"comment"}
                            inputRef={inputRef}
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
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    maxHeight: "350px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px",
                  }}
                >
                  {Array.isArray(postComments) &&
                    postComments?.length > 0 &&
                    postComments?.map((item, index) => (
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
            {getCommentsData && postComments?.length == 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: "25px",
                  flexDirection: "column",
                  rowGap: "15px",
                }}
              >
                <img src={noComments} alt="Image" />
                <Typography
                  sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}
                >
                  No comments, yet.
                </Typography>
                <Typography
                  sx={{ fontSize: "15px", fontWeight: "400", color: "#505050" }}
                >
                  Be the first to comment.
                </Typography>
                <Box
                  sx={{
                    width: "70%",
                    height: "36px",
                    borderRadius: "2px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "white",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: "8px",
                      padding: "1px",
                      background:
                        "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                      mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                      WebkitMask:
                        "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                      WebkitMaskComposite: "destination-out",
                      maskComposite: "exclude",
                    },
                    cursor: "pointer",
                  }}
                  onClick={HandleFocus}
                >
                  <Typography variant="gradientText">
                    Start the conversation
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid2>
      </Grid2>

      <DynamicModal
        open={showShareModal}
        handleClose={() => setShowShareModal(false)}
        title={`Share ${articleContent?.articleMaker} Post`}
        postModal={true}
        dropdownHeader={false}
        hideFooter={true}
      >
        <ShareModal
          shareableLink={articleContent?.shareableLink}
          handleClose={() => setShowShareModal(false)}
        />
      </DynamicModal>

      <DynamicModal
        open={postChoiceModal}
        handleClose={() => setPostChoiceModal(false)}
        title={"Comment, react, and repost as"}
        buttonText={"Save"}
        postModal={true}
        userName={"Areeba Shakeel"}
        hideFooter={true}
        smallModal={true}
        styledHeader={true}
      >
        <PostChoiceModal />
      </DynamicModal>

      <DynamicModal
        open={showReportArticle1}
        handleClose={() => setReportArticle1(false)}
        title={"Report this article"}
        buttonText={"Next"}
        postModal={true}
        userName={"Areeba Shakeel"}
        hideFooter={true}
        smallModal={true}
        styledHeader={true}
      >
        <ReportArticle handleSubmit={() => setReportArticle1(false)} />
      </DynamicModal>
    </Box>
  );
};

export default ArticleDetails;
