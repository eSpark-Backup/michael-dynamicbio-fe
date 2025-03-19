import { Box, OutlinedInput, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { emoji, event, photo, poll, video } from '../assets';

const PostModal = ({ fileChange, placeholder, videoChange, openModal }) => {
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);


    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            fileChange(files);
        }
    };

    const HandleItemClicked = (item) => {
        if (item?.label === "Photo") {
            fileInputRef.current.click();
        }
        else if (item?.label === "Video") {
            videoInputRef.current.click();
        }
        else if (item?.label === "Event") {
            openModal("Event")
        }
        else if (item?.label === "Poll") {
            openModal("Poll")
        }
    }

    const handleVideoChange = async (e) => {
        videoChange(e)
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", rowGap: "15px" }}>
            <OutlinedInput
                placeholder={placeholder}
                sx={{
                    height: "60px",
                    width: "100%",
                    "& .MuiOutlinedInput-root": { height: "100%" },
                }}
            />
            <Box sx={{ height: "440px" }}></Box>
            <img src={emoji} alt="Icon" style={{ width: "24px", height: "24px" }} />
            <Box sx={{ height: "50px" }}>
                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", rowGap: "10px", columnGap: "20px" }}>
                    {[{ img: photo, label: "Photo" }, { img: video, label: "Video" }, { img: poll, label: "Poll" }, { img: event, label: "Event" }]
                        .map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: { xs: "100%", md: "180px" },
                                    height: "50px",
                                    padding: "20px",
                                    backgroundColor: "#F8FCFF",
                                    borderRadius: "2px",
                                    display: "flex",
                                    columnGap: "15px",
                                    alignItems: "center",
                                    cursor: "pointer"
                                }}
                                onClick={() => HandleItemClicked(item)}
                            >
                                <img style={{ width: "24px", height: "24px" }} src={item.img} alt={item.label} />
                                <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#505050" }}>{item.label}</Typography>
                            </Box>
                        ))}
                </Box>
            </Box>


            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <input
                type="file"
                ref={videoInputRef}
                accept="video/*"
                style={{ display: "none" }}
                onChange={handleVideoChange}
            />
        </Box>
    );
};

export default PostModal;