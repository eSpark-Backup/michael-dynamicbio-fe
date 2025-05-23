import { Avatar, Box, Typography, IconButton, Stack, useTheme, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { emoji, emojiBlackWhite, friend, reaction1, reaction2, reaction3, reaction4, reaction5, three_vertical_dots, userAvatar } from "../assets";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TypingDots from "./TypingDots";

const MessageBubble = ({ message }) => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const [showReaction, setShowReactions] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box sx={{ mb: 2, display: "flex" }}>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: message?.isUser ? "flex-end" : "flex-start", columnGap: "10px", alignItems: "center", position: 'relative' }}>
                    {/* {message?.isUser && <img src={three_vertical_dots} alt="" style={{ height: "16.25px", cursor: "pointer", marginBottom: "40px" }} onClick={handleClick} />} */}
                    {message?.isUser &&
                        <Box sx={{ maxWidth: { xs: "90%", lg: "50%" } }}>
                            <Stack direction={"column"}>
                                <Box sx={{
                                    width: "100%", background: message?.isUser ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)" : "#F2F8FD",
                                    p: "10px 14px 10px 14px",
                                    borderTopLeftRadius: message?.isUser ? "8px" : "0px",
                                    borderTopRightRadius: message?.isUser ? "0px" : "8px",
                                    borderBottomLeftRadius: "8px",
                                    borderBottomRightRadius: "8px",
                                    fontSize: "14px", fontWeight: 400, color: theme.palette.primary.light
                                }}>
                                    {message?.text}
                                </Box>
                                <Box sx={{ display: 'flex', mt: "5px", columnGap: "10px" }}>

                                    {message?.reactions?.map((data, index) => {
                                        return (
                                            <Box sx={{ backgroundColor: "#F9FAFB", p: "2px 8px 2px 8px", borderRadius: "16px", display: "flex", columnGap: '4px' }} key={index}>
                                                {/* {data?.count > 1 ? data?.item + " " + data?.count : data?.item} */}
                                                <img src={data?.item} alt="Emoji" style={{ width: "16px" }} />
                                                {data?.count > 1 && <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#344054" }}>
                                                    {data?.count}
                                                </Typography>}
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </Stack>
                        </Box>
                    }
                    {!message?.isUser &&
                        <Box sx={{ display: "flex", maxWidth: { xs: "90%", lg: "50%" }, columnGap: "10px" }}>
                            <img src={message?.avatar || userAvatar} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                            <Stack direction={"column"}>
                                <Typography>{message?.sender}</Typography>
                                <Box sx={{
                                    width: message?.isTyping ? "60%" : "100%", background: message?.isUser ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)" : "#F2F8FD",
                                    p: "10px 14px 10px 14px",
                                    borderTopLeftRadius: message?.isUser ? "8px" : "0px",
                                    borderTopRightRadius: message?.isUser ? "0px" : "8px",
                                    borderBottomLeftRadius: "8px",
                                    borderBottomRightRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    color: "#171717"
                                }}>
                                    {message?.isTyping ? <TypingDots /> : message?.text}
                                </Box>
                                {!message?.isTyping && <Box sx={{ display: 'flex', mt: "5px", columnGap: "10px", justifyContent: "flex-end" }}>

                                    {message?.reactions?.map((data, index) => {
                                        return (
                                            <Box sx={{ backgroundColor: "#F9FAFB", p: "2px 8px 2px 8px", borderRadius: "16px", display: "flex" }} key={index}>
                                                {/* {data?.count > 1 ? data?.item + " " + data?.count : data?.item} */}
                                                <img src={data?.item} alt="Emoji" style={{ width: "16px" }} />
                                                {data?.count > 1 && <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#344054" }}>
                                                    data?.count
                                                </Typography>}
                                            </Box>
                                        )
                                    })}
                                </Box>}
                            </Stack>
                        </Box>
                    }
                    {/* {!message?.isUser && !message?.isTyping && <img src={emojiBlackWhite} alt="" style={{ width: "24px", cursor: "pointer" }} onClick={() => setShowReactions(!showReaction)} />}
                    {!message?.isUser && !message?.isTyping && showReaction && <Box sx={{ width: "200px", boxShadow: "0px 0px 10px 0px #00000040", backgroundColor: theme.palette.primary.light, height: "38px", display: "flex", justifyContent: "space-between", alignItems: "center", px: "5px", borderRadius: "2px", position: { xs: "absolute", md: "relative" }, left: { xs: "5px", md: "0px" } }}>
                        <img src={reaction1} alt="Reaction" style={{ width: "24px", height: "24px" }} />
                        <img src={reaction2} alt="Reaction" style={{ width: "24px", height: "24px" }} />
                        <img src={reaction3} alt="Reaction" style={{ width: "24px", height: "24px" }} />
                        <img src={reaction4} alt="Reaction" style={{ width: "24px", height: "24px" }} />
                        <img src={reaction5} alt="Reaction" style={{ width: "24px", height: "24px" }} />
                    </Box>} */}
                </Box>
                {/* {!message?.isUser && !message?.isTyping && <img src={three_vertical_dots} alt="" style={{ width: "24px", cursor: "pointer", height: "16.25px", marginTop: "25px" }} onClick={handleClick} />} */}
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Delete</MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Edit</MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Copy</MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Paste</MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Forward</MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Select</MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Star</MenuItem>
            </Menu>
        </Box>
    );
};

export default MessageBubble;

