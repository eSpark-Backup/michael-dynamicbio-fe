import {
  Autocomplete,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";

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
              <Typography
                sx={{
                  color: "#191F33",
                  fontSize: { xs: "14px", md: "16px", lg: "18px" },
                  fontFamily: "Nunito",
                }}
              >
                {label}
              </Typography>

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
                  sx={{
                    "& .MuiInputBase-root": {
                      height: { xs: 52, lg: 62 },
                      fontSize: { xs: "18px", lg: "20px" },
                      fontWeight: 400,
                      borderRadius: "7px",
                      fontFamily: "Nunito",
                      border: "1.31px solid #EDEFF5",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#939AAD",
                      opacity: 1,
                      fontWeight: 400,
                      fontSize: { xs: "18px", lg: "20px" },
                      fontFamily: "Nunito",
                    },
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow:
                        "0 0 0 1000px transparent inset !important",
                      WebkitTextFillColor: "inherit !important",
                      fontFamily: "Nunito !important",
                      fontWeight: 400,
                      fontSize: "20px",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                  }}
                />
              ) : (
                <Autocomplete
                  fullWidth
                  options={options}
                  value={
                    options.find((opt) => opt.value === values[name]) || null
                  }
                  getOptionLabel={(opt) => opt?.label || ""}
                  onChange={(_, newValue) =>
                    setFieldValue(name, newValue?.value || "")
                  }
                  isOptionEqualToValue={(opt, val) => opt.value === val.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={placeholder || "Select..."}
                      error={touched[name] && Boolean(errors[name])}
                      helperText={touched[name] && errors[name]}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: { xs: 52, lg: 62 },
                          fontSize: { xs: "18px", lg: "20px" },
                          fontWeight: 400,
                          borderRadius: "7px",
                          fontFamily: "Nunito",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "#939AAD",
                          opacity: 1,
                          fontWeight: 400,
                          fontSize: { xs: "18px", lg: "20px" },
                          fontFamily: "Nunito",
                        },
                        "& input:-webkit-autofill": {
                          WebkitBoxShadow:
                            "0 0 0 1000px transparent inset !important",
                          WebkitTextFillColor: "inherit !important",
                          fontFamily: "Nunito !important",
                          fontWeight: 400,
                          fontSize: "20px",
                          transition: "background-color 5000s ease-in-out 0s",
                        },
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      <Typography
                        sx={{
                          color: "#191F33",
                          fontSize: {
                            xs: "14px",
                            md: "16px",
                            lg: "18px",
                          },
                          fontFamily: "Nunito",
                        }}
                      >
                        {option.label}
                      </Typography>
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
