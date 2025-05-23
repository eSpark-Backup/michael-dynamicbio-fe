import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import TypingDots from './TypingDots'
import { useQuery } from '../utils'

const ContactBox = ({ isTyping, isOnline, image, lastMessage, time, name, handleClick, activeItem, id, type }) => {
    const query = useQuery();
    const pathId = query.get("id");
    const theme = useTheme()
    return (
        <Box sx={{
            py: '15px', background: activeItem === id ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)" : "transparent",
            display: "flex", justifyContent: 'flex-start', columnGap: "5px",
            alignItems: "center", cursor: "pointer",
            border: "1px solid #E4E4E4", borderRadius: "2px",
            px: "4px"
        }} onClick={() => handleClick(id, type)}>
            <Box sx={{ width: "40px", height: "40px", position: "relative" }}>
                <img src={image} alt="user" style={{ width: "100%", height: '100%', borderRadius: "50%" }} />
                <Box sx={{ width: "10px", height: "10px", backgroundColor: isOnline ? "#12B76A" : "#7a7676", border: "1.5px solid #FFFFFF", borderRadius: "50%", position: "absolute", right: 0, bottom: 0 }}>

                </Box>
            </Box>
            <Box flex={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ color: activeItem === id ? theme.palette.primary.light : "#171717", fontSize: "14px", fontWeight: 500 }}>
                        {name?.length > 30 ? name?.slice(0, 31) + ".." : name}
                    </Typography>
                    <Typography sx={{ fontSize: "10px", fontWeight: 400, color: activeItem === id ? theme.palette.primary.light : "#505050", }}>
                        {time}
                    </Typography>
                </Box>
                <Typography sx={{ fontSize: "12px", fontWeight: 400, color: activeItem === id ? theme.palette.primary.light : "#505050" }}>
                    {isTyping && id !== pathId ? <TypingDots /> : lastMessage}
                </Typography>
            </Box>
        </Box >
    )
}

export default ContactBox
