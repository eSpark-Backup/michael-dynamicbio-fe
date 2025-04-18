import { useState } from "react";
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
import { userAvatar, verticleDots } from "../../../../assets";

const CatchUp = ({ onGrow }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [msgModal, setMsgModal] = useState(false);
  const [wishInput, setWishInput] = useState(
    "Wishing you a very happy birthday!"
  );

  const tabs = [
    "All",
    "Job changes",
    "Birthdays",
    "Work anniversaries",
    "Education",
  ];
  const [activeTab, setActiveTab] = useState("All");

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
        {false ? (
          <Stack
            mt={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress sx={{ color: "#1877F2" }} />
          </Stack>
        ) : 10 > 0 ? (
          Array.from({ length: 10 }).map((_, ind) => (
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
                  src={userAvatar}
                  alt="profile"
                />
                <Box>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight={300}
                  >
                    Zaheer Babar
                  </Typography>
                  <Typography
                    sx={{ color: "#505050" }}
                    fontSize="14px"
                    fontWeight={400}
                  >
                    Celebrate Zaheer babar's birthday today
                  </Typography>
                  <Button
                    onClick={() => setMsgModal(true)}
                    sx={{
                      height: "40px",
                      padding: "6px 30px",
                      borderRadius: "20px",
                      fontSize: "16px",
                      mt: 1,
                    }}
                  >
                    Wishing you a very happy birthday
                  </Button>
                </Box>
              </Stack>

              <img
                style={{ cursor: "pointer" }}
                onClick={() => setOpenMenu(true)}
                src={verticleDots}
                alt="menu"
              />
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
          <Typography fontSize="20px">Zaheer babar</Typography>
          <Switch />
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
          <Switch />
        </Stack>
      </DynamicModal>
      <DynamicModal
        buttonText="Send"
        title="Send Message"
        open={msgModal}
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
            src={userAvatar}
            alt="profile"
          />
          <Box>
            <Typography sx={{ color: "#171717" }} fontSize="18px">
              Zaheer babar
            </Typography>
            <Typography sx={{ color: "#505050" }}>
              Celebrate Zaheer babar's birthday today
            </Typography>
          </Box>
        </Stack>
        <Box mt={2}>
          <Input
            variant="outlined"
            value={wishInput}
            onChange={(e) => setWishInput(e.target.value)}
            placeholder="Wishing you a very happy birthday!"
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
