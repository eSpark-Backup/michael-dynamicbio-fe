import { Avatar, Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { einstein, like, three_vertical_dots } from '../assets'

const Comment = ({ userImage, userName, comment, time }) => {
    const theme = useTheme()
    return (
        <Box sx={{ backgroundColor: "#F2F8FD", py: "10px", display: "flex", px: "4px", justifyContent: 'flex-start', columnGap: "5px", flexDirection: { xs: "column", sm: "row" }, alignItems: 'flex-start' }}>
            <Avatar
                src={userImage ? userImage : einstein}
                alt="User"
                sx={{ width: 43, height: 43, objectFit: "fill !important" }}
            />
            <Box flex={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ color: "#171717", fontSize: "18px", fontWeight: 500 }}>{userName}</Typography>
                    <Box display={"flex"} alignContent={"center"} columnGap={2}>
                        <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#71717A" }}>
                            {/* {time} */}
                        </Typography>
                        <img src={three_vertical_dots} alt="three_vertical_dots" style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                    </Box>
                </Box>
                <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#18181B", pr: '4px', whiteSpace: 'pre-line', }}>
                    {comment}
                </Typography>
                {/* <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#71717A" }}>
                        Like
                    </Typography>
                    <img src={like} alt="Like" style={{ height: "12px", width: "13.5" }} />
                </Box> */}
            </Box>
        </Box>
    )
}

export default Comment
