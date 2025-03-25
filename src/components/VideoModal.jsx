import { Box, OutlinedInput } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { deleteIcon, plus } from '../assets';

const VideoModal = ({ placeholder, file, handleClose }) => {
    const [videoData, setVideoData] = useState({ video: null, thumbnail: null });
    const fileInputRef = useRef(null);
    const [newThumbnail, setNewThumbnail] = useState(null)
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false)

    useEffect(() => {
        if (file) {
            setVideoData(file);
        }
    }, [file]);

    const HandleDelete = () => {
        setVideoData({ video: null, thumbnail: null });
        setNewThumbnail(null);
        setThumbnailPreview(null);
        setIsFileUploaded(false);

        // Reset the file input field
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }

        handleClose();
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0]; // Store file in a variable
            setNewThumbnail(file);
            setIsFileUploaded(true);

            // Reset the input value after setting the new file
            setTimeout(() => {
                fileInputRef.current.value = null;
            }, 0);
        }
    };

    useEffect(() => {
        if (newThumbnail) {
            const objectURL = URL.createObjectURL(newThumbnail);
            setThumbnailPreview(objectURL);

            return () => URL.revokeObjectURL(objectURL);
        } else if (videoData.thumbnail) {

            if (videoData.thumbnail instanceof File) {
                const objectURL = URL.createObjectURL(videoData.thumbnail);
                setThumbnailPreview(objectURL);

                return () => URL.revokeObjectURL(objectURL);
            } else {
                setThumbnailPreview(videoData.thumbnail);
            }
        }
    }, [newThumbnail, videoData.thumbnail]);


    return (
        <Box sx={{ display: 'flex', flexDirection: "column", rowGap: "15px" }}>
            <OutlinedInput
                placeholder={placeholder}
                sx={{
                    height: "60px",
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        height: "100%",
                    },
                }}
            />
            <Box sx={{
                display: "flex", backgroundColor: "#FCFCFC", borderRadius: "4px", height: "440px", p: "15px", justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" }, rowGap: '10px',
                overflowY: "auto"
            }}>

                <Box sx={{ width: { xs: "100%", md: "80%" }, height: "100%", position: 'relative', maxHeight: { xs: "230px", md: "100%" } }}>
                    {videoData.video && (
                        <video
                            src={URL.createObjectURL(videoData.video)}
                            controls
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
                        />
                    )}
                    <img
                        src={deleteIcon}
                        alt="Delete Icon"
                        style={{ width: '24px', height: "24px", position: "absolute", right: "15px", top: "15px", cursor: "pointer" }}
                        onClick={HandleDelete}
                    />
                </Box>


                <Box
                    sx={{
                        width: { xs: "100%", md: '18%' },
                        height: "100%",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                        alignItems: newThumbnail ? "flex-start" : "center",
                        justifyContent: newThumbnail ? "flex-start" : "center"
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: "100%", md: "95%" },
                            minHeight: "125px",
                            display: "flex",
                            justifyContent: isFileUploaded ? "flex-end" : "center",
                            alignItems: "center",
                            backgroundImage: thumbnailPreview ? `url(${thumbnailPreview})` : "none",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            borderRadius: "4px",
                            position: "relative",
                            backgroundColor: thumbnailPreview ? "transparent" : "#F0F0F0",
                        }}
                    >
                        {isFileUploaded ? <img
                            src={deleteIcon}
                            alt="Delete"
                            style={{
                                width: "24px",
                                height: "24px",
                                cursor: "pointer",
                                position: "absolute",
                                top: "10px",
                                right: "10px"
                            }}
                        /> : <img
                            src={plus}
                            alt="Add"
                            style={{ width: "40px", height: "40px", cursor: "pointer" }}
                            onClick={() => fileInputRef.current.click()}
                        />}
                    </Box>
                </Box>
            </Box>
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </Box>
    );
}

export default VideoModal;
