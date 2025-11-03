import {
  Grid,
  Stack,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { addCircle } from "../../assets";
import CancelIcon from "@mui/icons-material/Cancel";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FeatureAndImages = ({ data = {} }) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext();
  const { fields = [] } = data;

  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (values.upload_photos && values.upload_photos.length > 0) {
      const initialPreviews = values.upload_photos.map((img) =>
        typeof img === "string" ? img : URL.createObjectURL(img)
      );
      setPreviews(initialPreviews);
    }
  }, [values.upload_photos]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files || []);

    const updatedFiles = [...(values.upload_photos || []), ...newFiles];
    setFieldValue("upload_photos", updatedFiles);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = values.upload_photos.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFieldValue("upload_photos", updatedFiles);
    setPreviews(updatedPreviews);
  };

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center" px={1.5}>
      {fields.map(({ label, name, placeholder, type, size }, index) => (
        <Grid item key={index} xs={12} md={size === 11.82 ? 12 : 6}>
          <Stack spacing={1.5} pb={0}>
            {type === "text" && (
              <Typography
                sx={{
                  color: "#191F33",
                  fontSize: { xs: "14px", md: "16px", lg: "18px" },
                  fontFamily: "Nunito",
                }}
              >
                {label}
              </Typography>
            )}
            {type === "text" && (
              <TextField
                fullWidth
                name={name}
                value={values[name] || ""}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                minRows={4}
                error={touched[name] && Boolean(errors[name])}
                helperText={touched[name] && errors[name]}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "auto", // ✅ allow expansion
                    alignItems: "flex-start",
                    padding: "20px",
                    border: "1.31px solid #EDEFF5",
                    borderRadius: "7px",
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "Nunito",
                    fontWeight: 400,
                    fontSize: { xs: "18px", lg: "20px" },
                    color: "#000",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#939AAD",
                    opacity: 1,
                    fontWeight: 400,
                    fontSize: { xs: "18px", lg: "20px" },
                    fontFamily: "Nunito",
                  },
                }}
              />
            )}

            {type === "upload" && (
              <Box>
                <Typography
                  sx={{
                    fontWeight: 400,
                    color: "#191F33",
                    fontSize: { xs: "18px", lg: "20px" },
                    fontFamily: "Nunito",
                  }}
                >
                  {label}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1.31px dashed #EBEEF7",
                    borderRadius: "6.56px",
                    my: 2,
                    py: previews?.length === 0 ? 2.5 : 0.5,
                    px: 2.5,
                    gap: previews?.length === 0 ? 0 : 2,
                  }}
                >
                  {/* Previews Box */}
                  <Box
                    sx={{
                      width: {
                        xs: "calc(fit-content - 133px)",
                        lg: "calc(fit-content - 166px)",
                      },
                      gap: 2.5,
                      display: "flex",
                      py: previews?.length === 0 ? 0 : 2.5,
                      px: previews?.length === 0 ? 0 : 1,
                      overflowX: "auto",
                      overflowY: "hidden",
                      scrollbarWidth: "thin",
                      "&::-webkit-scrollbar": {
                        height: 8,
                        pt: 1,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#ccc",
                        borderRadius: 4,
                      },
                    }}
                  >
                    {previews.map((src, i) => (
                      <Box
                        key={i}
                        sx={{
                          position: "relative",
                          width: { xs: 120, lg: 150 },
                          height: { xs: 120, lg: 150 },
                          flexShrink: 0,
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            backgroundColor: "#F5F7FA",
                          }}
                        >
                          <img
                            // src={src}
                            src={
                              typeof src === "string"
                                ? src
                                : URL.createObjectURL(src)
                            }
                            // alt={`preview-${i}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>

                        <IconButton
                          size="small"
                          disableRipple
                          onClick={() => handleRemoveImage(i)}
                          sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            bgcolor: "white",
                            color: "#FF4F4F",
                            borderRadius: "50%",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            p: "2px",
                            zIndex: 10,
                            "&:hover": { bgcolor: "#fff5f5" },
                          }}
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>

                  {/* Upload Button */}
                  <IconButton
                    component="label"
                    disableRipple
                    sx={{
                      width: { xs: 120, lg: 150 },
                      height: { xs: 120, lg: 150 },
                      backgroundColor: "#F5F7FA",
                      cursor: "pointer",
                      borderRadius: "8px",
                      // p: 1.5,
                      // m: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexShrink: 0,
                      "&:hover": {
                        backgroundColor: "#F0F3F7",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={addCircle}
                      alt="Add"
                      sx={{ width: 49, height: 49 }}
                    />
                    <VisuallyHiddenInput
                      id="upload-button"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </IconButton>
                </Box>
                {touched.upload_photos && errors.upload_photos && (
                  <Typography
                    sx={{ color: "#d32f2f", fontSize: 12, mt: -1, ml: 1.5 }}
                  >
                    {errors.upload_photos}
                  </Typography>
                )}
              </Box>
            )}
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureAndImages;
