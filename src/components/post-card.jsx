import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Avatar, Box, OutlinedInput, Typography } from "@mui/material";
import DynamicModal from "./dynamic-modal";
import PhotoModal from "./PhotoModal";
import VideoModal from "./VideoModal";
import PostModal from "./PostModal";
import EventModal from "./EventModal";
import ViewEventModal from "./ViewEventModal";
import ScheduleModal from "./ScheduleModal";
import GroupShareModal from "./GroupShareModal";
import PollModal from "./PollModal";
import { useNewPostMutation } from "../services/post";
import { article, event, photo, user, video } from "../assets";
import { addDays } from "../utils";
import ViewPollPost from "./ViewPollPost";

const PostCard = ({
  childComp,
  page,
  group,
  refetch,
  viewOnly,
  groupAdmin,
  adminPage,
  handleDropDown,
}) => {
  const [newPost, { isLoading }] = useNewPostMutation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [videoData, setVideoData] = useState({ video: null, thumbnail: null });
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [videoModal, setVideoModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [eventFormValues, setEventFormValues] = useState({});
  const [viewEventModal, setViewEventModal] = useState(false);
  const [groupShareModal, setGroupShareModal] = useState(false);
  const [pollModal, setPollModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [scheduleTime, setScheduleTime] = useState(new Date());
  const [schedule, setSchedule] = useState({
    date: null,
    time: null,
  });
  const [viewPollModal, setViewPollModal] = useState(false)
  const [pollValues, setPollValues] = useState({})

  const handleThumbnailUpload = (file) => {
    setVideoData((prev) => ({
      ...prev,
      thumbnail: file
    }))
  }

  const handlePost = (obj) => {
    if (viewOnly) {
      setShowPostModal(false);
      HandleModalClose();
      setVideoModal(false);
      setPollModal(false);
      setViewEventModal(false);
      setEventFormValues({});
      return
    }
    else {
      newPost(obj).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message);
          refetch && refetch();
          setTitle("");
          setShowPostModal(false);
          HandleModalClose();
          setVideoModal(false);
          setPollModal(false);
          setViewEventModal(false);
          setEventFormValues({});
          setViewPollModal(false)
          setPollValues({})
        }
      });
    }
  };

  const handleTextPost = () => {
    const obj = {
      pageId: page ? page?.id : null,
      groupId: group ? group?.id : null,
      content: {
        title,
        ...(schedule.date && schedule.time ? { schedule } : {}),
      },
      status: "PUBLISH",
      visibility,
      type: "TEXT",
    };
    handlePost(obj);
  };

  const handleImagePost = () => {
    const obj = {
      pageId: page ? page?.id : null,
      groupId: group ? group?.id : null,
      content: {
        title,
        ...(schedule.date && schedule.time ? { schedule } : {}),
      },
      status: "PUBLISH",
      visibility,
      type: "IMAGE",
      images: selectedFiles,
    };
    handlePost(obj);
  };

  const handleVideoPost = () => {
    const obj = {
      pageId: page ? page?.id : null,
      groupId: group ? group?.id : null,
      content: {
        title,
        ...(schedule.date && schedule.time ? { schedule } : {}),
      },
      status: "PUBLISH",
      visibility,
      type: "VIDEO",
      videos: [videoData?.video],
      thumbnails: videoData?.thumbnail ? [videoData?.thumbnail] : null,
    };
    handlePost(obj);
  };

  const handlePollPost = (values) => {
    const options = [values?.opt1, values?.opt2, ...values?.options];
    const hasDuplicate = (arr) => new Set(arr).size !== arr.length;
    if (hasDuplicate(options)) {
      toast.error("Duplicate options are not allowed");
      return;
    }
    else {
      setViewPollModal(true)
      setPollValues({ question: values.question, options, endDate: values?.duration })
    }
  };

  const HandleFinalPollPost = () => {
    const obj = {
      pageId: page ? page?.id : null,
      groupId: group ? group?.id : null,
      content: {
        ...(schedule.date && schedule.time ? { schedule } : {}),
        title
      },
      poll: {
        question: pollValues?.question,
        options: pollValues?.options,
        endDate: addDays(pollValues?.endDate),
        allowMultipleVotes: false,
        showResults: true,
        isAnonymous: false,
        allowAddOptions: false,
      },
      status: "PUBLISH",
      visibility,
      type: "POLL",
    };
    handlePost(obj);
  }

  const handleEventPost = () => {
    const { selectedFile, ...rest } = eventFormValues;
    const obj = {
      pageId: page ? page?.id : null,
      groupId: group ? group?.id : null,
      content: {
        ...rest,
        title,
        ...(schedule.date && schedule.time ? { schedule } : {}),
      },
      status: "PUBLISH",
      visibility,
      type: "EVENT",
      cover: selectedFile,
    };
    handlePost(obj);
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
      if (page) {
        navigate(`/article?page=${JSON.stringify(page)}`);
      } else if (group) {
        navigate(`/article?group=${JSON.stringify(group)}`);
      } else {
        navigate("/article");
      }
    }
  };

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

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // const thumbnail = await generateThumbnail(file);
        setVideoData({ video: file, thumbnail: null });
      } catch (error) {
        console.error("Error generating thumbnail:", error);
      }
    }
  };

  const HandleSelectedFile = (files) => {
    setSelectedFiles(files);
  };

  const HandleModalClose = () => {
    setShowModal(false);
    setShowPostModal(false);
    setSelectedFiles([]);
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

  const HandleViewEventClose = () => {
    setViewEventModal(false);
    setEventFormValues({});
  };

  const HandleViewPollClose = () => {
    setViewPollModal(false)
    setPollModal(false)
    setPollValues({})
  }

  const { user: userData } = useSelector((state) => state.auth);

  return (
    <Box>
      {childComp ? (
        React.cloneElement(childComp, { onClick: () => setShowPostModal(true) })
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "30px",
              flexDirection: { xs: "column", md: "row" },
              rowGap: "5px",
            }}
          >
            {/* <img
            style={{ width: "73px", height: "73px", borderRadius: "50%" }}
            src={
              userData && userData?.profileImage ? userData?.profileImage : user
            }
            alt="User"
          /> */}
            <Avatar
              src={
                page
                  ? page?.logoUrl
                  : userData?.profileImage
                    ? userData.profileImage
                    : user
              }
              alt="User"
              sx={{
                width: 60, height: 60, objectFit: "fill", cursor: "pointer"
              }}
              onClick={() => navigate(`/profile/${userData?.id}`)}
            />
            <OutlinedInput
              placeholder="Start a post"
              sx={{
                height: "60px",
                width: "100%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              readOnly
              onClick={() => setShowPostModal(true)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: "10px",
              columnGap: "10px",
            }}
          >
            {[
              { img: photo, label: "Photo" },
              { img: video, label: "Video" },
              { img: article, label: "Article" },
              { img: event, label: "Event" },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: "100%", md: "180px" },
                  height: "50px",
                  padding: "20px",
                  backgroundColor: "#F8FCFF",
                  borderRadius: "2px",
                  display: "flex",
                  columnGap: "15px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => HandlePostTypeClick(item.label)}
              >
                <img
                  style={{ width: "24px", height: "24px" }}
                  src={item.img}
                  alt={item.label}
                />
                <Typography
                  sx={{ fontSize: "14px", fontWeight: 500, color: "#505050" }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

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
        ref={videoInputRef}
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleVideoChange}
      />

      <DynamicModal
        isLoading={isLoading}
        onSuccess={handleImagePost}
        open={showModal}
        handleClose={HandleModalClose}
        title={"Hello"}
        buttonText={"Post"}
        postModal={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        handleScheduleClick={() => setShowScheduleModal(true)}
        dropdownHeader={true}
        footerDirection={"flex-end"}
        handleGroupClick={() => setGroupShareModal(true)}
        visibility={visibility}
        setVisibility={setVisibility}
        groupAdmin={groupAdmin}
        adminPage={adminPage}
        page={page}
        handleDropdown={handleDropDown}
        group={group}
      >
        <PhotoModal
          title={title}
          setTitle={setTitle}
          files={selectedFiles}
          setFiles={setSelectedFiles}
          placeholder={"Say something about this photo"}
          handleClose={HandleModalClose}
        />
      </DynamicModal>

      <DynamicModal
        isLoading={isLoading}
        onSuccess={handleVideoPost}
        open={videoModal}
        handleClose={() => setVideoModal(false)}
        title={"Hello"}
        buttonText={"Post"}
        postModal={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        handleScheduleClick={() => setShowScheduleModal(true)}
        dropdownHeader={true}
        handleGroupClick={() => setGroupShareModal(true)}
        footerDirection={"flex-end"}
        visibility={visibility}
        setVisibility={setVisibility}
        groupAdmin={groupAdmin}
        adminPage={adminPage}
        handleDropdown={handleDropDown}
        page={page}
        group={group}
      >
        <VideoModal
          videoData={videoData}
          setVideoData={setVideoData}
          title={title}
          setTitle={setTitle}
          file={videoData}
          placeholder={"Say something about this video"}
          handleClose={HandleVideoModalClose}
          handleThumbnailUpload={handleThumbnailUpload}
        />
      </DynamicModal>

      <DynamicModal
        isLoading={isLoading}
        onSuccess={handleTextPost}
        open={showPostModal}
        handleClose={() => setShowPostModal(false)}
        title={"Hello"}
        buttonText={"Post"}
        postModal={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        handleScheduleClick={() => setShowScheduleModal(true)}
        dropdownHeader={true}
        handleGroupClick={() => setGroupShareModal(true)}
        footerDirection={"flex-end"}
        visibility={visibility}
        setVisibility={setVisibility}
        groupAdmin={groupAdmin}
        adminPage={adminPage}
        handleDropdown={handleDropDown}
        page={page}
        group={group}
      >
        <PostModal
          title={title}
          setTitle={setTitle}
          fileChange={HandleSelectedFile}
          placeholder={"What do you want to talk about?"}
          videoChange={handleVideoChange}
          openModal={HandlePostTypeClick}
        />
      </DynamicModal>

      <DynamicModal
        open={eventModal}
        handleClose={() => setEventModal(false)}
        title={"Create an event"}
        buttonText={"Post"}
        postModal={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        handleScheduleClick={() => setShowScheduleModal(true)}
        footerDirection={"flex-end"}
        hideFooter={true}
        groupAdmin={groupAdmin}
        page={page}
        group={group}
      >
        <EventModal
          onFormSubmit={handleFormSubmit}
          receivedValues={eventFormValues}
          handleClose={() => setEventModal(false)}
        />
      </DynamicModal>

      <DynamicModal
        open={viewEventModal}
        handleClose={HandleViewEventClose}
        title={"Create an event"}
        buttonText={"Post"}
        postModal={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        dropdownHeader={true}
        footerDirection={"flex-end"}
        hideFooter={true}
        handleGroupClick={() => setGroupShareModal(true)}
        visibility={visibility}
        setVisibility={setVisibility}
        groupAdmin={groupAdmin}
        adminPage={adminPage}
        handleDropdown={handleDropDown}
        page={page}
        group={group}
      >
        <ViewEventModal
          isLoading={isLoading}
          onSuccess={handleEventPost}
          title={title}
          setTitle={setTitle}
          values={eventFormValues}
          handleScheduleClick={() => setShowScheduleModal(true)}
          handleEditClick={handleEditClick}
          handleDelete={HandleViewEventClose}
        />
      </DynamicModal>

      <DynamicModal
        open={showScheduleModal}
        onSuccess={() => {
          setSchedule({
            date: scheduleDate,
            time: scheduleTime,
          });
          setShowScheduleModal(false);
        }}
        handleClose={() => setShowScheduleModal(false)}
        title={"Schedule post"}
        buttonText={"Post"}
        postModal={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        handleScheduleClick={() => { }}
        smallModal={true}
        styledHeader={true}
        footerDirection={"space-between"}
        groupAdmin={groupAdmin}
        page={page}
        group={group}
      >
        <ScheduleModal
          scheduleDate={scheduleDate}
          setScheduleDate={setScheduleDate}
          scheduleTime={scheduleTime}
          setScheduleTime={setScheduleTime}
        />
      </DynamicModal>

      <DynamicModal
        open={groupShareModal}
        handleClose={() => setGroupShareModal(false)}
        title={"Repost to group"}
        buttonText={"Save"}
        postModal={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        footerDirection={"space-between"}
        hideFooter={true}
        groupAdmin={groupAdmin}
        page={page}
        group={group}
      >
        <GroupShareModal />
      </DynamicModal>

      <DynamicModal
        open={pollModal}
        handleClose={() => setPollModal(false)}
        title={"Create a poll"}
        buttonText={"Post"}
        postModal={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        handleScheduleClick={() => { }}
        styledHeader={true}
        hideFooter={true}
        groupAdmin={groupAdmin}
        adminPage={adminPage}
        handleDropdown={handleDropDown}
        page={page}
        group={group}
      >
        <PollModal isLoading={isLoading} handleSuccess={handlePollPost} handleBack={() => setPollModal(false)} />
      </DynamicModal>

      <DynamicModal
        open={viewPollModal}
        handleClose={HandleViewPollClose}
        postModal={true}
        userData={userData}
        userName={`${userData?.firstName} ${userData?.lastName}`}
        dropdownHeader={true}
        hideFooter={true}
        handleGroupClick={() => setGroupShareModal(true)}
        visibility={visibility}
        setVisibility={setVisibility}
        groupAdmin={groupAdmin}
        adminPage={adminPage}
        handleDropdown={handleDropDown}
        page={page}
        group={group}
      >
        <ViewPollPost
          values={pollValues}
          numberOfVotes={0}
          handleScheduleClick={() => setShowScheduleModal(true)}
          title={title}
          setTitle={setTitle}
          onSuccess={HandleFinalPollPost}
          isLoading={isLoading}
        />
      </DynamicModal>
    </Box>
  );
};

export default PostCard;
