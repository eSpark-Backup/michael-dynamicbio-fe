import { Box, Divider, Menu, MenuItem, OutlinedInput, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { article, close, comment, copyLink, deleteIcon, downArrowFilled, dummyPhoto, earth, editBlue, like, photo, pin, postPicture, repost, three_vertical_dots, user, video, world } from '../../../assets'
import { generateThumbnail } from '../../../utils'
import { DynamicModal, EventModal, PhotoModal, PollModal, PostChoiceModal, PostModal, ScheduleModal, VideoModal, ViewEventModal } from '../../../components'
import { useNavigate } from 'react-router-dom'

const PagePosts = () => {
    const [activeItem, setActiveItem] = useState("Published")
    const userData = JSON.parse(localStorage.getItem("user"));
    const [showPostModal, setShowPostModal] = useState(false)
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [videoData, setVideoData] = useState({ video: null, thumbnail: null });
    const [videoModal, setVideoModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showScheduleModal, setShowScheduleModal] = useState(false)
    const [pollModal, setPollModal] = useState(false)
    const [eventModal, setEventModal] = useState(false)
    const [eventFormValues, setEventFormValues] = useState({});
    const [viewEventModal, setViewEventModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [postChoiceModal, setPostChoiceModal] = useState(false)
    const navigate = useNavigate()


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const HandlePostTypeClick = (item) => {
        if (item === "Photo") {
            fileInputRef.current.click();
        }
        else if (item === "Video") {
            videoInputRef.current.click();
        }
        else if (item === "Event") {
            setEventModal(true)
            setShowPostModal(false)
        }
        else if (item === "Poll") {
            setPollModal(true)
            setShowPostModal(false)
        }
        else if (item === "Article") {
            navigate("/article")
        }
    }

    useEffect(() => {
        if (selectedFiles?.length > 0) {
            setShowPostModal(false)
            setShowModal(true)
        }
    }, [selectedFiles])

    useEffect(() => {
        if (videoData?.video) {
            setVideoModal(true)
            setShowPostModal(false)
        }
    }, [videoData])

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleVideoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const thumbnail = await generateThumbnail(file);
                setVideoData({ video: file, thumbnail });
            } catch (error) {
                console.error("Error generating thumbnail:", error);
            }
        }
    };

    const HandleSelectedFile = (files) => {
        setSelectedFiles(files)
    }

    const HandleModalClose = () => {
        setShowModal(false)
        setShowPostModal(false)
        setSelectedFiles([]);
    }

    const HandleVideoModalClose = () => {
        setVideoModal(false)
        setVideoData({ video: null, thumbnail: null })
        if (videoInputRef.current) {
            videoInputRef.current.value = null;
        }
    }


    const handleFormSubmit = (formData) => {
        setEventFormValues(formData)
        setEventModal(false)
        setViewEventModal(true)
    };

    const handleEditClick = () => {
        setEventModal(true)
        setViewEventModal(false)
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
            <Paper>
                <Typography sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}>Page posts</Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Manage your page's organic and paid content</Typography>
                <Box sx={{ mt: "20px", display: "flex", columnGap: "15px" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717", cursor: "pointer", lineHeight: "normal" }} variant={activeItem === "Published" ? "gradientText" : "body1"} onClick={() => setActiveItem("Published")}>Published</Typography>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717", cursor: "pointer", lineHeight: "normal" }} variant={activeItem === "Page ads" ? "gradientText" : "body1"} onClick={() => setActiveItem("Page ads")}>Page ads</Typography>
                </Box>
            </Paper>
            <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", columnGap: "30px", flexDirection: { xs: "column", md: "row" }, rowGap: "5px" }}>
                    <img style={{ width: "73px", height: "73px", borderRadius: "50%" }} src={userData?.profileImage || user} alt="User" />
                    <OutlinedInput placeholder='Start a post' sx={{ height: "73px", width: "100%", cursor: "pointer" }} readOnly onClick={() => setShowPostModal(true)} />
                </Box >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", rowGap: "10px" }}>
                    {[{ img: photo, label: "Photo" }, { img: video, label: "Video" }, { img: article, label: "Article" }]
                        .map((item, index) => (
                            <Box key={index} sx={{ width: { xs: "100%", md: "180px" }, height: "50px", padding: "20px", backgroundColor: "#F8FCFF", borderRadius: "2px", display: "flex", columnGap: "15px", alignItems: "center", cursor: "pointer" }} onClick={() => HandlePostTypeClick(item.label)}>
                                <img style={{ width: "24px", height: "24px" }} src={item.img} alt={item.label} />
                                <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#505050" }}>{item.label}</Typography>
                            </Box>
                        ))}
                </Box>
            </Paper>

            <Box>
                <Box sx={{ backgroundColor: "#fff", borderTopRightRadius: "4px", borderTopLeftRadius: "4px", p: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #E4E4E4" }}>
                    <Typography>Get up to 27,000 more video views by boosting this post.</Typography>
                    <Box sx={{
                        width: "90px", height: "36px", borderRadius: "2px", display: "flex", justifyContent: "center", alignItems: "center",
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
                    }}>
                        <Typography variant='gradientText'>Boost</Typography>
                    </Box>
                </Box>
                <Paper sx={{ borderTopRightRadius: "0px", borderTopLeftRadius: "0px", display: "flex", flexDirection: "column", rowGap: "15px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#505050" }}>By rotten ria . 3/5/2025</Typography>
                        <img src={three_vertical_dots} alt="Icon" onClick={handleClick} style={{ cursor: "pointer" }} />
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", columnGap: "20px" }}>
                        <img src={user} alt="Image" style={{ width: "73px", height: "73px" }} />
                        <Stack>
                            <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>RottenRia</Typography>
                            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#505050" }}>0 followers</Typography>
                            <Box sx={{ display: "flex", columnGap: "4px" }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#505050" }}>now . </Typography>
                                <img src={earth} alt="Icon" />
                            </Box>
                        </Stack>
                    </Box>
                    <img src={postPicture} alt="Post" />
                    <Box sx={{ borderTop: "1px solid #E4E4E4", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F8FCFF", height: '50px', px: { xs: "10px", md: "0px" } }}>
                        <Box sx={{ display: "flex", columnGap: "5px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => setPostChoiceModal(true)}>
                            <img src={user} alt="Image" style={{ width: "27px", height: "24px" }} />
                            <img src={downArrowFilled} alt="Image" style={{ width: "27px", height: "24px" }} />
                        </Box>
                        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }}>
                            <img src={like} alt="Like" />
                            <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Like</Typography>
                        </Box>
                        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", backgroundColor: "inherit", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }}>
                            <img src={comment} alt="Comment" />
                            <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Comment</Typography>
                        </Box>
                        <Box sx={{ display: "flex", columnGap: "15px", cursor: "pointer", width: { md: "20%" }, height: "100%", justifyContent: "center", alignItems: "center" }}>
                            <img src={repost} alt="Repost" />
                            <Typography sx={{ fontSize: '14px', fontWeight: '500', display: { xs: "none", md: "block" }, color: "#505050" }}>Repost</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ backgroundColor: "#F2F8FD", p: "15px", border: "1px solid #E4E4E4", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Stack gap={"5px"}>
                            <Typography sx={{ fontSize: "17px", fontWeight: "600", color: "#171717" }}>
                                Tag followers in a comment to spark conversations
                            </Typography>
                            <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>
                                Tagging relevant followers helps the post get seen and start meaningful conversations.
                            </Typography>
                            <Box sx={{
                                width: "120px", height: "36px", borderRadius: "2px", display: "flex", justifyContent: "center", alignItems: "center",
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
                            }}>
                                <Typography variant='gradientText'>Tag followers</Typography>
                            </Box>
                        </Stack>
                        <img src={close} alt="Icon" />
                    </Box>
                </Paper>
            </Box>

            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                multiple
                onChange={handleFileChange}
            />

            <input
                type="file"
                ref={videoInputRef}
                accept="video/*"
                style={{ display: "none" }}
                onChange={handleVideoChange}
            />


            <DynamicModal open={showModal} handleClose={HandleModalClose} title={"Hello"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} dropdownHeader={true} footerDirection={"flex-end"} handleGroupClick={() => setGroupShareModal(true)}>
                <PhotoModal files={selectedFiles} placeholder={"Say something about this photo"} handleClose={HandleModalClose} />
            </DynamicModal>

            <DynamicModal open={videoModal} handleClose={() => setVideoModal(false)} title={"Hello"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} dropdownHeader={true} handleGroupClick={() => setGroupShareModal(true)} footerDirection={"flex-end"}>
                <VideoModal file={videoData} placeholder={"Say something about this video"} handleClose={HandleVideoModalClose} />
            </DynamicModal>

            <DynamicModal open={showPostModal} handleClose={() => setShowPostModal(false)} title={"Hello"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} dropdownHeader={true} handleGroupClick={() => setGroupShareModal(true)} footerDirection={"flex-end"}>
                <PostModal fileChange={HandleSelectedFile} placeholder={"What do you want to talk about?"} videoChange={handleVideoChange} openModal={HandlePostTypeClick} />
            </DynamicModal>

            <DynamicModal open={showScheduleModal} handleClose={() => setShowScheduleModal(false)} title={"Schedule post"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} smallModal={true} styledHeader={true} footerDirection={"space-between"}>
                <ScheduleModal />
            </DynamicModal>

            <DynamicModal open={pollModal} handleClose={() => setPollModal(false)} title={"Create a poll"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} styledHeader={true} hideFooter={true}>
                <PollModal handleSuccess={() => setPollModal(false)} />
            </DynamicModal>

            <DynamicModal open={eventModal} handleClose={() => setEventModal(false)} title={"Create an event"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} footerDirection={"flex-end"} hideFooter={true}>
                <EventModal onFormSubmit={handleFormSubmit} receivedValues={eventFormValues} />
            </DynamicModal>

            <DynamicModal open={viewEventModal} handleClose={() => setViewEventModal(false)} title={"Create an event"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} dropdownHeader={true} footerDirection={"flex-end"} hideFooter={true} handleGroupClick={() => setGroupShareModal(true)}>
                <ViewEventModal values={eventFormValues} handleScheduleClick={() => setShowScheduleModal(true)} handleEditClick={handleEditClick} />
            </DynamicModal>

            <DynamicModal open={postChoiceModal} handleClose={() => setPostChoiceModal(false)} title={"Comment, react, and repost as"} buttonText={"Save"} postModal={true} userName={"Areeba Shakeel"} hideFooter={true} smallModal={true} styledHeader={true} >
                <PostChoiceModal />
            </DynamicModal>

            <Menu
                anchorEl={anchorEl}
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

                <MenuItem onClick={handleClose} sx={{ width: "245px", display: "flex", columnGap: "10px" }}>
                    <img src={editBlue} alt="Icon" style={{ width: "24px", height: "24px" }} />
                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Edit post</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "245px", display: "flex", columnGap: "10px" }}>
                    <img src={deleteIcon} alt="Icon" style={{ width: "24px", height: "24px" }} />
                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Delete post</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "245px", display: "flex", columnGap: "10px" }}>
                    <img src={pin} alt="Icon" style={{ width: "24px", height: "24px" }} />
                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Pin to top</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "245px", display: "flex", columnGap: "10px" }}>
                    <img src={copyLink} alt="Icon" style={{ width: "24px", height: "24px" }} />
                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Copy link to post</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default PagePosts
