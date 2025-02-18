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
                    <Typography sx={{
                        "@media (max-width:1280px)": { fontSize: "14px" },
                        "@media (min-width: 1281px) and (max-width: 1630px)": {
                            fontSize: "13px",
                        },
                        "@media (min-width: 1631px)": {
                            fontSize: "17px",
                        },
                        fontWeight: 300, color: theme.palette.primary.dark
                    }}>
                        You might be interested in following
                    </Typography>
                    <Typography sx={{
                        "@media (max-width:1280px)": { fontSize: "14px" },
                        "@media (min-width: 1281px) and (max-width: 1630px)": {
                            fontSize: "13px",
                        },
                        "@media (min-width: 1631px)": {
                            fontSize: "17px",
                        },
                        fontWeight: 300, color: theme.palette.primary.dark,
                        cursor: "pointer"
                    }}>
                        View all
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                    {interestSuggestions?.map((item, index) => (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "10px" }} key={index}>
                            <Box sx={{ display: "flex", columnGap: "15px", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
                                <img src={item?.img} alt="User" />
                                <Stack direction={"column"}>
                                    <Typography sx={{
                                        "@media (max-width:768px)": { fontSize: "16px" },
                                        "@media (min-width: 769px) and (max-width: 1280px)": {
                                            fontSize: "24px",
                                        },
                                        "@media (min-width: 1281px) and (max-width: 1650px)": {
                                            fontSize: "16px",
                                        },
                                        "@media (min-width:1651px)": { fontSize: "24px" },
                                        fontWeight: 400, color: theme.palette.primary.dark, textAlign: { xs: "center", md: "left" }
                                    }}>{item?.name}</Typography>
                                    <Typography sx={{
                                        "@media (max-width:768px)": { fontSize: "14px" },
                                        "@media (min-width: 769px) and (max-width: 1280px)": {
                                            fontSize: "17px",
                                        },
                                        "@media (min-width: 1281px) and (max-width: 1650px)": {
                                            fontSize: "13px",
                                        },
                                        "@media (min-width:1651px)": { fontSize: "17px" },
                                        fontWeight: 300, color: theme.palette.primary.dark, textAlign: { xs: "center", md: "left" }
                                    }}>{item?.description}</Typography>
                                </Stack>
                            </Box>
                            <Stack alignItems="flex-start">

                                <Box
                                    sx={{
                                        "@media (max-width:1280px)": { width: 32, height: 32 },
                                        "@media (min-width:1281px) and (max-width:1750)": { width: 23, height: 23 },
                                        "@media (min-width:1751px)": { width: 32, height: 32 },
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 1,
                                        alignSelf: "flex-end"
                                    }}
                                >
                                    <img src={plus} alt="plus" style={{ width: "100%", height: "90%" }} />
                                </Box>
                                <Typography sx={{ fontWeight: 500, fontSize: { lg: "12px", xl: "17px" }, color: theme.palette.primary.dark }}>
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
                    <Typography sx={{ fontSize: "17px", fontWeight: 300, color: theme.palette.primary.dark, cursor: "pointer" }}>
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
