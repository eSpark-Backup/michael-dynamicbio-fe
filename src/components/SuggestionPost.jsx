import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { camera, comment, emoji, like, postPicture, refresh, repost, send, three_vertical_dots, user } from "../assets/index.js"
import OutlinedInput from './outline-input.jsx';
import Comment from './Comment.jsx';
import BondCard from './BondCard.jsx';

const SuggestionPost = ({ userName, userRole, postTime, userImage, numberofLikes, isLiked, comments, activity, postPic, postContent, commentsContent, length, index }) => {
    const theme = useTheme();
    const [showComments, setShowComments] = useState(false)

    const CommentHandler = () => {
        setShowComments(!showComments)
    }
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ color: "#171717", fontSize: "14px", fontWeight: "400" }}>
                    {activity}
                </Typography>
                <img src={three_vertical_dots} alt="Info" style={{ cursor: "pointer" }} />
            </Box>
            <BondCard userImage={userImage} userName={userName} userRole={userRole} time={postTime} />
            {postPic && <img src={postPicture} alt="Post" />}
            {postContent &&
                <Typography sx={{ fontSize: '20px', fontWeight: 400, color: "#171717" }} dangerouslySetInnerHTML={{ __html: postContent }}>
                </Typography>
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
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <img src={repost} alt="Like" />
                    <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Repost</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }}>
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
                    <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#000000" }}>Load more</Typography>
                </Box>
            }
        </Paper >
    )
}

export default SuggestionPost
