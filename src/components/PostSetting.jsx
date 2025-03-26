import { Box, Button, FormControlLabel, Radio, RadioGroup, Stack, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import { rightArrow } from '../assets'
import DynamicModal from './dynamic-modal'
import TargetAudienceModal from './TargetAudienceModal'

const PostSetting = () => {
    const [showTargetModal, setTargetModal] = useState(false)
    return (
        <Box sx={{ mt: "30px", display: "flex", flexDirection: "column", rowGap: "10px" }}>
            <Typography sx={{ color: "#171717", fontSize: "20px" }}>Who can see your post?</Typography>
            <RadioGroup name="share" defaultValue="anyone" sx={{ width: "100%", px: "0px", marginRight: "0px !important" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "15px" }}>
                    <Stack direction={"column"}>
                        <Typography sx={{ color: "#171717", fontSize: "17px", fontWeight: "500" }}>Anyone</Typography>
                        <Typography sx={{ color: "#505050", fontSize: "14px", fontWeight: "500" }}>Anyone on or off LinkedIn</Typography>
                    </Stack>
                    <FormControlLabel value="anyone" control={<Radio sx={{ marginRight: "0px !important" }} />} sx={{ marginRight: "0px !important" }} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "15px" }}>
                    <Stack direction={"row"} gap={1} sx={{ cursor: "pointer" }} onClick={() => setTargetModal(true)}>
                        <Typography sx={{ color: "#171717", fontSize: "17px", fontWeight: "500" }}>Targeted audience</Typography>
                        <img src={rightArrow} alt="Icon" />
                    </Stack>
                    <FormControlLabel value="target" control={<Radio sx={{ marginRight: "0px !important" }} />} sx={{ marginRight: "0px !important" }} />
                </Box>
            </RadioGroup>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "35px" }}>
                <Stack direction={"column"}>
                    <Typography sx={{ color: "#171717", fontSize: "17px", fontWeight: "500" }}>Comment control</Typography>
                    <Typography sx={{ color: "#505050", fontSize: "14px", fontWeight: "500" }}>Anyone</Typography>
                </Stack>
                <img src={rightArrow} alt="Icon" style={{ marginRight: "16px" }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: "35px" }}>
                <Stack direction={"column"}>
                    <Typography sx={{ color: "#171717", fontSize: "17px", fontWeight: "500" }}>Brand partnership</Typography>
                    <Typography sx={{ color: "#505050", fontSize: "14px", fontWeight: "500" }}>Off</Typography>
                </Stack>
                <Switch />
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
                    Done
                </Button>
            </Stack>

            <DynamicModal open={showTargetModal} handleClose={() => setTargetModal(false)} title={"Target audience settings"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} styledHeader={true} hideFooter={true} smallModal={true}>
                <TargetAudienceModal />
            </DynamicModal>
        </Box>
    )
}

export default PostSetting;
