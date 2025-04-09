import { Autocomplete, Box, Button, Checkbox, FormControlLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { close, searchIcon, user } from '../assets'
import { members } from '../constant'

const AddMembersModal = () => {
    const initialCheckedItems = members.reduce((acc, member) => {
        if (member.user || member.isMember) {
            acc[member.id] = true;
        }
        return acc;
    }, {});

    const [checkedItems, setCheckedItems] = useState(initialCheckedItems);
    const [searchTerm, setSearchTerm] = useState("");
    const hasMember = members.filter((item) => (item.isMember && checkedItems[item.id] || item?.user && checkedItems[item.id])).length;
    const totalChecklength = Object.values(checkedItems).filter((value) => value).length;

    const handleCheck = (id, item) => {
        const checkedCount = Object.values(checkedItems).filter(Boolean).length;


        const checkedMembers = members.filter(member => checkedItems.hasOwnProperty(member.id));


        const hasCheckedIsMember = checkedMembers.some(member => member.isMember);
        const hasCheckedUser = checkedMembers.some(member => member.user);

        setCheckedItems((prev) => {
            if (prev[id] && item.user && !hasCheckedIsMember) {
                return prev;
            }


            if (prev[id] && item.isMember && !hasCheckedIsMember && !hasCheckedUser) {
                return prev;
            }


            if (prev[id] && item.isMember && checkedCount === 1) {
                return prev;
            }


            if (!prev[id] && checkedCount < 4) {
                return { ...prev, [id]: true };
            }


            if (prev[id]) {
                const updatedChecked = { ...prev };
                delete updatedChecked[id];
                return updatedChecked;
            }

            return prev;
        });
    };



    const filterMembers = members.filter((item) => item?.name?.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Box sx={{ mt: "20px" }}>
            <Box sx={{ border: "1px solid #E4E4E4" }}>
                <TextField
                    placeholder="Search by name"
                    variant="standard"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <img src={searchIcon} alt="" />
                            </InputAdornment>
                        ),
                        endAdornment: null,
                    }}
                    sx={{
                        "& .MuiInputBase-root": {
                            borderBottom: "none",
                        },
                        "& .MuiInput-underline:before": {
                            borderBottom: "none !important",
                        },
                        "& .MuiInput-underline:after": {
                            borderBottom: "none !important",
                        },
                        height: "50px",
                        justifyContent: "center"
                    }}
                />
            </Box>
            <Box sx={{ height: "430px", border: "1px solid #E4E4E4", display: "flex", mb: "30px" }}>
                <Box sx={{ width: "60%", display: 'flex', flexDirection: "column", rowGap: '20px', mt: "15px", px: "10px", overflowY: "auto", pb: "10px" }}>
                    {filterMembers?.map((item, index) => (
                        <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }} key={index}>
                            <Box>
                                <FormControlLabel
                                    sx={{
                                        width: "100%",
                                        alignItems: "flex-start",
                                        padding: 0,
                                        margin: 0,
                                        gap: "0px",
                                        span: { padding: 0 },
                                    }}
                                    control={
                                        <Checkbox
                                            checked={!!checkedItems[item.id]}
                                            onChange={() => handleCheck(item.id, item)}
                                        />
                                    }
                                    label=""
                                />
                            </Box>
                            <img src={item?.image} alt="Avatar" style={{ width: "64px", height: "64px" }} />
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>{item?.name}</Typography>
                                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>{item?.role}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ width: "40%", borderLeft: "1px solid #E4E4E4" }}>
                    <Box sx={{ p: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E4E4E4" }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
                            {hasMember < totalChecklength ? totalChecklength - hasMember + " selected" : hasMember + " members"}
                        </Typography>
                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Unselect all</Typography>
                    </Box>
                    <Box sx={{ p: "10px", display: "flex", flexDirection: 'column', rowGap: '15px' }}>
                        {Object.keys(checkedItems).map((id) => {
                            if (checkedItems[id]) {
                                const member = members.find((item) => item.id == id);
                                return (
                                    <Box key={id} sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Box sx={{ display: 'flex', columnGap: "10px", alignItems: "center" }}>
                                            <img src={member?.image} alt="Avatar" style={{ width: "32px", height: "32px" }} />
                                            <Typography sx={{ fontSize: "16px", fontWeight: '500', color: "#171717" }}>
                                                {member?.name?.length > 21 ? member?.name?.slice(0, 18) + "..." : member?.name}
                                            </Typography>
                                        </Box>
                                        <img src={close} alt="" onClick={() => handleCheck(member?.id, member)} style={{ cursor: "pointer" }} />
                                    </Box>
                                );
                            }
                            return null;
                        })}
                    </Box>
                </Box>
            </Box>
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
                <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <Button
                        type="submit"
                        sx={{
                            maxWidth: "150px",
                            height: "36px",
                            fontSize: "16px",
                            minWidth: { md: "150px" },
                        }}
                    >
                        Invite
                    </Button>
                </Box>
            </Stack>
        </Box>
    )
}

export default AddMembersModal;
