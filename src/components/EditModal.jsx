import {
  Box,
  FormControlLabel,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Button from "./button";
import {
  ControlBar,
  CurrentTimeDisplay,
  FullscreenToggle,
  PlaybackRateMenuButton,
  Player,
  PlayToggle,
  ProgressControl,
  VolumeMenuButton,
} from "video-react";
import { dummyPhoto } from "../assets";
import { formatEventTime } from "../utils";
import { useEditPostMutation } from "../services/post";
import { toast } from "react-toastify";

const EditModal = ({
  refetch,
  type,
  normalPostData,
  title,
  videoPostData,
  id,
  eventData,
  pollData,
  handleClose,
  visibility,
  commentSetting,
  setTitle,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [editPost, { isLoading: editPostLoading }] = useEditPostMutation();

  useEffect(() => setNewTitle(title), [title]);
  console.log(eventData, id);

  const HandleSubmit = () => {
    const obj = {
      content: {
        title: newTitle,
      },
      visibility,
      id: id,
      edit: true,
      commentVisibility: commentSetting,
      type:
        type === "normal" && normalPostData?.images?.length === 0
          ? "TEXT"
          : type === "normal" && normalPostData?.images?.length > 0
            ? "IMAGE"
            : type === "poll"
              ? "POLL"
              : type === "video"
                ? "VIDEO"
                : "EVENT",
      status: "PUBLISH",
    };
    if (id) {
      editPost(obj).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success("Your post is updated successfully");
          refetch && refetch();
          if (setTitle) {
            setTitle(newTitle);
          }
          setNewTitle("");
          handleClose();
        }
      });
    }
  };
  const renderTextField = (
    <TextField
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      placeholder="What do you want to talk about?"
      sx={{
        backgroundColor: "transparent",
        border: "1px solid white",
        "& .MuiInputBase-root": { padding: 0 },
        "& .MuiInputBase-input": {
          color: "black",
          wordBreak: "break-word",
          caretColor: "black",
        },
        "& .MuiInputBase-input::placeholder": { color: "black" },
      }}
      InputProps={{ disableUnderline: true }}
      multiline
      minRows={3}
      variant="standard"
    />
  );

  const renderFooter = (
    <Stack
      justifyContent="flex-end"
      alignItems="center"
      px={6}
      direction="row"
      gap={3}
      sx={{
        height: "55px",
        borderTop: "1px solid #E4E4E4",
        width: "100%",
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: "white",
      }}
    >
      <Button
        loading={editPostLoading}
        disabled={
          editPostLoading ||
          newTitle === title ||
          (type === "normal" &&
            newTitle === "" &&
            normalPostData?.images?.length === 0)
        }
        onClick={HandleSubmit}
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
    </Stack>
  );

  if (type === "normal") {
    return (
      <>
        {renderTextField}
        <Box
          sx={{
            minHeight: "250px",
            backgroundImage: normalPostData?.images?.[0]
              ? `url(${normalPostData.images[0]})`
              : "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            maxHeight: "500px",
            mt: "10px",
            mb: normalPostData?.images?.length === 1 ? "30px" : "0px",
          }}
        />
        {normalPostData?.images?.length > 1 && (
          <Box sx={{ display: "flex", gap: "15px", mt: 2, mb: "30px" }}>
            {normalPostData.images.slice(1, 4).map((img, idx, arr) => {
              const width =
                arr.length === 1 ? "100%" : arr.length === 2 ? "50%" : "33.33%";
              return (
                <Box
                  key={idx}
                  sx={{
                    width,
                    aspectRatio: "1",
                    height: "150px",
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "4px",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  {idx === 2 && normalPostData.images.length > 4 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                        borderRadius: "4px",
                      }}
                    >
                      +{normalPostData.images.length - 4}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        )}
        {renderFooter}
      </>
    );
  }

  if (type === "video") {
    return (
      <>
        {renderTextField}
        <div
          className="video-container"
          style={{ width: "100%", aspectRatio: "16/9", marginBottom: "20px" }}
        >
          <Player
            playsInline
            poster={videoPostData?.thumbnail}
            src={videoPostData?.videoUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <ControlBar autoHide={false}>
              <PlayToggle order={1} />
              <ProgressControl order={2} />
              <CurrentTimeDisplay order={3} />
              <PlaybackRateMenuButton rates={[0.5, 1, 1.5, 2]} order={4} />
              <VolumeMenuButton order={5} />
              <FullscreenToggle order={6} />
            </ControlBar>
          </Player>
        </div>
        {renderFooter}
      </>
    );
  } else if (type === "event") {
    return (
      <>
        {renderTextField}
        <Box
          sx={{
            height: "485px",
            width: "100%",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "0.8rem",
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              height: "80%",
              backgroundImage: eventData?.eventImage
                ? `url(${eventData?.eventImage})`
                : `url(${dummyPhoto})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderTopRightRadius: "0.8rem",
              borderTopLeftRadius: "0.8rem",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgb(0 0 0 / .6)",
                m: "15px 0px 0px 15px",
                borderRadius: "3px",
                p: "10px",
                width: "fit-content",
              }}
            >
              <Typography sx={{ color: "white" }}>
                {formatEventTime(
                  new Date(eventData?.startDate),
                  new Date(eventData?.startTime),
                  eventData?.showEndTime ? new Date(eventData?.endDate) : null,
                  eventData?.showEndTime ? new Date(eventData?.endTime) : null
                )}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "0px" }}>
            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: "500",
                color: "#171717",
                px: "15px",
              }}
            >
              {formatEventTime(
                new Date(eventData?.startDate),
                new Date(eventData?.startTime),
                eventData?.showEndTime ? new Date(eventData?.endDate) : null,
                eventData?.showEndTime ? new Date(eventData?.endTime) : null
              )}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#505050",
                px: "15px",
              }}
            >
              {eventData?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#505050",
                px: "15px",
              }}
            >
              {eventData?.format === "ExternalEventLink"
                ? "Event By Abdul Rehman"
                : "LinkedIn Live"}
            </Typography>
          </Box>
        </Box>
        {renderFooter}
      </>
    );
  } else if (type === "poll") {
    return (
      <>
        {renderTextField}
        <Box
          sx={{
            border: "1px solid #E4E4E4",
            borderRadius: "4px",
            p: "15px 0px 15px 0px",
            display: "flex",
            flexDirection: "column",
            rowGap: "15px",
            mb: "100px",
          }}
        >
          <Box
            sx={{
              border: "1px solid #E4E4E4",
              borderRadius: "2px",
              backgroundColor: "#F2F8FD",
              p: "10px 20px",
            }}
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}
            >
              {pollData?.question}
            </Typography>
          </Box>
          {pollData?.options?.map((item, index) => (
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
                {item?.value}
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              columnGap: "5px",
              alignItems: "center",
              pl: "3px",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400" }}
              variant="gradientText"
            >
              {pollData?.numberOfVotes} votes •
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              {pollData?.endDate}{" "}
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400" }}
              variant="gradientText"
            >
              •
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400" }}
              variant="gradientText"
            >
              view results
            </Typography>
          </Box>
        </Box>

        {renderFooter}
      </>
    );
  }
  return null;
};

export default EditModal;
