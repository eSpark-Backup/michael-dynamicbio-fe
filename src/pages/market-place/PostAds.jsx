import { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useFormikContext } from "formik";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PostAds = ({ data = {} }) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext();
  const { fields = [] } = data;

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const allCountries = Country.getAllCountries().map((c) => ({
      label: c.name,
      value: c.name,
      isoCode: c.isoCode,
    }));
    setCountryOptions(allCountries);
  }, []);

  useEffect(() => {
    const selectedCountry = Country.getAllCountries().find(
      (c) => c.name === values.country
    );
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.isoCode).map(
        (s) => ({
          label: s.name,
          value: s.name,
          isoCode: s.isoCode,
        })
      );
      setStateOptions(states);
    } else {
      setStateOptions([]);
      setCityOptions([]);
    }
  }, [values.country]);

  useEffect(() => {
    const selectedCountry = Country.getAllCountries().find(
      (c) => c.name === values.country
    );
    const selectedState = State.getStatesOfCountry(
      selectedCountry?.isoCode
    ).find((s) => s.name === values.state);

    if (selectedCountry && selectedState) {
      const cities = City.getCitiesOfState(
        selectedCountry.isoCode,
        selectedState.isoCode
      ).map((c) => ({
        label: c.name,
        value: c.name,
      }));
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  }, [values.state, values.country]);

  const inputStyle = {
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
      WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
      WebkitTextFillColor: "inherit !important",
      fontFamily: "Nunito !important",
      fontWeight: 400,
      fontSize: "20px",
      transition: "background-color 5000s ease-in-out 0s",
    },
  };

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center" px={1.5}>
      {fields.map(({ label, name, placeholder, type }, index) => {
        if (name === "country") {
          const stateField = fields.find((f) => f.name === "state");
          const cityField = fields.find((f) => f.name === "city");

          return (
            <Grid item xs={12} key="country-city-state">
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Stack spacing={1.5}>
                    <Typography>{label}</Typography>
                    <Autocomplete
                      fullWidth
                      options={countryOptions}
                      value={
                        countryOptions.find(
                          (opt) => opt.value === values.country
                        ) || null
                      }
                      getOptionLabel={(opt) => opt?.label || ""}
                      onChange={(_, newValue) => {
                        setFieldValue("country", newValue?.value || "");
                        setFieldValue("state", "");
                        setFieldValue("city", "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select Country"
                          error={touched.country && Boolean(errors.country)}
                          helperText={touched.country && errors.country}
                          sx={{
                            ...inputStyle,
                            "& .MuiSelect-select, & .MuiOutlinedInput-input": {
                              padding: "0px 10px !important",
                              display: "flex",
                              alignItems: "center",
                            },
                          }}
                        />
                      )}
                      componentsProps={{
                        paper: {
                          sx: {
                            borderRadius: "10px",
                            mt: 1,
                            padding: "0px",
                            "& .MuiAutocomplete-option": {
                              padding: "9px 10px",
                              fontFamily: "Nunito",
                              fontSize: "18px",
                            },
                          },
                        },
                      }}
                    />
                  </Stack>
                </Grid>

                {/* State */}
                <Grid item xs={12} md={4}>
                  <Stack spacing={1.5}>
                    <Typography>{stateField.label}</Typography>
                    <Autocomplete
                      fullWidth
                      options={stateOptions}
                      value={
                        stateOptions.find(
                          (opt) => opt.value === values.state
                        ) || null
                      }
                      getOptionLabel={(opt) => opt?.label || ""}
                      onChange={(_, newValue) => {
                        setFieldValue("state", newValue?.value || "");
                        setFieldValue("city", "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select State"
                          error={touched.state && Boolean(errors.state)}
                          helperText={touched.state && errors.state}
                          sx={{
                            ...inputStyle,
                            "& .MuiSelect-select, & .MuiOutlinedInput-input": {
                              padding: "0px 10px !important",
                              display: "flex",
                              alignItems: "center",
                            },
                          }}
                        />
                      )}
                      componentsProps={{
                        paper: {
                          sx: {
                            borderRadius: "10px",
                            mt: 1,
                            padding: "0px",
                            "& .MuiAutocomplete-option": {
                              padding: "9px 10px",
                              fontFamily: "Nunito",
                              fontSize: "18px",
                            },
                          },
                        },
                      }}
                    />
                  </Stack>
                </Grid>

                {/* City */}
                <Grid item xs={12} md={4}>
                  <Stack spacing={1.5}>
                    <Typography>{cityField.label}</Typography>
                    <Autocomplete
                      fullWidth
                      options={cityOptions}
                      value={
                        cityOptions.find((opt) => opt.value === values.city) ||
                        null
                      }
                      getOptionLabel={(opt) => opt?.label || ""}
                      onChange={(_, newValue) =>
                        setFieldValue("city", newValue?.value || "")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select City"
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                          sx={{
                            ...inputStyle,
                            "& .MuiSelect-select, & .MuiOutlinedInput-input": {
                              padding: "0px 10px !important",
                              display: "flex",
                              alignItems: "center",
                            },
                          }}
                        />
                      )}
                      componentsProps={{
                        paper: {
                          sx: {
                            borderRadius: "10px",
                            mt: 1,
                            padding: "0px",
                            "& .MuiAutocomplete-option": {
                              padding: "9px 10px",
                              fontFamily: "Nunito",
                              fontSize: "18px",
                            },
                          },
                        },
                      }}
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
                <Typography>{label}</Typography>
                <div className="custom-phone-input">
                  <PhoneInput
                    defaultCountry="PK"
                    value={values[name] || ""}
                    onChange={(val) => setFieldValue(name, val)}
                    international
                    countryCallingCodeEditable={false}
                  />
                </div>
                {touched[name] && errors[name] && (
                  <Typography color="error" fontSize={14}>
                    {errors[name]}
                  </Typography>
                )}
              </Stack>
            </Grid>
          );
        }

        return (
          <Grid item key={index} xs={12} md={6}>
            <Stack spacing={1.5}>
              <Typography>{label}</Typography>
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
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PostAds;
