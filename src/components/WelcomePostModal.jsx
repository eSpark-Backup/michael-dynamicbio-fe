import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./button";
import WelcomePreviewModal from "./WelcomePreviewModal";
import DynamicModal from "./dynamic-modal";
import { useFormik } from "formik";
import { welcomeNoteSchema } from "../schemas";

const WelcomePostModal = ({ handleClose }) => {
  const [note, setNote] = useState("");
  const [previewModal, setPreviewModal] = useState(false);
  const handleSave = () => {
    setPreviewModal(false);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      note: "",
    },
    validationSchema: welcomeNoteSchema,
    onSubmit: (values) => {
      console.log(values, "values");
    },
  });
  return (
    <Box sx={{ mt: "30px" }}>
      <Typography
        sx={{ fontSize: "16px", fontWeight: "400", color: "#505050" }}
      >
        Write a custom note to welcome new members when they visit this group.{" "}
        <span style={{ fontSize: "16px", fontWeight: "600", color: "#505050" }}>
          Learn more
        </span>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "3px",
          ".MuiOutlinedInput-root": {
            minHeight: "65px !important",
            height: "auto !important",
          },
          input: { paddingBottom: "20px" },
          pb: "40px",
          mt: "15px",
        }}
      >
        <Typography
          sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
        >
          Welcome note
        </Typography>
        <Input
          wordLimit={1000}
          required
          customLabel=""
          placeholder=""
          type="text"
          name="note"
          variant="outlined"
          value={formik.values.note}
          handleChange={formik.handleChange}
          multiline={true}
          rows={8}
          error={formik.touched.note && !!formik.errors.note}
          helperText={formik.touched.note && formik.errors.note}
          onBlur={formik.handleBlur}
          sx={{
            "& textarea": {
              resize: "vertical",
              overflow: "auto",
              scrollbarWidth: "none",
              "::-webkit-scrollbar": {
                display: "none",
              },
            },
          }}
        />
      </Box>
      <Stack
        justifyContent={"flex-end"}
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
        <Button
          disabled={
            formik.values.note?.length === 0 ||
            (formik.touched.note && !!formik.errors.note)
          }
          type="submit"
          sx={{
            maxWidth: "150px",
            height: "36px",
            fontSize: "16px",
            minWidth: { md: "150px" },
          }}
          onClick={() => setPreviewModal(true)}
        >
          Preview
        </Button>
      </Stack>
      <DynamicModal
        open={previewModal}
        handleClose={() => setPreviewModal(false)}
        title={"Preview"}
        postModal={true}
        styledHeader={true}
        hideFooter={true}
        smallModal={true}
      >
        <WelcomePreviewModal
          content={formik.values.note}
          handleClose={() => setPreviewModal(false)}
          handleSave={handleSave}
        />
      </DynamicModal>
    </Box>
  );
};

export default WelcomePostModal;
