import { Box, Menu, MenuItem, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import BondCard2 from './BondCard'
import { formatEventPostTime } from '../utils'
import { useNavigate } from 'react-router-dom'
import { camera, comment, dummyPhoto, emoji, like, repost, send, user } from '../assets'
import OutlinedInput from './outline-input'
import DynamicModal from './dynamic-modal'
import ScheduleModal from './ScheduleModal'
import ShareModal from './ShareModal'
import ConfirmationModal from './ConfirmationModal'
import GroupShareModal from './GroupShareModal'
import RepostWithThoughts from './RepostWithThoughts'
import Comment from './Comment'

const EventPost = ({ userName, userRole, postTime, userImage, numberofLikes, isLiked, comments, commentsContent, friend, friendLiked, eventName, eventImage, startTime, endTime, eventType, eventLink, attendees, eventPosts, postContent, id }) => {
    const navigate = useNavigate()

    const [showComments, setShowComments] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [thoughts, setThoughts] = useState("")
    const [showThoughtsModal, setShowThoughtsModal] = useState(false)
    const [groupShareModal, setGroupShareModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [showScheduleModal, setShowScheduleModal] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
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

    const CommentHandler = () => {
        setShowComments(!showComments)
    }

    return (
        <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <BondCard2 userImage={userImage} userName={userName} userRole={userRole} time={postTime} showWorldIcon showActionIcon />
            {postContent &&
                <Typography sx={{ fontSize: '20px', fontWeight: 400, color: "#171717" }} dangerouslySetInnerHTML={{ __html: postContent }}>
                </Typography>
            }
            <Box sx={{ border: "1px solid #E4E4E4", borderRadius: "8px", display: "flex", flexDirection: 'column', rowGap: "20px", height: "375px" }}>
                <Box sx={{ height: "65%", backgroundImage: `url("${eventImage ? eventImage : dummyPhoto}")`, borderTopRightRadius: "8px", borderTopLeftRadius: "8px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100.1%" }}>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px", px: "15px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#ad4601" }}>{formatEventPostTime(startTime, endTime)}</Typography>
                        <Box
                            sx={{
                                width: "150px",
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
                            onClick={() => navigate(`/event/${id}`)}
                        >
                            <Typography variant="gradientText">View event</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>{eventName}</Typography>
                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>{eventType}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ borderTop: "1px solid #E4E4E4", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F8FCFF", height: '50px', px: { xs: "10px", md: "0px" } }}>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <img src={like} alt="Like" />
                    <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", lg: "block" }, color: "#505050" }}>Like</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", backgroundColor: showComments ? "#FFFFFF" : "inherit", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={CommentHandler}>
                    <img src={comment} alt="Like" />
                    <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", lg: "block" }, color: "#505050" }}>Comment</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={handleClick}>
                    <img src={repost} alt="Like" />
                    <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", lg: "block" }, color: "#505050" }}>Repost</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => setShowShareModal(true)}>
                    <img src={send} alt="Like" />
                    <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", lg: "block" }, color: "#505050" }}>Share</Typography>
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
                    {Array.isArray(commentsContent) && commentsContent?.length > 0 &&
                        commentsContent?.map((item, index) => (
                            <Comment key={index} userImage={item?.userImage} userName={item?.userName} comment={item?.comment} time={item?.time} />
                        ))
                    }
                </Box>
            }
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
        </Paper>
    )
}

export default EventPost
