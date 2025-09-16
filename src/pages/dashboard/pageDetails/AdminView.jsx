import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  close2,
  conversation,
  dummyPhoto,
  edit,
  growPage,
  noPosts,
  plus,
  three_vertical_dots,
} from "../../../assets";
import {
  BoxWithTextIcon,
  CreateAdminPost,
  DynamicModal,
  EventModal,
  PhotoModal,
  PollModal,
  PostCard,
  PostModal,
  PostSetting,
  ScheduleModal,
  VideoModal,
  ViewEventModal,
} from "../../../components";
import { pageStats } from "../../../constant";
import {
  convertToFormData,
  generateThumbnail,
  getDaysLeft,
} from "../../../utils";
import DashboardSection from "./DashboardSection";
import PagePosts from "./PagePosts";
import ActivitySection from "./ActivitySection";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditPageMutation,
  useGetPageByIdQuery,
  useGetPostsByPageQuery,
} from "../../../services/page";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import EditPage from "./EditPage";

const AdminView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    isSuccess,
    refetch: refetchPage,
    isFetching,
  } = useGetPageByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (error) toast.error(error?.data?.message);
    if (isSuccess) setCoverPhoto(data?.data?.coverImageUrl);
  }, [error, isSuccess]);

  const [update] = useEditPageMutation();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    const body = {
      [type]: file,
    };
    const credentials = convertToFormData(body);
    if (file) {
      setLoading(type);
      update({ id, credentials }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          setLoading(false);
          return;
        }
        if (res?.data) {
          setLoading(false);
          setCoverPhoto(res?.data?.data?.coverImageUrl);
        }
      });
    }
  };

  const items = ["Dashboard", "Page posts", "Edit page"];
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [videoData, setVideoData] = useState({ video: null, thumbnail: null });
  const [showModal, setShowModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const fileInputRef = useRef(null);
  const coverPhotoRef = useRef(null);
  const videoInputRef = useRef(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [eventFormValues, setEventFormValues] = useState({});
  const [viewEventModal, setViewEventModal] = useState(false);
  const [pollModal, setPollModal] = useState(false);
  const [postSettingModal, setPostSettingModal] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(data?.data?.logoUrl);
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    if (selectedFiles?.length > 0) {
      setShowPostModal(false);
      setShowModal(true);
    }
  }, [selectedFiles]);

  useEffect(() => {
    if (videoData?.video) {
      setVideoModal(true);
      setShowPostModal(false);
    }
  }, [videoData]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const HandleSelectedFile = (files) => {
    setSelectedFiles(files);
  };

  const HandleModalClose = () => {
    setShowModal(false);
    setShowPostModal(false);
    setSelectedFiles([]);
    fileInputRef.current.value = null;
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const thumbnail = await generateThumbnail(file);
        setVideoData({ video: file, thumbnail });
      } catch (error) {
        console.error("Error generating thumbnail:", error);
      }
    }
  };

  const HandlePostTypeClick = (item) => {
    if (item === "Photo") {
      fileInputRef.current.click();
    } else if (item === "Video") {
      videoInputRef.current.click();
    } else if (item === "Event") {
      setEventModal(true);
      setShowPostModal(false);
    } else if (item === "Poll") {
      setPollModal(true);
      setShowPostModal(false);
    } else if (item === "Article") {
      navigate("/article");
    }
  };

  const HandleVideoModalClose = () => {
    setVideoModal(false);
    setVideoData({ video: null, thumbnail: null });
    if (videoInputRef.current) {
      videoInputRef.current.value = null;
    }
  };

  const handleFormSubmit = (formData) => {
    setEventFormValues(formData);
    setEventModal(false);
    setViewEventModal(true);
  };

  const handleEditClick = () => {
    setEventModal(true);
    setViewEventModal(false);
  };

  const handleViewEventModalClose = () => {
    setViewEventModal(false);
    setEventFormValues({});
  };

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { user: userData } = useSelector((state) => state.auth);
  const skip = !id;
  console.log(posts);

  const {
    data: postsData,
    isLoading: isPostLoading,
    isSuccess: isPostSuccess,
    refetch,
    error: postError,
    isFetching: isPostFetching,
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
    if (postError) {
      toast.error(postError?.data?.message);
    }
  }, [postError]);

  useEffect(() => {
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
  }, [data, isPostSuccess, page, isPostFetching]);

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
        lastLike = `${item?.lastLikedUser} ${item?.lastLikedUser}`;
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
        userId: item?.id,
        page: item?.page,
        pageId: item?.page?.id,
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

  if (isLoading || isFetching) {
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
          width: {
            xs: "98%",
            md:
              activeItem === "Page posts" || activeItem === "Activity"
                ? "98%"
                : "85%",
            lg:
              activeItem === "Page posts" || activeItem === "Activity"
                ? "98%"
                : "80%",
            xl:
              activeItem === "Page posts" || activeItem === "Activity"
                ? "98%"
                : "75%",
          },
          py: "25px",
        }}
      >
        <Grid2 size={{ xs: 12, lg: 3 }}>
          <Paper sx={{ padding: "0px 0px" }}>
            <Box
              sx={{
                height: "90px",
                borderTopRightRadius: "4px",
                borderTopLeftRadius: "4px",
                position: "relative",
                backgroundImage:
                  loading === "cover" ? "" : `url(${coverPhoto || dummyPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading === "cover" && (
                <CircularProgress sx={{ color: "#1877F2" }} />
              )}
              <Box
                sx={{
                  width: "128px",
                  height: "128px",
                  border: "2px solid #fff",
                  position: "absolute",
                  top: "20px",
                  left: "15px",
                  backgroundImage: `url(${data?.data?.logoUrl || dummyPhoto})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></Box>
              <Box
                sx={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "white",
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => coverPhotoRef.current.click()}
              >
                <img src={edit} alt="Icon" />
              </Box>
            </Box>
            <Box
              sx={{
                mt: "70px",
                px: "15px",
                display: "flex",
                flexDirection: "column",
                rowGap: "5px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "500",
                  color: "#171717",
                  textTransform: "capitalize",
                }}
              >
                {data?.data?.name}
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
              >
                {data?.data?.followerCount} followers
              </Typography>
              <PostCard
                refetch={refetch}
                page={data?.data}
                adminPage={true}
                childComp={
                  <Button
                    sx={{ maxWidth: "120px", height: "36px" }}
                    onClick={() => setCreateModal(true)}
                  >
                    Create
                  </Button>
                }
              />
              <Button
                onClick={() => navigate(`/page/${id}`)}
                sx={{
                  maxWidth: "100%",
                  height: "36px",
                  mt: "10px",
                  background: "transparent",
                  border: "1px solid #E4E4E4",
                  textTransform: "none",
                  borderRadius: "12px",
                  ":hover": { background: "transparent", color: "#000" },
                }}
              >
                View as a member
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "3px",
                mt: "10px",
              }}
            >
              {items?.map((item, index) => {
                return (
                  <Box
                    sx={{
                      borderLeft: "4px solid transparent",
                      borderImageSource:
                        item === activeItem &&
                        "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                      borderImageSlice: 1,
                      p: "20px 15px",
                      cursor: "pointer",
                    }}
                    key={index}
                    onClick={() => {
                      if (item !== "Breaker") {
                        setActiveItem(item);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    {item === "Breaker" ? (
                      <Divider />
                    ) : (
                      <Typography
                        variant={item === activeItem ? "gradientText" : "body1"}
                      >
                        {item}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            lg:
              activeItem === "Page posts" || activeItem === "Activity" ? 6 : 9,
          }}
          sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
        >
          {activeItem === "Page posts" ? (
            <PagePosts
              refetch={refetch}
              page={data?.data}
              posts={posts}
              fetchMoreData={fetchMoreData}
              hasMore={hasMore}
              isLoading={isPostLoading}
              isFetching={isPostFetching}
              handleDropdown={() => setPostSettingModal(true)}
            />
          ) : activeItem === "Activity" ? (
            <ActivitySection page={data?.data} />
          ) : activeItem === "Edit page" ? (
            <EditPage page={data?.data} refetch={refetchPage} />
          ) : (
            <DashboardSection
              refetch={refetch}
              page={data?.data}
              posts={posts}
              isLoading={isPostLoading}
              isFetching={isPostFetching}
            />
          )}
        </Grid2>
        {(activeItem === "Page posts" || activeItem === "Activity") && (
          <Grid2 size={{ xs: 12, lg: 2.5 }}>
            <Paper
              sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
            >
              <Box>
                <Typography
                  sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}
                >
                  Post highlights
                </Typography>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
                >
                  In the last 30 days
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <img src={noPosts} alt="Image" />
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "600", color: "#171717" }}
                >
                  No highlights
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
                >
                  No recent post highlights
                </Typography>
              </Box>
            </Paper>
          </Grid2>
        )}
      </Grid2>
      <input
        type="file"
        ref={fileInputRef}
        accept=".jpeg, .jpg, .tiff, .png, .webp"
        style={{ display: "none" }}
        multiple
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={coverPhotoRef}
        accept=".jpeg, .jpg, .tiff, .png, .webp"
        style={{ display: "none" }}
        onChange={(e) => handleImageChange(e, "cover")}
      />

      <input
        type="file"
        ref={videoInputRef}
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleVideoChange}
      />

      <DynamicModal
        open={showPostModal}
        handleClose={() => setShowPostModal(false)}
        title={"Hello"}
        buttonText={"Post"}
        postModal={true}
        userName={"Areeba Shakeel"}
        dropdownHeader={true}
        footerDirection={"flex-end"}
        adminPage={true}
        handleDropdown={() => setPostSettingModal(true)}
      >
        <PostModal
          fileChange={HandleSelectedFile}
          placeholder={"What do you want to talk about?"}
          videoChange={handleVideoChange}
          openModal={HandlePostTypeClick}
        />
      </DynamicModal>

      <DynamicModal
        open={showModal}
        handleClose={HandleModalClose}
        title={"Hello"}
        buttonText={"Post"}
        postModal={true}
        userName={"Areeba Shakeel"}
        handleScheduleClick={() => setShowScheduleModal(true)}
        dropdownHeader={true}
        footerDirection={"flex-end"}
      >
        <PhotoModal
          files={selectedFiles}
          placeholder={"Say something about this photo"}
          handleClose={HandleModalClose}
        />
      </DynamicModal>

      <DynamicModal
        open={videoModal}
        handleClose={() => setVideoModal(false)}
        title={"Hello"}
        buttonText={"Post"}
        postModal={true}
        userName={"Areeba Shakeel"}
        handleScheduleClick={() => setShowScheduleModal(true)}
        dropdownHeader={true}
        footerDirection={"flex-end"}
      >
        <VideoModal
          file={videoData}
          placeholder={"Say something about this video"}
          handleClose={HandleVideoModalClose}
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
        open={eventModal}
        handleClose={() => setEventModal(false)}
        title={"Create an event"}
        buttonText={"Post"}
        postModal={true}
        userName={"Areeba Shakeel"}
        handleScheduleClick={() => setShowScheduleModal(true)}
        footerDirection={"flex-end"}
        hideFooter={true}
      >
        <EventModal
          onFormSubmit={handleFormSubmit}
          receivedValues={eventFormValues}
          handleClose={() => setEventModal(false)}
        />
      </DynamicModal>

      <DynamicModal
        open={viewEventModal}
        handleClose={handleViewEventModalClose}
        title={"Create an event"}
        buttonText={"Post"}
        postModal={true}
        userName={"Areeba Shakeel"}
        dropdownHeader={true}
        footerDirection={"flex-end"}
        hideFooter={true}
      >
        <ViewEventModal
          values={eventFormValues}
          handleScheduleClick={() => setShowScheduleModal(true)}
          handleEditClick={handleEditClick}
          handleDelete={handleViewEventModalClose}
        />
      </DynamicModal>

      <DynamicModal
        open={pollModal}
        handleClose={() => setPollModal(false)}
        title={"Create a poll"}
        buttonText={"Post"}
        postModal={true}
        userName={"Areeba Shakeel"}
        handleScheduleClick={() => {}}
        styledHeader={true}
        hideFooter={true}
      >
        <PollModal
          handleSuccess={() => setPollModal(false)}
          handleBack={() => setPollModal(false)}
        />
      </DynamicModal>

      <DynamicModal
        open={postSettingModal}
        handleClose={() => setPostSettingModal(false)}
        title={"Post settings"}
        buttonText={"Post"}
        postModal={true}
        userName={"Areeba Shakeel"}
        handleScheduleClick={() => {}}
        styledHeader={true}
        hideFooter={true}
      >
        <PostSetting handleClose={() => setPostSettingModal(false)} />
      </DynamicModal>

      <DynamicModal
        open={createModal}
        handleClose={() => setCreateModal(false)}
        title={"Create"}
        buttonText={"Post"}
        postModal={true}
        userName={"Areeba Shakeel"}
        handleScheduleClick={() => {}}
        styledHeader={true}
        hideFooter={true}
      >
        <CreateAdminPost />
      </DynamicModal>
    </Box>
  );
};

export default AdminView;
