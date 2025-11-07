import {
  Autocomplete,
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { phoneArrow } from "../../assets";
import { AD_INFORMATION_STYLE } from "./Styles";

const {
  inputStyle,
  dropdownInput,
  labelText,
  autocompleteArrow,
  autocompletePaper,
  optionLabel,
} = AD_INFORMATION_STYLE;

const AdInformation = ({ data = {} }) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext();

  const { fields = [] } = data;

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center" px={1.5}>
      {fields.map(
        ({ label, name, placeholder, type, size, options }, index) => (
          <Grid item key={index} xs={12} md={size === 11.82 ? 12 : 6}>
            <Stack spacing={1.5} pb={0}>
              <Typography sx={labelText}>{label}</Typography>

              {type !== "select" ? (
                <TextField
                  fullWidth
                  name={name}
                  value={values[name] || ""}
                  placeholder={placeholder}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={type}
                  error={touched[name] && Boolean(errors[name])}
                  helperText={touched[name] && errors[name]}
                  sx={inputStyle}
                />
              ) : (
                <Autocomplete
                  fullWidth
                  multiple={name === "tags"}
                  popupIcon={null}
                  options={options}
                  value={
                    name === "tags"
                      ? options.filter((opt) =>
                          values[name]?.includes(opt.value)
                        )
                      : options.find((opt) => opt.value === values[name]) ||
                        null
                  }
                  getOptionLabel={(opt) => opt?.label || ""}
                  onChange={(_, newValue) => {
                    if (name === "tags") {
                      setFieldValue(
                        name,
                        newValue.map((val) => val.value)
                      );
                    } else {
                      setFieldValue(name, newValue?.value || "");
                    }
                  }}
                  isOptionEqualToValue={(opt, val) => opt.value === val.value}
                  renderTags={(tagValue) =>
                    tagValue?.map((option, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#E6F2FF",
                          color: "#0073E6",
                          borderRadius: "20px",
                          padding: "4px 10px",
                          margin: "3px",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {option.label}
                        <Box
                          component="span"
                          sx={{
                            marginLeft: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            "&:hover": { color: "#005BB5" },
                          }}
                          onClick={() =>
                            setFieldValue(
                              name,
                              values[name].filter((v) => v !== option.value)
                            )
                          }
                        >
                          ×
                        </Box>
                      </Box>
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={placeholder || "Select..."}
                      error={touched[name] && Boolean(errors[name])}
                      helperText={touched[name] && errors[name]}
                      sx={{
                        ...inputStyle,
                        ...dropdownInput,
                        "& .custom-arrow": autocompleteArrow,
                      }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <Box
                            component="img"
                            src={phoneArrow}
                            alt="dropdown"
                            className="custom-arrow"
                            sx={{
                              width: { xs: "13px !important", md: "auto" },
                            }}
                          />
                        ),
                      }}
                    />
                  )}
                  componentsProps={{
                    paper: { sx: autocompletePaper },
                  }}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      <Typography sx={optionLabel}>{option.label}</Typography>
                    </li>
                  )}
                />
              )}
            </Stack>
          </Grid>
        )
      )}
    </Grid>
  );
};

export default AdInformation;
