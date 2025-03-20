import { Autocomplete, Box, Button, Chip, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { chipClose, profilePicture, three_vertical_dots } from '../assets';
import { groupMembers } from '../constant';

const GroupChatModal = () => {
    const [selectedNames, setSelectedNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [removedIndex, setRemovedIndex] = useState(0);
    const options = [
        { label: "John Doe", id: 1 },
        { label: "Jane Smith", id: 2 },
        { label: "Alice Johnson", id: 3 },
        { label: "Bob Brown", id: 4 },
        { label: "Bob Brown2", id: 5 },
        { label: "Bob Brown3", id: 6 },
        { label: "Bob Brown4", id: 7 },
        { label: "Bob Brown5", id: 8 },
    ];
    const open = Boolean(menuAnchor);

    const handleClick = (event, id) => {
        setMenuAnchor({ id, anchor: event.currentTarget });
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setMenuAnchor(null);
    };

    const handleRemove = () => {
        setRemovedIndex(menuAnchor?.id)
        setMenuAnchor(null);
    }

    useEffect(() => { console.log(removedIndex) }, [removedIndex])
    return (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px", pt: "20px" }}>
            <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>Sample</Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>3 members . Last activity 1m ago</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, rowGap: "10px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", width: { xs: "100%", sm: "90%" }, border: "1px solid #E4E4E4", p: "5px" }}>
                    {selectedNames?.map((person) => {
                        return (
                            <Chip
                                key={person.id}
                                label={person.label}
                                onDelete={() =>
                                    setSelectedNames(selectedNames.filter((p) => p.id !== person.id))
                                }
                                sx={{ backgroundColor: "#e0e0e0", fontWeight: "bold" }}
                                deleteIcon={<img src={chipClose} style={{ width: "6px", height: "6px" }} />}
                            />
                        )
                    })}

                    <Autocomplete
                        multiple
                        options={options}
                        getOptionLabel={(option) => option.label}
                        value={selectedNames}
                        onChange={(event, newValue) => {
                            const uniqueValues = newValue.filter(
                                (v, index, self) => index === self.findIndex((t) => t.id === v.id)
                            );

                            setSelectedNames(uniqueValues);


                            if (newValue.length > selectedNames.length) {
                                console.log("Item selected:", newValue[newValue.length - 1]);
                            }
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        filterSelectedOptions
                        renderTags={() => null}
                        open={searchTerm.length > 0}
                        onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={"Type a name or multiple names"}
                                variant="standard"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: null,
                                }}
                                sx={{
                                    minWidth: 200,
                                    "& .MuiInputBase-root": {
                                        borderBottom: "none",
                                    },
                                }}
                            />
                        )}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option.id}>
                                {option.label}
                            </Box>
                        )}
                        className={'custom-autocomplete'}
                    />

                </Box>
                <Button disabled={selectedNames?.length === 0} sx={{ width: { xs: "100%", sm: "5%" }, height: "40px" }}>
                    Add
                </Button>
            </Box>
            <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>Members</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "300px",
                overflowY: "auto", // Use "auto" to show scrollbar only when needed
                mb: '80px',
            }}>
                {groupMembers?.map((item, index) => (
                    <Box
                        sx={{
                            py: "15px",
                            borderBottom: index !== groupMembers?.length - 1 ? "1px solid #e0e0e0" : "none",
                            display: 'flex',
                            justifyContent: "space-between",
                            alignItems: "center", // Ensure items are aligned properly
                        }}
                        key={index}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
                            <Box sx={{ width: "48px", height: "48px", position: "relative" }}>
                                <img src={item?.image} alt="user" style={{ width: "100%", height: '100%', borderRadius: "50%" }} />
                                <Box sx={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#12B76A",
                                    border: "1.5px solid #FFFFFF",
                                    borderRadius: "50%",
                                    position: "absolute",
                                    right: 0,
                                    bottom: 0
                                }} />
                            </Box>
                            <Stack>
                                <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>{item?.name}</Typography>
                                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>{item?.role}</Typography>
                            </Stack>
                        </Box>
                        {removedIndex === item?.id ? (
                            <Stack direction={"column"} gap={"3px"}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
                                    {item?.name} will be informed you have removed them.
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", columnGap: "10px" }}>
                                    <Box
                                        sx={{
                                            width: "80px",
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
                                                background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                                mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                                                WebkitMask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                                                WebkitMaskComposite: "destination-out",
                                                maskComposite: "exclude",
                                            },
                                            cursor: "pointer"
                                        }}
                                        onClick={() => setRemovedIndex(0)}
                                    >
                                        <Typography variant='gradientText'>Cancel</Typography>
                                    </Box>
                                    <Button sx={{ maxWidth: "80px", height: "36px", fontSize: "16px", minWidth: { md: "80px" } }}>
                                        Remove
                                    </Button>
                                </Box>
                            </Stack>
                        ) : (
                            <img src={three_vertical_dots} alt="Icon" style={{ cursor: "pointer" }} onClick={(e) => handleClick(e, item.id)} />
                        )}
                    </Box>
                ))}
            </Box>
            <Stack justifyContent={"space-between"} alignItems={"center"} px={2} direction={{ xs: "column", sm: "row" }} gap={3}
                sx={{
                    minHeight: "55px",
                    borderTop: "1px solid #E4E4E4",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    position: "fixed",
                    bottom: "0px",
                    right: "0px",
                    zIndex: 999,
                    backgroundColor: "white",
                    pb: { xs: "10px", sm: "0px" }
                }}
            >


                <Box sx={{ display: 'flex', columnGap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Anyone sho joins this chat will see previous messages. </Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400" }} variant='gradientText'>Learn more</Typography>
                </Box>
                <Button sx={{ height: "36px", maxWidth: "150px" }}>
                    Done
                </Button>
            </Stack>
            <Menu
                anchorEl={menuAnchor?.anchor}
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

                <MenuItem onClick={handleRemove}>Remove</MenuItem>
                <MenuItem onClick={handleClose}>Report / Block</MenuItem>
            </Menu>
        </Box>
    )
}

export default GroupChatModal
