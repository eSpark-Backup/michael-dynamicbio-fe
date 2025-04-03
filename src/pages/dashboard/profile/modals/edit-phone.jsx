import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { DynamicModal, Input } from "../../../../components";
import { useUpdateUserInfoMutation } from "../../../../services/auth";
import { updateUser } from "../../../../store/slices/auth";
import { phoneNoSchema } from "../../../../schemas";

const EditPhoneModal = ({ phone, userData, open, handleClose }) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();

  const initialValues = useMemo(
    () => ({
      phone: phone?.phone || "",
    }),
    [phone]
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: phoneNoSchema,
    onSubmit: (values) => {
      const ind = userData?.about?.phone?.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(phone)
      );
      let updatedEmail;
      if (ind !== -1) {
        updatedEmail = [...userData?.about?.phone];
        updatedEmail[ind] = values;
      } else {
        updatedEmail = [...userData?.about?.phone, values];
      }
      updateProfile({
        about: {
          ...userData?.about,
          phone: updatedEmail,
        },
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success("Your phone no edited successfully");
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
      title="Edit Phone"
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
          customLabel="Phone *"
          variant="outlined"
          placeholder="Please enter your phone"
          name="phone"
          value={formik.values.phone}
          handleChange={formik.handleChange}
          error={formik.touched.phone && !!formik.errors.phone}
          helperText={formik.touched.phone && formik.errors.phone}
        />
      </Box>
    </DynamicModal>
  );
};

export default EditPhoneModal;
