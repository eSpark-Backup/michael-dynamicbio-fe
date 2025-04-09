import { Box, Menu, MenuItem, Paper, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { camera, comment, emoji, like, plus, postPicture, refresh, repost, send, three_vertical_dots, user } from "../assets/index.js"
import OutlinedInput from './outline-input.jsx';
import Comment from './Comment.jsx';
import BondCard2 from './BondCard.jsx';
import DynamicModal from './dynamic-modal.jsx';
import ShareModal from './ShareModal.jsx';
import ScheduleModal from './ScheduleModal.jsx';
import RepostWithThoughts from './RepostWithThoughts.jsx';
import ConfirmationModal from './ConfirmationModal.jsx';
import GroupShareModal from './GroupShareModal.jsx';
import PhotoDetailsModal from './PhotoDetailsModal.jsx';
import PostDetails from './PostDetails.jsx';
import VideoPost from './VideoPost.jsx';
import PollPost from './PollPost.jsx';
import EventPost from './EventPost.jsx';
import ArticlePost from './ArticlePost.jsx';

const SuggestionPost = ({ userName, userRole, postTime, userImage, numberofLikes, isLiked, comments, activity, postPic, postContent, commentsContent, length, index, type, videoUrl, thumbnail, question, options, isVoted, eventName, eventImage, startTime, endTime, eventType, eventLink, attendees, eventPosts, id, articleImage, articleTitle, articleDescription }) => {
    const theme = useTheme();
    const [showComments, setShowComments] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [showThoughtsModal, setShowThoughtsModal] = useState(false)
    const [showScheduleModal, setShowScheduleModal] = useState(false)
    const [thoughts, setThoughts] = useState("")
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [groupShareModal, setGroupShareModal] = useState(false)
    const [showPostDetails, setShowPostDetails] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const CommentHandler = () => {
        setShowComments(!showComments)
    }


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

    const handleLastImageClick = () => {
        setShowPostDetails(true)
    }
    return (
        <>
            {
                type === "video"
                    ?
                    <VideoPost userImage={userImage} userName={userName} userRole={userRole} postTime={postTime} postContent={postContent} numberofLikes={4} isLiked={false} comments={125} friendLiked={true} friend={"Albert"} videoUrl={videoUrl} thumbnail={thumbnail} />
                    :
                    type === "poll"
                        ?
                        <PollPost userImage={userImage} userName={userName} userRole={userRole} time={postTime} postContent={postContent} question={question} options={options} isVoted={isVoted} numberofLikes={4} isLiked={false} comments={125} friendLiked={true} friend={"Albert"} />
                        :
                        type === "event"
                            ?
                            <EventPost userName={userName} userRole={userRole} postTime={postTime} userImage={userImage} numberofLikes={4} isLiked={false} comments={125} friendLiked={true} friend={"Albert"} eventName={eventName} eventImage={eventImage} startTime={startTime} endTime={endTime} eventType={eventType} eventLink={eventLink} attendees={attendees} eventPosts={eventPosts} postContent={postContent} id={id} />
                            :
                            type === "article"
                                ?
                                <ArticlePost userName={userName} userRole={userRole} postTime={postTime} userImage={userImage} numberofLikes={4} isLiked={false} comments={125} friendLiked={true} friend={"Albert"} id={id} postContent={postContent} articleImage={articleImage} articleTitle={articleTitle} articleDescription={articleDescription} />
                                :
                                <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography sx={{ color: "#171717", fontSize: "14px", fontWeight: "400" }}>
                                            {activity}
                                        </Typography>
                                        <img src={three_vertical_dots} alt="Info" style={{ cursor: "pointer" }} />
                                    </Box>
                                    <BondCard2 userImage={userImage} userName={userName} userRole={userRole} time={postTime} />
                                    {postContent &&
                                        <Typography sx={{ fontSize: '20px', fontWeight: 400, color: "#171717" }} dangerouslySetInnerHTML={{ __html: postContent }}>
                                        </Typography>
                                    }
                                    {(postPic && Array.isArray(postPic) && postPic?.length === 1) && <img src={postPic[0]} alt="Post" style={{ height: "375px" }} />}
                                    {
                                        (postPic && Array.isArray(postPic) && postPic?.length > 1) &&
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <img src={postPic[0]} alt="Post" style={{ width: "77%", objectFit: "cover", minHeight: "375px", maxHeight: "375px" }} />
                                            <Box sx={{ width: "20%", display: "flex", flexDirection: "column", height: "375px", justifyContent: "space-between" }}>
                                                {postPic?.slice(1, 4)?.map((item, index) => {
                                                    return (
                                                        <Box sx={{ width: "100%", height: postPic.length === 2 ? "100%" : postPic.length === 3 ? "48%" : "30%", objectFit: "cover", backgroundImage: `url("${item}")`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: "relative", cursor: (postPic?.length > 4 && index === 2) ? "pointer" : "auto" }} key={index} onClick={(postPic?.length > 4 && index === 2) ? handleLastImageClick : undefined}
                                                        >
                                                            {
                                                                (postPic?.length > 4 && index === 2) &&
                                                                <Box
                                                                    sx={{
                                                                        position: "absolute",
                                                                        top: 0,
                                                                        left: 0,
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        backgroundColor: "#00000033",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        color: "#fff",
                                                                        fontSize: "20px",
                                                                        fontWeight: "bold",
                                                                        columnGap: "5px"
                                                                    }}
                                                                >
                                                                    <img src={plus} alt="Icon" style={{ width: "16px", height: "16px" }} />
                                                                    <Typography variant='gradientText' sx={{ fontSize: "24px", fontWeight: 600 }}>{postPic?.length - 4}</Typography>
                                                                </Box>
                                                            }
                                                        </Box>
                                                    )
                                                })}
                                            </Box>
                                        </Box>
                                    }
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", columnGap: "6px", cursor: "pointer" }}>
                                            {numberofLikes > 1 && <img src={like} alt="Like" style={{ width: "13.43px", height: "12px" }} />}
                                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
                                                {numberofLikes === 0 ? "Be first to like this" : isLiked && numberofLikes === 1 ? "You Liked This Post" : isLiked && numberofLikes > 1 ? `You and ${numberofLikes - 1} more like` : `${numberofLikes} likes`}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>{comments} comments</Typography>
                                    </Box>
                                    <Box sx={{ borderTop: "1px solid #E4E4E4", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F8FCFF", height: '50px', px: { xs: "10px", md: "0px" } }}>
                                        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }}>
                                            <img src={like} alt="Like" />
                                            <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Like</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", backgroundColor: showComments ? "#FFFFFF" : "inherit", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={CommentHandler}>
                                            <img src={comment} alt="Like" />
                                            <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Comment</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={handleClick}>
                                            <img src={repost} alt="Like" />
                                            <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Repost</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => setShowShareModal(true)}>
                                            <img src={send} alt="Like" />
                                            <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Share</Typography>
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
                                    {
                                        index === length - 1 && <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: "4px", cursor: "pointer" }}>
                                            <img src={refresh} alt="Refresh" />
                                            <Typography sx={{ fontSize: "10px", fontWeight: 300, color: "#505050" }}>Load more</Typography>
                                        </Box>
                                    }
                                </Paper>
            }


            <DynamicModal open={showShareModal} handleClose={() => setShowShareModal(false)} title={"Share Areeba Shakeel’s Post"} postModal={true} dropdownHeader={false} hideFooter={true}>
                <ShareModal />
            </DynamicModal>

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

            <DynamicModal open={showScheduleModal} handleClose={() => setShowScheduleModal(false)} title={"Schedule post"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} smallModal={true} styledHeader={true} footerDirection={"space-between"}>
                <ScheduleModal />
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

            <PhotoDetailsModal open={showPostDetails} handleClose={() => setShowPostDetails(false)}>
                <PostDetails images={postPic} userImage={userImage} userName={userName} userRole={userRole} postTime={"4d•"} postContent={postContent} numberofLikes={4} isLiked={false} comments={125} friendLiked={true} friend={"Albert"} handleModalClose={() => setShowPostDetails(false)} />
            </PhotoDetailsModal>
        </>
    )
}

export default SuggestionPost
