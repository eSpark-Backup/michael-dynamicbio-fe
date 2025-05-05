import { Avatar, Box, CircularProgress, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { bondMain, earth, user, three_vertical_dots, close, starBlack, save, saveUnfilled, copyLink, editBlue, deleteIcon, comment, eye, primaryEye } from '../assets'
import { useNavigate } from 'react-router-dom'
import { useDeletePostByIdMutation, useSavePostMutation } from '../services/post'
import { toast } from 'react-toastify'

const BondCard2 = ({ userImage, userName, userAddress, userRole, time, showWorldIcon, showActionIcon, handleClose, isFriendPost, ownPost, id, showBondIcon, handleBondClick, isLoading, isAdminPost, groupPost, postId, isSaved }) => {
    const theme = useTheme()
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [saved, setSaved] = useState(isSaved)

    const [savePostData, { isLoading: isSavingPostLoading }] = useSavePostMutation()
    const [deletePost, { isLoading: deletePostLoading }] = useDeletePostByIdMutation()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const HandleMenuItemClicked = async (event) => {
        if (event === "Save") {
            const res = await savePostData({
                postId,
                type: "POST"
            })
            if (res?.error) {
                toast.error(res?.error?.data?.message || "Something went wrong");
                return;
            }
            else if (res?.data) {
                console.log(res?.data)
                toast.success(res?.data?.message)
                setSaved(!saved)
            }
        }
        else if (event === "delete") {
            const res = await deletePost(postId)
            if (res?.error) {
                toast.error(res?.error?.data?.message || "Something went wrong");
                return;
            }
            else if (res?.data) {
                toast.success(res?.data?.message)
            }
        }
        handleMenuClose()
    }
    return (
        <Box sx={{ border: "1px solid #E4E4E4", borderRadius: "2px", backgroundColor: "#F2F8FD", display: "flex", justifyContent: { xs: "center", sm: "space-between" }, alignItems: "center", p: "10px", cursor: "pointer" }}>
            <Box sx={{ display: "flex", columnGap: "15px", alignItems: "center", flexDirection: { xs: "column", sm: "row" }, justifyContent: { xs: "center", sm: "flex-start" } }}>
                <Avatar
                    src={userImage ? userImage : user}
                    alt="User"
                    sx={{ width: 60, height: 60, objectFit: "fill" }}
                    onClick={() => navigate(`/profile/${id}`)}
                />
                <Stack direction={"column"}>
                    {userName && <Typography sx={{ fontSize: "18px", fontWeight: 500, color: "#171717", textAlign: { xs: "center", sm: "left" } }} onClick={() => navigate(`/profile/${id}`)}>{userName}</Typography>}
                    {userRole && <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#505050", textAlign: { xs: "center", sm: "left" } }}>{userRole}</Typography>}
                    {userAddress && <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#505050", textAlign: { xs: "center", sm: "left" } }}>{userAddress}</Typography>}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "4px",
                            justifyContent: { xs: "center", sm: "flex-start" },
                        }}
                    >
                        {
                            groupPost && isAdminPost && <Box sx={{ display: "flex", columnGap: "4px", alignItems: "center" }}>
                                <img src={starBlack} alt="" style={{ width: "20px", height: "20px" }} />
                                <Typography sx={{ fontSize: "12px", color: "#171717", fontWeight: "500" }}>Admin</Typography>
                                <Typography sx={{ fontSize: "12px", color: "#171717", fontWeight: "500" }}>•</Typography>
                                <Typography sx={{ fontSize: "12px", color: "#505050", fontWeight: "500" }}>Admin</Typography>
                            </Box>
                        }
                        {time && (
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: 400,
                                    color: "#505050",
                                }}
                            >
                                {time}
                            </Typography>
                        )}
                        {showWorldIcon && (
                            <img src={earth} alt="Icon" style={{ width: "14px", height: "14px" }} />
                        )}
                    </Box>

                </Stack>
            </Box>
            {(showBondIcon && !isLoading) && <img src={bondMain} alt="Bond" onClick={(e) => {
                e.stopPropagation();
                handleBondClick(id);
            }} style={{ cursor: "pointer" }} />}
            {isLoading && <CircularProgress sx={{ color: "black" }} />}
            {(isFriendPost || ownPost) && <img src={three_vertical_dots} alt="Icon" onClick={handleClick} />}
            {/* {(!isFriendPost && !ownPost) && <img src={bondMain} alt="Bond" />}
            {
                (isFriendPost && !ownPost) && <Box>
                    <img src={three_vertical_dots} alt="Icon" />
                    <img src={close} alt="Icon" onClick={handleClose} style={{ cursor: "pointer" }} />
                </Box>
            }
            {
                (!isFriendPost && ownPost) &&
                <>
                    <img src={three_vertical_dots} alt="Icon" />
                </>
            } */}

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

                {ownPost
                    ?
                    <>
                        <MenuItem onClick={() => HandleMenuItemClicked("")} sx={{ minWidth: "245px", display: "flex", columnGap: "5px" }}>
                            <img src={editBlue} alt="Icon" />
                            <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}>Feature on top of profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={isSavingPostLoading ? () => { } : () => HandleMenuItemClicked("Save")} sx={{ minWidth: "245px", display: "flex", columnGap: "5px" }}>
                            <img src={saved ? save : saveUnfilled} alt="Icon" />
                            <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}>{saved ? "Unsave" : "Save"}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => HandleMenuItemClicked("")} sx={{ minWidth: "245px", display: "flex", columnGap: "5px" }}>
                            <img src={copyLink} alt="Icon" />
                            <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}>Copy link to post</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => HandleMenuItemClicked("")} sx={{ minWidth: "245px", display: "flex", columnGap: "5px" }}>
                            <img src={editBlue} alt="Icon" />
                            <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}>Embed this post</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => HandleMenuItemClicked("")} sx={{ minWidth: "245px", display: "flex", columnGap: "5px" }}>
                            <img src={editBlue} alt="Icon" />
                            <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}>Edit post</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => HandleMenuItemClicked("delete")} sx={{ minWidth: "245px", display: "flex", columnGap: "5px" }}>
                            <img src={deleteIcon} alt="Icon" />
                            <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}>Delete post</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => HandleMenuItemClicked("")} sx={{ minWidth: "245px", display: "flex", columnGap: "5px" }}>
                            <img src={comment} alt="Icon" />
                            <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}>Who can comment on this post?</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => HandleMenuItemClicked("")} sx={{ minWidth: "245px", display: "flex", columnGap: "5px" }}>
                            <img src={primaryEye} alt="Icon" />
                            <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}>Who can see on this post?</Typography>
                        </MenuItem>
                    </>
                    :
                    <MenuItem onClick={isSavingPostLoading ? () => { } : () => HandleMenuItemClicked("Save")} sx={{ width: "245px", display: "flex", columnGap: "5px" }}>
                        <img src={saved ? save : saveUnfilled} alt="Icon" />
                        <Typography sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}>{saved ? "Unsave" : "Save"}</Typography>
                    </MenuItem>}
            </Menu>
        </Box>
    )
}

export default BondCard2
