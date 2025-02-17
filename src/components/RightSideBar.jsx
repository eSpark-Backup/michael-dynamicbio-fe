import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { bondMain, plus, user } from '../assets'
import { interestSuggestions } from '../constant'

const RightSideBar = () => {
    const theme = useTheme()
    return (
        <Box sx={{ display: "flex", rowGap: "25px", flexDirection: "column" }}>
            <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "20px", px: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark }}>
                        You might be interested in following
                    </Typography>
                    <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark }}>
                        View all
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                    {interestSuggestions?.map((item, index) => (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "10px" }} key={index}>
                            <Box sx={{ display: "flex", columnGap: "40px", alignItems: "center" }}>
                                <img src={item?.img} alt="User" />
                                <Stack direction={"column"} spacing={0}>
                                    <Typography sx={{ fontSize: "24px", fontWeight: 400, color: theme.palette.primary.dark }}>{item?.name}</Typography>
                                    <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark }}>{item?.description}</Typography>
                                </Stack>
                            </Box>
                            <Stack alignItems="flex-start" spacing={1}>

                                <Box
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 1,
                                        alignSelf: "flex-end"
                                    }}
                                >
                                    <img src={plus} alt="" />
                                </Box>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {item?.address}
                                </Typography>
                            </Stack>
                        </Box>
                    ))}
                </Box>
            </Paper>
            <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "20px", px: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark }}>
                        Research
                    </Typography>
                    <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark }}>
                        View all
                    </Typography>
                </Box>
                {[1, 2]?.map((item, index) => {
                    return (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} key={index}>
                            <Stack>
                                <Typography sx={{ fontSize: "24px", fontWeight: "400", color: theme.palette.primary.dark }}>
                                    Hydrogen discovery
                                </Typography>
                                <Typography sx={{ fontSize: "12px", fontWeight: "300", color: theme.palette.primary.dark }}>
                                    Approvals
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography sx={{ fontSize: "17px", fontWeight: "300", color: theme.palette.primary.dark }}>
                                    {index === 0 ? "Author" : "Member"}
                                </Typography>
                                <Typography sx={{ fontSize: "12px", fontWeight: "300", color: theme.palette.primary.dark, alignSelf: "flex-end" }}>
                                    {index === 0 ? "10" : "30"}
                                </Typography>
                            </Stack>
                        </Box>
                    )
                })}

            </Paper>
        </Box>
    )
}

export default RightSideBar
