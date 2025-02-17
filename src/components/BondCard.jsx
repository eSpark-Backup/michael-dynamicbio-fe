import { Box, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { bondMain } from '../assets'

const BondCard = ({ userImage, userName, userAddress, userRole, time }) => {
    const theme = useTheme()
    return (
        <Box sx={{ border: "1px solid #DDE2E4", borderRadius: "2px", backgroundColor: "#FCFCFC", display: "flex", justifyContent: "space-between", alignItems: "center", p: "10px" }}>
            <Box sx={{ display: "flex", columnGap: "30px", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
                <img src={userImage} alt="User" />
                <Stack direction={"column"}>
                    {userName && <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark, textAlign: { xs: "center", sm: "left" } }}>{userName}</Typography>}
                    {userAddress && <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark, textAlign: { xs: "center", sm: "left" } }}>{userAddress}</Typography>}
                    {userRole && <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark, textAlign: { xs: "center", sm: "left" } }}>{userRole}</Typography>}
                    {time && <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark, textAlign: { xs: "center", sm: "left" } }}>{time}</Typography>}
                </Stack>
            </Box>
            <img src={bondMain} alt="Bond" />
        </Box>
    )
}

export default BondCard
