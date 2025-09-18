import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { DynamicModal, Input } from "../../../../components";
import { useUpdateUserInfoMutation } from "../../../../services/auth";
import { updateUser } from "../../../../store/slices/auth";
import { findEmailSchema } from "../../../../schemas";

const EditEmailModal = ({ email, userData, open, handleClose }) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();

  const initialValues = useMemo(
    () => ({
      email: email?.email || "",
    }),
    [email]
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: findEmailSchema,
    onSubmit: (values) => {
      const ind = userData?.about?.email?.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(email)
      );
      let updatedEmail;
      if (ind !== -1) {
        updatedEmail = [...userData.about.email];
        updatedEmail[ind] = values;
      } else {
        updatedEmail = [...userData.about.email, values];
      }
      updateProfile({
        about: {
          ...userData?.about,
          email: updatedEmail,
        },
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success("Your email edited successfully");
          dispatch(updateUser(res?.data?.data));
          onClose();
        }
      });
    },
  });

  const onClose = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <DynamicModal
      isLoading={isLoading}
      title="Edit Email"
      buttonText="Edit"
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
          customLabel="Email *"
          variant="outlined"
          placeholder="Please enter your email"
          name="email"
          value={formik.values.email}
          handleChange={formik.handleChange}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Box>
    </DynamicModal>
  );
};

export default EditEmailModal;
