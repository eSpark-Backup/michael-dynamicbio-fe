import { Box, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { bondMain, earth, user, three_vertical_dots, close } from '../assets'

const BondCard2 = ({ userImage, userName, userAddress, userRole, time, showWorldIcon, showActionIcon, handleClose, isFriendPost, ownPost }) => {
    const theme = useTheme()
    return (
        <Box sx={{ border: "1px solid #E4E4E4", borderRadius: "2px", backgroundColor: "#F2F8FD", display: "flex", justifyContent: "space-between", alignItems: "center", p: "10px" }}>
            <Box sx={{ display: "flex", columnGap: "15px", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
                <img src={userImage ? userImage : user} alt="User" style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
                <Stack direction={"column"}>
                    {userName && <Typography sx={{ fontSize: "18px", fontWeight: 500, color: "#171717", textAlign: { xs: "center", sm: "left" } }}>{userName}</Typography>}
                    {userRole && <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#505050", textAlign: { xs: "center", sm: "left" } }}>{userRole}</Typography>}
                    {userAddress && <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#505050", textAlign: { xs: "center", sm: "left" } }}>{userAddress}</Typography>}
                    <Box sx={{ display: "flex", alignItems: "center", columnGap: "4px" }}>
                        {time && <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#505050", textAlign: { xs: "center", sm: "left" } }}>{time}</Typography>}
                        {showWorldIcon && <img src={earth} alt='Icon' style={{ width: "14px", height: "14px" }} />}
                    </Box>
                </Stack>
            </Box>
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
        </Box>
    )
}

export default BondCard2
