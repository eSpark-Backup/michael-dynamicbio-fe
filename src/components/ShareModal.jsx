import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OutlinedInput from './outline-input'
import { link2, profilePicture, searchIcon, timer } from '../assets'
import { shareModalContent } from '../constant'

const ShareModal = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const [checkedCount, setCheckedCount] = useState(0);



    const handleCheck = (id) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    useEffect(() => {
        setCheckedCount(Object.values(checkedItems).filter(Boolean).length);
    }, [checkedItems]);


    return (
        <Box>
            <OutlinedInput startAdornment={searchIcon} placeholder={"Type a name"} />
            <Box sx={{ width: "100%", height: checkedCount === 0 ? "650px" : "550px", overflowY: "auto", display: "flex", flexDirection: "column", mb: "25px" }}>
                {shareModalContent.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            background: checkedItems[item.id]
                                ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%), linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04))"
                                : "#FCFCFC",
                            p: "15px",
                            borderRadius: '2px',
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "98%",
                            height: "85px",
                            marginTop: "15px",
                            transition: "background 0.3s ease",
                        }}
                    >
                        <Stack direction={"row"} gap={1}>
                            <img src={item.image} alt="Profile" style={{ width: "60px", height: "60px" }} />
                            <Stack direction={"column"}>
                                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: checkedItems[item.id] ? "#FFFFFF" : "#171717" }}>{item.name}</Typography>
                                <Typography sx={{ fontSize: "12px", fontWeight: "400", color: checkedItems[item.id] ? "#FFFFFF" : "#505050" }}>{item.designation}</Typography>
                                <Typography sx={{ fontSize: "12px", fontWeight: "400", color: checkedItems[item.id] ? "#FFFFFF" : "#505050" }}>{item.education}</Typography>
                            </Stack>
                        </Stack>
                        <Box>
                            <FormControlLabel
                                sx={{
                                    width: "100%",
                                    alignItems: "flex-start",
                                    padding: 0,
                                    margin: 0,
                                    gap: "10px",
                                    span: { padding: 0 },
                                }}
                                control={
                                    <Checkbox
                                        checked={!!checkedItems[item.id]}
                                        onChange={() => handleCheck(item.id)}
                                        sx={{
                                            "&.Mui-checked": {
                                                color: "#FFFFFF",
                                            },
                                        }}
                                    />
                                }
                                label=""
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
            {checkedCount > 0 &&
                <Box sx={{ my: "15px", mb: "40px", height: "60px" }}>
                    <OutlinedInput placeholder={"Type a name"} sx={{
                        height: "60px",
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                            height: "100%",
                        },

                    }} />
                </Box>
            }
            <Stack
                justifyContent={checkedCount === 0 ? "flex-start" : "flex-end"}
                alignItems={"center"}
                pl={4}
                pr={6}
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
                {
                    checkedCount === 0
                        ?
                        <Box sx={{ display: "flex", columnGap: "5px" }}>
                            <img src={link2} alt="Icon" style={{ width: "24px", height: "24px" }} />
                            <Typography variant='gradientText'>Copy link to post</Typography>
                        </Box>
                        :
                        <Box sx={{ display: "flex", flexDirection: "column", columnGap: '15px' }}>
                            {checkedCount === 1
                                ?
                                <Button sx={{ height: "36px", width: "150px", fontSize: "16px" }}>
                                    Send
                                </Button>
                                :
                                <Box sx={{ display: "flex", columnGap: "5px" }}>
                                    <Button sx={{ height: "36px", width: "150px", fontSize: "16px" }}>
                                        Send as a group
                                    </Button>
                                    <Button sx={{ height: "36px", width: "150px", fontSize: "16px" }}>
                                        Send separately
                                    </Button>
                                </Box>
                            }
                        </Box>
                }
            </Stack>
        </Box>
    );
};

export default ShareModal;
