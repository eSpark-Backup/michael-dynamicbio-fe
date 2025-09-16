import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Button from './button'

const NotificationSettingsModal = ({ onSuccess }) => {
    return (
        <Box sx={{ marginTop: "30px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050",pb:"30px" }}>Since all posts in this group require admin review, group admins will receive all group notifications.</Typography>
            <Stack
                justifyContent={"flex-end"}
                alignItems={"center"}
                px={6}
                direction={"row"}
                gap={3}
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
                    backgroundColor: "white",
                }}
            >
                <Button
                    onClick={onSuccess}
                    type="submit"
                    sx={{
                        maxWidth: "150px",
                        height: "36px",
                        fontSize: "16px",
                        minWidth: { md: "150px" },
                    }}
                >
                    OK
                </Button>
            </Stack>
        </Box>
    )
}

export default NotificationSettingsModal
