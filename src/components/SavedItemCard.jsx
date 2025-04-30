import { Avatar, Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { earth, save, three_vertical_dots, user } from '../assets';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSavePostMutation } from '../services/post';

const SavedItemCard = ({ userImage, userName, role, time, type, text, postImage, question, pollTimeLeft, totalVotes, articleTitle, eventName, id, handleRefetch }) => {
    const [fullText, setFullText] = useState(text)
    const [expanded, setExpanded] = useState(false);
    const charLimit = 120;

    const displayedText = expanded ? fullText : fullText?.slice(0, charLimit);
    const shouldShowSeeMore = fullText?.length > charLimit && !expanded;

    const [savePostData, { isLoading: isSavingPostLoading }] = useSavePostMutation()


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const HandleMenuItemClicked = async (event) => {
        if (event === "Unsave") {
            const res = await savePostData({
                postId: id,
                type: "POST"
            })
            if (res?.error) {
                toast.error(res?.error?.data?.message || "Something went wrong");
                return;
            }
            else if (res?.data) {
                console.log(res?.data)
                toast.success(res?.data?.message)
                handleRefetch()
            }
        }
        handleMenuClose()
    }

    return (
        <>
            <Box sx={{ borderTop: "1px solid #E4E4E4", p: "15px" }}>
                <Stack direction={"row"} gap={"10px"}>
                    <Avatar
                        src={userImage ? userImage : user}
                        alt="User"
                        sx={{ width: 40, height: 40, objectFit: "fill" }}
                    />
                    <Stack width={"100%"}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>{userName}</Typography>
                            <img src={three_vertical_dots} alt="Icon" onClick={handleClick} style={{ cursor: "pointer" }} />
                        </Box>
                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>{role?.length > 100 ? role?.slice(0, 98) + "..." : role}</Typography>
                        <Box sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>{time}</Typography>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>•</Typography>
                            <img src={earth} alt="Icon" />
                        </Box>
                    </Stack>
                </Stack>
                {
                    (type === "normal" || type === "video")
                        ?
                        <Box sx={{
                            display: 'flex',
                            columnGap: '15px',
                            alignItems: 'flex-start',
                            mt: "15px",
                            background: type === "article" ? "#F2F8FD" : "transparent"
                        }}>
                            {postImage && <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                                <Avatar
                                    variant="rounded"
                                    src={postImage || "/path-to-your-image.png"}
                                    alt="Post"
                                    sx={{ width: 80, height: 80 }}
                                />
                                {type === "video" && (
                                    <PlayCircleIcon
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            color: 'white',
                                            fontSize: 40,
                                            opacity: 0.8,
                                        }}
                                    />
                                )}
                            </Box>}
                            <Typography sx={{
                                fontWeight: 500, fontSize: "15px", color: "#505050", py: type === "article" ? "5px" : "0px",
                                px: (type === "article" && !postImage) ? "15px" : "0px"
                            }}>
                                {displayedText}
                                {shouldShowSeeMore && (
                                    <Typography
                                        sx={{ fontWeight: 500, fontSize: "15px", color: "#505050", ml: "3px", cursor: "pointer" }}
                                        component={"span"}
                                        onClick={() => setExpanded(true)}
                                    >
                                        ...see more
                                    </Typography>
                                )}
                            </Typography>
                        </Box>
                        :
                        type === "poll"
                            ?
                            <Box>
                                <Typography sx={{
                                    fontWeight: 500, fontSize: "15px", color: "#505050", py: type === "article" ? "5px" : "0px",
                                    px: (type === "article" && !postImage) ? "15px" : "0px"
                                }}>
                                    {displayedText}
                                    {shouldShowSeeMore && (
                                        <Typography
                                            sx={{ fontWeight: 500, fontSize: "15px", color: "#505050", ml: "3px", cursor: "pointer" }}
                                            component={"span"}
                                            onClick={() => setExpanded(true)}
                                        >
                                            ...see more
                                        </Typography>
                                    )}
                                </Typography>
                                <Box sx={{ backgroundColor: "#F2F8FD", p: "20px 15px", mt: "10px" }}>
                                    <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}>{question}</Typography>
                                    <Box sx={{ display: "flex", columnGap: "4px" }}>
                                        <Typography sx={{ color: "#505050", fontSize: "13px", fontWeight: "400" }}>Poll</Typography>
                                        <Typography sx={{ color: "#505050", fontSize: "13px", fontWeight: "400" }}>•</Typography>
                                        <Typography sx={{ color: "#505050", fontSize: "13px", fontWeight: "400" }}>{totalVotes} votes</Typography>
                                        <Typography sx={{ color: "#505050", fontSize: "13px", fontWeight: "400" }}>•</Typography>
                                        <Typography sx={{ color: "#505050", fontSize: "13px", fontWeight: "400" }}>{pollTimeLeft}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            :
                            <Box>
                                <Typography sx={{
                                    fontWeight: 500, fontSize: "15px", color: "#505050", pt: "10px",
                                    px: (type === "article" && !postImage) ? "15px" : "0px"
                                }}>
                                    {displayedText}
                                    {shouldShowSeeMore && (
                                        <Typography
                                            sx={{ fontWeight: 500, fontSize: "15px", color: "#505050", ml: "3px", cursor: "pointer" }}
                                            component={"span"}
                                            onClick={() => setExpanded(true)}
                                        >
                                            ...see more
                                        </Typography>
                                    )}
                                </Typography>
                                <Link to={`${type === "article" ? `/article/${id}` : `/event/${id}`}`} style={{ textDecoration: "none", mt: text === "" ? "10px" : "0px" }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            columnGap: '15px',
                                            alignItems: 'center',
                                            mt: '15px',
                                            background: '#F2F8FD',
                                        }}
                                    >
                                        {postImage && (
                                            <Avatar
                                                variant="rounded"
                                                src={postImage || '/path-to-your-image.png'}
                                                alt="Post"
                                                sx={{ width: 80, height: 80 }}
                                            />
                                        )}

                                        {type === "article"
                                            ?
                                            <Box
                                                sx={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: '15px',
                                                        color: '#505050',
                                                        px: type === 'article' && !postImage ? '15px' : '0px',
                                                    }}
                                                >
                                                    {articleTitle}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: '15px',
                                                        color: '#505050',
                                                        px: type === 'article' && !postImage ? '15px' : '0px',
                                                    }}
                                                >
                                                    {userName} on Fusion
                                                </Typography>
                                            </Box>
                                            :
                                            <Box sx={{
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                            }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: '15px',
                                                        color: '#505050',
                                                        px: type === 'event' && !postImage ? '15px' : '0px',
                                                    }}
                                                >
                                                    {eventName}
                                                </Typography>
                                            </Box>
                                        }
                                    </Box>
                                </Link>
                            </Box>
                }
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >

                <MenuItem onClick={isSavingPostLoading ? () => { } : () => HandleMenuItemClicked("Unsave")} sx={{ width: "245px", display: "flex", columnGap: "5px" }}>
                    <img src={save} alt="Icon" />
                    <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}>Unsave</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default SavedItemCard
