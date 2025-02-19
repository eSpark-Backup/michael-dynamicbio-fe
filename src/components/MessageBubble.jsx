import { Avatar, Box, Typography, IconButton, Stack, useTheme } from "@mui/material";
import React from "react";
import { emoji, emojiBlackWhite, friend, three_vertical_dots } from "../assets";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MessageBubble = ({ message }) => {
    const theme = useTheme()
    return (
        <Box sx={{ mb: 2, display: "flex" }}>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: message?.isUser ? "flex-end" : "flex-start", columnGap: "10px" }}>
                    {message?.isUser && <img src={three_vertical_dots} alt="" style={{ height: "16.25px" }} />}
                    {message?.isUser &&
                        <Box sx={{ maxWidth: "50%" }}>
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

                                    {message?.reactions?.map((data) => {
                                        return (
                                            <Box sx={{ backgroundColor: "#F9FAFB", p: "2px 8px 2px 8px", borderRadius: "16px" }}>
                                                {data?.count > 1 ? data?.item + " " + data?.count : data?.item}
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </Stack>
                        </Box>
                    }
                    {!message?.isUser &&
                        <Box sx={{ display: "flex", maxWidth: "50%", columnGap: "10px" }}>
                            <img src={friend} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                            <Stack direction={"column"}>
                                <Typography>{message?.sender}</Typography>
                                <Box sx={{
                                    width: "100%", background: message?.isUser ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)" : "#F2F8FD",
                                    p: "10px 14px 10px 14px",
                                    borderTopLeftRadius: message?.isUser ? "8px" : "0px",
                                    borderTopRightRadius: message?.isUser ? "0px" : "8px",
                                    borderBottomLeftRadius: "8px",
                                    borderBottomRightRadius: "8px",
                                }}>
                                    {message?.text}
                                </Box>
                                {!message?.isTyping && <Box sx={{ display: 'flex', mt: "5px", columnGap: "10px", justifyContent: "flex-end" }}>

                                    {message?.reactions?.map((data) => {
                                        return (
                                            <Box sx={{ backgroundColor: "#F9FAFB", p: "2px 8px 2px 8px", borderRadius: "16px" }}>
                                                {data?.count > 1 ? data?.item + " " + data?.count : data?.item}
                                            </Box>
                                        )
                                    })}
                                </Box>}
                            </Stack>
                        </Box>
                    }
                    {!message?.isUser && !message?.isTyping && <img src={emojiBlackWhite} alt="" />}
                </Box>
                {!message?.isUser && !message?.isTyping && <img src={three_vertical_dots} alt="" />}
            </Box>
        </Box>
    );
};

export default MessageBubble;

// background: linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%),
// linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04));

