import { useState } from "react";
import { useFormik } from "formik";
import { Box, Paper, Typography } from "@mui/material";
import { DynamicModal, Input } from "../../../components";
import { plus, primaryEdit } from "../../../assets";

const LeftBar = ({ userData, isPublicView }) => {
  const [modal, setModal] = useState("");

  const formik = useFormik({
    initialValues: {
      bio: userData?.about?.bio || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  const handleClose = () => {
    setModal("");
    formik.resetForm();
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
            Adding your experience allow you to get better opportunities.
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
          {!isPublicView && (
            <img style={{ cursor: "ponter" }} src={primaryEdit} alt="edit" />
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
            {userData?.email}
          </Typography>
          {!isPublicView && (
            <img style={{ cursor: "ponter" }} src={plus} alt="add" />
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
            {userData?.phoneNumber || "Phone number"}
          </Typography>
          {!isPublicView && (
            <img style={{ cursor: "ponter" }} src={plus} alt="add" />
          )}
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
            height: "40px",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
          >
            Experience
          </Typography>
          {!isPublicView && (
            <img style={{ cursor: "pointer" }} src={primaryEdit} alt="edit" />
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
        {!isPublicView && (
          <Box
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
          {!isPublicView && (
            <img style={{ cursor: "pointer" }} src={primaryEdit} alt="edit" />
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
        {!isPublicView && (
          <Box
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
          {!isPublicView && (
            <img style={{ cursor: "pointer" }} src={primaryEdit} alt="edit" />
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
        {!isPublicView && (
          <Box
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
      <DynamicModal
        title="Update Bio"
        buttonText="Update"
        open={modal === "bio"}
        onSuccess={formik.handleSubmit}
        handleClose={handleClose}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            ".MuiOutlinedInput-root": { height: "auto !important" },
            textarea: { paddingBottom: "20px" },
          }}
        >
          <Input
            customLabel="Bio"
            variant="outlined"
            placeholder="Please enter your bio"
            name="bio"
            multiline
            rows={5}
            value={formik.values.bio}
            handleChange={formik.handleChange}
            error={formik.touched.bio && !!formik.errors.bio}
            helperText={formik.touched.bio && formik.errors.bio}
          />
        </Box>
      </DynamicModal>
    </>
  );
};

export default LeftBar;
