import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import {
  Button,
  CustomizeTabs,
  DynamicModal,
  Input,
  SuggestedBonds,
} from "../../../../components";
import { cellBlack, userAvatar, verticleDots } from "../../../../assets";
import { useGetCatchupQuery } from "../../../../services/bonds";
import { eventBus, getDesc, getMessage } from "../../../../utils";
import { SEND_NEW_MESSAGE } from "../../../../socket/events";

const CatchUp = ({ onGrow }) => {
  const { data, isLoading, isError, error } = useGetCatchupQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const [openMenu, setOpenMenu] = useState(false);
  const [msgModal, setMsgModal] = useState(false);
  const [wishInput, setWishInput] = useState("");

  const tabs = [
    "All",
    "Job changes",
    "Birthdays",
    "Work anniversaries",
    "Education",
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [myValue, setMyValue] = useState(true);
  const [celeb, setCeleb] = useState(true);
  const [catchupData, setCatchupData] = useState([]);

  useEffect(() => {
    const myData = data?.data;
    if (myData) {
      if (!activeTab || activeTab === 0) {
        const all = [
          ...myData?.anniversaries.map((item) => ({
            ...item,
            type: "anniversary",
          })),
          ...myData?.birthdays.map((item) => ({ ...item, type: "birthday" })),
          ...myData?.educationChanges.map((item) => ({
            ...item,
            type: "educationChange",
          })),
          ...myData?.jobChanges.map((item) => ({ ...item, type: "jobChange" })),
        ];
        setCatchupData(all);
      } else if (activeTab === 1) {
        setCatchupData(
          myData?.jobChanges.map((item) => ({ ...item, type: "jobChange" }))
        );
      } else if (activeTab === 2) {
        setCatchupData(
          myData?.birthdays.map((item) => ({ ...item, type: "birthday" }))
        );
      } else if (activeTab === 3) {
        setCatchupData(
          myData?.anniversaries.map((item) => ({
            ...item,
            type: "anniversary",
          }))
        );
      } else if (activeTab === 4) {
        setCatchupData(
          myData?.educationChanges.map((item) => ({
            ...item,
            type: "educationChange",
          }))
        );
      }
    }
  }, [data, activeTab]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
      return;
    }
  }, [isError]);

  const handleSendMsg = () => {
    const messageBody = {
      message: wishInput,
      chatId: msgModal?.chatId,
      members: [msgModal?.userChatId],
    };
    eventBus.emit(SEND_NEW_MESSAGE, messageBody);
    toast.success("Message sent successfully")
    setMsgModal(false)
  };

  return (
    <Box>
      <Paper>
        <CustomizeTabs onChange={(val) => setActiveTab(val)} tabs={tabs} />
      </Paper>
      <Box
        sx={{
          mt: "40px",
          padding: "23px 32px",
          background: "#fff",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {isLoading ? (
          <Stack
            mt={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress sx={{ color: "#1877F2" }} />
          </Stack>
        ) : catchupData?.length > 0 ? (
          catchupData.map((item, ind) => (
            <Stack
              key={ind}
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              mt={ind === 0 ? 0 : 2}
            >
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="center"
                gap={1.5}
              >
                <img
                  width={73}
                  height={73}
                  style={{ borderRadius: "50%" }}
                  src={item?.profileImage || userAvatar}
                  alt="profile"
                />
                <Box>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight={300}
                  >
                    {`${item?.firstName} ${item?.lastName}`}
                  </Typography>
                  <Typography
                    sx={{ color: "#505050" }}
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {getDesc(item)}
                  </Typography>
                  <Button
                    onClick={() => {
                      setMsgModal(item);
                      const msg = getMessage(item);
                      setWishInput(msg);
                    }}
                    sx={{
                      justifyContent: "flex-start",
                      height: "auto",
                      padding: "6px 30px",
                      borderRadius: "20px",
                      mt: 1,
                      width: { xs: "150px", sm: "300px", lg: "400px" },
                    }}
                  >
                    <img
                      style={{
                        marginRight: "5px",
                        width: "20px",
                        height: "20px",
                      }}
                      src={cellBlack}
                      alt="message"
                    />
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "16px",
                      }}
                    >
                      {getMessage(item)}
                    </Typography>
                  </Button>
                </Box>
              </Stack>
            </Stack>
          ))
        ) : (
          <Stack justifyContent="center" alignItems="center" gap={2} mt={3}>
            <Typography
              textAlign="center"
              fontSize="32px"
              sx={{ color: "#171717" }}
            >
              No recent updates
            </Typography>
            <Typography
              textAlign="center"
              fontSize="20px"
              sx={{ color: "#505050" }}
            >
              As your network grows, you will get more updates.
            </Typography>
            <Button onClick={onGrow} sx={{ height: "48px", width: "250px" }}>
              Grow your network
            </Button>
          </Stack>
        )}
      </Box>
      <SuggestedBonds />
      <DynamicModal
        noBtn
        title="Allow updates and notifications about"
        open={openMenu}
        handleClose={() => setOpenMenu(false)}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Typography fontSize="20px">
            {`${msgModal?.firstName} ${msgModal?.lastName}`}r
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Typography fontSize="20px">{myValue ? "On" : "Off"}</Typography>
            <Switch checked={myValue} onChange={(_, e) => setMyValue(e)} />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          mt={2}
        >
          <Typography fontSize="20px">
            Work Anniversary in your network
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Typography fontSize="20px">{celeb ? "On" : "Off"}</Typography>
            <Switch checked={celeb} onChange={(_, e) => setCeleb(e)} />
          </Stack>
        </Stack>
      </DynamicModal>
      <DynamicModal
        buttonText="Send"
        title="Send Message"
        open={msgModal}
        onSuccess={handleSendMsg}
        handleClose={() => setMsgModal(false)}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <img
            width={73}
            height={73}
            style={{ borderRadius: "50%" }}
            src={msgModal?.profileImage || userAvatar}
            alt="profile"
          />
          <Box>
            <Typography sx={{ color: "#171717" }} fontSize="18px">
              {`${msgModal?.firstName} ${msgModal?.lastName}`}
            </Typography>
            <Typography sx={{ color: "#505050" }}>
              {getDesc(msgModal)}
            </Typography>
          </Box>
        </Stack>
        <Box mt={2}>
          <Input
            variant="outlined"
            value={wishInput}
            onChange={(e) => setWishInput(e.target.value)}
            placeholder={getDesc(msgModal)}
            sx={{
              backgroundColor: "transparent",
              border: "1px solid white",
              "& .MuiInputBase-root": {
                padding: "6px 10px",
                height: "auto",
              },
              "& .MuiInputBase-input": {
                color: "black",
                wordBreak: "break-word",
                caretColor: "black",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "black",
              },
            }}
            multiline
            rows={4}
          />
        </Box>
      </DynamicModal>
    </Box>
  );
};

export default CatchUp;
