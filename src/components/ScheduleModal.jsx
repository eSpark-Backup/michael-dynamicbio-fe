import { Box, Typography } from '@mui/material'
import React from 'react'
import OutlinedInput from './outline-input'
import { gradientRightArrow } from '../assets'

const ScheduleModal = () => {
    return (
        <Box sx={{ p: "40px 10px 0px 10px", display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>
                Tue, Feb 25, 6:25 PM Pakuistan Standard Time, based on your location
            </Typography>
            <OutlinedInput label={"Date"} placeholder={"2/25/2025"}
                sx={{
                    height: "40px",
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

                }}
            />
            <OutlinedInput label={"Time"} placeholder={"6:45 PM"}
                sx={{
                    height: "40px",
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

                }}
            />
            <Box sx={{ paddingTop: "20px", display: "flex", columnGap: '10px', alignItems: "center", cursor: "pointer" }}>
                <Typography variant='gradientText' sx={{ fontSize: "14px", fontWeight: "400" }}>View all scheduled post</Typography>
                <img src={gradientRightArrow} alt="Icon" style={{ width: "24px", height: "24px" }} />
            </Box>
        </Box>
    )
}

export default ScheduleModal
