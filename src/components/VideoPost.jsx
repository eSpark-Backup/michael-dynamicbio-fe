import { Box, CircularProgress, Menu, MenuItem, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { camera, close, comment, emoji, like, profile2, repost, send, three_vertical_dots, unlike, user } from '../assets'
import BondCard2 from './BondCard'
import { Player, ControlBar, PlayToggle, VolumeMenuButton, PlaybackRateMenuButton, CurrentTimeDisplay, TimeDivider, ProgressControl, FullscreenToggle } from "video-react";
import "video-react/dist/video-react.css";
import OutlinedInput from './outline-input';
import DynamicModal from './dynamic-modal';
import RepostWithThoughts from './RepostWithThoughts';
import GroupShareModal from './GroupShareModal';
import ConfirmationModal from './ConfirmationModal';
import ShareModal from './ShareModal';
import ScheduleModal from './ScheduleModal';
import { useSelector } from 'react-redux';
import { useCommentMutation, useGetPostCommentsQuery } from '../services/interaction';
import Button from './button';
import { toast } from 'react-toastify';
import Comment from './Comment';

const VideoPost = ({ userImage, userName, userRole, postTime, postContent, numberofLikes, isLiked, friendLiked, friend, comments, commentsContent, videoUrl, thumbnail, isFriendPost, ownPost, id, handleLike, lastUserLiked }) => {
    const [showComments, setShowComments] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [thoughts, setThoughts] = useState("")
    const [showThoughtsModal, setShowThoughtsModal] = useState(false)
    const [groupShareModal, setGroupShareModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [showScheduleModal, setShowScheduleModal] = useState(false)
    const { user: userData } = useSelector((state) => state.auth);
    const [postId, setPostId] = useState("")
    const [commentContent, setCommentContent] = useState("")
    const [postComments, setPostComments] = useState([])

    const [commentData, { data: postCommentData, isSuccess: postCommentSucces, isError: isPostCommentError, error: postCommentError, isLoading: postCommentLoading }] = useCommentMutation()

    const { data: getCommentsData, isSuccess: getCommentsSuccess, isError: isGetCommentsError, error: getCommentsError, isLoading: isGetCommentsLoading, refetch } = useGetPostCommentsQuery(postId, { skip: !postId })

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

    const CommentHandler = (id) => {
        setPostId(id)
        setShowComments(true)
    }

    const HandleComment = (id) => {
        const data = {
            content: commentContent,
            postId: id
        }
        commentData(data).then((res) => {
            if (res?.error) {
                toast.error(res?.error?.data?.message)
                return;
            }
            if (res?.data) {
                toast.success("Comment added successfully");
                setCommentContent("")
                refetch()
            }
        })
    }


    useEffect(() => {
        if (getCommentsSuccess && getCommentsData?.data) {
            const comments = getCommentsData?.data?.map((item) => ({
                userImage: item?.user?.profileImage,
                userName: `${item?.user?.firstName} ${item?.user?.lastName}`,
                comment: item?.content,
                time: "14m ago"
            }))
            setPostComments(comments)

        }
    }, [getCommentsSuccess, getCommentsData])

    return (
        <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            {
                (!isFriendPost && !ownPost) && <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                        <img src={profile2} alt="Avatar" style={{ width: "44px", height: "44px" }} />
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>Albert Einstein <span style={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}> reposted this</span></Typography>
                    </Box>
                    <Box sx={{ display: "flex", columnGap: "4px", alignItems: "center" }}>
                        <img src={three_vertical_dots} alt="Icon" style={{ width: "20px", height: "20px" }} />
                        <img src={close} alt="Icon" style={{ width: "24px", height: "44px", cursor: "pointer" }} />
                    </Box>
                </Box>
            }
            <BondCard2 userImage={userImage} userName={userName} userRole={userRole} time={postTime} showWorldIcon isFriendPost={isFriendPost} ownPost={ownPost} />
            {postContent &&
                <Typography sx={{ fontSize: '20px', fontWeight: 400, color: "#171717" }} dangerouslySetInnerHTML={{ __html: postContent }}>
                </Typography>
            }
            <div className="video-container" style={{ width: '100%', aspectRatio: '16/9' }}>
                <Player
                    playsInline
                    poster={thumbnail}
                    src={videoUrl}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Forces video to stretch and fill the container
                    }}
                >
                    <ControlBar autoHide={false}>
                        <PlayToggle order={1} />
                        <ProgressControl order={2} />
                        <CurrentTimeDisplay order={3} />
                        <PlaybackRateMenuButton rates={[0.5, 1, 1.5, 2]} order={4} />
                        <VolumeMenuButton order={5} />
                        <FullscreenToggle order={6} />
                    </ControlBar>
                </Player>
            </div>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", columnGap: "6px", cursor: "pointer" }}>
                    {numberofLikes >= 1 && <img src={like} alt="Like" style={{ width: "13.43px", height: "12px" }} />}
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
                        {numberofLikes === 0 ? (
                            "Be first to like this"
                        ) : isLiked && numberofLikes === 1 ? (
                            "You liked this post"
                        ) : isLiked && numberofLikes > 1 ? (
                            `You and ${numberofLikes - 1} more like this`
                        ) : numberofLikes === 1 ? (
                            `${lastUserLiked} likes this`
                        ) : (
                            `${lastUserLiked} and ${numberofLikes - 1} like this`
                        )}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "10px" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>{comments} comments</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>•</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>0 reposts</Typography>
                </Box>
            </Box>
            <Box sx={{ borderTop: "1px solid #E4E4E4", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F8FCFF", height: '50px', px: { xs: "10px", md: "0px" } }}>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => handleLike(id)}>
                    <img src={isLiked ? like : unlike} alt="Like" style={{ width: "24px", height: '24px' }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", lg: "block" }, color: "#505050" }}>{isLiked ? "Liked" : "Like"}</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", backgroundColor: showComments ? "#FFFFFF" : "inherit", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => CommentHandler(id)}>
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
                        {isGetCommentsLoading ?
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                <CircularProgress sx={{ color: "black" }} />
                            </Box>
                            :
                            <>
                                <Box
                                    sx={{
                                        width: { xs: "35px", md: "70px" },
                                        height: { xs: "35px", md: "70px" },
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                    }}
                                >
                                    <img
                                        src={userData?.profileImage ? userData.profileImage : user}
                                        alt="User"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </Box>

                                <Box sx={{ border: "1px solid #DDE2E4", width: "100%", display: "flex", pr: "10px", minHeight: '73px', flexDirection: commentContent ? "column" : "row", pb: commentContent ? '10px' : "0px", rowGap: "13px" }}>
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
                                        p: "10px"

                                    }} placeholder={"Add a comment"} onInputChange={(e) => setCommentContent(e.target.value)} value={commentContent} multiline={true} />
                                    <Box sx={{ display: "flex", alignItems: "center", pl: "10px", justifyContent: "space-between" }}>
                                        <Box sx={{ display: "flex", columnGap: "10px" }}>
                                            <img src={emoji} alt="Emoji" style={{ width: "24px", height: "24px" }} />
                                            <img src={camera} alt="Camera" style={{ width: "24px", height: "24px" }} />
                                        </Box>
                                        {commentContent && <Button loading={postCommentLoading} onClick={() => HandleComment(id)} sx={{ width: "150px", height: "36px", color: "white" }}>Comment</Button>}
                                    </Box>
                                </Box>
                            </>
                        }
                    </Box>
                    {Array.isArray(postComments) && postComments?.length > 0 &&
                        postComments?.map((item, index) => (
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

export default VideoPost
