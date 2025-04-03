import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { DynamicModal, Input } from "../../../../components";
import { useUpdateUserInfoMutation } from "../../../../services/auth";
import { updateUser } from "../../../../store/slices/auth";

const EditBioModal = ({ userData, open, handleClose }) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();
  const formik = useFormik({
    initialValues: {
      bio: userData?.about?.bio || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateProfile({ about: { ...userData?.about, bio: values?.bio } }).then(
        (res) => {
          if (res?.error) {
            toast.error(res?.error?.data?.message);
            return;
          }
          if (res) {
            toast.success("Your Bio updated successfully");
            dispatch(updateUser(res?.data?.data));
            onClose();
          }
        }
      );
    },
  });

  const onClose = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <DynamicModal
      isLoading={isLoading}
      title="Update Bio"
      buttonText="Update"
      open={open}
      onSuccess={formik.handleSubmit}
      handleClose={onClose}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
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
  );
};

export default EditBioModal;
