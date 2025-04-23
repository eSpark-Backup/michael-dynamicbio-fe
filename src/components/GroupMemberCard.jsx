import { Avatar, Badge, Box, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { three_vertical_dots, user } from '../assets'
import ConfirmationModal from './ConfirmationModal'

const GroupMemberCard = ({ name, role, groupRole, mainType, madeBy }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [selectedChoice, setSelectedChoice] = useState("")
    const [showPermissionModal, setPermissionModal] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const HandlePermission = (event) => {
        setSelectedChoice(event);
        setPermissionModal(true)
        handleCloseMenu()
    }

    return (
        <Box sx={{ borderTop: "1px solid #E4E4E4", p: "15px 25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color="success"
                >
                    <Avatar alt="Travis Howard" src={user} sx={{ width: 43, height: 43 }} />
                </Badge>
                <Stack direction={"column"}>
                    <Box sx={{ display: "flex", columnGap: "10px" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>{name}</Typography>
                        {groupRole === "owner" && <Box sx={{ p: "2px 10px", backgroundColor: "#d3d3d3" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Owner</Typography>
                        </Box>}
                    </Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>{role}</Typography>
                    {mainType === "admins" && groupRole === "admin" && <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Made admin by {madeBy}</Typography>}
                    {mainType === "blocked" && <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Blocked by {madeBy}</Typography>}
                </Stack>
            </Stack>
            <Box sx={{ display: "flex", columnGap: "4px" }}>
                <img src={three_vertical_dots} alt="" onClick={handleClick} style={{ cursor: "pointer" }} />
                {groupRole !== "owner" && mainType !== "blocked" && <Box
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
                >
                    <Typography variant="gradientText">Message</Typography>
                </Box>}
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {mainType === "members" && groupRole === "member" &&
                    <>
                        <MenuItem onClick={() => HandlePermission("manager")}>Make manager</MenuItem>
                        <MenuItem onClick={() => HandlePermission("owner")}>Make owner</MenuItem>
                        <MenuItem onClick={handleClose}>Remove from group</MenuItem>
                        <MenuItem onClick={handleClose}>Block from group</MenuItem>
                    </>
                }
                {mainType === "admins" && groupRole === "admin" &&
                    <>
                        <MenuItem onClick={() => HandlePermission("owner")}>Make owner</MenuItem>
                        <MenuItem onClick={handleClose}>Remove admin permissions</MenuItem>
                        <MenuItem onClick={handleClose}>Remove from group</MenuItem>
                        <MenuItem onClick={handleClose}>Block from group</MenuItem>
                    </>
                }
                {mainType === "blocked" &&
                    <>
                        <MenuItem onClick={() => HandlePermission("unblock")}>Unblock from group</MenuItem>
                        <MenuItem onClick={handleClose}>Delete all posts and comments</MenuItem>
                    </>
                }
                {(mainType === "members" || mainType === "admins") && groupRole === "owner" &&
                    <>
                        <MenuItem onClick={handleClose}>Remove admin permissions</MenuItem>
                    </>
                }
            </Menu>

            <ConfirmationModal open={showPermissionModal} handleClose={() => setPermissionModal(false)} title={selectedChoice === "manager" ? "Make group manager" : selectedChoice === "owner" ? "Make group owner" : "Unblock from group"}
                cancelButtonText={"Cancel"} acceptButtonText={"Confirm"}
                handleAccept={() => setPermissionModal(false)}
                handleCancel={() => setPermissionModal(false)}
                sx={{ width: { xs: "90%", sm: "60%", md: "45%", lg: "35%" } }}
            >

                <Typography sx={{ fontSize: 17, fontWeight: 300, color: "#595959" }}>
                    {selectedChoice === "manager"
                        ? "As a group manager, Areeba Shakeel will be able to manage members and conversations."
                        :
                        selectedChoice === "owner" ?

                            "As a group owner, Areeba Shakeel will be able to remove you from the group, delete the group, edit group details, and manage members and conversations."
                            :
                            "Areeba Shakeel will become a member of the group and be able to interact with the group again."
                    }
                    <Typography
                        sx={{ fontSize: 17, fontWeight: 300, cursor: "pointer" }}
                        variant="gradientText"
                        component={"span"}
                    >
                        Learn More
                    </Typography>
                </Typography>


            </ConfirmationModal>
        </Box>
    )
}

export default GroupMemberCard
