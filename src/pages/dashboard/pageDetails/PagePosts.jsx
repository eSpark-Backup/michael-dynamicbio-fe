import {
  Box,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { copyLink, deleteIcon, editBlue, noPosts, pin } from "../../../assets";
import { generateThumbnail } from "../../../utils";
import {
  DynamicModal,
  EventModal,
  PhotoModal,
  PollModal,
  PostCard,
  PostChoiceModal,
  PostModal,
  ScheduleModal,
  SuggestionPost,
  VideoModal,
  ViewEventModal,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const PagePosts = ({
  handleDropdown,
  refetch,
  page,
  posts,
  fetchMoreData,
  hasMore,
  isLoading,
  isFetching,
}) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [videoData, setVideoData] = useState({ video: null, thumbnail: null });
  const [videoModal, setVideoModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [pollModal, setPollModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [eventFormValues, setEventFormValues] = useState({});
  const [viewEventModal, setViewEventModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [postChoiceModal, setPostChoiceModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
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
        const thumbnail = await generateThumbnail(file);
        setVideoData({ video: file, thumbnail });
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
    fileInputRef.current.value = null;
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

  const handleViewEventClose = () => {
    setViewEventModal(false);
    setEventFormValues({});
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <Paper>
        <PostCard
          handleDropDown={handleDropdown}
          refetch={refetch}
          page={page}
          adminPage={true}
        />
      </Paper>

      <Box>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderTopRightRadius: "4px",
            borderTopLeftRadius: "4px",
            p: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #E4E4E4",
          }}
        >
          <Typography>
            Get up to 27,000 more video views by boosting this post.
          </Typography>
          <Box
            sx={{
              width: "90px",
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
          >
            <Typography variant="gradientText">Boost</Typography>
          </Box>
        </Box>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={(isLoading || isFetching) && <LinearProgress />}
          endMessage={
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                rowGap: "20px",
              }}
            >
              {posts.length === 0 && <img src={noPosts} alt="Image" />}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "2px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "500",
                    color: "#171717",
                    textAlign: "center",
                  }}
                >
                  {posts.length === 0 ? "No posts available" : "No more posts"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontWeight: "400",
                    color: "#505050",
                    textAlign: "center",
                  }}
                >
                  Check back later for posts!
                </Typography>
              </Box>
            </Paper>
          }
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            {posts.map((item) => (
              <SuggestionPost key={item.id} {...item} />
            ))}
          </Box>
        </InfiniteScroll>
      </Box>

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
        open={showModal}
        handleClose={HandleModalClose}
        title={"Hello"}
        buttonText={"Post"}
        postModal={true}
        userName={"Areeba Shakeel"}
        handleScheduleClick={() => setShowScheduleModal(true)}
        dropdownHeader={true}
        footerDirection={"flex-end"}
        handleGroupClick={() => {}}
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
        handleGroupClick={() => {}}
        footerDirection={"flex-end"}
      >
        <VideoModal
          file={videoData}
          placeholder={"Say something about this video"}
          handleClose={HandleVideoModalClose}
        />
      </DynamicModal>

      <DynamicModal
        open={showPostModal}
        handleClose={() => setShowPostModal(false)}
        title={"Hello"}
        buttonText={"Post"}
        postModal={true}
        userName={"Areeba Shakeel"}
        handleScheduleClick={() => setShowScheduleModal(true)}
        dropdownHeader={true}
        handleGroupClick={() => {}}
        footerDirection={"flex-end"}
      >
        <PostModal
          fileChange={HandleSelectedFile}
          placeholder={"What do you want to talk about?"}
          videoChange={handleVideoChange}
          openModal={HandlePostTypeClick}
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
        handleClose={() => setViewEventModal(false)}
        title={"Create an event"}
        buttonText={"Post"}
        postModal={true}
        userName={"Areeba Shakeel"}
        dropdownHeader={true}
        footerDirection={"flex-end"}
        hideFooter={true}
        handleGroupClick={() => {}}
      >
        <ViewEventModal
          values={eventFormValues}
          handleScheduleClick={() => setShowScheduleModal(true)}
          handleEditClick={handleEditClick}
          handleDelete={handleViewEventClose}
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

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ width: "245px", display: "flex", columnGap: "10px" }}
        >
          <img
            src={editBlue}
            alt="Icon"
            style={{ width: "24px", height: "24px" }}
          />
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Edit post
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ width: "245px", display: "flex", columnGap: "10px" }}
        >
          <img
            src={deleteIcon}
            alt="Icon"
            style={{ width: "24px", height: "24px" }}
          />
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Delete post
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ width: "245px", display: "flex", columnGap: "10px" }}
        >
          <img src={pin} alt="Icon" style={{ width: "24px", height: "24px" }} />
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Pin to top
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ width: "245px", display: "flex", columnGap: "10px" }}
        >
          <img
            src={copyLink}
            alt="Icon"
            style={{ width: "24px", height: "24px" }}
          />
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Copy link to post
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PagePosts;
