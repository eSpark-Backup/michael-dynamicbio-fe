import { Box, Grid2, Paper, Typography } from '@mui/material'
import React from 'react'
import { dummyPhoto, editBlue, primaryEye, user } from '../assets'
import { articleDummyContent } from '../constant'

const ArticleDetails = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "10px", mt: '20px' }}>

            <Box sx={{ width: { xs: "98%", md: "85%", lg: "80%", xl: "75%" }, backgroundColor: "#F2F8FD", border: '1px solid #E4E4E4', borderRadius: "8px", p: "25px", display: "flex", columnGap: "20px" }}>
                <Box sx={{ display: "flex", columnGap: "3px" }}>
                    <img src={editBlue} alt="Icon" style={{ width: "16px" }} />
                    <Typography sx={{ fontSize: "16px", fontWeight: "400" }} variant='gradientText'>Edit article</Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: "3px" }}>
                    <img src={primaryEye} alt="Icon" style={{ width: "16px" }} />
                    <Typography sx={{ fontSize: "16px", fontWeight: "400" }} variant='gradientText'>View post</Typography>
                </Box>
            </Box>

            <Grid2 container spacing={3} sx={{ width: { xs: "98%", md: "85%", lg: "80%", xl: "75%" }, py: "25px" }}>
                <Grid2 size={{ xs: 12, lg: 8.5, xl: 9 }}>
                    <Paper sx={{ p: "0px" }}>
                        <Box sx={{ paddingTop: "46.25%", backgroundImage: `url("${dummyPhoto}")`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "100.1%" }}>
                        </Box>
                        <Box sx={{ p: "30px 20px" }}>
                            <Typography sx={{ fontSize: "24px", fontWeight: "600", color: "#171717" }}>Lorem Ipsum</Typography>
                            <Box sx={{ p: "20px 0px 20px 40px   ", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", rowGap: '3px' }}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>rotten ria</Typography>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#505050" }}>--</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>April 3, 2025</Typography>
                            <Typography sx={{ fontSize: '20px', fontWeight: 400, color: "#171717", pt: "15px" }} dangerouslySetInnerHTML={{ __html: articleDummyContent }}></Typography>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "10px" }}>
                                    <img src={user} alt="Avatar" style={{ width: "42px", height: '42px' }} />
                                    <Typography sx={{ textAlign: "center" }}>rotten ria</Typography>
                                    <Typography sx={{ textAlign: "center" }}>--</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ pt: "35px", display: "flex", flexDirection: "column", rowGap: "15px" }}>
                                <Typography sx={{ fontSize: "24px", fontWeight: "600", color: "#171717" }}>More articles for you</Typography>
                                <Box sx={{ width: "400px", height: "350px", border: "1px solid #E4E4E4", borderRadius: "8px", display: "flex", flexDirection: "column", rowGap: "15px" }}>
                                    <Box sx={{ backgroundImage: `url(${dummyPhoto})`, height: "70%", borderTopRightRadius: "8px", borderTopLeftRadius: "8px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "100.1%" }}>
                                    </Box>
                                    <Box sx={{ p: "10px" }}>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Basic</Typography>
                                        <Typography sx={{ fontSize: "14px", fontWeight: "300", color: "#505050" }}>rotten ria</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2 size={{ xs: 12, lg: 3.5, xl: 3 }}>
                    <Paper></Paper>
                </Grid2>
            </Grid2>

        </Box>
    )
}

export default ArticleDetails
