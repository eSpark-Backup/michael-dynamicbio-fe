import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { chipClose, three_vertical_dots } from "../assets";
// import { groupMembers } from '../constant';
import { useSelector } from "react-redux";
import {
  useAddMemberMutation,
  useRemoveMemberMutation,
} from "../services/chat";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const GroupChatModal = ({
  chatId,
  options,
  groupMembers: sender,
  activeUsers,
  refetch,
  messageData,
  handleCloseModal,
}) => {
  const [remove, { isLoading }] = useRemoveMemberMutation();
  const [add, { isLoading: isAddLoading }] = useAddMemberMutation();
  const { user: userData } = useSelector((state) => state.auth);
  const fullMembers = [...sender?.members];
  const fullAvatars = [...sender?.avatar];
  const memberName = [...sender?.memberName];
  const memberIds = [...sender?.accountId];

  const ind = memberIds.findIndex((id) => id === userData?.id);
  if (ind !== -1) {
    fullMembers.splice(ind, 0, userData?.userChatId);
  }
  const groupMembers = fullMembers?.map((item, ind) => {
    return {
      id: item,
      name: memberName[ind],
      image: fullAvatars[ind],
      userId: memberIds[ind],
    };
  });
  const [selectedNames, setSelectedNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [removedIndex, setRemovedIndex] = useState(0);
  const [id, setId] = useState(null);
  // const options = [
  //     { label: "John Doe", id: 1 },
  //     { label: "Jane Smith", id: 2 },
  //     { label: "Alice Johnson", id: 3 },
  //     { label: "Bob Brown", id: 4 },
  //     { label: "Bob Brown2", id: 5 },
  //     { label: "Bob Brown3", id: 6 },
  //     { label: "Bob Brown4", id: 7 },
  //     { label: "Bob Brown5", id: 8 },
  // ];
  const open = Boolean(menuAnchor);

  const handleClick = (event, id) => {
    setMenuAnchor({ id, anchor: event.currentTarget });
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setMenuAnchor(null);
  };

  const handleRemove = () => {
    setRemovedIndex(menuAnchor?.id);
    setId(menuAnchor?.id);
    setMenuAnchor(null);
  };

  const handleRemoveMember = () => {
    const selectedMember = groupMembers?.find((item) => item?.id === id);
    const bodyToSend = {
      chatId: chatId,
      userId: selectedMember?.id,
    };
    remove(bodyToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        setRemovedIndex(null);
        setId(null);
        refetch();
      }
    });
  };

  const handleAddMember = () => {
    const bodyToSend = {
      chatId: chatId,
      members: selectedNames.map((item) => item?.chatId),
    };
    add(bodyToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        setSelectedNames([]);
        refetch();
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        pt: "20px",
      }}
    >
      {messageData?.length > 0 && (
        <Typography
          sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}
        >
          {messageData?.length > 0
            ? messageData[messageData?.length - 1]?.text
                ?.split("\n")
                .map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
            : ""}
        </Typography>
      )}
      <Typography
        sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
      >
        {groupMembers?.length} members .{" "}
        {messageData?.length > 0
          ? `Last activity ${dayjs(
              messageData[messageData?.length - 1]?.timestamp
            ).fromNow()}`
          : ""}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          rowGap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
            width: { xs: "100%", sm: "90%" },
            border: "1px solid #E4E4E4",
            p: "5px",
          }}
        >
          {selectedNames?.map((person) => {
            return (
              <Chip
                key={person.id}
                label={person.label}
                onDelete={() =>
                  setSelectedNames(
                    selectedNames.filter((p) => p.id !== person.id)
                  )
                }
                sx={{ backgroundColor: "#e0e0e0", fontWeight: "bold" }}
                deleteIcon={
                  <img
                    src={chipClose}
                    style={{ width: "6px", height: "6px" }}
                  />
                }
              />
            );
          })}

          <Autocomplete
            multiple
            options={options.filter(
              (item) => !fullMembers?.includes(item?.chatId)
            )}
            getOptionLabel={(option) => option.label}
            value={selectedNames}
            onChange={(event, newValue) => {
              const uniqueValues = newValue.filter(
                (v, index, self) =>
                  index === self.findIndex((t) => t.id === v.id)
              );

              setSelectedNames(uniqueValues);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterSelectedOptions
            renderTags={() => null}
            open={searchTerm.length > 0}
            onInputChange={(event, newInputValue) =>
              setSearchTerm(newInputValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={"Type a name or multiple names"}
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: null,
                }}
                sx={{
                  minWidth: 200,
                  "& .MuiInputBase-root": {
                    borderBottom: "none",
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.id}>
                {option.label}
              </Box>
            )}
            className={"custom-autocomplete"}
          />
        </Box>
        <Button
          onClick={handleAddMember}
          loading={isAddLoading}
          disabled={selectedNames?.length === 0 || isAddLoading}
          sx={{ width: { xs: "100%", sm: "5%" }, height: "40px" }}
        >
          Add
        </Button>
      </Box>
      <Typography
        sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}
      >
        Members
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "300px",
          overflowY: "auto",
          mb: "80px",
        }}
      >
        {groupMembers?.map((item, index) => {
          const isOnline = activeUsers.includes(item?.id);
          return (
            <Box
              sx={{
                py: "15px",
                borderBottom:
                  index !== groupMembers?.length - 1
                    ? "1px solid #e0e0e0"
                    : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={index}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                <Box
                  sx={{ width: "48px", height: "48px", position: "relative" }}
                >
                  <Avatar
                    src={item?.image}
                    alt="user"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: isOnline ? "#12B76A" : "#7a7676",
                      border: "1.5px solid #FFFFFF",
                      borderRadius: "50%",
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                    }}
                  />
                </Box>
                <Stack>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#171717",
                    }}
                  >
                    {item?.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#505050",
                    }}
                  >
                    {item?.role}
                  </Typography>
                </Stack>
              </Box>
              {removedIndex === item?.id ? (
                <Stack direction={"column"} gap={"3px"}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#505050",
                    }}
                  >
                    {id === userData?.userChatId ? "Group members" : item?.name}{" "}
                    will be informed you have{" "}
                    {id === userData?.userChatId
                      ? "left group"
                      : "removed them"}
                    .
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      columnGap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "80px",
                        height: "36px",
                        borderRadius: "2px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
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
                          background:
                            "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                          mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                          WebkitMask:
                            "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                          WebkitMaskComposite: "destination-out",
                          maskComposite: "exclude",
                        },
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setMenuAnchor(null);
                        setRemovedIndex(0);
                      }}
                    >
                      <Typography variant="gradientText">Cancel</Typography>
                    </Box>
                    <Button
                      loading={isLoading}
                      disabled={isLoading}
                      onClick={handleRemoveMember}
                      sx={{
                        maxWidth: "80px",
                        height: "36px",
                        fontSize: "16px",
                        minWidth: { md: "80px" },
                      }}
                    >
                      {id === userData?.userChatId ? "Leave" : "Remove"}
                    </Button>
                  </Box>
                </Stack>
              ) : (
                sender?.admin === userData?.userChatId && sender?.admin !== item?.id ? <img
                  src={three_vertical_dots}
                  alt="Icon"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleClick(e, item.id)}
                /> : null
              )}
            </Box>
          );
        })}
      </Box>
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        px={2}
        direction={{ xs: "column", sm: "row" }}
        gap={3}
        sx={{
          minHeight: "55px",
          borderTop: "1px solid #E4E4E4",
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          bottom: "0px",
          right: "0px",
          zIndex: 999,
          backgroundColor: "white",
          pb: { xs: "10px", sm: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Anyone who joins this chat will see previous messages.{" "}
          </Typography>
          {/* <Typography sx={{ fontSize: "14px", fontWeight: "400" }} variant='gradientText'>Learn more</Typography> */}
        </Box>
        <Button onClick={handleCloseModal} sx={{ height: "36px", maxWidth: "150px" }}>Done</Button>
      </Stack>
      <Menu
        anchorEl={menuAnchor?.anchor}
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
        <MenuItem onClick={handleRemove}>
          {menuAnchor?.id === userData?.userChatId ? "Leave" : "Remove"}
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>Report / Block</MenuItem> */}
      </Menu>
    </Box>
  );
};

export default GroupChatModal;
