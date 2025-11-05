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
import { FEATURE_AND_IMAGES_STYLE } from "./Styles";

const {
  labelText,
  descriptionField,
  uploadLabel,
  uploadBox,
  previewContainer,
  imageWrapper,
  imageInnerBox,
  cancelButton,
  addButton,
  addIcon,
  errorText,
} = FEATURE_AND_IMAGES_STYLE;

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
            {type === "text" && <Typography sx={labelText}>{label}</Typography>}

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
                sx={descriptionField}
              />
            )}

            {type === "upload" && (
              <Box>
                <Typography sx={uploadLabel}>{label}</Typography>

                <Box sx={uploadBox(previews.length)}>
                  <Box sx={previewContainer(previews.length)}>
                    {previews?.map((src, i) => (
                      <Box key={i} sx={imageWrapper}>
                        <Box sx={imageInnerBox}>
                          <img
                            src={
                              typeof src === "string"
                                ? src
                                : URL.createObjectURL(src)
                            }
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
                          sx={cancelButton}
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>

                  <IconButton component="label" disableRipple sx={addButton}>
                    <Box
                      component="img"
                      src={addCircle}
                      alt="Add"
                      sx={addIcon}
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
                  <Typography sx={errorText}>{errors.upload_photos}</Typography>
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
