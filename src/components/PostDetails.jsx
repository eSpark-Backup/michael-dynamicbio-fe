import { Box, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { nextArrow, prevArrow, profile2, three_vertical_dots, close, like, comment, repost, send, user, emoji, camera } from '../assets'
import BondCard2 from './BondCard'
import DynamicModal from './dynamic-modal'
import RepostWithThoughts from './RepostWithThoughts'
import GroupShareModal from './GroupShareModal'
import ConfirmationModal from './ConfirmationModal'
import ShareModal from './ShareModal'
import ScheduleModal from './ScheduleModal'
import OutlinedInput from './outline-input'
import Comment from './Comment'

const PostDetails = ({ images, activity, userName, userRole, postTime, userImage, postContent, numberofLikes, isLiked, comments, commentsContent, friendLiked, friend, handleModalClose }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [showComments, setShowComments] = useState(false)
    const [showThoughtsModal, setShowThoughtsModal] = useState(false)
    const [groupShareModal, setGroupShareModal] = useState(false)
    const [thoughts, setThoughts] = useState("")
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [showScheduleModal, setShowScheduleModal] = useState(false)

    const HandlePrevClick = () => {
        if (activeIndex === 0) {
            setActiveIndex(images?.length - 1)
        }
        else {
            setActiveIndex(activeIndex - 1)
        }
    }

    const HandleNextClick = () => {
        if (activeIndex === images?.length - 1) {
            setActiveIndex(0)
        }
        else {
            setActiveIndex(activeIndex + 1)
        }
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const CommentHandler = () => {
        setShowComments(!showComments)
    }


    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };


    const HandleRepost = (event) => {
        if (event === "thoughts") {
            setShowThoughtsModal(true)
            handleCloseMenu()
        }
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const HandleSuccess = () => {
        if (thoughts === "") {
            setShowConfirmModal(true)
        }
        else {
            setShowThoughtsModal(false)
        }
    }

    return (
        <>
            <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <img src={profile2} alt="Avatar" style={{ width: "44px", height: "44px" }} />
                    <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>Albert Einstein <span style={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}> reposted this</span></Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "4px", alignItems: "center" }}>
                    <img src={three_vertical_dots} alt="Icon" style={{ width: "20px", height: "20px" }} />
                    <img src={close} alt="Icon" style={{ width: "24px", height: "44px", cursor: "pointer" }} onClick={handleModalClose} />
                </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "15px", flexDirection: { xs: "column", md: "row" }, mt: { xs: "15px", md: "0px" } }}>
                <Box sx={{ width: { xs: "100%", md: "45%" }, height: "70vh", position: "relative", backgroundImage: `url("${images[activeIndex]}")`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                    <Box sx={{
                        position: "absolute", width: "100%", top: "50%", transform: "translateY(-50%)", px: "10px",
                        display: "flex", justifyContent: "space-between"
                    }}>
                        <img src={prevArrow} alt="Icon" style={{ width: "24px", height: "24px", cursor: "pointer" }} onClick={HandlePrevClick} />
                        <img src={nextArrow} alt="Icon" style={{ width: "24px", height: "24px", cursor: "pointer" }} onClick={HandleNextClick} />
                    </Box>
                </Box>
                <Box sx={{ width: { xs: "100%", md: "52%" }, display: "flex", flexDirection: "column", rowGap: "15px" }}>
                    <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                            <img src={profile2} alt="Avatar" style={{ width: "44px", height: "44px" }} />
                            <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>Albert Einstein <span style={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}> reposted this</span></Typography>
                        </Box>
                        <Box sx={{ display: "flex", columnGap: "4px", alignItems: "center" }}>
                            <img src={three_vertical_dots} alt="Icon" style={{ width: "20px", height: "20px" }} />
                            <img src={close} alt="Icon" style={{ width: "24px", height: "44px", cursor: "pointer" }} onClick={handleModalClose} />
                        </Box>
                    </Box>
                    <BondCard2 userImage={userImage} userName={userName} userRole={userRole} time={postTime} showWorldIcon />
                    {postContent &&
                        <Typography sx={{ fontSize: '20px', fontWeight: 400, color: "#171717" }} dangerouslySetInnerHTML={{ __html: postContent }}>
                        </Typography>
                    }
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center", columnGap: "6px", cursor: "pointer" }}>
                            {numberofLikes > 1 && <img src={like} alt="Like" style={{ width: "13.43px", height: "12px" }} />}
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
                                {numberofLikes === 0 ? "Be first to like this" : isLiked && numberofLikes === 1 ? "You Liked This Post" : isLiked && numberofLikes > 1 ? `You and ${numberofLikes - 1} more like` : friendLiked ? `${friend} and ${numberofLikes - 1} more like` : `${numberofLikes} likes`}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", columnGap: "10px" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>{comments} comments</Typography>
                            <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>•</Typography>
                            <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>18 reposts</Typography>
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
            </Box>
        </>
    )
}

export default PostDetails
