import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { bondMain, plus, user } from '../assets'
import { interestSuggestions } from '../constant'

const RightSideBar = () => {
    const theme = useTheme()
    return (
        <Box sx={{ display: "flex", rowGap: "25px", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: "15px" }}>
                <Typography sx={{
                    fontSize: "14px",
                    fontWeight: 400, color: "#171717"
                }}>
                    You might be interested in following
                </Typography>
                <Typography sx={{
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
            <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "20px", px: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}>
                        Research
                    </Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400, cursor: "pointer" }} variant='gradientText'>
                        View all
                    </Typography>
                </Box>
                {[1, 2]?.map((item, index) => {
                    return (
                        <Box sx={{ display: "flex", border: "1px solid #E4E4E4", p: "10px 5px 15px 5px", borderRadius: "4px", flexDirection: "column", rowGap: "5px" }} key={index}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography sx={{ fontSize: "16px", fontWeight: 400, color: "#171717" }}>Hydrogen discovery</Typography>
                                <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#505050" }}>
                                    {index === 0 ? "Author" : "Member"}
                                </Typography>
                            </Box>
                            <Box sx={{ border: "1px solid #E4E4E4", borderRadius: "4px", p: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#171717" }}>Approvals</Typography>
                                <Typography sx={{ fontSize: "16px", fontWeight: 300, color: theme.palette.primary.dark }}>0</Typography>
                            </Box>
                        </Box>
                    )
                })}
                <Button sx={{ height: "40px", fontSize: "14px", fontWeight: 400, color: "#171717" }}>Manage</Button>
            </Paper>
        </Box>
    )
}

export default RightSideBar
