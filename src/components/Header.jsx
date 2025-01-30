import { Box, useTheme } from '@mui/material'
import React from 'react'
import { barIcon, icon } from '../assets';

const Header = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: "100%",
                height: "56px",
                display: "flex",
                backgroundColor: theme.palette.primary.main
            }}
        >
            <Box sx={{ width: "48%" }}></Box>
            <Box sx={{ width: "52%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: "30px" }}>
                <img src={icon} alt="" />
                <img src={barIcon} alt="" />
            </Box>
        </Box>
    )
}

export default Header
