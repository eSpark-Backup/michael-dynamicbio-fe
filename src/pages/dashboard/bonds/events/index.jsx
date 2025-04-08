import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Stack, Typography } from "@mui/material";
import {
  Button,
  DynamicModal,
  EventModal,
  ScheduleModal,
  ViewEventModal,
} from "../../../../components";
import { useNewPostMutation } from "../../../../services/post";
import { eventImage, plus, share } from "../../../../assets";

const Events = () => {
  const [newPost, { isLoading }] = useNewPostMutation();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");

  const [eventModal, setEventModal] = useState(false);
  const [eventFormValues, setEventFormValues] = useState({});
  const [viewEventModal, setViewEventModal] = useState(false);
  const [groupShareModal, setGroupShareModal] = useState(false);
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
    };
    newPost(obj).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success("Your post is uploaded successfully");
        setTitle("");
        setViewEventModal(false);
        setEventFormValues({});
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

  const { user: userData } = useSelector((state) => state.auth);
  return (
    <>
      <Box
        sx={{
          background: "#fff",
          padding: "16px",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Typography fontSize="22px">Events</Typography>
          <img onClick={() => setEventModal(true)} style={{ cursor: "pointer" }} src={plus} alt="add" />
        </Stack>
      </Box>
      <Box
        sx={{
          background: "#fff",
          padding: "36px 16px 36px 16px",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Typography fontSize="14px">Your Events</Typography>
          <Typography
            fontSize="14px"
            sx={{
              minWidth: "60px",
              cursor: "pointer",
              background:
                "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "transparent",
            }}
          >
            View all
          </Typography>
        </Stack>
        <Stack
          mt={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={2}
        >
          {Array.from({ length: 2 }).map((_, ind) => (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              gap={1}
              sx={{ width: "400px", cursor: "pointer" }}
            >
              <img
                style={{ width: "40%", height: "auto", borderRadius: "15px" }}
                src={eventImage}
                alt="event"
              />
              <Box mt={2}>
                <Typography sx={{ color: "#505050" }}>
                  Mon, Mar 3, 2025, 5:00 PM
                </Typography>
                <Typography fontSize="20px" sx={{ color: "#171717" }}>
                  Mocking
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
      <Box
        sx={{
          background: "#fff",
          padding: "36px 16px 36px 16px",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
        }}
      >
        <Typography fontSize="14px">Recommended for you</Typography>
        <Stack
          mt={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={2}
        >
          {Array.from({ length: 9 }).map((_, ind) => (
            <Stack
              mt={2}
              justifyContent="center"
              alignItems="flex-start"
              gap={1}
              sx={{
                width: { xs: "100%", lg: "48%" },
                border: "1px solid #505050",
                borderRadius: "15px",
              }}
            >
              <img
                style={{ width: "100%", height: "auto", borderRadius: "15px" }}
                src={eventImage}
                alt="event"
              />
              <Box sx={{ width: "100%", padding: "0 16px 16px 16px" }}>
                <Typography fontSize="20px" sx={{ color: "#171717" }}>
                  Mon, Mar 3, 2025, 5:00 PM
                </Typography>
                <Typography fontSize="20px" sx={{ color: "#171717" }}>
                  Mocking
                </Typography>
                <Typography mt={3} sx={{ color: "#505050" }}>
                  ISM-New jerse . 13 attendees
                </Typography>
                <Stack
                  mt={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Button sx={{ flex: 1 }}>View</Button>
                  <img
                    style={{ cursor: "pointer" }}
                    width={40}
                    height={40}
                    src={share}
                    alt="share"
                  />
                </Stack>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
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
        handleScheduleClick={() => {}}
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
    </>
  );
};

export default Events;
