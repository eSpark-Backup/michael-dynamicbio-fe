import { Box, Divider, Menu, MenuItem, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { downArrowFilled, noPosts } from '../../../assets'

const PostSection = () => {
    const [activeItem, setActiveItem] = useState("All")
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ width: "25%", display: "flex", flexDirection: "column", rowGap: "10px" }}>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>RottenRia</Typography>
                </Paper>
                <Paper>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>
                        See a collection of active or past ads by RottenRia.
                    </Typography>
                    <Typography variant='gradientText' sx={{ fontSize: "14px", fontWeight: "500" }}>
                        View ad library
                    </Typography>
                </Paper>
            </Box>
            <Box sx={{ width: "70%", display: "flex", flexDirection: "column", rowGap: "10px" }}>
                <Box sx={{ display: "flex", columnGap: "10px" }}>
                    {["All", "Images", "Videos", "Articles", "Documents"]?.map((item, index) => (
                        <Box sx={{ p: ".8rem 1.2rem", width: "fit-content", background: activeItem === item ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04))" : "transparent", border: activeItem === item ? "none" : "1px solid #E4E4E4", borderRadius: "1.9rem", cursor: "pointer" }} key={index} onClick={() => setActiveItem(item)}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: activeItem === item ? "#fff" : "#505050" }}>{item}</Typography>
                        </Box>
                    ))}

                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ width: "85%" }}>
                        <Divider />
                    </Box>
                    <Box sx={{ display: "flex", columnGap: "1px", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}>Sort by: </Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: "500", color: "#171717" }}>Top </Typography>
                        <img src={downArrowFilled} alt="Icon" style={{ cursor: "pointer" }} onClick={handleClick} />
                    </Box>

                </Box>
                <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "20px" }}>
                    <img src={noPosts} alt="Image" />
                    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "2px" }}>
                        <Typography sx={{ fontSize: "24px", fontWeight: "500", color: "#171717", textAlign: "center" }}>No posts yet</Typography>
                        <Typography sx={{ fontSize: "17px", fontWeight: "400", color: "#505050", textAlign: "center" }}>Check back later for posts!</Typography>
                    </Box>
                </Paper>
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
                <MenuItem onClick={handleClose} sx={{ width: "120px" }}>
                    Top
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "120px" }}>
                    Recent
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default PostSection
