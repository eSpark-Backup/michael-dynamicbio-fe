import { Box, Button, Grid2, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { close2, conversation, growPage, noPosts, plus, three_vertical_dots } from '../../../assets'
import { BoxWithTextIcon } from '../../../components'
import { pageStats } from '../../../constant'

const AdminView = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid2 container spacing={3} sx={{ width: { xs: "98%", md: "85%", lg: "80%", xl: "75%" }, py: "25px" }}>
                <Grid2 size={{ xs: 12, lg: 3 }}>
                    <Paper></Paper>
                </Grid2>
                <Grid2 size={{ xs: 12, lg: 9 }} sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                    <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                        <Box>
                            <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>Today's action</Typography>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Pages that complete these actions regularly grow 4x faster</Typography>
                        </Box>
                        <Box sx={{ p: "15px", border: "1px solid #E4E4E4", borderRadius: "4px" }}>
                            <Stack>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Add website URL</Typography>
                                    <img src={close2} alt="Icon" style={{ width: "12px", height: "12px" }} />
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", columnGap: "3px" }}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#505050" }}>
                                        Add a URL to drive more Page visitors to your website.
                                    </Typography>
                                    <Typography variant='gradientText' sx={{ fontSize: "14px", fontWeight: "500" }}>
                                        Add
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                        <Box sx={{ p: "15px", border: "1px solid #E4E4E4", borderRadius: "4px" }}>
                            <Stack>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Add description</Typography>
                                    <img src={close2} alt="Icon" style={{ width: "12px", height: "12px" }} />
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", columnGap: "3px" }}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#505050" }}>
                                        Add a quick description to get you Page discovered in search results.
                                    </Typography>
                                    <Typography variant='gradientText' sx={{ fontSize: "14px", fontWeight: "500" }}>
                                        Add
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Paper>
                    <Paper>
                        <Box>
                            <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>Manage recent posts</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", columnGap: "3px" }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#505050" }}>
                                    Manage you page's content and amplify your reach with boosting.
                                </Typography>
                                <Typography variant='gradientText' sx={{ fontSize: "14px", fontWeight: "500" }}>
                                    Learn more
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "20px" }}>
                            <img src={noPosts} alt="Image" />
                            <Typography sx={{ fontSize: "24px", fontWeight: "500", color: "#171717" }}>Your page doesn't have any posts from the last 90 days</Typography>
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>Pages that post 2x a week grow 5x faster</Typography>
                            <Box sx={{ width: "220px" }}>
                                <BoxWithTextIcon icon={plus} text={"Start a post"} />
                            </Box>
                        </Box>
                    </Paper>
                    <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3px" }}>
                            <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>Grow your page faster</Typography>
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>Attract prospects and convert more clients with a Premium Company Page</Typography>
                            <Button type="submit" sx={{ maxWidth: "150px", height: "36px", fontSize: "16px", minWidth: { md: "150px" }, mt: "10px" }}>
                                Try now
                            </Button>
                        </Box>
                        <Box sx={{ display: "flex", columnGap: "10px", alignItems: "flex-start" }}>
                            <img src={growPage} alt="Image" />
                            <img src={three_vertical_dots} alt="Icon" />
                        </Box>
                    </Paper>
                    <Paper>
                        <Box>
                            <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>Track performance</Typography>
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>Grow you page 3x faster by leveraging insights and analytics</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px", flexWrap: "wrap" }}>
                            {/*  */}
                            {pageStats?.map((item, index) => (
                                <Box sx={{ border: "1px solid #E4E4E4", borderRadius: "8px", p: "20px 15px", display: "flex", flexDirection: "column", rowGap: "4px", width: "24%", minWidth: "190px" }} key={index}>
                                    <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>{item?.value}</Typography>
                                    <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }} variant={index !== 0 && "gradientText"}>{item?.name}</Typography>
                                    <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}>{item?.description}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                    <Paper>
                        <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>Join conversations</Typography>
                        <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>Build brand awareness and community by engaging with recent conversations.</Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "10px", mt: "25px" }}>
                            <img src={conversation} alt="Image" />
                            <Typography sx={{ fontSize: "24px", fontWeight: "500", color: "#171717" }}>Your feed is empty</Typography>
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>Follow other pages in your industry to get new content inspiration</Typography>
                            <Box sx={{ width: "300px" }}>
                                <BoxWithTextIcon icon={plus} text={"Add pages to follow"} />
                            </Box>
                        </Box>
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default AdminView
