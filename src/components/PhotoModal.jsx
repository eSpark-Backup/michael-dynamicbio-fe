import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import OutlinedInput from './outline-input'
import { article, deleteIcon, emoji, event, photo, plus, video } from '../assets'

const PhotoModal = ({ files, placeholder, handleClose }) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    useEffect(() => {
        if (files.length > 0) {
            setSelectedFiles(files);
        }

    }, [files]);

    const HandlePostTypeClick = (item) => {
        if (item === "Photo") {
            fileInputRef.current.click();
        } else {
            console.log(`Selected: ${item}`);
        }
    };
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleDeleteFile = (index) => {
        setSelectedFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((_, i) => i !== index);
            if (updatedFiles.length === 0) {
                handleClose();
            }
            return updatedFiles;
        });
    };
    return (
        <Box sx={{ display: 'flex', flexDirection: "column", rowGap: "15px" }}>
            <OutlinedInput placeholder={placeholder}
                sx={{
                    height: "60px",
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        height: "100%",
                    },

                }} />
            <Box sx={{ display: "flex", backgroundColor: "#FCFCFC", borderRadius: "4px", height: "440px", p: "15px", justifyContent: "space-between" }}>
                <Box sx={{ width: "80%", height: "100%", position: 'relative', backgroundImage: selectedFiles?.length > 0 ? `url(${URL.createObjectURL(selectedFiles[selectedFiles?.length - 1])})` : "", backgroundPosition: "center", backgroundSize: "cover" }}>
                    {selectedFiles?.length > 0 && <img src={deleteIcon} alt="Icon" style={{ width: '24px', height: "24px", position: "absolute", right: "15px", top: "15px", cursor: "pointer" }} onClick={() => handleDeleteFile(selectedFiles.length - 1)} />}
                </Box>
                <Box sx={{
                    width: '18%',
                    height: "100%",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                    alignItems: selectedFiles.length === 1 ? "center" : "flex-start",
                    justifyContent: selectedFiles.length === 1 ? "center" : "flex-start"
                }}>
                    {selectedFiles?.length > 0 && selectedFiles?.map((item, index) => {
                        return (
                            <Box
                                key={index}
                                sx={{
                                    width: "95%",
                                    minHeight: "125px",
                                    display: "flex",
                                    justifyContent: index === selectedFiles.length - 1 ? "center" : "flex-end",
                                    alignItems: "center",
                                    backgroundImage: `url(${URL.createObjectURL(item)})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    borderRadius: "4px",
                                    position: "relative"
                                }}
                            >
                                {index === selectedFiles.length - 1 ? (
                                    <img src={plus} alt="Add" style={{ width: "40px", height: "40px", cursor: "pointer" }} onClick={() => fileInputRef.current.click()} />
                                ) : (
                                    <img
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
                                        onClick={() => handleDeleteFile(index)}
                                    />
                                )}
                            </Box>
                        )
                    })}
                </Box>

            </Box>
            <img src={emoji} alt="Icon" style={{ width: "24px", height: "24px" }} />
            <Box sx={{ height: "50px" }}>
                {selectedFiles?.length === 0 && <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", rowGap: "10px", columnGap: "20px" }}>
                    {[{ img: photo, label: "Photo" }, { img: video, label: "Video" }, { img: article, label: "Article" }, { img: event, label: "Event" }]
                        .map((item, index) => (
                            <Box key={index} sx={{ width: { xs: "100%", md: "180px" }, height: "50px", padding: "20px", backgroundColor: "#F8FCFF", borderRadius: "2px", display: "flex", columnGap: "15px", alignItems: "center", cursor: "pointer" }} onClick={() => HandlePostTypeClick(item.label)}>
                                <img style={{ width: "24px", height: "24px" }} src={item.img} alt={item.label} />
                                <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#505050" }}>{item.label}</Typography>
                            </Box>
                        ))}
                </Box>}
            </Box>
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                multiple
                onChange={handleFileChange}
            />
        </Box>
    )
}

export default PhotoModal
