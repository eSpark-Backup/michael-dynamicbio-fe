import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { conversation, send2, user } from '../assets'
import Button from './button'

const WelcomePreviewModal = ({ content, handleClose, handleSave }) => {
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "10px", mt: '20px', pb: "30px" }}>
                <img src={conversation} alt="Image" />
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Welcome to free</Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Group admin sent you this note</Typography>
                <Box sx={{ width: "90%", border: "1px solid #E4E4E4", borderRadius: "8px", p: "15px", display: "flex", flexDirection: "column", rowGap: "10px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                            <img src={user} alt="Avatar" style={{ width: "24px", height: "24px" }} />
                            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>rotten ria</Typography>
                            <Box sx={{ p: "5px 15px", backgroundColor: "#d3d3d3" }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Admin</Typography>
                            </Box>
                        </Stack>
                        <img src={send2} alt="" />
                    </Box>
                    <Typography sx={{ fontSize: "15px", fontWeight: "400", color: "#505050" }}>{content}</Typography>
                </Box>
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
                <Box
                    sx={{
                        width: "150px",
                        height: "36px",
                        borderRadius: "2px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
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
                            background:
                                "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                            mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                            WebkitMask:
                                "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                            WebkitMaskComposite: "destination-out",
                            maskComposite: "exclude",
                        },
                        cursor: "pointer",
                    }}
                    onClick={handleClose}
                >
                    <Typography variant="gradientText">Edit</Typography>
                </Box>
                <Button type="submit" sx={{ maxWidth: "150px", height: "36px", fontSize: "16px", minWidth: { md: "150px" } }} onClick={handleSave}>
                    Save
                </Button>
            </Stack>
        </>
    )
}

export default WelcomePreviewModal
