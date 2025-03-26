import { Autocomplete, Box, Chip, Divider, Grid2, Menu, MenuItem, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { camera, chipClose, emoji, filter, friend, link, photo, plus, profilePicture, searchIcon, send, three_vertical_dots, user } from '../../../assets'
import { ContactBox, DynamicModal, GroupChatModal, MessageList, OutlinedInput, RightSideBar } from '../../../components'
import { chatsContent, messages } from '../../../constant'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

const Cells = () => {
  const theme = useTheme()
  const [showChatScreen, setShowChatScreen] = useState(chatsContent?.length > 0 ? true : false)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [activeItem, setActiveItem] = useState(chatsContent?.length > 0 ? 1 : 0);
  const [showContacts, setShowContacts] = useState(true)
  const [searchTerm, setSearchTerm] = useState("");
  const [showInput, setShowInput] = useState(false)
  const [chatType, setChatType] = useState(chatsContent?.length > 0 ? chatsContent[0]?.type : "")
  const [groupModal, setGroupModal] = useState(false)

  const options = [
    { label: "John Doe", id: 1 },
    { label: "Jane Smith", id: 2 },
    { label: "Alice Johnson", id: 3 },
    { label: "Bob Brown", id: 4 },
  ];
  const [selectedNames, setSelectedNames] = useState([]);
  const HandleActiveClick = (id, type) => {
    setActiveItem(id)
    setShowChatScreen(true)
    setChatType(type)
    setSelectedNames([])
    if (isSmallScreen) {
      setShowContacts(false)
    }
  }

  useEffect(() => {
    setActiveItem(isSmallScreen || chatsContent?.length === 0 ? 0 : 1);
  }, [isSmallScreen]);

  const HandleNewConversation = () => {
    setShowChatScreen(false)
    setActiveItem(0)
    if (isSmallScreen) {
      setShowContacts(false)
    }
  }

  const HandleBack = () => {
    setShowContacts(true)
    setActiveItem(0)
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = (event) => {
    event.stopPropagation();
    setAnchorEl2(null);
  };

  const handleClick2 = (event) => {
    if (chatType == "group") {
      setAnchorEl2(event.currentTarget);
    }
  };

  return (
    <Box sx={{ p: "20px", height: "calc(100vh - 130px)" }}>
      <Grid2 container spacing={5} sx={{ height: "100%" }}>
        {(!isSmallScreen || (isSmallScreen && showContacts)) && <Grid2 size={{ xs: 12, lg: 2.5 }} sx={{ height: "100%" }}>
          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "25px", height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "29px", fontWeight: 400, color: theme.palette.primary.dark }}>
                Chats
              </Typography>
              <img src={filter} alt="Filter" onClick={handleClick} style={{ cursor: "pointer" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px", height: "80%" }}>
              {chatsContent?.length > 0
                ?
                <>
                  <OutlinedInput
                    placeholder="Search"
                    startAdornment={searchIcon}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px", height: "100%", overflowY: "auto", pb: "0px" }}>
                    {chatsContent?.map((item, index) => (
                      <ContactBox lastMessage={item?.lastMessage} image={item?.image} time={item?.time} name={item?.name} key={index} id={item?.id} handleClick={HandleActiveClick} activeItem={activeItem} type={item?.type} />
                    ))}
                  </Box>
                </>
                :
                <Box sx={{ border: "1px solid #E4E4E4", borderRadius: "4px", backgroundColor: "#FCFCFC", display: "flex", flexDirection: "column", rowGap: '10px' }}>
                  <Box sx={{ display: "flex", flexDirection: "column", rowGap: "5px", padding: "15px" }}>
                    <Typography sx={{ color: "#171717", fontSize: "14px", fontWeight: "500" }}>
                      No message yet
                    </Typography>
                    <Typography sx={{ color: "#505050", fontSize: "12px", fontWeight: "400" }}>
                      Reach out & start a conversation to advance your career
                    </Typography>
                  </Box>
                  <Box sx={{ height: "46px", border: "1px solid #E4E4E4", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px", display: 'flex', justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                    <Typography variant='gradientText' sx={{ fontSize: "14px", fontWeight: "400" }}>
                      Start conversation
                    </Typography>
                  </Box>
                </Box>
              }
            </Box>
            {chatsContent?.length > 0 && <Box sx={{ borderTop: "1px solid #E4E4E4", height: "46px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }} onClick={HandleNewConversation}>
              <Typography variant='gradientText' sx={{ fontSize: "14px", fontWeight: 400 }}>
                Start conversation
              </Typography>
            </Box>}
          </Paper>
        </Grid2>}

        {(!isSmallScreen || (isSmallScreen && !showContacts)) && <Grid2 size={{ xs: 12, lg: 6.5 }} sx={{ height: "98%", pb: "10px" }}>
          <Paper sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            {isSmallScreen && <ArrowBackIosOutlinedIcon
              sx={{
                fontSize: "20px",
                background: `linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              onClick={HandleBack}
            />}
            <Box sx={{ borderBottom: "1px solid #E4E4E4", width: "100%", display: "flex", justifyContent: "space-between", p: "5px 5px 15px 0px", alignItems: "center", flexWrap: "wrap" }}>
              <Stack gap={2} direction={"row"} width={"80%"}>
                {showChatScreen && <Box sx={{ width: "40px", height: "40px", position: "relative" }}>
                  <img src={friend} alt="user" style={{ width: "45px", height: '45px', borderRadius: "50%" }} />
                  <Box sx={{ width: "10px", height: "10px", backgroundColor: "#12B76A", border: "1.5px solid #FFFFFF", borderRadius: "50%", position: "absolute", right: 0, bottom: 0 }}>
                  </Box>
                </Box>}
                <Stack direction={"column"} width={"80%"}>
                  <Typography sx={{ fontSize: showChatScreen ? "18px" : "14px", fontWeight: showChatScreen ? 500 : 400, color: "#171717" }}>
                    {showChatScreen && chatType === "personal" ? "Phoenix Baker" : showChatScreen && chatType === "group" ? "Jon Smith, Bob Brown, and you" : "New Message"}
                  </Typography>
                  {
                    showChatScreen ?
                      <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#505050" }}>
                        {chatType === "personal" ? "Active Now" : "3 people in this conversation"}
                      </Typography>
                      :
                      <>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", width: "100%" }}>
                          {selectedNames?.map((person) => {
                            return (
                              <Chip
                                key={person.id}
                                label={person.label}
                                onDelete={() =>
                                  setSelectedNames(selectedNames.filter((p) => p.id !== person.id))
                                }
                                sx={{ backgroundColor: "#e0e0e0", fontWeight: "bold" }}
                                deleteIcon={<img src={chipClose} style={{ width: "6px", height: "6px" }} />}
                              />
                            )
                          })}
                          {(selectedNames?.length === 0 || (selectedNames?.length > 0 && showInput)) && (
                            <Autocomplete
                              multiple
                              options={options}
                              getOptionLabel={(option) => option.label}
                              value={selectedNames}
                              onChange={(event, newValue) => {
                                const uniqueValues = newValue.filter(
                                  (v, index, self) => index === self.findIndex((t) => t.id === v.id)
                                );

                                setSelectedNames(uniqueValues);
                                setShowInput(false)
                              }}
                              isOptionEqualToValue={(option, value) => option.id === value.id}
                              filterSelectedOptions
                              renderTags={() => null}
                              open={searchTerm.length > 0}
                              onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder={selectedNames?.length === 0 ? "Type a name or multiple names" : ""}
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
                                  autoFocus
                                />
                              )}
                              renderOption={(props, option) => (
                                <Box component="li" {...props} key={option.id}>
                                  {option.label}
                                </Box>
                              )}
                              className={selectedNames?.length > 0 ? "custom-autocomplete2" : 'custom-autocomplete'}
                            />
                          )}

                          {
                            selectedNames?.length > 0 &&
                            <img src={plus} alt="Icon" style={{ width: "24px", height: "24px", cursor: "pointer" }} onClick={() => setShowInput(true)} />
                          }


                        </Box>
                      </>
                  }
                </Stack>
              </Stack>
              <img src={three_vertical_dots} alt="Info" style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={handleClick2} />
            </Box>



            {(!showChatScreen && selectedNames?.length >= 1) && <Box sx={{ py: "10px", borderBottom: "1px solid #E4E4E4", display: "flex", columnGap: "10px" }}>
              {selectedNames?.length === 1 && <>
                <Box sx={{ width: "40px", height: "40px", position: "relative" }}>
                  <img src={friend} alt="user" style={{ width: "100%", height: '100%', borderRadius: "50%" }} />
                  <Box sx={{ width: "10px", height: "10px", backgroundColor: "#12B76A", border: "1.5px solid #FFFFFF", borderRadius: "50%", position: "absolute", right: 0, bottom: 0 }}>
                  </Box>
                </Box>
                <Stack direction={"column"}>
                  <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>Areeba Shakeel</Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}>UI/Ux Designer @ eSpark Consulting Group</Typography>
                </Stack>
              </>}
              {selectedNames?.length > 1 &&
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3px" }}>
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>Group Name</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}> (optional)</Typography>
                  </Box>
                  <OutlinedInput sx={{
                    height: "40px",
                    width: "100%",
                    backgroundColor: '#FCFCFC',
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-root": {
                      border: "1px solid #E4E4E4",
                      height: "100%",
                      backgroundColor: '#FCFCFC',
                      borderRadius: "4px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #E4E4E4",

                    },

                  }} />
                </Box>
              }
            </Box>}

            {showChatScreen && chatType === "group" &&
              <>
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "5px", py: "10px" }}>
                  <Stack gap={1} direction={"row"}>
                    {
                      [friend, user, profilePicture]?.map((item, index) => (
                        <Box sx={{ width: "48px", height: "48px", position: "relative" }} key={index} onClick={() => setGroupModal(true)}>
                          <img src={item} alt="user" style={{ width: "100%", height: '100%', borderRadius: "50%" }} />
                          <Box sx={{ width: "10px", height: "10px", backgroundColor: "#12B76A", border: "1.5px solid #FFFFFF", borderRadius: "50%", position: "absolute", right: 0, bottom: 0 }}>
                          </Box>
                        </Box>
                      ))
                    }
                  </Stack>
                  <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>
                    John Doe, Bob Brown, Jan Smith
                  </Typography>
                </Box>
                <Divider />
              </>
            }

            <Box sx={{ minHeight: "calc(68% - 100px)", overflowY: "auto", pt: "10px" }}>
              {showChatScreen && <MessageList messages={messages} />}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
              <Box sx={{ borderTop: "1px solid #E4E4E4", width: "100%", display: "flex", pr: "10px", height: '60px', backgroundColor: "#F2F8FD" }}>
                <OutlinedInput sx={{
                  height: "100%",
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    border: "none !important",
                    height: "100%",
                    backgroundColor: "#F2F8FD"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none !important",
                  },

                }} placeholder={"Write a message"} />
                <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
                  <img src={emoji} alt="Emoji" style={{ width: "24px", height: "24px" }} />
                  <img src={send} alt="Camera" style={{ width: "24px", height: "24px" }} />
                </Box>
              </Box>
              <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", columnGap: "10px" }}>
                <img src={camera} alt="Camera" />
                <img src={link} alt="Link" />
                <img src={photo} alt="Album" />
              </Box>
            </Box>
          </Paper>
        </Grid2>}
        <Grid2 size={{ xs: 12, lg: 3 }} pb={"10px"}>
          <RightSideBar hideResearch={true} />
        </Grid2>
      </Grid2>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Unread</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Archive</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Draft</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Stared</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Option</MenuItem>
        <MenuItem onClick={handleClose} sx={{ width: "150px" }}>Option</MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>Move to other</MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>Mark as unread</MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>Star</MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>Mute</MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>Archive</MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>Report / Block</MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>Delete conversation</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>Add / Remove people</MenuItem>
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>Leave Conversation</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose2} sx={{ width: "170px" }}>Manage settings</MenuItem>
      </Menu>
      <DynamicModal open={groupModal} handleClose={() => setGroupModal(false)} title={"Conversation Details"} buttonText={"Post"} postModal={true} styledHeader={true} hideFooter={true}>
        <GroupChatModal />
      </DynamicModal>
    </Box >
  )
}

export default Cells
