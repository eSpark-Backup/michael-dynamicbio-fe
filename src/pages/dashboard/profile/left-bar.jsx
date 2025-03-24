import { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import EditBioModal from "./modals/edit-bio";
import { plus, primaryEdit, user } from "../../../assets";
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

const LeftBar = ({ userData, isPublicView }) => {
  const [modal, setModal] = useState("");
  const [item, setItem] = useState(null);

  const handleClose = () => {
    setModal("");
    setItem(null);
  };

  return (
    <>
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
            {userData?.email}
          </Typography>
          {!isPublicView && (
            <img
              onClick={() => setModal("addemail")}
              style={{ cursor: "ponter" }}
              src={plus}
              alt="add"
            />
          )}
        </Box>
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
                    style={{ cursor: "ponter" }}
                    src={primaryEdit}
                    alt="edit"
                  />
                )}
              </Box>
            );
          })}
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
            {userData?.phoneNumber || "Phone number"}
          </Typography>
          {!isPublicView && (
            <img
              onClick={() => setModal("addphone")}
              style={{ cursor: "ponter" }}
              src={plus}
              alt="add"
            />
          )}
        </Box>
        {userData?.about?.phone &&
          userData?.about?.phone?.length > 0 &&
          userData?.about?.phone?.map((item) => {
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
                {!isPublicView && (
                  <img
                    onClick={() => {
                      setModal("editphone");
                      setItem(item);
                    }}
                    style={{ cursor: "ponter" }}
                    src={primaryEdit}
                    alt="edit"
                  />
                )}
              </Box>
            );
          })}
      </Paper>
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
          userData?.about?.experience?.map((item) => {
            return (
              <Box
                key={item?.title}
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
                    {item?.title}
                  </Typography>
                  {!isPublicView && (
                    <img
                      onClick={() => {
                        setModal("editexp");
                        setItem(item);
                      }}
                      style={{ cursor: "pointer" }}
                      src={primaryEdit}
                      alt="edit"
                    />
                  )}
                </Stack>
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
                </Stack>
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
          userData?.about?.education?.map((item) => {
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
                  {!isPublicView && (
                    <img
                      onClick={() => {
                        setModal("editedu");
                        setItem(item);
                      }}
                      style={{ cursor: "pointer" }}
                      src={primaryEdit}
                      alt="edit"
                    />
                  )}
                </Stack>
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
        {userData?.about?.skill && userData?.about?.skill?.length > 0 ? (
          userData?.about?.skill?.map((item) => {
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
                {!isPublicView && (
                  <img
                    onClick={() => {
                      setModal("editskill");
                      setItem(item);
                    }}
                    style={{ cursor: "pointer" }}
                    src={primaryEdit}
                    alt="edit"
                  />
                )}
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
    </>
  );
};

export default LeftBar;
