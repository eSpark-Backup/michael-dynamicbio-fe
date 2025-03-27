import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { plus } from '../assets'

const TargetAudienceModal = () => {
    const items = ["Language", "region", "job function", "location", "university", "company size", "Seniority", "Industry"]
    return (
        <Box sx={{ mt: "35px" }}>
            <Box sx={{ width: { xs: "100%", md: "90%" }, display: "flex", justifyContent: "space-between", flexWrap: "wrap", rowGap: "35px", mb: "30px" }}>
                {/*  */}
                {items?.map((item) => {
                    return (
                        <Stack width={{ xs: "100%", md: "50%" }} direction={"column"} gap={1}>
                            <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>
                                {item?.slice(0, 1)?.toUpperCase() + item?.slice(1)?.toLowerCase()}
                            </Typography>
                            <Box sx={{ display: "flex", pl: "10px", columnGap: "10px" }}>
                                <img src={plus} alt="Icon" />
                                <Typography variant='gradientText' sx={{ fontSize: "17px", fontWeight: "500", textTransform: "lowercase" }}>
                                    {`Add ${item}`}
                                </Typography>
                            </Box>
                        </Stack>
                    )
                })}
            </Box>
            <Stack justifyContent={"flex-end"} alignItems={"center"} px={6} direction={"row"} gap={3}
                sx={{
                    height: "55px",
                    borderTop: "1px solid #E4E4E4",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    position: "fixed",
                    bottom: "0px",
                    right: "0px",
                    zIndex: 999,
                    backgroundColor: "white"
                }}
            >

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
                    <Typography variant='gradientText'>Back</Typography>
                </Box>
                <Button type="submit" sx={{ maxWidth: "150px", height: "36px", fontSize: "16px", minWidth: { md: "150px" } }}>
                    Save
                </Button>
            </Stack>
        </Box>
    )
}

export default TargetAudienceModal
