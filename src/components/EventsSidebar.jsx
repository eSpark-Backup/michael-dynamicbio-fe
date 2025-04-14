import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { conversation, dummyPhoto } from '../assets'
import { otherEvents } from '../constant'
import { useNewPostMutation } from '../services/post'
import { toast } from 'react-toastify'
import DynamicModal from './dynamic-modal'
import ViewEventModal from './ViewEventModal'
import EventModal from './EventModal'
import { useSelector } from 'react-redux'
import ScheduleModal from './ScheduleModal'

const EventsSidebar = () => {
    const [eventModal, setEventModal] = useState(false);
    const [eventFormValues, setEventFormValues] = useState({});
    const [viewEventModal, setViewEventModal] = useState(false);
    const [newPost, { isLoading }] = useNewPostMutation();
    const [title, setTitle] = useState("");
    const [visibility, setVisibility] = useState("PUBLIC");
    const { user: userData } = useSelector((state) => state.auth);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [scheduleTime, setScheduleTime] = useState(new Date());
    const [schedule, setSchedule] = useState({
        date: null,
        time: null,
    });

    const handleEventPost = () => {
        const { selectedFile, ...rest } = eventFormValues;
        const obj = {
            content: {
                ...rest,
                title,
                ...(schedule.date && schedule.time ? { schedule } : {}),
            },
            status: "PUBLISH",
            visibility,
            type: "EVENT",
            cover: selectedFile,
        };
        handlePost(obj);
    };

    const handlePost = (obj) => {
        newPost(obj).then((res) => {
            if (res?.error) {
                toast.error(res?.error?.data?.message);
                return;
            }
            if (res?.data) {
                toast.success("Your post is uploaded successfully");
                setViewEventModal(false);
                setEventFormValues({});
                setTitle("");
            }
        });
    };

    const handleFormSubmit = (formData) => {
        setEventFormValues(formData);
        setEventModal(false);
        setViewEventModal(true);
    };

    const handleEditClick = () => {
        setEventModal(true);
        setViewEventModal(false);
    };

    const HandleViewEventClose = () => {
        setViewEventModal(false);
        setEventFormValues({});
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            <Paper>
                <Box sx={{ display: "flex", columnGap: "10px" }}>
                    <img src={conversation} alt="Image" style={{ width: "60px" }} />
                    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                        <Typography>Host an event on Fusion and invite your network</Typography>
                        <Button sx={{ display: "flex", columnGap: "3px", width: '180px', height: "30px", background: "white !important", border: "1px solid black" }} onClick={() => setEventModal(true)}>
                            <Typography sx={{ color: "black" }}>Create event</Typography>
                        </Button>
                    </Box>
                </Box>
            </Paper >
            <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
                <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>Other events for you</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }} variant='gradientText'>See all</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}>
                    {/*  */}
                    {otherEvents?.map((item, index) => (
                        <Box sx={{ display: "flex", justifyContent: "space-between", columnGap: '5px' }} key={index}>
                            <img src={item?.image} alt="Image" style={{ width: "50%", height: "100px", borderRadius: "8px" }} />
                            <Box sx={{ display: "flex", flexDirection: "column", width: "50%", }}>
                                <Typography sx={{ fontSize: "12px", fontWeight: "400", color: item?.time === "Happening now" ? "#01754F" : "#171717" }}>{item?.time}</Typography>
                                <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>
                                    {item?.name?.length > 28 ? `${item.name.slice(0, 28)}...` : item?.name}
                                </Typography>
                                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
                                    {item?.eventBy?.length > 28 ? `${item?.eventBy.slice(0, 28)}...` : item?.eventBy}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Paper>

            <DynamicModal
                open={eventModal}
                handleClose={() => setEventModal(false)}
                title={"Create an event"}
                buttonText={"Post"}
                postModal={true}
                userData={userData}
                userName={`${userData?.firstName} ${userData?.lastName}`}
                handleScheduleClick={() => setShowScheduleModal(true)}
                footerDirection={"flex-end"}
                hideFooter={true}
            >
                <EventModal
                    onFormSubmit={handleFormSubmit}
                    receivedValues={eventFormValues}
                    handleClose={() => setEventModal(false)}
                />
            </DynamicModal>

            <DynamicModal
                open={viewEventModal}
                handleClose={HandleViewEventClose}
                title={"Create an event"}
                buttonText={"Post"}
                postModal={true}
                userData={userData}
                userName={`${userData?.firstName} ${userData?.lastName}`}
                dropdownHeader={true}
                footerDirection={"flex-end"}
                hideFooter={true}
                handleGroupClick={() => setGroupShareModal(true)}
                visibility={visibility}
                setVisibility={setVisibility}
            >
                <ViewEventModal
                    isLoading={isLoading}
                    onSuccess={handleEventPost}
                    title={title}
                    setTitle={setTitle}
                    values={eventFormValues}
                    handleScheduleClick={() => setShowScheduleModal(true)}
                    handleEditClick={handleEditClick}
                />
            </DynamicModal>

            <DynamicModal
                open={showScheduleModal}
                onSuccess={() => {
                    setSchedule({
                        date: scheduleDate,
                        time: scheduleTime,
                    });
                    setShowScheduleModal(false);
                }}
                handleClose={() => setShowScheduleModal(false)}
                title={"Schedule post"}
                buttonText={"Post"}
                postModal={true}
                userData={userData}
                userName={`${userData?.firstName} ${userData?.lastName}`}
                handleScheduleClick={() => { }}
                smallModal={true}
                styledHeader={true}
                footerDirection={"space-between"}
            >
                <ScheduleModal
                    scheduleDate={scheduleDate}
                    setScheduleDate={setScheduleDate}
                    scheduleTime={scheduleTime}
                    setScheduleTime={setScheduleTime}
                />
            </DynamicModal>
        </Box >
    )
}

export default EventsSidebar
