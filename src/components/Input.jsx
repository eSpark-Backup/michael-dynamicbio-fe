import { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Stack,
} from "@mui/material";
import { eyeClose, eye } from "../assets/index.js";

const Input = ({
  sx,
  wordLimit,
  value,
  required,
  customLabel,
  variant,
  handleChange,
  type = "text",
  endAdornment,
  disabled,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
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
      <TextField
        value={value}
        variant={variant || "filled"}
        onChange={handleChange}
        type={showPassword ? "text" : type}
        disabled={disabled}
        sx={sx}
        InputProps={{
          endAdornment:
            endAdornment ||
            (type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{ marginRight: "0px" }}
                >
                  {!showPassword ? (
                    <img src={eye} />
                  ) : (
                    <img src={eyeClose} alt="eye" />
                  )}
                </IconButton>
              </InputAdornment>
            ) : wordLimit ? (
              <Typography
                sx={{ position: "absolute", right: "10px", bottom: "3px" }}
              >{`${value.length}/${wordLimit} words`}</Typography>
            ) : null),
        }}
        {...rest}
      />
    </>
  );
};

export default Input;
