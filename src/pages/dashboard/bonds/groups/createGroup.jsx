import { useRef, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Dropdown, DynamicModal, Input } from "../../../../components";
import { createGroupSchema } from "../../../../schemas";
import { edit, plus, uploadIcon, userAvatar } from "../../../../assets";
import { useCreateGroupMutation } from "../../../../services/group";
import { industryTypeOptions } from "../../../../constant";
import { convertToFormData } from "../../../../utils";

export default function CreateGroupModal({ open, handleClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [createGroup, { isLoading }] = useCreateGroupMutation();
  const navigate = useNavigate();
  const coverRef = useRef(null);
  const ProfileRef = useRef(null);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      location: "",
      rules: "",
      industry: "",
      type: "",
      allowInvite: false,
      allowPost: false,
    },
    validationSchema: createGroupSchema,
    onSubmit: (values, { resetForm }) => {
      const bodyToSend = {
        logo: profile,
        cover,
        name: values?.name,
        description: values?.description,
        address: values?.location,
        rules: values?.rules,
        industry: values?.industry,
        status: values?.type,
        allowMemberInvites: values?.allowInvite,
        requirePostApproval: values?.allowPost,
      };
      const formdata = convertToFormData(bodyToSend);
      createGroup(formdata).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          navigate(`/group/${res?.data?.data?.id}`);
          resetForm();
          setCover(null);
          setProfile(null);
        }
      });
    },
  });

  return (
    <DynamicModal
      sx={{ height: "907px", maxWidth: "965px" }}
      open={open}
      handleClose={handleClose}
      title="Create Group"
      onSuccess={formik.handleSubmit}
      buttonText="Create"
      isLoading={isLoading}
    >
      <Box
        sx={{
          width: "100%",
          height: "122px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {cover && (
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              zIndex: -1,
              opacity: 0.5,
            }}
            src={URL.createObjectURL(cover)}
            alt="cover"
          />
        )}
        <Box
          onClick={() => coverRef.current.click()}
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography>Cover Photo</Typography>
          <img src={uploadIcon} alt="upload" />
        </Box>
        <input
          ref={coverRef}
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith("image/")) {
              setCover(file);
            } else {
              toast.error("Please select a valid image file.");
              e.target.value = "";
            }
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: "-70px",
          position: "relative",
          width: "max-content",
          marginBottom: "20px",
        }}
        onClick={() => ProfileRef.current.click()}
      >
        <img
          style={{ width: isMobile ? "80px" : "153px", height: isMobile ? "80px" : "153px", borderRadius: "50%" }}
          src={profile ? URL.createObjectURL(profile) : userAvatar}
          alt="profile"
        />
        <img
          style={{ position: "absolute", top: "0px", right: "0px" }}
          src={edit}
          alt="edit"
        />
        <input
          ref={ProfileRef}
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith("image/")) {
              setProfile(file);
            } else {
              toast.error("Please select a valid image file.");
              e.target.value = "";
            }
          }}
        />
      </Box>
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            width: "100%",
            marginTop: "16px",
            ".MuiOutlinedInput-root": { height: "65px !important" },
            input: { paddingBottom: "20px" },
          }}
        >
          <Input
            wordLimit={100}
            required
            customLabel="Group name"
            placeholder="Inspiring people"
            type="text"
            name="name"
            variant="outlined"
            value={formik.values.name}
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            marginTop: "16px",
            ".MuiOutlinedInput-root": { height: "65px !important" },
            input: { paddingBottom: "20px" },
          }}
        >
          <Input
            wordLimit={500}
            required
            customLabel="Description"
            placeholder="What is the aim of this group?"
            type="text"
            name="description"
            variant="outlined"
            value={formik.values.description}
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            marginTop: "16px",
            ".MuiOutlinedInput-root": { height: "65px !important" },
            input: { paddingBottom: "20px" },
          }}
        >
          <Input
            required
            wordLimit={100}
            customLabel="Location"
            placeholder="Add a location"
            type="text"
            name="location"
            variant="outlined"
            value={formik.values.location}
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            marginTop: "16px",
            ".MuiOutlinedInput-root": { height: "65px !important" },
            input: { paddingBottom: "20px" },
          }}
        >
          <Input
            wordLimit={500}
            customLabel="Rules"
            placeholder="Set the tone & expectations of your group"
            type="text"
            name="rules"
            variant="outlined"
            value={formik.values.rules}
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rules && Boolean(formik.errors.rules)}
            helperText={formik.touched.rules && formik.errors.rules}
          />
        </Box>
        <Box sx={{ mt: 1 }}>
          <Dropdown
            required
            variant="outlined"
            options={industryTypeOptions}
            handleChange={(event) =>
              formik.setFieldValue("industry", event.target.value)
            }
            customLabel="Add industry"
            noLabel
            placeholder="Select Industry"
            error={formik.touched.industry && !!formik.errors.industry}
            helperText={formik.touched.industry && formik.errors.industry}
            value={formik.values.industry}
          />
        </Box>
        <>
          <Stack
            mb={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography fontSize={12}>Group type</Typography>
            {<Typography fontSize={12}>Required</Typography>}
          </Stack>
          <Box
            sx={{
              padding: "7px 21px",
              width: "100%",
              border: "1px solid #000",
              borderRadius: "4px",
            }}
          >
            <RadioGroup
              sx={{ width: "100%", gap: "10px" }}
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <Stack sx={{ label: { margin: 0 } }} direction="row">
                <FormControlLabel value="PUBLIC" control={<Radio />} />
                <Box>
                  <Typography sx={{ color: "#000" }}>Public</Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    Everyone can see group’s posts. The group will appear in
                    search results and be visible on members’ profiles.
                  </Typography>
                </Box>
              </Stack>

              <Stack sx={{ label: { margin: 0 } }} direction="row">
                <FormControlLabel value="PRIVATE" control={<Radio />} />
                <Box>
                  <Typography sx={{ color: "#000" }}>Private</Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    Only members can see posts.
                  </Typography>
                </Box>
              </Stack>
            </RadioGroup>
          </Box>
          {formik.touched.type && formik.errors.type && (
            <Typography
              sx={{
                color: "#d32f2f ",
                fontSize: "14px",
                margin: "3px 14px 0 14px",
              }}
            >
              {formik.errors.type}
            </Typography>
          )}
        </>
        <>
          <Typography fontSize={12} mt={2} mb={1}>
            Permissions
          </Typography>
          <Box
            sx={{
              padding: "7px 21px",
              width: "100%",
              border: "1px solid #000",
              borderRadius: "4px",
            }}
          >
            <Stack sx={{ label: { margin: 0 } }} direction="row">
              <Checkbox
                checked={formik.values.allowInvite}
                onChange={formik.handleChange}
                name="allowInvite"
              />
              <Box>
                <Typography sx={{ color: "#000" }}>
                  Allow members to invite their knowns
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  All requests to join will still require admin approval.
                </Typography>
              </Box>
            </Stack>

            <Stack sx={{ mt: 1, label: { margin: 0 } }} direction="row">
              <Checkbox
                checked={formik.values.allowPost}
                onChange={formik.handleChange}
                name="allowPost"
              />
              <Box>
                <Typography sx={{ color: "#000" }}>
                  Require new posts to be reviewed by admins
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {
                    "Member's posts will require admin approval within 14 days before they become visible to others."
                  }
                </Typography>
              </Box>
            </Stack>
          </Box>
        </>
      </Box>
    </DynamicModal>
  );
}
