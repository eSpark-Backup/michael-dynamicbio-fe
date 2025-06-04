import { Box, FormControlLabel, Radio, Stack, Typography } from '@mui/material'
import React from 'react'
import OutlinedInput from './outline-input'
import { addDays } from '../utils'
import { emoji, timer } from '../assets'
import Button from './button'

const ViewPollPost = ({ values, title, setTitle, numberOfVotes, handleScheduleClick, onSuccess, isLoading }) => {
    return (
        <Box sx={{ mb: "30px", display: "flex", flexDirection: "column", rowGap: '20px' }}>
            <OutlinedInput
                value={title}
                onInputChange={(e) => setTitle(e.target.value)}
                placeholder={"What do you want to talk about?"}
                sx={{
                    height: "60px",
                    width: "100%",
                    "& .MuiOutlinedInput-root": { height: "100%" },
                }}
            />
            <Box sx={{ border: "1px solid #E4E4E4", borderRadius: "4px", p: "15px 0px 15px 0px", display: "flex", flexDirection: "column", rowGap: "15px", mb: "100px" }}>
                <Box sx={{ border: "1px solid #E4E4E4", borderRadius: "2px", backgroundColor: "#F2F8FD", p: "10px 20px" }}>
                    <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>
                        {values?.question}
                    </Typography>

                </Box>
                {values?.options?.map((item, index) => (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            minHeight: "20px",
                            maxHeight: "45px",
                            background: "#FCFCFC",
                            cursor: "pointer",
                            p: "10px 20px",
                        }}
                        key={index}
                    >
                        <FormControlLabel
                            value={item.value}
                            control={
                                <Radio
                                    sx={{
                                        marginRight: "0px !important",
                                        p: "0px 9px 0px 5px",
                                        color: "default",
                                        "&.Mui-checked": {
                                            color: "#fff",
                                        },
                                    }}
                                />
                            }
                            sx={{
                                marginRight: "0px !important",
                                p: "0px 9px 0px 4px",
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#171717",
                            }}
                        >
                            {item}
                        </Typography>
                    </Box>
                ))}
                <Box sx={{ display: "flex", columnGap: "5px", alignItems: "center", pl: "3px" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400" }} variant='gradientText'>{numberOfVotes} votes •</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>{values?.endDate} days left</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400" }} variant='gradientText'>•</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400" }} variant='gradientText'>view results</Typography>
                </Box>
            </Box>
            {/* <img
                src={emoji}
                alt="Icon"
                style={{ width: "24px", height: "24px", marginBottom: "15px" }}
            /> */}
            <Stack
                justifyContent={"space-between"}
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
                    justifyContent: "flex-end"
                }}
            >
                <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                    <img
                        src={timer}
                        alt="Icon"
                        style={{ width: "24px", height: "24px", cursor: "pointer" }}
                        onClick={handleScheduleClick}
                    />
                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={onSuccess}
                        type="submit"
                        sx={{
                            maxWidth: "150px",
                            height: "36px",
                            fontSize: "16px",
                            minWidth: { md: "150px" },
                        }}
                    >
                        Post
                    </Button>
                </Box>
            </Stack>
        </Box>
    )
}

export default ViewPollPost
