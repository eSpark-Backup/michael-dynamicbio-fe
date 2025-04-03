import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { DynamicModal, Input } from "../../../../components";
import { useUpdateUserInfoMutation } from "../../../../services/auth";
import { updateUser } from "../../../../store/slices/auth";
import { findEmailSchema } from "../../../../schemas";

const AddEmailModal = ({ userData, open, handleClose }) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: findEmailSchema,
    onSubmit: (values) => {
      const arrToSend = userData?.about?.email
        ? [...userData?.about?.email, { ...values }]
        : [{ ...values }];
      const filteredArr = arrToSend.filter((item) => item !== undefined);
      updateProfile({
        about: { ...userData?.about, email: filteredArr },
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success("Your email added successfully");
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
      title="Add Email"
      buttonText="Add"
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

export default AddEmailModal;
