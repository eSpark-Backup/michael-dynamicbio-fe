import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import OutlinedInput from './outline-input'
import { searchIcon } from '../assets'
import GroupMemberCard from './GroupMemberCard'
import { groupAdminsData, groupMembersData } from '../constant'

const GroupAdmins = () => {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Stack direction={"row"} gap={1}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>Admins</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>•</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>2 people</Typography>
                </Stack>
                <Box sx={{ width: "35%" }}>
                    <OutlinedInput placeholder={"Search group admins"} startAdornment={searchIcon} sx={{
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
                {groupAdminsData?.map((item, index) => {
                    return (
                        <GroupMemberCard mainType={"admins"} name={item?.name} role={item?.role} groupRole={item?.groupRole} key={index} madeBy={item?.madeBy} />
                    )
                })}
            </Box>
        </Paper>
    )
}

export default GroupAdmins
