import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Box, CircularProgress, Grid2, Stack, Typography } from "@mui/material";
import EditProfileModal from "./modals/edit-profile";
import { updateUser } from "../../../store/slices/auth";
import { useUpdateUserInfoMutation } from "../../../services/auth";
import {
  primaryEdit,
  primaryEye,
  uploadIcon,
  userAvatar,
  share,
} from "../../../assets";

const ProfileCard = ({ userData, isPublicView, setIsPublicView, isPublic, handleOpenExpModal }) => {
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateUserInfoMutation();
  const coverRef = useRef(null);
  const ProfileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const handleViewProfile = () => {
    setIsPublicView(!isPublicView);
  };

  const handleEditProfile = () => {
    setEditProfileModal(true);
  };

  const handleClose = () => {
    setEditProfileModal(false);
  };

  const handleShareProfile = () => {
    console.log("share profile");
  };

  const handleImageUpload = (e, type) => {
    setLoading(type);
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append(type, file);
      updateProfile(formData).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          setLoading(false);
          return;
        }
        if (res) {
          toast.success(
            `Your ${type === "image" ? "profile" : type
            } image updated successfully`
          );
          dispatch(updateUser(res?.data?.data));
          setLoading(false);
        }
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "161px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          background: "#B8B8B8",
        }}
      >
        {userData && userData?.coverImage && (
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              opacity: isPublicView ? 1 : 0.5,
            }}
            src={userData?.coverImage}
            alt="cover"
          />
        )}
        {!isPublicView &&
          (loading === "cover" ? (
            <CircularProgress sx={{ color: "#1877F2" }} />
          ) : (
            <Box
              onClick={() => coverRef.current.click()}
              sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                zIndex: 1,
              }}
            >
              <Typography>Cover Photo</Typography>
              <img src={uploadIcon} alt="upload" />
            </Box>
          ))}
        <input
          ref={coverRef}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => handleImageUpload(e, "cover")}
        />
      </Box>
      <Grid2
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flez-start",
          alignItems: "center",
        }}
        size={{ xs: 12, lg: 3.5 }}
      >
        <Box
          sx={{
            marginTop: "-70px",
            position: "relative",
            width: "max-content",
            marginBottom: "20px",
            cursor: "pointer",
          }}
          onClick={isPublicView ? () => { } : () => ProfileRef.current.click()}
        >
          {loading === "image" ? (
            <Box
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                position: "relative",
                zIndex: 2,
                border: "1px solid #1877F2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={20} sx={{ color: "#1877F2" }} />
            </Box>
          ) : (
            <img
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                position: "relative",
                zIndex: 2,
              }}
              src={userData && userData?.profileImage ? userData?.profileImage : userAvatar}
              alt="profile"
            />
          )}
          {!isPublicView && (
            <img
              style={{ position: "absolute", top: "-3px", right: "-5px" }}
              src={primaryEdit}
              alt="edit"
            />
          )}
          <input
            ref={ProfileRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleImageUpload(e, "image")}
          />
        </Box>
        <Typography fontSize="29px" fontWeight={500}>
          {`${userData?.firstName} ${userData?.lastName}`}
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, lg: 8.5 }}>
        <Box sx={{ margin: "0 30px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            gap="14px"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap="12px"
            >
              {!isPublic && <img
                onClick={handleViewProfile}
                style={{ cursor: "pointer" }}
                src={primaryEye}
                alt="eye"
              />}
              {isPublicView && (
                <img
                  onClick={handleShareProfile}
                  style={{ cursor: "pointer" }}
                  src={share}
                  alt="share"
                />
              )}
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            gap="14px"
            sx={{
              width: "100%",
              border: "1px solid #E4E4E4",
              borderRadius: "4px",
              padding: "5px 5px 5px 16px",
              marginTop: "5px",
              mb: 2,
            }}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                gap="14px"
              >
                <Typography
                  sx={{ color: "#505050", width: "60px" }}
                  fontSize="12px"
                  fontWeight={400}
                >
                  Location:
                </Typography>
                <Typography
                  sx={{ color: "#505050" }}
                  fontSize="12px"
                  fontWeight={400}
                >
                  {userData?.city && `${userData?.city}, `}
                  {userData?.country}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                gap="14px"
              >
                <Typography
                  sx={{ color: "#505050", width: "60px" }}
                  fontSize="12px"
                  fontWeight={400}
                >
                  Position:
                </Typography>
                <Typography
                  sx={{ color: "#505050" }}
                  fontSize="12px"
                  fontWeight={400}
                >
                  {userData?.designation}
                </Typography>
              </Stack>
              {userData?.industry && <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                gap="14px"
              >
                <Typography
                  sx={{ color: "#505050", width: "60px" }}
                  fontSize="12px"
                  fontWeight={400}
                >
                  Industry:
                </Typography>
                <Typography
                  sx={{ color: "#505050" }}
                  fontSize="12px"
                  fontWeight={400}
                >
                  {userData?.industry}
                </Typography>
              </Stack>}
              {
                userData?.company && <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap="14px"
                >
                  <Typography
                    sx={{ color: "#505050", width: "60px" }}
                    fontSize="12px"
                    fontWeight={400}
                  >
                    Company:
                  </Typography>
                  <Typography
                    sx={{ color: "#505050" }}
                    fontSize="12px"
                    fontWeight={400}
                  >
                    {userData?.company}
                  </Typography>
                </Stack>
              }
            </Box>
            {!isPublicView && (
              <img
                onClick={handleEditProfile}
                style={{ cursor: "pointer" }}
                src={primaryEdit}
                alt="edit"
              />
            )}
          </Stack>
        </Box>
      </Grid2>
      <EditProfileModal
        userData={userData}
        open={editProfileModal}
        handleClose={handleClose}
        handleOpenExpModal={handleOpenExpModal}
      />
    </>
  );
};

export default ProfileCard;
