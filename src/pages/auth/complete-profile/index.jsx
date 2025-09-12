import { useFormik } from "formik";
import { Box, Button, Typography } from "@mui/material";
import { Input } from "../../../components";
import { profileDetailsSchema } from "../../../schemas";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const CompleteProfile = () => {
  const currentYear = dayjs();
  const tempUser = JSON.parse(localStorage.getItem("temp_user_data"));
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      country: "",
      city: "",
      company: "",
      industry: "",
      designation: "",
      startingDate: null,
    },
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      navigate(`/upload-image?data=${JSON.stringify(values)}`);
    },
  });
  return (
    <>
      <Typography mt="50px" fontSize={"29px"} textAlign="center">
        Welcome, {tempUser?.firstName}!
      </Typography>
      <Typography fontSize={"17px"} fontWeight={300} textAlign="center">
        Let’s begin your profile, connect to the people you know, and engage
        with them on topics you care about.
      </Typography>
      <Box
        sx={{
          width: { xs: "90%", sm: "70%", md: "60%", lg: "40%" },
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          mt: "60px",
        }}
      >
        <Input
          label="Country/Region *"
          name="country"
          value={formik.values.country}
          handleChange={formik.handleChange}
          error={formik.touched.country && !!formik.errors.country}
          helperText={formik.touched.country && formik.errors.country}
        />
        <Input
          label="City *"
          name="city"
          value={formik.values.city}
          handleChange={formik.handleChange}
          error={formik.touched.city && !!formik.errors.city}
          helperText={formik.touched.city && formik.errors.city}
        />
        <Input
          label="Company*"
          name="company"
          value={formik.values.company}
          handleChange={formik.handleChange}
          error={formik.touched.company && !!formik.errors.company}
          helperText={formik.touched.company && formik.errors.company}
        />
        <Input
          label="Industry*"
          name="industry"
          value={formik.values.industry}
          handleChange={formik.handleChange}
          error={formik.touched.industry && !!formik.errors.industry}
          helperText={formik.touched.industry && formik.errors.industry}
        />
        <Input
          label="Role*"
          name="designation"
          value={formik.values.designation}
          handleChange={formik.handleChange}
          error={formik.touched.designation && !!formik.errors.designation}
          helperText={formik.touched.designation && formik.errors.designation}
        />
        <Box sx={{ width: "100%" }}>
          <Typography mb={1}>Starting Date</Typography>
          <DatePicker
            value={formik.values.startingDate}
            onChange={(value) => formik.setFieldValue("startingDate", value)}
            maxDate={currentYear}
            openTo="day"
            views={["year", "month", "day"]}
            sx={{
              ".MuiOutlinedInput-root": {
                width: "100%",
                backgroundColor: "#FCFCFC",
                height: "65px",
                border: "none",
                borderBottom: "1px solid #000000 !important",
                borderRadius: "0px",
                fontSize: "18px",
              },
            }}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            rowGap: "20px",
            mt: "50px",
            mb: "40px",
          }}
        >
          <Box sx={{ width: "250px" }}>
            <Button type="submit" onClick={formik.handleSubmit}>
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CompleteProfile;
