import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { gradientRightArrow } from '../../assets'
import SettingsPage from './SettingsPage'

const VisibilitySettings = () => {
    const [showSettingsPage, setShowSettingsPage] = useState(false)
    const [selectedSettings, setSelectedSettings] = useState("")

    const [options, setOptions] = useState({
        profileViewingOption: "Your name and headline",
        showConnections: true,
        showLastName: true,
        showOrganizationsAndInterests: true,
        showEmail: true
    })

    const HandleSettings = (setting) => {
        setSelectedSettings(setting)
        setShowSettingsPage(true)
    }

    const handleClose = () => {
        setSelectedSettings("")
        setShowSettingsPage(false)
    }

    if (showSettingsPage) {
        return (
            <SettingsPage handleClose={handleClose} selectedSetting={selectedSettings} values={options} />
        )
    }

    return (
        <Box>
            <Typography sx={{ fontSize: "20px", fontWeight: "500", color: "#171717", px: "16px" }}>Visibility of your profile & network</Typography>
            <Box sx={{ mt: "10px" }}>
                <Box sx={{ borderBottom: "1px solid #E4E4E4", py: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => HandleSettings("profileViewingOption")}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "100", color: "#505050", pl: "16px" }}>Profile viewing options</Typography>
                    <Box sx={{ display: "flex", columnGap: "15px" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "100", color: "#505050", pl: "16px" }}>{options?.profileViewingOption}</Typography>
                        <img src={gradientRightArrow} alt="" style={{ marginRight: "16px" }} />
                    </Box>
                </Box>
                <Box sx={{ borderBottom: "1px solid #E4E4E4", py: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "100", color: "#505050", pl: "16px" }}>Edit your public profile</Typography>
                    <img src={gradientRightArrow} alt="" style={{ marginRight: "16px" }} />
                </Box>
                <Box sx={{ borderBottom: "1px solid #E4E4E4", py: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => HandleSettings("showConnections")}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "100", color: "#505050", pl: "16px" }}>Who can see your connections</Typography>
                    <Box sx={{ display: "flex", columnGap: "15px" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "100", color: "#505050", pl: "16px" }}>{options?.showConnections ? "On" : "Off"}</Typography>
                        <img src={gradientRightArrow} alt="" style={{ marginRight: "16px" }} />
                    </Box>
                </Box>
                <Box sx={{ borderBottom: "1px solid #E4E4E4", py: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => HandleSettings("showLastName")}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "100", color: "#505050", pl: "16px" }}>Who can see your last name</Typography>
                    <img src={gradientRightArrow} alt="" style={{ marginRight: "16px" }} />
                </Box>
                <Box sx={{ borderBottom: "1px solid #E4E4E4", py: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => HandleSettings("showOrganizationsAndInterests")}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "100", color: "#505050", pl: "16px" }}>Representing your organizations and interests</Typography>
                    <Box sx={{ display: "flex", columnGap: "15px" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "100", color: "#505050", pl: "16px" }}>{options?.showOrganizationsAndInterests ? "On" : "Off"}</Typography>
                        <img src={gradientRightArrow} alt="" style={{ marginRight: "16px" }} />
                    </Box>
                </Box>
                <Box sx={{ py: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => HandleSettings("showEmail")}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "100", color: "#505050", pl: "16px" }}>Profile discovery using email address</Typography>
                    <Box sx={{ display: "flex", columnGap: "15px" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "100", color: "#505050", pl: "16px" }}>{options?.showEmail ? "On" : "Off"}</Typography>
                        <img src={gradientRightArrow} alt="" style={{ marginRight: "16px" }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default VisibilitySettings
