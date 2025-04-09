import { Box, Button, CircularProgress, Divider, Grid2, LinearProgress, Menu, MenuItem, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { aboutEvent, calendar, camera, cancelIcon, comment, conversation, deleteIcon, downArrowFilled, dummyPhoto, earth, editBlue, emoji, eventSpeakers, facebook2, invite, like, link2, location, repost, send, send2, twitter, user, videoIcon } from '../assets'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DynamicModal from './dynamic-modal';
import PostChoiceModal from './PostChoiceModal';
import OutlinedInput from './outline-input';
import RepostWithThoughts from './RepostWithThoughts';
import GroupShareModal from './GroupShareModal';
import ConfirmationModal from './ConfirmationModal';
import ShareModal from './ShareModal';
import ScheduleModal from './ScheduleModal';
import EventsSidebar from './EventsSidebar';
import { useGetPostByIdQuery } from '../services/post';
import { useParams } from 'react-router-dom';
import { formatEventPostTime, formatEventTimeLocal } from '../utils';

const EventDetails = () => {
  const { id } = useParams();
  const [postChoiceModal, setPostChoiceModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open3 = Boolean(anchorEl3);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const open4 = Boolean(anchorEl4);
  const [thoughts, setThoughts] = useState("")
  const [showThoughtsModal, setShowThoughtsModal] = useState(false)
  const [groupShareModal, setGroupShareModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [postData, setPostData] = useState({
    eventImage: null,
    startTime: "",
    endTime: "",
    eventName: "",
    eventMaker: "",
    eventType: "",
    eventLink: "",
    attendees: [{ image: user }],
    eventPost: "bringback",
    venue: "",
    address: ""
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isSuccess, isLoading, isError, error } = useGetPostByIdQuery(id)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const CommentHandler = () => {
    setShowComments(!showComments)
  }

  const tabs = [
    {
      label: "Comments",
      component: (
        <></>
      ),
    },
    {
      label: "Networking",
      component: <></>
    },
    {
      label: "Analytics",
      component: <></>
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleClose2 = (event) => {
    event.stopPropagation();
    setAnchorEl2(null);
  };

  const handleClose3 = (event) => {
    event.stopPropagation();
    setAnchorEl3(null);
  };

  const handleClose4 = (event) => {
    event.stopPropagation();
    setAnchorEl4(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const HandleRepost = (event) => {
    if (event === "thoughts") {
      setShowThoughtsModal(true)
      handleCloseMenu()
    }
  }

  const HandleSuccess = () => {
    if (thoughts === "") {
      setShowConfirmModal(true)
    }
    else {
      setShowThoughtsModal(false)
    }
  }

  useEffect(() => {
    if (isSuccess && data?.data) {
      setPostData((prev) => ({
        ...prev,
        eventImage: data?.data?.media["EVENTS"][0]?.url,
        startTime: data?.data?.content?.startTime,
        endTime: data?.data?.content?.showEndTime && data?.data?.content?.endTime,
        eventName: data?.data?.content?.name,
        eventMaker: data?.data?.author?.firstName + " " + data?.data?.author?.lastName,
        eventType: data?.data?.content?.eventType,
        eventLink: data?.data?.content?.externalLink,
        venue: data?.data?.content?.eventType === "Inperson" ? data?.data?.content?.venue : "",
        address: data?.data?.content?.eventType === "Inperson" ? data?.data?.content?.address : "",
      }))
    }
  }, [data, isSuccess])

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", height: "calc(100vh - 150px)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress sx={{ color: "#1877F2" }} />
      </Box>
    )
  }

  if (!isLoading && isSuccess && !data?.data) {
    return (
      <Typography>No data Found</Typography>
    )
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid2 container spacing={3} sx={{ width: { xs: "98%", md: "85%", lg: "85%", xl: "75%" }, py: "25px" }}>
        <Grid2 size={{ xs: 12, lg: 8.3, xl: 9 }}>
          <Paper sx={{ p: "0px" }}>
            <Box sx={{ paddingTop: "56.25%", backgroundImage: `url("${postData?.eventImage ? postData?.eventImage : dummyPhoto}")`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "100.1%" }}>
            </Box>
            <Box sx={{ p: "40px 25px", display: "flex", flexDirection: "column", rowGap: "10px" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#ad4601" }}>{formatEventPostTime(postData?.startTime)}</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>{postData?.eventName}</Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050" }}>Event by {postData?.eventMaker}</Typography>
                <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center", flexWrap: "wrap", rowGap: "4px" }}>
                  <img src={calendar} alt="" />
                  <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050" }}>{formatEventTimeLocal(postData?.startTime, !postData?.endTime ? postData?.startTime : postData?.endTime)}</Typography>
                  <Box sx={{ display: "flex", columnGap: "4px", backgroundColor: "#E4E4E4", p: "4px", borderRadius: "4px", cursor: "pointer" }} onClick={handleClick2}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050" }}>Add to calendar</Typography>
                    <img src={downArrowFilled} alt="Icon" />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                  <img src={postData?.eventType === "online" ? videoIcon : location} alt="" />
                  {postData?.eventType === "online" && <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050", textTransform: "capitalize" }}>{postData?.eventType}</Typography>}
                  <Box sx={{ display: "flex", flexDirection: "column", rowGap: '3px' }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717", textTransform: "capitalize" }}>{postData?.address}</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050", textTransform: "capitalize" }}>{postData?.venue}</Typography>
                  </Box>
                </Box>
                {postData?.eventLink !== "" && <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050" }}>Event link • <span style={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>{postData?.eventLink}</span></Typography>}
                <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                  <img src={user} alt="Avatar" style={{ width: "24px", height: "24px" }} />
                  <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050" }}>1 attendee</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "10px" }}>
                  <Button sx={{ display: "flex", columnGap: "3px", width: '150px', height: "50px" }} onClick={handleClick3}>
                    <Typography sx={{ color: "white" }}>Share</Typography>
                    <KeyboardArrowDownIcon sx={{ color: "white" }} />
                  </Button>
                  <Button sx={{ display: "flex", columnGap: "3px", width: '150px', height: "50px", background: "white !important", border: "1px solid black" }} onClick={handleClick4}>
                    <Typography sx={{ color: "black" }}>Manage</Typography>
                    <KeyboardArrowDownIcon sx={{ color: "black" }} />
                  </Button>
                </Box>

              </Box>
            </Box>
            <Box sx={{ backgroundColor: "#F2F8FD", p: "20px", mt: "20px", display: "flex", flexDirection: "column", rowGap: "10px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: '20px', fontWeight: "400", color: "#171717" }}>Set up your event for success</Typography>
                <Box sx={{ border: "1px solid #E4E4E4", width: "35px", height: "35px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <KeyboardArrowUpIcon />
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, rowGap: "15px" }}>
                <Box sx={{ backgroundColor: "white", border: "1px solid #E4E4E4", p: "25px", width: { xs: "100%", md: "48%" }, borderRadius: "8px", display: "flex", flexDirection: "column", rowGap: '10px' }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: "400", color: "505050" }}>About</Typography>
                  <Box sx={{ display: "flex", gap: "10px", flexWrap: { xs: "wrap", lg: "nowrap" } }}>
                    <img src={aboutEvent} alt="Image" />
                    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                      <Typography>Add a description to attract the right audience.</Typography>
                      <Button sx={{ display: "flex", columnGap: "3px", width: { xs: "100%", md: '180px' }, height: "30px", background: "white !important", border: "1px solid black" }}>
                        <Typography sx={{ color: "black" }}>Add Description</Typography>
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ backgroundColor: "white", border: "1px solid #E4E4E4", p: "25px", width: { xs: "100%", md: "48%" }, borderRadius: "8px", display: "flex", flexDirection: "column", rowGap: '10px' }}>
                  <Typography sx={{ fontSize: "18px", fontWeight: "400", color: "505050" }}>Speakers</Typography>
                  <Box sx={{ display: "flex", gap: "10px", flexWrap: { xs: "wrap", lg: "nowrap" } }}>
                    <img src={eventSpeakers} alt="Image" />
                    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                      <Typography>Add speakers to generate more interest in your event.</Typography>
                      <Button sx={{ display: "flex", columnGap: "3px", width: { xs: "100%", md: '180px' }, height: "30px", background: "white !important", border: "1px solid black" }}>
                        <Typography sx={{ color: "black" }}>Add Speakers</Typography>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              gap={5}
              sx={{
                background: "#FFF",
                border: "1px solid #E4E4E4",
                borderRadius: "4px",
                padding: "18px 30px",
              }}
            >
              {tabs.map((tab) => (
                <Typography
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    background:
                      "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color":
                      tab?.label === activeTab?.label ? "transparent" : "#000",
                    textAlign: "center",
                    "&::after": {
                      content: '""',
                      display: tab?.label === activeTab?.label ? "block" : "none",
                      width: { xs: "45px", md: "90px" },
                      height: "4px",
                      background:
                        "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                      position: "absolute",
                      bottom: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderRadius: "2px",
                    },
                  }}
                  fontSize={{ xs: "12px", md: "14px" }}
                  fontWeight={500}
                  onClick={() => setActiveTab(tab)}
                  key={tab.label}
                >
                  {tab.label}
                </Typography>


              ))}
            </Stack>
          </Paper>
          <Box sx={{ marginTop: "10px" }}>
            {activeTab?.label === "Comments" && <Paper sx={{ borderTopRightRadius: "0px", borderTopLeftRadius: "0px", display: "flex", flexDirection: "column", rowGap: "15px" }}>
              <Box sx={{ display: "flex", columnGap: "20px" }}>
                <img src={user} alt="Image" style={{ width: "73px", height: "73px" }} />
                <Stack>
                  <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>RottenRia</Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#505050" }}>--</Typography>
                  <Box sx={{ display: "flex", columnGap: "4px" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#505050" }}>now . </Typography>
                    <img src={earth} alt="Icon" />
                  </Box>
                </Stack>
              </Box>
              <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>bringback</Typography>
              <Box sx={{ borderTop: "1px solid #E4E4E4", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F8FCFF", height: '50px', px: { xs: "10px", md: "0px" } }}>
                <Box sx={{ display: "flex", columnGap: "5px", cursor: "pointer", width: { md: "15%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => setPostChoiceModal(true)}>
                  <img src={user} alt="Image" style={{ width: "27px", height: "24px" }} />
                  <img src={downArrowFilled} alt="Image" style={{ width: "27px", height: "24px" }} />
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }}>
                  <img src={like} alt="Like" />
                  <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Like</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", backgroundColor: showComments ? "#FFFFFF" : "inherit", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={CommentHandler}>
                  <img src={comment} alt="Like" />
                  <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", lg: "block" }, color: "#505050" }}>Comment</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={handleClick}>
                  <img src={repost} alt="Repost" />
                  <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Repost</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => setShowShareModal(true)}>
                  <img src={send} alt="Repost" />
                  <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Send</Typography>
                </Box>
              </Box>
              {
                showComments && <Box sx={{ px: { xs: "0px", md: '10px' }, display: "flex", flexDirection: "column", rowGap: "10px" }}>
                  <Box sx={{ display: "flex", columnGap: "5px", flexDirection: { xs: "column", md: "row" } }}>
                    <Box sx={{ width: { xs: "35px", md: "70px" } }}>
                      <img src={user} alt="User" style={{ width: "100%" }} />
                    </Box>

                    <Box sx={{ border: "1px solid #DDE2E4", width: "100%", display: "flex", pr: "10px", height: '73px' }}>
                      <OutlinedInput sx={{
                        height: "100%",
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          border: "none !important",
                          height: "100%",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none !important",
                        },

                      }} placeholder={"Add a comment"} />
                      <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
                        <img src={emoji} alt="Emoji" style={{ width: "24px", height: "24px" }} />
                        <img src={camera} alt="Camera" style={{ width: "24px", height: "24px" }} />
                      </Box>
                    </Box>
                  </Box>
                  {/* {Array.isArray(commentsContent) && commentsContent?.length > 0 &&
                commentsContent?.map((item, index) => (
                  <Comment key={index} userImage={item?.userImage} userName={item?.userName} comment={item?.comment} time={item?.time} />
                ))
              } */}
                </Box>
              }
            </Paper>}
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 3.7, xl: 3 }}>
          <EventsSidebar />
        </Grid2>
      </Grid2>

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
        <MenuItem onClick={() => HandleRepost("thoughts")} sx={{ width: "245px" }}>Repost with your thoughts</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "245px" }}>Repost</MenuItem>
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
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose2} sx={{ width: "195px" }}>Google</MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "195px" }}>Outlook</MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "195px" }}>Yahoo</MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorEl3}
        open={open3}
        onClose={handleClose3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "bottom",
        }}
      >
        <MenuItem onClick={handleClose3} sx={{ width: "195px", fontSize: "16px", fontWeight: "500", color: "#171717" }}>
          Share on Fusion
        </MenuItem>
        <MenuItem onClick={handleClose3} sx={{ width: "195px", display: "flex", columnGap: "5px" }}>
          <img src={invite} alt="" />
          <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Invite</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose3} sx={{ width: "195px", display: "flex", columnGap: "5px" }}>
          <img src={editBlue} alt="" />
          <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Repost to Feed</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose3} sx={{ width: "195px", display: "flex", columnGap: "5px" }}>
          <img src={send2} alt="" />
          <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Send in a message</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose3} sx={{ width: "195px", fontSize: "16px", fontWeight: "500", color: "#171717" }}>
          Other options
        </MenuItem>
        <MenuItem onClick={handleClose3} sx={{ width: "195px", display: "flex", columnGap: "5px" }}>
          <img src={link2} alt="" />
          <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Copy link</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose3} sx={{ width: "195px", display: "flex", columnGap: "5px" }}>
          <img src={twitter} alt="" />
          <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Twitter</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose3} sx={{ width: "195px", display: "flex", columnGap: "5px" }}>
          <img src={facebook2} alt="" />
          <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Facebook</Typography>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorEl4}
        open={open4}
        onClose={handleClose4}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose4} sx={{ width: "195px", display: "flex", columnGap: "5px" }}>
          <Typography>Manage attendees</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose4} sx={{ width: "195px", display: "flex", columnGap: "5px" }}>
          <img src={editBlue} alt="Icon" />
          <Typography>Edit Event</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose4} sx={{ width: "195px", display: "flex", columnGap: "5px" }}>
          <img src={cancelIcon} alt="Icon" />
          <Typography>Cancel event</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose4} sx={{ width: "195px", display: "flex", columnGap: "5px" }}>
          <img src={deleteIcon} alt="Icon" />
          <Typography>Delete event</Typography>
        </MenuItem>
      </Menu>

      <DynamicModal open={postChoiceModal} handleClose={() => setPostChoiceModal(false)} title={"Comment, react, and repost as"} buttonText={"Save"} postModal={true} userName={"Areeba Shakeel"} hideFooter={true} smallModal={true} styledHeader={true} >
        <PostChoiceModal />
      </DynamicModal>

      <DynamicModal open={showThoughtsModal} handleClose={() => setShowThoughtsModal(false)} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} dropdownHeader={true} footerDirection={"flex-end"} onSuccess={HandleSuccess} handleGroupClick={() => setGroupShareModal(true)}>
        <RepostWithThoughts onChange={(e) => setThoughts(e.target.value)} />
      </DynamicModal>


      <DynamicModal open={groupShareModal} handleClose={() => setGroupShareModal(false)} title={"Repost to group"} buttonText={"Save"} postModal={true} userName={"Areeba Shakeel"} footerDirection={"space-between"} hideFooter={true}>
        <GroupShareModal />
      </DynamicModal>

      <ConfirmationModal open={showConfirmModal} handleClose={() => setShowConfirmModal(false)} title={"Repost without adding your thoughts?"}
        cancelButtonText={"Back"} acceptButtonText={"Yes, repost"}
        handleAccept={() => setShowConfirmModal(false)}
        handleCancel={() => setShowConfirmModal(false)}
      >
        <Typography sx={{ fontSize: "17px", fontWeight: "300", color: "#595959" }}>If you repost without adding your thoughts, all new comments & reactions will be added to XYZ’s post.</Typography>
      </ConfirmationModal>


      <DynamicModal open={showShareModal} handleClose={() => setShowShareModal(false)} title={"Share Areeba Shakeel’s Post"} postModal={true} dropdownHeader={false} hideFooter={true}>
        <ShareModal />
      </DynamicModal>

      <DynamicModal open={showScheduleModal} handleClose={() => setShowScheduleModal(false)} title={"Schedule post"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} smallModal={true} styledHeader={true} footerDirection={"space-between"}>
        <ScheduleModal />
      </DynamicModal>
    </Box >
  )
}

export default EventDetails
