import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { Dropdown, DynamicModal, Input } from "../../../../components";
import { useUpdateUserInfoMutation } from "../../../../services/auth";
import { updateUser } from "../../../../store/slices/auth";
import { experienceSchema } from "../../../../schemas";

const AddExperienceModal = ({ userData, open, handleClose }) => {
  const currentYear = dayjs();
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();
  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      company: "",
      location: "",
      currently: false,
      startingDate: null,
      endingDate: null,
    },
    validationSchema: experienceSchema,
    onSubmit: (values) => {
      const arrToSend = userData?.about?.experience
        ? [...userData?.about?.experience, { ...values }]
        : [{ ...values }];
      const filteredArr = arrToSend.filter((item) => item !== undefined);
      updateProfile({
        about: { ...userData?.about, experience: filteredArr },
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success("Your Experience added successfully");
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
      title="Add Experience"
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
        <Input
          customLabel="Title *"
          variant="outlined"
          placeholder="Please enter your job title"
          name="title"
          value={formik.values.title}
          handleChange={formik.handleChange}
          error={formik.touched.title && !!formik.errors.title}
          helperText={formik.touched.title && formik.errors.title}
        />
        <Dropdown
          variant="outlined"
          options={[
            { label: "Full-Time", value: "Full-Time" },
            { label: "Part-Time", value: "Part-Time" },
          ]}
          handleChange={(event) =>
            formik.setFieldValue("type", event.target.value)
          }
          customLabel="Employment type *"
          noLabel
          placeholder="Select employment type"
          error={formik.touched.type && !!formik.errors.type}
          helperText={formik.touched.type && formik.errors.type}
          value={formik.values.type}
        />
        <Input
          customLabel="Company *"
          variant="outlined"
          placeholder="company you worked with"
          name="company"
          value={formik.values.company}
          handleChange={formik.handleChange}
          error={formik.touched.company && !!formik.errors.company}
          helperText={formik.touched.company && formik.errors.company}
        />
        <Input
          customLabel="Location *"
          variant="outlined"
          placeholder="Please enter location"
          name="location"
          value={formik.values.location}
          handleChange={formik.handleChange}
          error={formik.touched.location && !!formik.errors.location}
          helperText={formik.touched.location && formik.errors.location}
        />
        <FormControlLabel
          sx={{
            width: "100%",
            alignItems: "flex-start",
            padding: 0,
            margin: 0,
            mt: 2,
            gap: "10px",
            span: { padding: 0 },
          }}
          control={
            <Checkbox
              checked={formik.values.currently}
              onChange={formik.handleChange}
              name="currently"
            />
          }
          label="I am currently working in this role"
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Box sx={{ width: "100%" }}>
            <Typography>Starting Date</Typography>
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
            <Typography>Ending Date</Typography>
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
      </Box>
    </DynamicModal>
  );
};

export default AddExperienceModal;
