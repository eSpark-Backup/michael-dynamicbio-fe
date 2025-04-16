import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { plus } from '../assets'
import { interestSuggestions } from '../constant'

const RightSideBar = ({ hideResearch }) => {
    const theme = useTheme()
    return (
        <Box sx={{ display: "flex", rowGap: "25px", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: "15px", gap: 2 }}>
                <Typography sx={{
                    fontSize: "14px",
                    fontWeight: 400, color: "#171717"
                }}>
                    You might be interested in following
                </Typography>
                <Typography sx={{
                    minWidth: "60px",
                    fontSize: "14px",
                    fontWeight: 400,
                    cursor: "pointer"
                }} variant='gradientText'>
                    View all
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                {interestSuggestions?.map((item, index) => (
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFFFFF", border: "1px solid #E4E4E4", borderRadius: "4px", p: "5px 20px" }} key={index}>
                        <Box sx={{ display: "flex", columnGap: "15px", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
                            <img src={item?.img} alt="User" style={{ width: "60px", height: "60px" }} />
                            <Stack direction={"column"}>
                                <Typography sx={{
                                    fontSize: "16px", fontWeight: 500, color: "#171717", textAlign: { xs: "center", md: "left" }
                                }}>{item?.name}</Typography>
                                <Typography sx={{
                                    fontSize: "14px",
                                    fontWeight: 400, color: "#505050", textAlign: { xs: "center", md: "left" }
                                }}>{item?.description}</Typography>
                            </Stack>
                        </Box>
                        <img src={plus} alt="Add" />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default RightSideBar
