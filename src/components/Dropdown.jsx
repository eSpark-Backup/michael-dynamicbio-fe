import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { DropDownIcon } from "../assets";

const CustomIcon = (props) => (
  <img
    {...props}
    src={DropDownIcon}
    alt="Dropdown Icon"
    width="16"
    height="8"
    style={{ pointerEvents: "none", position: "relative", top: "5px" }}
  />
);

const Dropdown = ({
  disabled,
  customLabel,
  required,
  variant,
  noLabel,
  options,
  handleChange,
  placeholder,
  isCountries,
  error,
  helperText,
  value,
}) => {
  return (
    <>
      {customLabel && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography mb={1}>{customLabel}</Typography>
          {required && <Typography mb={1}>Required</Typography>}
        </Stack>
      )}
      <FormControl sx={{ width: "100%" }} variant="filled" error={error}>
        {!noLabel && <InputLabel id="demo-simple-select-filled-label">
          {placeholder}
        </InputLabel>}
        <Select
          variant={variant}
          disabled={disabled}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={handleChange}
          value={value}
          IconComponent={CustomIcon}
        >
          {!isCountries &&
            options?.map((item, index) => (
              <MenuItem value={item?.value} key={index}>
                {item?.label}
              </MenuItem>
            ))}
          {isCountries &&
            options?.map((item, index) => (
              <MenuItem value={item.dialCode} key={index}>
                {item.name} ({item.dialCode})
              </MenuItem>
            ))}
        </Select>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default Dropdown;
