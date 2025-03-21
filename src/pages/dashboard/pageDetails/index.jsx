import { Box, Button, Grid2, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { close, dummyPhoto } from '../../../assets'

const PageDetailsPage = () => {

    const tabs = [
        {
            label: "Home",
            component: (
                <Typography>Home</Typography>
            ),
        },
        {
            label: "About",
            component: <Typography>About</Typography>,
        },
        {
            label: "Posts",
            component: <Typography>Posts</Typography>,
        },
        {
            label: "People",
            component: <Typography>People</Typography>,
        },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid2 container spacing={3} sx={{ width: { xs: "98%", md: "85%", lg: "80%", xl: "75%" }, py: "25px" }}>
                <Grid2 size={{ xs: 12, lg: 9 }}>
                    <Paper sx={{ p: "0px" }}>
                        <Box sx={{ height: "134px", backgroundImage: `url(${dummyPhoto})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", position: "relative", borderTopLeftRadius: "4px", borderTopRightRadius: "4px", width: "100%" }}>

                            <Box sx={{ width: "128px", height: "128px", border: "4px solid #fff", position: "absolute", top: "70px", left: "25px", backgroundImage: `url(${dummyPhoto})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></Box>
                        </Box>
                        <Box sx={{ my: "90px", px: "25px", display: "flex", flexDirection: "column", rowGap: "10px" }}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography sx={{ fontSize: "24px", fontWeight: "500", color: "#171717" }}>RottenRia</Typography>
                                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Fashion Accessories Manufacturing 0- 1 employees</Typography>
                            </Box>
                            <Box sx={{ display: "flex", columnGap: "10px" }}>
                                <Button type="submit" sx={{ maxWidth: "150px", height: "36px", fontSize: "16px", minWidth: { md: "150px" } }}>
                                    Follow
                                </Button>
                                <Box sx={{
                                    width: "150px", height: "36px", borderRadius: "2px", display: "flex", justifyContent: "center", alignItems: "center",
                                    background: "white",
                                    position: "relative",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        borderRadius: "8px",
                                        padding: "1px",
                                        background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                        mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                                        WebkitMask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                                        WebkitMaskComposite: "destination-out",
                                        maskComposite: "exclude",
                                    },
                                    cursor: "pointer"
                                }}>
                                    <Typography variant='gradientText'>Use AI</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ p: "25px", border: "1px solid #E4E4E4", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center", mt: "20px" }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Follow other organizations as your Page to grow visibility for <span style={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>RottenRia.</span></Typography>
                                <Box sx={{ display: "flex", columnGap: "10px" }}>
                                    <Box sx={{
                                        width: "150px", height: "36px", borderRadius: "2px", display: "flex", justifyContent: "center", alignItems: "center",
                                        background: "white",
                                        position: "relative",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            borderRadius: "8px",
                                            padding: "1px",
                                            background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                            mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                                            WebkitMask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                                            WebkitMaskComposite: "destination-out",
                                            maskComposite: "exclude",
                                        },
                                        cursor: "pointer"
                                    }}>
                                        <Typography variant='gradientText'>Get Started</Typography>
                                    </Box>
                                    <img src={close} alt="Icon" />
                                </Box>
                            </Box>
                        </Box>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            gap={5}
                            sx={{
                                background: "#FFF",
                                border: "1px solid #E4E4E4",
                                borderRadius: "4px",
                                padding: "18px 30px",
                            }}
                        >
                            {tabs.map((tab) => (
                                <Typography
                                    sx={{
                                        cursor: "pointer",
                                        position: "relative",
                                        background:
                                            "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                        "-webkit-background-clip": "text",
                                        "-webkit-text-fill-color":
                                            tab?.label === activeTab?.label ? "transparent" : "#000",
                                    }}
                                    fontSize="14px"
                                    fontWeight={500}
                                    onClick={() => setActiveTab(tab)}
                                    key={tab.label}
                                >
                                    {tab.label}
                                </Typography>
                            ))}
                        </Stack>
                        {activeTab?.component}
                    </Paper>
                </Grid2>
                <Grid2 size={{ xs: 12, lg: 3 }}>
                    <Paper>
                        hello
                    </Paper>
                </Grid2>
            </Grid2>

        </Box>
    )
}

export default PageDetailsPage
