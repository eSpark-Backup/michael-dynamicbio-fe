import { Box, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import Input from "./Input";
import { pollSchema } from "../schemas";
import { plus } from "../assets";
import Dropdown from "./Dropdown";
import { eventDuration } from "../constant";
import Button from "./button";

const PollModal = ({ isLoading, handleSuccess, handleBack }) => {
  const formik = useFormik({
    initialValues: {
      question: "",
      options: [],
      opt1: "",
      opt2: "",
      duration: eventDuration[0]?.value || "",
    },
    validationSchema: pollSchema,
    onSubmit: (values) => {
      handleSuccess(values);
    },
  });

  const scrollContainerRef = useRef(null);
  const prevOptionsLength = useRef(formik.values.options.length);

  useEffect(() => {
    if (formik.values.options.length > prevOptionsLength.current) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight;
      }
    }
    prevOptionsLength.current = formik.values.options.length;
  }, [formik.values.options]);

  const handleAddOption = () => {
    formik.setFieldValue("options", [...formik.values.options, ""]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "15px",
            mt: "20px",
            height: "250px",
            overflowY: "auto",
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
            pb: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "3px",
              ".MuiOutlinedInput-root": { height: "65px !important" },
              input: { paddingBottom: "20px" },
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
            >
              Your question<sup>*</sup>
            </Typography>
            <Input
              wordLimit={100}
              variant="outlined"
              customLabel=""
              placeholder="Add your question"
              name="question"
              value={formik.values.question}
              handleChange={formik.handleChange}
              error={formik.touched.question && !!formik.errors.question}
              helperText={formik.touched.question && formik.errors.question}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "3px",
              ".MuiOutlinedInput-root": { height: "65px !important" },
              input: { paddingBottom: "20px" },
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
            >
              Option 1<sup>*</sup>
            </Typography>
            <Input
              wordLimit={100}
              variant="outlined"
              customLabel=""
              placeholder="Add option 1"
              name="opt1"
              value={formik.values.opt1}
              handleChange={formik.handleChange}
              error={formik.touched.opt1 && !!formik.errors.opt1}
              helperText={formik.touched.opt1 && formik.errors.opt1}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "3px",
              ".MuiOutlinedInput-root": { height: "65px !important" },
              input: { paddingBottom: "20px" },
            }}
          >
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
            >
              Option 2<sup>*</sup>
            </Typography>
            <Input
              wordLimit={100}
              variant="outlined"
              customLabel=""
              placeholder="Add option 2"
              name="opt2"
              value={formik.values.opt2}
              handleChange={formik.handleChange}
              error={formik.touched.opt2 && !!formik.errors.opt2}
              helperText={formik.touched.opt2 && formik.errors.opt2}
              onBlur={formik.handleBlur}
            />
          </Box>
          {formik.values.options?.length > 0 &&
            formik.values.options?.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "3px",
                  ".MuiOutlinedInput-root": { height: "65px !important" },
                  input: { paddingBottom: "20px" },
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
                >
                  {`Option ${index + 3}`}
                </Typography>
                <Input
                  wordLimit={100}
                  variant="outlined"
                  customLabel=""
                  placeholder={`Add option ${index + 3}`}
                  name={`options[${index}]`}
                  value={formik.values.options[index]}
                  handleChange={formik.handleChange}
                  error={
                    formik.touched.options?.[index] &&
                    !!formik.errors.options?.[index]
                  }
                  helperText={
                    formik.touched.options?.[index] &&
                    formik.errors.options?.[index]
                  }
                  onBlur={formik.handleBlur}
                />
              </Box>
            ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            columnGap: "15px",
            alignItems: "center",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={handleAddOption}
        >
          <Typography
            variant="gradientText"
            sx={{ fontSize: "14px", fontWeight: 400 }}
          >
            Add more option
          </Typography>
          <img
            src={plus}
            alt="Icon"
            style={{ width: "24px", height: "24px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "3px",
            pb: "25px",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Poll duration
          </Typography>
          <Dropdown
            variant="outlined"
            options={eventDuration}
            handleChange={(event) =>
              formik.setFieldValue("duration", event.target.value)
            }
            onBlur={formik.handleBlur}
            value={formik.values.duration}
            noLabel
            placeholder="Select format"
            error={formik.touched.duration && !!formik.errors.duration}
            helperText={formik.touched.duration && formik.errors.duration}
          />
        </Box>
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          px={6}
          direction={"row"}
          gap={3}
          sx={{
            height: "55px",
            borderTop: "1px solid #E4E4E4",
            width: "100%",
            display: "flex",
            alignItems: "center",
            position: "fixed",
            bottom: "0px",
            right: "0px",
            zIndex: 999,
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              width: "150px",
              height: "36px",
              borderRadius: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "8px",
                padding: "1px",
                background:
                  "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                WebkitMask:
                  "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude",
              },
              cursor: "pointer",
            }}
            onClick={handleBack}
          >
            <Typography variant="gradientText">Back</Typography>
          </Box>
          <Button
            disabled={isLoading}
            loading={isLoading}
            type="submit"
            sx={{ width: "150px", height: "36px", fontSize: "16px" }}
          >
            Post
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default PollModal;
