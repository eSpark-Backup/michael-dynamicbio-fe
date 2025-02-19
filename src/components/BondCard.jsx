import { Box, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { bondMain } from '../assets'

const BondCard = ({ userImage, userName, userAddress, userRole, time }) => {
    const theme = useTheme()
    return (
        <Box sx={{ border: "1px solid #E4E4E4", borderRadius: "2px", backgroundColor: "#F2F8FD", display: "flex", justifyContent: "space-between", alignItems: "center", p: "10px" }}>
            <Box sx={{ display: "flex", columnGap: "30px", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
                <img src={userImage} alt="User" />
                <Stack direction={"column"}>
                    {userName && <Typography sx={{ fontSize: "18px", fontWeight: 500, color: "#171717", textAlign: { xs: "center", sm: "left" } }}>{userName}</Typography>}
                    {userRole && <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#505050", textAlign: { xs: "center", sm: "left" } }}>{userRole}</Typography>}
                    {userAddress && <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#505050", textAlign: { xs: "center", sm: "left" } }}>{userAddress}</Typography>}
                    {time && <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#505050", textAlign: { xs: "center", sm: "left" } }}>{time}</Typography>}
                </Stack>
            </Box>
            <img src={bondMain} alt="Bond" />
        </Box>
    )
}

export default BondCard
