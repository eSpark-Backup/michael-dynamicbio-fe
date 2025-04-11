import { Box, Button, Divider, Grid2, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { close2, conversation, dummyPhoto, edit, growPage, noPosts, plus, three_vertical_dots } from '../../../assets'
import { BoxWithTextIcon, CreateAdminPost, DynamicModal, EventModal, PhotoModal, PollModal, PostModal, PostSetting, ScheduleModal, VideoModal, ViewEventModal } from '../../../components'
import { pageStats } from '../../../constant'
import { generateThumbnail } from '../../../utils'
import DashboardSection from './DashboardSection'
import PagePosts from './PagePosts'
import ActivitySection from './ActivitySection'

const AdminView = () => {
    const items = ["Dashboard", "Page posts", "Analytics", "Feed", "Activity", "Inbox", "Edit page", "Breaker", "Try Premium Page", "Advertise today", "Settings"]
    const [activeItem, setActiveItem] = useState("Dashboard")
    const [showPostModal, setShowPostModal] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [videoData, setVideoData] = useState({ video: null, thumbnail: null });
    const [showModal, setShowModal] = useState(false)
    const [videoModal, setVideoModal] = useState(false)
    const fileInputRef = useRef(null);
    const coverPhotoRef = useRef(null);
    const videoInputRef = useRef(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false)
    const [eventModal, setEventModal] = useState(false)
    const [eventFormValues, setEventFormValues] = useState({});
    const [viewEventModal, setViewEventModal] = useState(false)
    const [pollModal, setPollModal] = useState(false)
    const [postSettingModal, setPostSettingModal] = useState(false)
    const [coverPhoto, setCoverPhoto] = useState(null)
    const [createModal, setCreateModal] = useState(false)

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

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCoverPhoto(imageUrl)
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
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid2 container spacing={3} sx={{ width: { xs: "98%", md: (activeItem === "Page posts" || activeItem === "Activity") ? "98%" : "85%", lg: (activeItem === "Page posts" || activeItem === "Activity") ? "98%" : "80%", xl: (activeItem === "Page posts" || activeItem === "Activity") ? "98%" : "75%" }, py: "25px" }}>
                <Grid2 size={{ xs: 12, lg: 3 }}>
                    <Paper sx={{ padding: "0px 0px" }}>
                        <Box sx={{ height: "90px", borderTopRightRadius: "4px", borderTopLeftRadius: "4px", position: "relative", backgroundImage: `url(${coverPhoto !== null ? coverPhoto : dummyPhoto})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                            <Box sx={{ width: "128px", height: "128px", border: "2px solid #fff", position: "absolute", top: "20px", left: "15px", backgroundImage: `url(${dummyPhoto})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></Box>
                            <Box sx={{
                                width: "48px", height: "48px", backgroundColor: "white", position: "absolute",
                                right: "10px",
                                top: "50%",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                transform: "translateY(-50%)",
                                cursor: "pointer"
                            }} onClick={() => coverPhotoRef.current.click()}>
                                <img
                                    src={edit}
                                    alt="Icon"
                                />
                            </Box>

                        </Box>
                        <Box sx={{ mt: "70px", px: "15px", display: "flex", flexDirection: "column", rowGap: "5px" }}>
                            <Typography sx={{ fontSize: "24px", fontWeight: "500", color: "#171717" }}>RottenRia</Typography>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>0 followers</Typography>
                            <Button sx={{ maxWidth: "120px", height: "36px" }} onClick={() => setCreateModal(true)} >Create</Button>
                            <Button sx={{ maxWidth: "100%", height: "36px", mt: "10px", background: "transparent", border: "1px solid #E4E4E4", textTransform: "none", borderRadius: "12px", ":hover": { background: "transparent", color: "#000" } }}>View as a member</Button>

                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3px", mt: "10px" }}>
                            {/*  */}
                            {items?.map((item, index) => {
                                return (
                                    <Box
                                        sx={{
                                            borderLeft: "4px solid transparent",
                                            borderImageSource: item === activeItem && "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                            borderImageSlice: 1,
                                            p: "20px 15px",
                                            cursor: "pointer"
                                        }}
                                        key={index}
                                        onClick={() => {
                                            if (item !== "Breaker") {
                                                setActiveItem(item);
                                                window.scrollTo({ top: 0, behavior: "smooth" });
                                            }
                                        }}
                                    >
                                        {item === "Breaker" ? <Divider /> : <Typography variant={item === activeItem ? "gradientText" : "body1"}>
                                            {item}
                                        </Typography>
                                        }
                                    </Box>
                                )
                            })}
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2 size={{ xs: 12, lg: (activeItem === "Page posts" || activeItem === "Activity") ? 6 : 9 }} sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                    {/* */}
                    {activeItem === "Page posts" ? <PagePosts /> : activeItem === "Activity" ? <ActivitySection /> : <DashboardSection handlePostButtonClick={() => setShowPostModal(true)} />}
                </Grid2>
                {(activeItem === "Page posts" || activeItem === "Activity") &&
                    <Grid2 size={{ xs: 12, lg: 2.5 }}>
                        <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                            <Box>
                                <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>Post highlights</Typography>
                                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>In the last 30 days</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "10px" }}>
                                <img src={noPosts} alt="Image" />
                                <Typography sx={{ fontSize: "20px", fontWeight: "600", color: "#171717" }}>No highlights</Typography>
                                <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}>No recent post highlights</Typography>
                            </Box>
                        </Paper>
                    </Grid2>
                }
            </Grid2>
            <input
                type="file"
                ref={fileInputRef}
                accept=".jpeg,.jpg,.tiff,.png"
                style={{ display: "none" }}
                multiple
                onChange={handleFileChange}
            />
            <input
                type="file"
                ref={coverPhotoRef}
                accept=".jpeg,.jpg,.tiff,.png"
                style={{ display: "none" }}
                onChange={handleCoverChange}
            />

            <input
                type="file"
                ref={videoInputRef}
                accept="video/*"
                style={{ display: "none" }}
                onChange={handleVideoChange}
            />

            <DynamicModal open={showPostModal} handleClose={() => setShowPostModal(false)} title={"Hello"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} dropdownHeader={true} footerDirection={"flex-end"} adminPage={true} handleDropdown={() => setPostSettingModal(true)}>
                <PostModal fileChange={HandleSelectedFile} placeholder={"What do you want to talk about?"} videoChange={handleVideoChange} openModal={HandlePostTypeClick} />
            </DynamicModal>

            <DynamicModal open={showModal} handleClose={HandleModalClose} title={"Hello"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} dropdownHeader={true} footerDirection={"flex-end"}>
                <PhotoModal files={selectedFiles} placeholder={"Say something about this photo"} handleClose={HandleModalClose} />
            </DynamicModal>

            <DynamicModal open={videoModal} handleClose={() => setVideoModal(false)} title={"Hello"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} dropdownHeader={true} footerDirection={"flex-end"}>
                <VideoModal file={videoData} placeholder={"Say something about this video"} handleClose={HandleVideoModalClose} />
            </DynamicModal>

            <DynamicModal open={showScheduleModal} handleClose={() => setShowScheduleModal(false)} title={"Schedule post"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} smallModal={true} styledHeader={true} footerDirection={"space-between"}>
                <ScheduleModal />
            </DynamicModal>

            <DynamicModal open={eventModal} handleClose={() => setEventModal(false)} title={"Create an event"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => setShowScheduleModal(true)} footerDirection={"flex-end"} hideFooter={true}>
                <EventModal onFormSubmit={handleFormSubmit} receivedValues={eventFormValues} handleClose={() => setEventModal(false)} />
            </DynamicModal>


            <DynamicModal open={viewEventModal} handleClose={() => setViewEventModal(false)} title={"Create an event"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} dropdownHeader={true} footerDirection={"flex-end"} hideFooter={true}>
                <ViewEventModal values={eventFormValues} handleScheduleClick={() => setShowScheduleModal(true)} handleEditClick={handleEditClick} />
            </DynamicModal>

            <DynamicModal open={pollModal} handleClose={() => setPollModal(false)} title={"Create a poll"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} styledHeader={true} hideFooter={true}>
                <PollModal handleSuccess={() => setPollModal(false)} />
            </DynamicModal>

            <DynamicModal open={postSettingModal} handleClose={() => setPostSettingModal(false)} title={"Post settings"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} styledHeader={true} hideFooter={true}>
                <PostSetting handleClose={() => setPostSettingModal(false)} />
            </DynamicModal>

            <DynamicModal open={createModal} handleClose={() => setCreateModal(false)} title={"Create"} buttonText={"Post"} postModal={true} userName={"Areeba Shakeel"} handleScheduleClick={() => { }} styledHeader={true} hideFooter={true}>
                <CreateAdminPost />
            </DynamicModal>
        </Box>
    )
}

export default AdminView
