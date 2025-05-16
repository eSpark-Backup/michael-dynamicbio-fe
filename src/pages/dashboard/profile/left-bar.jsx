import { useEffect, useState } from "react";
import { Avatar, Box, Chip, Paper, Stack, Typography } from "@mui/material";
import EditBioModal from "./modals/edit-bio";
import { deleteIcon, plus, primaryEdit, user } from "../../../assets";
import AddExperienceModal from "./modals/add-experience";
import dayjs from "dayjs";
import EditExperienceModal from "./modals/edit-experience";
import AddSkillModal from "./modals/add-skill";
import EditSkillModal from "./modals/edit-skill";
import AddEducationModal from "./modals/add-education";
import EditEducationModal from "./modals/edit-education";
import AddEmailModal from "./modals/add-email";
import EditEmailModal from "./modals/edit-email";
import AddPhoneModal from "./modals/add-phone";
import EditPhoneModal from "./modals/edit-phone";
import AddProject from "./modals/add-project";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../store/slices/auth";
import { useUpdateUserInfoMutation } from "../../../services/auth";
import { toast } from "react-toastify";
import { ConfirmationModal } from "../../../components";
import EditProject from "./modals/edit-project";

const LeftBar = ({ userData, isPublicView, modal, setModal, isPublic }) => {
  const [item, setItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState("")
  const [deleteId, setDeleteId] = useState("")
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();


  const handleClose = () => {
    setModal("");
    setItem(null);
  };


  useEffect(() => {
    console.log(isPublic, "IS Public")
    console.log(isPublicView, "IS Public View")
    console.log(userData, "IS Public View")
  }, [isPublic, isPublicView, userData])

  const dispatch = useDispatch()

  const HandleDelete = (type, id) => {
    setConfirmModal(true)
    setDeleteItem(type)
    setDeleteId(id)
  }

  // const handleAccept = () => {
  //   if (deleteItem === "projects") {
  //     const projects = userData?.about?.projects?.filter((item, index) => index !== deleteId)
  //     updateProfile({
  //       about: { ...userData?.about, projects: projects },
  //     }).then((res) => {
  //       if (res?.error) {
  //         toast.error(res?.error?.data?.message);
  //         return;
  //       }
  //       if (res) {
  //         toast.success("Your project deleted successfully");
  //         dispatch(updateUser(res?.data?.data));
  //         setDeleteId("")
  //         setDeleteId("")
  //         setConfirmModal(false)
  //       }
  //     });
  //   }
  // }

  const handleAccept = () => {
    if (!["projects", "experience", "education", "skills", "phone"].includes(deleteItem)) return;

    const sectionKey = deleteItem;
    const updatedSection = userData?.about?.[sectionKey]?.filter((_, index) => index !== deleteId);

    updateProfile({
      about: { ...userData?.about, [sectionKey]: updatedSection },
    }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      toast.success(`Your ${deleteItem} deleted successfully`);
      dispatch(updateUser(res?.data?.data));
      setDeleteId("");
      setConfirmModal(false);
      setDeleteItem("")
    });
  };


  return (
    <>
      {userData?.about?.bio && isPublic ? (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "12px",
            px: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
            >
              Bio
            </Typography>
            {!isPublicView && (
              <img
                onClick={() => setModal("bio")}
                style={{ cursor: "pointer" }}
                src={primaryEdit}
                alt="edit"
              />
            )}
          </Box>
          <Box
            sx={{
              border: "1px solid #E4E4E4",
              p: "10px 5px 10px 5px",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 400,
                color: "#171717",
              }}
            >
              {userData?.about?.bio ||
                "Adding your experience allow you to get better opportunities."}
            </Typography>
          </Box>
        </Paper>
      ) : (
        <Paper
          sx={{
            display: ((!isPublic && !isPublicView) || (!isPublic && isPublicView && userData?.profileSettings?.showSummary) ? "flex" : "none"),
            flexDirection: "column",
            rowGap: "12px",
            px: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
            >
              Bio
            </Typography>
            {!isPublicView && (
              <img
                onClick={() => setModal("bio")}
                style={{ cursor: "pointer" }}
                src={primaryEdit}
                alt="edit"
              />
            )}
          </Box>
          <Box
            sx={{
              border: "1px solid #E4E4E4",
              p: "10px 5px 10px 5px",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 400,
                color: "#171717",
              }}
            >
              {userData?.about?.bio ||
                "Adding your experience allow you to get better opportunities."}
            </Typography>
          </Box>
        </Paper>
      )}
      {
        (isPublic && isPublicView && !userData?.email && !userData?.phoneNumber)
          ?
          <></>
          :
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "12px",
              px: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
              >
                Contact details
              </Typography>
            </Box>
            {
              (isPublic && !userData?.email) ? <></> : <Box
                sx={{
                  border: "1px solid #E4E4E4",
                  p: "10px 5px 10px 5px",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: 400,
                    color: "#171717",
                  }}
                >
                  {userData?.email}
                </Typography>
                {!isPublicView && (
                  <img
                    onClick={() => setModal("addemail")}
                    style={{ cursor: "pointer" }}
                    src={plus}
                    alt="add"
                  />
                )}
              </Box>
            }
            {userData?.about?.email &&
              userData?.about?.email?.length > 0 &&
              userData?.about?.email?.map((item) => {
                return (
                  <Box
                    key={item?.email}
                    sx={{
                      border: "1px solid #E4E4E4",
                      p: "10px 5px 10px 5px",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#171717",
                      }}
                    >
                      {item?.email}
                    </Typography>
                    {!isPublicView && (
                      <img
                        onClick={() => {
                          setModal("editemail");
                          setItem(item);
                        }}
                        style={{ cursor: "pointer" }}
                        src={primaryEdit}
                        alt="edit"
                      />
                    )}
                  </Box>
                );
              })}
            {
              (isPublic && !userData?.phoneNumber) || (isPublicView && !userData?.phoneNumber) ? <></> : <Box
                sx={{
                  border: "1px solid #E4E4E4",
                  p: "10px 5px 10px 5px",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: 400,
                    color: "#171717",
                  }}
                >
                  {userData?.phoneNumber || "Phone number"}
                </Typography>
                {!isPublicView && (
                  <img
                    onClick={() => setModal("addphone")}
                    style={{ cursor: "pointer" }}
                    src={plus}
                    alt="add"
                  />
                )}
              </Box>
            }
            {userData?.about?.phone &&
              userData?.about?.phone?.length > 0 &&
              userData?.about?.phone?.map((item, index) => {
                return (
                  <Box
                    key={item?.phone}
                    sx={{
                      border: "1px solid #E4E4E4",
                      p: "10px 5px 10px 5px",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#171717",
                      }}
                    >
                      {item?.phone}
                    </Typography>
                    {/* {!isPublicView && (
                      
                    )} */}
                    {!isPublicView &&

                      <Box sx={{ display: "flex", columnGap: "3px", alignItems: "center" }}>
                        <img src={deleteIcon} alt="" style={{ cursor: "pointer", width: "20px", height: "20px" }} onClick={() => HandleDelete("phone", index)} />
                        <img
                          onClick={() => {
                            setModal("editphone");
                            setItem(item);
                          }}
                          style={{ cursor: "pointer" }}
                          src={primaryEdit}
                          alt="edit"
                        />
                      </Box>
                    }
                  </Box>
                );
              })}
          </Paper>
      }
      {
        ((isPublic && userData?.about?.experience && userData?.about?.experience?.length > 0) || ((isPublicView && userData?.profileSettings?.showPastExperience) || (isPublicView && userData?.profileSettings?.showCurrentExperience)) || (!isPublic && !isPublicView)) &&
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "12px",
            px: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
            >
              Experience
            </Typography>
          </Box>
          {userData?.about?.experience &&
            userData?.about?.experience?.length > 0 ? (
            userData?.about?.experience?.map((item, index) => {
              return (
                <Box
                  key={item?.title}
                  sx={{
                    border: "1px solid #E4E4E4",
                    p: "15px",
                    borderRadius: "4px",
                    display:
                      (isPublicView && !isPublic && !userData?.profileSettings?.showCurrentExperience && item?.currently)
                        ?
                        "none"
                        :
                        (isPublicView && !isPublic && !userData?.profileSettings?.showPastExperience && !item?.currently)
                          ?
                          "none"
                          :
                          "block"
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#171717",
                      }}
                    >
                      {item?.title}
                    </Typography>
                    {!isPublicView &&

                      <Box sx={{ display: "flex", columnGap: "3px", alignItems: "center" }}>
                        <img src={deleteIcon} alt="" style={{ cursor: "pointer", width: "20px", height: "20px" }} onClick={() => HandleDelete("experience", index)} />
                        <img
                          onClick={() => {
                            setModal("editexp");
                            setItem(item);
                          }}
                          style={{ cursor: "pointer" }}
                          src={primaryEdit}
                          alt="edit"
                        />
                      </Box>
                    }
                  </Stack>
                  {
                    ((!isPublic && isPublicView && userData?.profileSettings?.showCurrentExperienceDetails && item?.currently)
                      ||
                      (!isPublic && isPublicView && userData?.profileSettings?.showPastExperienceDetails && !item?.currently) || (!isPublic && !isPublicView) || (isPublic && isPublicView && item?.company))
                    &&
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      gap={1}
                      mt={1}
                    >
                      <img width={24} height={24} src={user} alt="profile-image" />
                      <Box sx={{ width: "100%" }}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          gap={1}
                        >
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 400,
                              color: "#171717",
                            }}
                          >
                            {item?.company}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 400,
                              color: "#171717",
                            }}
                          >
                            {item?.startingDate &&
                              dayjs(item?.startingDate).format("MM/YYYY")}{" "}
                            -{" "}
                            {item?.currently
                              ? "Present"
                              : item?.endingDate &&
                              dayjs(item?.endingDate).format("MM/YYYY")}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          gap={1}
                        >
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 400,
                              color: "#171717",
                            }}
                          >
                            {item?.location}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 400,
                              color: "#171717",
                            }}
                          >
                            {item?.type}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                  }
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "40px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#171717",
                }}
              >
                Adding your experience allow you to get better opportunities.
              </Typography>
            </Box>
          )}
          {!isPublicView && (
            <Box
              onClick={() => setModal("addexp")}
              sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                cursor: "pointer",
              }}
            >
              <img src={plus} alt="add" />
            </Box>
          )}
        </Paper>
      }
      {userData?.about?.education &&
        userData?.about?.education?.length > 0 &&
        isPublic ? (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "12px",
            px: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
            >
              Education
            </Typography>
          </Box>
          {userData?.about?.education &&
            userData?.about?.education?.length > 0 ? (
            userData?.about?.education?.map((item, index) => {
              return (
                <Box
                  key={item?.school}
                  sx={{
                    border: "1px solid #E4E4E4",
                    p: "15px",
                    borderRadius: "4px",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#171717",
                      }}
                    >
                      {item?.school}
                    </Typography>
                    {/* {!isPublicView && (
                      <img
                        onClick={() => {
                          setModal("editedu");
                          setItem(item);
                        }}
                        style={{ cursor: "pointer" }}
                        src={primaryEdit}
                        alt="edit"
                      />
                    )} */}
                    {!isPublicView &&

                      <Box sx={{ display: "flex", columnGap: "3px", alignItems: "center" }}>
                        <img src={deleteIcon} alt="" style={{ cursor: "pointer", width: "20px", height: "20px" }} onClick={() => HandleDelete("education", index)} />
                        <img
                          onClick={() => {
                            setModal("editedu");
                            setItem(item);
                          }}
                          style={{ cursor: "pointer" }}
                          src={primaryEdit}
                          alt="edit"
                        />
                      </Box>
                    }
                  </Stack>
                  {item?.degree && <Box sx={{ width: "100%", mt: 1 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      gap={1}
                    >
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 400,
                          color: "#171717",
                        }}
                      >
                        {item?.degree} in {item?.field}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 400,
                          color: "#171717",
                        }}
                      >
                        {item?.startingDate &&
                          dayjs(item?.startingDate).format("YYYY")}{" "}
                        -{" "}
                        {item?.currently
                          ? "Present"
                          : item?.endingDate &&
                          dayjs(item?.endingDate).format("YYYY")}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      gap={1}
                    >
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 400,
                          color: "#171717",
                        }}
                      >
                        {item?.location}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 400,
                          color: "#171717",
                        }}
                      >
                        {item?.type}
                      </Typography>
                    </Stack>
                  </Box>}
                </Box>
              );
            })
          ) : (!isPublic && !isPublicView) ? <></> : (
            <></>
          )}
          {!isPublicView && (
            <Box
              onClick={() => setModal("addedu")}
              sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                cursor: "pointer",
              }}
            >
              <img src={plus} alt="add" />
            </Box>
          )}
        </Paper>
      ) : (
        <Paper
          sx={{
            display: ((!isPublic && isPublicView && userData?.profileSettings?.showEducation) || (!isPublic && !isPublicView)) ? "flex" : "none",
            flexDirection: "column",
            rowGap: "12px",
            px: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
            >
              Education
            </Typography>
          </Box>
          {userData?.about?.education &&
            userData?.about?.education?.length > 0 ? (
            userData?.about?.education?.map((item, index) => {
              return (
                <Box
                  key={item?.school}
                  sx={{
                    border: "1px solid #E4E4E4",
                    p: "15px",
                    borderRadius: "4px",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#171717",
                      }}
                    >
                      {item?.school}
                    </Typography>
                    {/* {!isPublicView && (
                      
                    )} */}
                    {!isPublicView &&

                      <Box sx={{ display: "flex", columnGap: "3px", alignItems: "center" }}>
                        <img src={deleteIcon} alt="" style={{ cursor: "pointer", width: "20px", height: "20px" }} onClick={() => HandleDelete("education", index)} />
                        <img
                          onClick={() => {
                            setModal("editedu");
                            setItem(item);
                          }}
                          style={{ cursor: "pointer" }}
                          src={primaryEdit}
                          alt="edit"
                        />
                      </Box>
                    }
                  </Stack>
                  {
                    ((!isPublic && isPublicView && userData?.profileSettings?.showEducationDetails) || (!isPublic && !isPublicView))
                    &&
                    <Box sx={{ width: "100%", mt: 1 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={1}
                      >
                        <Typography
                          sx={{
                            fontSize: "10px",
                            fontWeight: 400,
                            color: "#171717",
                          }}
                        >
                          {item?.degree} in {item?.field}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "10px",
                            fontWeight: 400,
                            color: "#171717",
                          }}
                        >
                          {item?.startingDate &&
                            dayjs(item?.startingDate).format("YYYY")}{" "}
                          -{" "}
                          {item?.currently
                            ? "Present"
                            : item?.endingDate &&
                            dayjs(item?.endingDate).format("YYYY")}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={1}
                      >
                        <Typography
                          sx={{
                            fontSize: "10px",
                            fontWeight: 400,
                            color: "#171717",
                          }}
                        >
                          {item?.location}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "10px",
                            fontWeight: 400,
                            color: "#171717",
                          }}
                        >
                          {item?.type}
                        </Typography>
                      </Stack>
                    </Box>
                  }
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "40px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#171717",
                }}
              >
                Adding education allow people to know what your capability.
              </Typography>
            </Box>
          )}
          {!isPublicView && (
            <Box
              onClick={() => setModal("addedu")}
              sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                cursor: "pointer",
              }}
            >
              <img src={plus} alt="add" />
            </Box>
          )}
        </Paper>
      )}
      {userData?.about?.skills &&
        userData?.about?.skills?.length > 0 &&
        isPublic ? (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "12px",
            px: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
            >
              Skills
            </Typography>
          </Box>
          {userData?.about?.skills && userData?.about?.skills?.length > 0 ? (
            userData?.about?.skills?.map((item, index) => {
              return (
                <Box
                  key={item?.skill}
                  sx={{
                    border: "1px solid #E4E4E4",
                    p: "10px 5px 10px 5px",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "40px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 400,
                      color: "#171717",
                    }}
                  >
                    {item?.skill}
                  </Typography>
                  {/* {!isPublicView && (
                    
                  )} */}
                  {!isPublicView &&

                    <Box sx={{ display: "flex", columnGap: "3px", alignItems: "center" }}>
                      <img src={deleteIcon} alt="" style={{ cursor: "pointer", width: "20px", height: "20px" }} onClick={() => HandleDelete("skills", index)} />
                      <img
                        onClick={() => {
                          setModal("editskill");
                          setItem(item);
                        }}
                        style={{ cursor: "pointer" }}
                        src={primaryEdit}
                        alt="edit"
                      />
                    </Box>
                  }
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "40px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#171717",
                }}
              >
                Adding soft or technical skills allow others to know you better
              </Typography>
            </Box>
          )}
          {!isPublicView && (
            <Box
              onClick={() => setModal("addskill")}
              sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                cursor: "pointer",
              }}
            >
              <img src={plus} alt="add" />
            </Box>
          )}
        </Paper>
      ) : (isPublic && isPublicView) ? <></> : (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "12px",
            px: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
            >
              Skills
            </Typography>
          </Box>
          {userData?.about?.skills && userData?.about?.skills?.length > 0 ? (
            userData?.about?.skills?.map((item, index) => {
              return (
                <Box
                  key={item?.skill}
                  sx={{
                    border: "1px solid #E4E4E4",
                    p: "10px 5px 10px 5px",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "40px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 400,
                      color: "#171717",
                    }}
                  >
                    {item?.skill}
                  </Typography>
                  {/* {!isPublicView && (
                    
                  )} */}
                  {!isPublicView &&

                    <Box sx={{ display: "flex", columnGap: "3px", alignItems: "center" }}>
                      <img src={deleteIcon} alt="" style={{ cursor: "pointer", width: "20px", height: "20px" }} onClick={() => HandleDelete("skills", index)} />
                      <img
                        onClick={() => {
                          setModal("editskill");
                          setItem(item);
                        }}
                        style={{ cursor: "pointer" }}
                        src={primaryEdit}
                        alt="edit"
                      />
                    </Box>
                  }
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "40px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#171717",
                }}
              >
                Adding soft or technical skills allow others to know you better
              </Typography>
            </Box>
          )}
          {!isPublicView && (
            <Box
              onClick={() => setModal("addskill")}
              sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                cursor: "pointer",
              }}
            >
              <img src={plus} alt="add" />
            </Box>
          )}
        </Paper>
      )}
      {((!isPublic && !isPublicView) || (isPublicView && isPublic && userData?.about?.projects?.length > 0) || (isPublicView && !isPublic && userData?.profileSettings?.showProjects && userData?.about?.projects?.length > 0)) && <Paper sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "12px",
        px: "20px",
      }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "40px",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
          >
            Projects
          </Typography>
        </Box>
        {
          Array.isArray(userData?.about?.projects) && userData?.about?.projects?.length > 0
            ?
            userData?.about?.projects?.map((item, index) => (
              <Box sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                rowGap: "10px"
              }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "#171717",
                    }}
                  >
                    {item?.name}
                  </Typography>
                  {/* {!isPublicView && (
                    <img
                      onClick={() => {
                        HandleProjectEdit(item)
                      }}
                      style={{ cursor: "pointer" }}
                      src={primaryEdit}
                      alt="edit"
                    />
                  )} */}
                  {!isPublicView &&

                    <Box sx={{ display: "flex", columnGap: "3px", alignItems: "center" }}>
                      <img src={deleteIcon} alt="" style={{ cursor: "pointer", width: "20px", height: "20px" }} onClick={() => HandleDelete("projects", index)} />
                      <img
                        onClick={() => {
                          setModal("editproject");
                          setItem(item);
                        }}
                        style={{ cursor: "pointer", width: "20px", height: "20px" }}
                        src={primaryEdit}
                        alt="edit"
                      />
                    </Box>
                  }
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 400,
                      color: "#171717",
                    }}
                  >
                    {item?.startMonth && item?.startYear
                      ? `${item.startMonth} / ${item.startYear}`
                      : item?.startMonth
                        ? item.startMonth
                        : item?.startYear
                          ? item.startYear
                          : ""}

                    {` - `}

                    {item?.working
                      ? "Present"
                      : item?.endMonth && item?.endYear
                        ? `${item.endMonth} / ${item.endYear}`
                        : item?.endMonth
                          ? item.endMonth
                          : item?.endYear
                            ? item.endYear
                            : ""}
                  </Typography>
                </Box>

                {item?.description && <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: 400,
                    color: "#171717",
                  }}
                >
                  {item?.description}
                </Typography>}
                {item?.links?.map((item, index) => (
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 400,
                      color: "#171717",
                    }}
                    key={index}
                  >
                    {item}
                  </Typography>
                ))}
                {(Array.isArray(item?.skills) && item?.skills && item?.skills?.length > 0) && <Box sx={{ display: 'flex', flexWrap: "wrap", gap: "10px" }}>
                  {item?.skills?.map((skill) => (
                    <Chip label={skill} />
                  ))}
                </Box>}
                {item?.related && <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: 400,
                    color: "#171717",
                  }}
                >
                  This project is related to {item?.related}
                </Typography>}
                {(item?.contributors && item?.contributors?.length > 0) && <Box sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Other contributors</Typography>
                  <Box sx={{ display: "flex", columnGap: "10px", flexWrap: "wrap", rowGap: "5px" }}>
                    {item?.contributors?.map((contributor, index2) => (
                      <Avatar
                        key={index2}
                        src={contributor?.profileImg ? contributor.profileImg : user}
                        alt="User"
                        sx={{ width: 40, height: 40, objectFit: "fill" }}
                      />
                    ))}
                  </Box>
                </Box>}

              </Box>
            ))
            :
            <Box
              sx={{
                border: "1px solid #E4E4E4",
                p: "10px 5px 10px 5px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "40px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#171717",
                }}
              >
                Adding project allow people to know what your capability.
              </Typography>
            </Box>
        }
        {!isPublicView && (
          <Box
            onClick={() => setModal("addproject")}
            sx={{
              border: "1px solid #E4E4E4",
              p: "10px 5px 10px 5px",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              cursor: "pointer",
            }}
          >
            <img src={plus} alt="add" />
          </Box>
        )}
      </Paper>}
      <EditBioModal
        userData={userData}
        open={modal === "bio"}
        handleClose={handleClose}
      />
      <AddEmailModal
        userData={userData}
        open={modal === "addemail"}
        handleClose={handleClose}
      />
      <EditEmailModal
        userData={userData}
        email={item}
        open={modal === "editemail"}
        handleClose={handleClose}
      />
      <AddPhoneModal
        userData={userData}
        open={modal === "addphone"}
        handleClose={handleClose}
      />
      <EditPhoneModal
        userData={userData}
        phone={item}
        open={modal === "editphone"}
        handleClose={handleClose}
      />
      <AddExperienceModal
        userData={userData}
        open={modal === "addexp"}
        handleClose={handleClose}
      />
      <EditExperienceModal
        userData={userData}
        exp={item}
        open={modal === "editexp"}
        handleClose={handleClose}
      />
      <AddEducationModal
        userData={userData}
        open={modal === "addedu"}
        handleClose={handleClose}
      />
      <EditEducationModal
        userData={userData}
        edu={item}
        open={modal === "editedu"}
        handleClose={handleClose}
      />
      <AddSkillModal
        userData={userData}
        open={modal === "addskill"}
        handleClose={handleClose}
      />
      <EditSkillModal
        userData={userData}
        skill={item}
        open={modal === "editskill"}
        handleClose={handleClose}
      />
      <AddProject
        open={modal === "addproject"}
        handleClose={handleClose}
        userData={userData}
      />
      <EditProject
        open={modal === "editproject"}
        handleClose={handleClose}
        userData={userData}
        project={item}
      />

      <ConfirmationModal open={showConfirmModal} handleClose={() => setConfirmModal(false)} title={`Delete ${deleteItem}`}
        cancelButtonText={"No thanks"} acceptButtonText={"Delete"}
        handleAccept={handleAccept}
        handleCancel={() => setConfirmModal(false)}
        isLoading={isLoading}
      >
        <Typography sx={{ fontSize: "17px", fontWeight: "300", color: "#595959" }}>Are you sure you want to delete?</Typography>
      </ConfirmationModal>
    </>
  );
};

export default LeftBar;
