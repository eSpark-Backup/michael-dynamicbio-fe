import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Box, Stack, Typography } from "@mui/material";
import { DynamicModal, Input } from "../../../../components";
import { useUpdateUserInfoMutation } from "../../../../services/auth";
import { updateUser } from "../../../../store/slices/auth";
import { educationSchema } from "../../../../schemas";

const AddEducationModal = ({ userData, open, handleClose }) => {
  const currentYear = dayjs();
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();
  const formik = useFormik({
    initialValues: {
      school: "",
      degree: "",
      field: "",
      grade: "",
      startingDate: null,
      endingDate: null,
    },
    validationSchema: educationSchema,
    onSubmit: (values) => {
      const arrToSend = userData?.about?.education
        ? [...userData?.about?.education, { ...values }]
        : [{ ...values }];
      const filteredArr = arrToSend.filter((item) => item !== undefined);
      updateProfile({
        about: { ...userData?.about, education: filteredArr },
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success("Your Education added successfully");
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
      title="Add Education"
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
          rowGap: "10px",
          ".MuiOutlinedInput-root": { height: "auto !important" },
          textarea: { paddingBottom: "20px" },
        }}
      >
        {" "}
        <Box sx={{ width: "100%" }}>
          <Input
            customLabel="School *"
            variant="outlined"
            placeholder="Please enter your school"
            name="school"
            value={formik.values.school}
            handleChange={formik.handleChange}
            error={formik.touched.school && !!formik.errors.school}
            helperText={formik.touched.school && formik.errors.school}
          />{" "}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Input
            customLabel="Degree *"
            variant="outlined"
            placeholder="Please enter your degree"
            name="degree"
            value={formik.values.degree}
            handleChange={formik.handleChange}
            error={formik.touched.degree && !!formik.errors.degree}
            helperText={formik.touched.degree && formik.errors.degree}
          />{" "}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Input
            customLabel="Field of study *"
            variant="outlined"
            placeholder="Please enter your field"
            name="field"
            value={formik.values.field}
            handleChange={formik.handleChange}
            error={formik.touched.field && !!formik.errors.field}
            helperText={formik.touched.field && formik.errors.field}
          />{" "}
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Box sx={{ width: "100%" }}>
            <Typography mb={1}>Starting Date</Typography>
            <DatePicker
              value={formik.values.startingDate}
              onChange={(value) => formik.setFieldValue("startingDate", value)}
              maxDate={currentYear}
              openTo="year"
              views={["year"]}
              yearsOrder="desc"
              sx={{ minWidth: 250 }}
              slotProps={{
                textField: {
                  error:
                    formik.touched.startingDate && !!formik.errors.startingDate,
                  helperText:
                    formik.touched.startingDate && formik.errors.startingDate,
                },
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography mb={1}>Ending Date (or expected)</Typography>
            <DatePicker
              value={formik.values.endingDate}
              onChange={(value) => formik.setFieldValue("endingDate", value)}
              disabled={formik.values.currently}
              maxDate={currentYear}
              openTo="year"
              views={["year"]}
              yearsOrder="desc"
              sx={{ minWidth: 250 }}
              slotProps={{
                textField: {
                  error:
                    formik.touched.endingDate && !!formik.errors.endingDate,
                  helperText:
                    formik.touched.endingDate && formik.errors.endingDate,
                },
              }}
            />
          </Box>
        </Stack>
        <Box sx={{ width: "100%" }}>
          <Input
            customLabel="Grade"
            variant="outlined"
            placeholder="Please enter your grade"
            name="grade"
            value={formik.values.grade}
            handleChange={formik.handleChange}
            error={formik.touched.grade && !!formik.errors.grade}
            helperText={formik.touched.grade && formik.errors.grade}
          />{" "}
        </Box>
      </Box>
    </DynamicModal>
  );
};

export default AddEducationModal;
