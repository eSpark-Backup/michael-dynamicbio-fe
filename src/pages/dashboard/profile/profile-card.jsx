import { useRef, useState } from "react";
import { useFormik } from "formik";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { DynamicModal, Input } from "../../../components";
import { profileDetailsSchema } from "../../../schemas";
import {
  primaryEdit,
  primaryEye,
  uploadIcon,
  userAvatar,
  share,
} from "../../../assets";

const ProfileCard = ({ userData, isPublicView, setIsPublicView }) => {
  const coverRef = useRef(null);
  const ProfileRef = useRef(null);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
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

  const formik = useFormik({
    initialValues: {
      country: userData?.country,
      city: userData?.city,
      company: userData?.company,
      industry: userData?.industry,
      role: userData?.designation,
    },
    enableReinitialize: true,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

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
        {cover && (
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              opacity: isPublicView ? 1 : 0.5,
            }}
            src={URL.createObjectURL(cover)}
            alt="cover"
          />
        )}
        {!isPublicView && (
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
        )}
        <input
          ref={coverRef}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setCover(e.target.files[0])}
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
          onClick={isPublicView ? () => {} : () => ProfileRef.current.click()}
        >
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              position: "relative",
              zIndex: 2,
            }}
            src={
              profile
                ? URL.createObjectURL(profile)
                : userData?.profileImage
                ? userData?.profileImage
                : userAvatar
            }
            alt="profile"
          />
          {!isPublicView && (
            <img
              style={{ position: "absolute", top: "0px", right: "0px" }}
              src={primaryEdit}
              alt="edit"
            />
          )}
          <input
            ref={ProfileRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setProfile(e.target.files[0])}
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
              <img
                onClick={handleViewProfile}
                style={{ cursor: "pointer" }}
                src={primaryEye}
                alt="eye"
              />
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
                  sx={{ color: "#505050" }}
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
                  Karachi, {userData?.country}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                gap="14px"
              >
                <Typography
                  sx={{ color: "#505050" }}
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
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                gap="14px"
              >
                <Typography
                  sx={{ color: "#505050" }}
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
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                gap="14px"
              >
                <Typography
                  sx={{ color: "#505050" }}
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
      <DynamicModal
        title="Update profile"
        buttonText="Update"
        open={editProfileModal}
        onSuccess={formik.handleSubmit}
        handleClose={handleClose}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
          }}
        >
          <Input
            customLabel="Country/Region *"
            variant="outlined"
            name="country"
            value={formik.values.country}
            handleChange={formik.handleChange}
            error={formik.touched.country && !!formik.errors.country}
            helperText={formik.touched.country && formik.errors.country}
          />
          <Input
            customLabel="City *"
            variant="outlined"
            name="city"
            value={formik.values.city}
            handleChange={formik.handleChange}
            error={formik.touched.city && !!formik.errors.city}
            helperText={formik.touched.city && formik.errors.city}
          />
          <Input
            customLabel="Company *"
            variant="outlined"
            name="company"
            value={formik.values.company}
            handleChange={formik.handleChange}
            error={formik.touched.company && !!formik.errors.company}
            helperText={formik.touched.company && formik.errors.company}
          />
          <Input
            customLabel="Industry *"
            variant="outlined"
            name="industry"
            value={formik.values.industry}
            handleChange={formik.handleChange}
            error={formik.touched.industry && !!formik.errors.industry}
            helperText={formik.touched.industry && formik.errors.industry}
          />
          <Input
            customLabel="Role *"
            variant="outlined"
            name="role"
            value={formik.values.role}
            handleChange={formik.handleChange}
            error={formik.touched.role && !!formik.errors.role}
            helperText={formik.touched.role && formik.errors.role}
          />
        </Box>
      </DynamicModal>
    </>
  );
};

export default ProfileCard;
