import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { DynamicModal, Input } from "../../../../components";
import { useUpdateUserInfoMutation } from "../../../../services/auth";
import { updateUser } from "../../../../store/slices/auth";
import { profileDetailsSchema } from "../../../../schemas";

const EditProfileModal = ({ userData, open, handleClose }) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();
  const formik = useFormik({
    initialValues: {
      country: userData?.country,
      city: userData?.city,
      company: userData?.company,
      industry: userData?.industry,
      designation: userData?.designation,
    },
    enableReinitialize: true,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      updateProfile(values).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success("Your profile updated successfully");
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
      title="Update profile"
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
          rowGap: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
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
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Input
            customLabel="City *"
            variant="outlined"
            name="city"
            value={formik.values.city}
            handleChange={formik.handleChange}
            error={formik.touched.city && !!formik.errors.city}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Input
            customLabel="Company *"
            variant="outlined"
            name="company"
            value={formik.values.company}
            handleChange={formik.handleChange}
            error={formik.touched.company && !!formik.errors.company}
            helperText={formik.touched.company && formik.errors.company}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Input
            customLabel="Industry *"
            variant="outlined"
            name="industry"
            value={formik.values.industry}
            handleChange={formik.handleChange}
            error={formik.touched.industry && !!formik.errors.industry}
            helperText={formik.touched.industry && formik.errors.industry}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Input
            customLabel="Role *"
            variant="outlined"
            name="designation"
            value={formik.values.designation}
            handleChange={formik.handleChange}
            error={formik.touched.designation && !!formik.errors.designation}
            helperText={formik.touched.designation && formik.errors.designation}
          />
        </Box>
      </Box>
    </DynamicModal>
  );
};

export default EditProfileModal;
