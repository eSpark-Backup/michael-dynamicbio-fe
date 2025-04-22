import { Avatar, Badge, Box, Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import OutlinedInput from './outline-input'
import { searchIcon, three_vertical_dots, user } from '../assets'
import GroupMemberCard from './GroupMemberCard'
import { groupMembersData } from '../constant'

const GroupMembers = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
            <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Stack direction={"column"}>
                    <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>Automatic welcome note</Typography>
                        <Box sx={{ background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)", p: "5px 10px", borderRadius: "4px" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#fff" }}>On</Typography>
                        </Box>
                    </Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>New members will see the note when they visit the group. <span style={{ fontSize: "14px", fontWeight: "600", color: "#505050" }}>Learn more</span></Typography>
                </Stack>
                <Button sx={{ background: "transparent", border: "1px solid black", width: "fit-content", height: "36px", borderRadius: "16px", ":hover": { background: "transparent", color: "black" } }}>Edit</Button>
            </Paper>
            <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Stack direction={"row"} gap={1}>
                        <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>Members</Typography>
                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>•</Typography>
                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>2 people</Typography>
                    </Stack>
                    <Box sx={{ width: "35%" }}>
                        <OutlinedInput placeholder={"Search group members"} startAdornment={searchIcon} sx={{
                            height: "42px",
                            width: "100%",
                            backgroundColor: '#FCFCFC',
                            borderRadius: "4px",
                            "& .MuiOutlinedInput-root": {
                                border: "1px solid #E4E4E4",
                                height: "100%",
                                backgroundColor: '#FCFCFC',
                                borderRadius: "4px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #E4E4E4",

                            },

                        }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {/* <GroupMemberCard />
                    <GroupMemberCard /> */}
                    {groupMembersData?.map((item, index) => {
                        return (
                            <GroupMemberCard name={item?.name} role={item?.role} groupRole={item?.groupRole} />
                        )
                    })}
                </Box>
            </Paper>
        </Box>
    )
}

export default GroupMembers
