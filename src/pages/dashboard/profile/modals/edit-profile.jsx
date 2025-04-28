import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box, Stack, Typography } from "@mui/material";
import { Dropdown, DynamicModal, Input } from "../../../../components";
import { useUpdateUserInfoMutation } from "../../../../services/auth";
import { updateUser } from "../../../../store/slices/auth";
import { editProfileDetailsSchema } from "../../../../schemas";
import { plus } from "../../../../assets";

const EditProfileModal = ({
  userData,
  open,
  handleClose,
  handleOpenExpModal,
}) => {
  const options = userData?.about?.experience
  ?.filter((item) => item?.currently)
  ?.map((item) => ({
    value: item.title,
    label: item.title,
  }));
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();
  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      country: userData?.country,
      city: userData?.city,
      current: userData?.designation,
      industry: userData?.industry,
    },
    enableReinitialize: true,
    validationSchema: editProfileDetailsSchema,
    onSubmit: (values) => {
      const currentJob = userData?.about?.experience?.find(item => item.title === values?.current);
      const bodyToSend = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        country: values?.country,
        city: values?.city,
        designation: currentJob?.title,
        company: currentJob?.company,
        industry: userData?.industry,
      }
      updateProfile(bodyToSend).then((res) => {
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
            customLabel="First Name *"
            variant="outlined"
            name="firstName"
            value={formik.values.firstName}
            handleChange={formik.handleChange}
            error={formik.touched.firstName && !!formik.errors.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Input
            customLabel="Last Name *"
            variant="outlined"
            name="lastName"
            value={formik.values.lastName}
            handleChange={formik.handleChange}
            error={formik.touched.lastName && !!formik.errors.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Box>
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
          <Dropdown
            noLabel
            options={options}
            placeholder="Current position"
            customLabel="Current position *"
            variant="outlined"
            name="current"
            value={formik.values.current}
            handleChange={formik.handleChange}
            error={formik.touched.current && !!formik.errors.current}
            helperText={formik.touched.current && formik.errors.current}
          />
        </Box>
        <Stack
          onClick={() => {
            handleClose();
            handleOpenExpModal();
          }}
          sx={{
            cursor: "pointer",
            border: "1px solid #DDE2E4",
            padding: "10px 0",
            borderRadius: "4px",
          }}
          mt={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <img src={plus} alt="add" />
          <Typography>Add new experience</Typography>
        </Stack>
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
      </Box>
    </DynamicModal>
  );
};

export default EditProfileModal;
