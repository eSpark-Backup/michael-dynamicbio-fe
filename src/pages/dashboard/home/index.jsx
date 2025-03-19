import { Box, OutlinedInput, Paper, Typography, useTheme, Button, useMediaQuery, Grid2 } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { article, bondMain, event, photo, profilePicture, research, user, video, userWithCamera } from '../../../assets';
import { bondSuggestions, suggestionPostContent } from '../../../constant';
import { BondCard2, DynamicModal, EventModal, GroupShareModal, PhotoModal, PollModal, PostModal, RightSideBar, ScheduleModal, SuggestionPost, VideoModal, ViewEventModal } from '../../../components';
import { generateThumbnail } from '../../../utils';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [videoData, setVideoData] = useState({ video: null, thumbnail: null });
  const [videoModal, setVideoModal] = useState(false)
  const [eventModal, setEventModal] = useState(false)
  const [eventFormValues, setEventFormValues] = useState({});
  const [viewEventModal, setViewEventModal] = useState(false)
  const [groupShareModal, setGroupShareModal] = useState(false)
  const [pollModal, setPollModal] = useState(false)

  const HandlePostTypeClick = (item) => {
    if (item === "Photo") {
      fileInputRef.current.click();
    }
    else if (item === "Video") {
      videoInputRef.current.click();
    }
    else if (item === "Event") {
      setEventModal(true)
      setShowPostModal(false)
    }
    else if (item === "Poll") {
      setPollModal(true)
      setShowPostModal(false)
    }
    else if (item === "Article") {
      navigate("/article")
    }
  }

  useEffect(() => {
    if (selectedFiles?.length > 0) {
      setShowPostModal(false)
      setShowModal(true)
    }
  }, [selectedFiles])

  useEffect(() => {
    if (videoData?.video) {
      setVideoModal(true)
      setShowPostModal(false)
    }
  }, [videoData])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
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

  const HandleSelectedFile = (files) => {
    setSelectedFiles(files)
  }

  const HandleModalClose = () => {
    setShowModal(false)
    setShowPostModal(false)
    setSelectedFiles([]);
  }

  const HandleVideoModalClose = () => {
    setVideoModal(false)
    setVideoData({ video: null, thumbnail: null })
    if (videoInputRef.current) {
      videoInputRef.current.value = null;
    }
  }

  const handleFormSubmit = (formData) => {
    setEventFormValues(formData)
    setEventModal(false)
    setViewEventModal(true)
  };

  const handleEditClick = () => {
    setEventModal(true)
    setViewEventModal(false)
  }
  const userData = JSON.parse(localStorage.getItem("user"));

  return (
    <Box sx={{ p: "20px" }}>
      <Grid2 container spacing={5}>
        <Grid2 size={{ xs: 12, lg: 2.5 }} sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
          <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "10px" }}>
            <Box
              sx={{
                backgroundColor: "#D9D9D9",
                height: "71px",
                position: "relative",
                width: "100%",
              }}
            >
              <img
                src={userData?.profileImage || profilePicture}
                alt="Profile"
                style={{
                  position: "absolute",
                  top: "75%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%"
                }}
              />
            </Box>
            <Box sx={{ pt: "25px" }}>
              <Typography onClick={() => navigate(`/profile/${userData?.id}`)} sx={{ fontSize: "20px", fontWeight: 500, color: theme.palette.primary.dark, textAlign: "center" }}>
                {userData?.firstName} {userData?.lastName}
              </Typography>
              <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#505050", textAlign: "center" }}>
                {userData?.designation} at {userData?.company}
              </Typography>
              <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#505050", textAlign: "center" }}>
                {userData?.country}
              </Typography>
            </Box>
          </Paper>


          {(showMore || !isSmallScreen) && (
            <>
              <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: 400, color: theme.palette.primary.dark }}>
                  Make more bonds
                </Typography>
                <img src={bondMain} alt="Bond" />
              </Paper>

              <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}>
                  Groups
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}>
                  Events
                </Typography>
                <Box sx={{ borderTop: "1px solid #E4E4E4", display: "flex", justifyContent: "center", alignItems: "center", height: "50px", cursor: "pointer", color: theme.palette.primary.dark }}>
                  <Typography variant="gradientText" sx={{ fontSize: "14px", fontWeight: 400 }}>
                    Discover more
                  </Typography>
                </Box>
              </Paper>
            </>
          )}


          {isSmallScreen && (
            <Button onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          )}
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6.5 }} sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", columnGap: "30px", flexDirection: { xs: "column", md: "row" }, rowGap: "5px" }}>
              <img style={{ width: "73px", height: "73px", borderRadius: "50%" }} src={userData?.profileImage || user} alt="User" />
              <OutlinedInput placeholder='Start a post' sx={{ height: "73px", width: "100%", cursor: "pointer" }} readOnly onClick={() => setShowPostModal(true)} />
            </Box >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", rowGap: "10px" }}>
              {[{ img: photo, label: "Photo" }, { img: video, label: "Video" }, { img: article, label: "Article" }, { img: event, label: "Event" }, { img: research, label: "Research" }]
                .map((item, index) => (
                  <Box key={index} sx={{ width: { xs: "100%", md: "180px" }, height: "50px", padding: "20px", backgroundColor: "#F8FCFF", borderRadius: "2px", display: "flex", columnGap: "15px", alignItems: "center", cursor: "pointer" }} onClick={() => HandlePostTypeClick(item.label)}>
                    <img style={{ width: "24px", height: "24px" }} src={item.img} alt={item.label} />
                    <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#505050" }}>{item.label}</Typography>
                  </Box>
                ))}
            </Box>
          </Paper >

          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}>
                Suggestion for you to create bonds
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 400, cursor: "pointer" }} variant="gradientText">
                View all
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
              {bondSuggestions?.map((item, index) => (
                <BondCard2 key={index} userImage={item?.img} userName={item?.name} userAddress={item?.address} userRole={item?.role} />
              ))}
            </Box>
          </Paper>
          {
            suggestionPostContent?.map((item, index) => (
              <SuggestionPost
                userName={item?.userName}
                userImage={item?.userImage}
                userRole={item?.userRole}
                postTime={item?.postTime}
                numberofLikes={item?.numberofLikes}
                isLiked={item?.isLiked}
                comments={item?.comments}
                activity={item?.activity}
                postPic={item?.postPic}
                postContent={item?.postContent}
                commentsContent={item?.commentsContent}
                key={index}
                index={index}
                length={suggestionPostContent?.length}
              />
            ))
          }
        </Grid2 >


        <Grid2 size={{ xs: 12, lg: 3 }}>
          <RightSideBar />
        </Grid2>
      </Grid2 >

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
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

      <DynamicModal open={showModal} handleClose={HandleModalClose} title={"Hello"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} dropdownHeader={true} footerDirection={"flex-end"} handleGroupClick={() => setGroupShareModal(true)}>
        <PhotoModal files={selectedFiles} placeholder={"Say something about this photo"} handleClose={HandleModalClose} />
      </DynamicModal>

      <DynamicModal open={videoModal} handleClose={() => setVideoModal(false)} title={"Hello"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} dropdownHeader={true} handleGroupClick={() => setGroupShareModal(true)} footerDirection={"flex-end"}>
        <VideoModal file={videoData} placeholder={"Say something about this video"} handleClose={HandleVideoModalClose} />
      </DynamicModal>

      <DynamicModal open={showPostModal} handleClose={() => setShowPostModal(false)} title={"Hello"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} dropdownHeader={true} handleGroupClick={() => setGroupShareModal(true)} footerDirection={"flex-end"}>
        <PostModal fileChange={HandleSelectedFile} placeholder={"What do you want to talk about?"} videoChange={handleVideoChange} openModal={HandlePostTypeClick} />
      </DynamicModal>

      <DynamicModal open={eventModal} handleClose={() => setEventModal(false)} title={"Create an event"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} footerDirection={"flex-end"} hideFooter={true}>
        <EventModal onFormSubmit={handleFormSubmit} receivedValues={eventFormValues} />
      </DynamicModal>

      <DynamicModal open={viewEventModal} handleClose={() => setViewEventModal(false)} title={"Create an event"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} dropdownHeader={true} footerDirection={"flex-end"} hideFooter={true} handleGroupClick={() => setGroupShareModal(true)}>
        <ViewEventModal values={eventFormValues} handleScheduleClick={() => setShowScheduleModal(true)} handleEditClick={handleEditClick} />
      </DynamicModal>

      <DynamicModal open={showScheduleModal} handleClose={() => setShowScheduleModal(false)} title={"Schedule post"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} smallModal={true} styledHeader={true} footerDirection={"space-between"}>
        <ScheduleModal />
      </DynamicModal>

      <DynamicModal open={groupShareModal} handleClose={() => setGroupShareModal(false)} title={"Repost to group"} buttonText={"Save"} postModal={true} userName={"Areeba Shakeel"} footerDirection={"space-between"} hideFooter={true}>
        <GroupShareModal />
      </DynamicModal>


      <DynamicModal open={pollModal} handleClose={() => setPollModal(false)} title={"Create a poll"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} styledHeader={true} hideFooter={true}>
        <PollModal handleSuccess={() => setPollModal(false)} />
      </DynamicModal>
    </Box >
  );
};

export default Home;
