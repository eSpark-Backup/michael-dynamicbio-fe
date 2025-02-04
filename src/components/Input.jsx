import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { eyeClose, eye } from "../assets/index.js";

const Input = ({ handleChange, type = "text", endAdornment, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  return (
    <TextField
      label="Size"
      variant="filled"
      onChange={handleChange}
      type={showPassword ? "text" : type}
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
          ) : null),
      }}
      {...rest}
    />
  );
};

export default Input;
