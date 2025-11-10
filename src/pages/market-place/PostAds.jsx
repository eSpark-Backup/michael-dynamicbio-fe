import { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  Box,
} from "@mui/material";
import { useFormikContext } from "formik";
import { Country } from "country-state-city";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { phoneArrow } from "../../assets";
import { POST_ADS_STYLE } from "./Styles";

const PostAds = ({ data = {} }) => {
  const { fieldLabel, inputField, dropdownInput, dropdownPaper, errorText } =
    POST_ADS_STYLE || {};
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext();
  const { fields = [] } = data;

  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const allCountries = Country.getAllCountries().map((c) => ({
      label: c.name,
      value: c.name,
      isoCode: c.isoCode,
    }));
    setCountryOptions(allCountries);
  }, []);

  const handlePhoneChange = (name, value) => {
    setFieldValue(name, value);
    setFieldTouched(name, true, false);
  };

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center" px={1.5}>
      {fields.map(({ label, name, placeholder, type, disabled }, index) => {
        if (name === "country") {
          const stateField = fields.find((f) => f.name === "state");
          const cityField = fields.find((f) => f.name === "city");

          return (
            <Grid item xs={12} key="country-city-state">
              <Grid container spacing={2}>
                {/* Country */}
                <Grid item xs={12} md={4}>
                  <Stack spacing={1.5}>
                    <Typography
                      sx={fieldLabel}
                      dangerouslySetInnerHTML={{ __html: label }}
                    />
                    <Autocomplete
                      fullWidth
                      popupIcon={null}
                      options={countryOptions}
                      value={
                        countryOptions.find(
                          (opt) => opt.value === values.country
                        ) || null
                      }
                      getOptionLabel={(opt) => opt?.label || ""}
                      onChange={(_, newValue) => {
                        setFieldValue("country", newValue?.value || "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select Country"
                          error={touched.country && Boolean(errors.country)}
                          helperText={touched.country && errors.country}
                          sx={{
                            ...inputField,
                            ...dropdownInput,
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
                        paper: { sx: dropdownPaper },
                      }}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Stack spacing={1.5}>
                    <Typography
                      sx={fieldLabel}
                      dangerouslySetInnerHTML={{ __html: stateField.label }}
                    />
                    <TextField
                      fullWidth
                      name="state"
                      placeholder="Enter State"
                      value={values.state || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.state && Boolean(errors.state)}
                      helperText={touched.state && errors.state}
                      sx={inputField}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Stack spacing={1.5}>
                    <Typography
                      sx={fieldLabel}
                      dangerouslySetInnerHTML={{ __html: cityField.label }}
                    />
                    <TextField
                      fullWidth
                      name="city"
                      placeholder="Enter City"
                      value={values.city || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.city && Boolean(errors.city)}
                      helperText={touched.city && errors.city}
                      sx={inputField}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          );
        }

        if (name === "city" || name === "state") return null;

        if (type === "phone_number") {
          return (
            <Grid item key={index} xs={12} md={6}>
              <Stack spacing={1.5}>
                <Typography
                  sx={fieldLabel}
                  dangerouslySetInnerHTML={{ __html: label }}
                />
                <div className="custom-phone-input">
                  <PhoneInput
                    defaultCountry={"US"}
                    placeholder={placeholder}
                    value={values[name] ?? undefined}
                    onChange={(value) => handlePhoneChange(name, value)}
                    onBlur={() => handleBlur({ target: { name } })}
                    countryCallingCodeEditable={false}
                  />
                </div>
                {errors[name] && (
                  <Typography sx={errorText}>{errors[name]}</Typography>
                )}
              </Stack>
            </Grid>
          );
        }

        return (
          <Grid item key={index} xs={12} md={6}>
            <Stack spacing={1.5}>
              <Typography
                sx={fieldLabel}
                dangerouslySetInnerHTML={{ __html: label }}
              />
              <TextField
                fullWidth
                name={name}
                disabled={disabled}
                value={values[name] || ""}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                type={type}
                error={touched[name] && Boolean(errors[name])}
                helperText={touched[name] && errors[name]}
                sx={inputField}
              />
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PostAds;
