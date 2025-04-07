import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import BondCard2 from './BondCard'
import { formatEventPostTime } from '../utils'
import { useNavigate } from 'react-router-dom'

const EventPost = ({ userName, userRole, postTime, userImage, numberofLikes, isLiked, comments, commentsContent, friend, friendLiked, eventName, eventImage, startTime, endTime, eventType, eventLink, attendees, eventPosts, postContent, id }) => {
    const navigate = useNavigate()
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <BondCard2 userImage={userImage} userName={userName} userRole={userRole} time={postTime} showWorldIcon showActionIcon />
            {postContent &&
                <Typography sx={{ fontSize: '20px', fontWeight: 400, color: "#171717" }} dangerouslySetInnerHTML={{ __html: postContent }}>
                </Typography>
            }
            <Box sx={{ border: "1px solid #E4E4E4", borderRadius: "8px", display: "flex", flexDirection: 'column', rowGap: "20px", height: "375px" }}>
                <Box sx={{ height: "65%", backgroundImage: `url("${eventImage}")`, borderTopRightRadius: "8px", borderTopLeftRadius: "8px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100.1%" }}>
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
        </Paper>
    )
}

export default EventPost
