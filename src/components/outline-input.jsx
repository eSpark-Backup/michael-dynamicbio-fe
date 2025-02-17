import { Box, InputAdornment, TextField, Typography } from "@mui/material";

const OutlinedInput = ({
  label,
  name,
  placeholder,
  onInputChange,
  sx,
  value,
  startAdornment,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "8px",
        width:"100%"
      }}
    >
      {label && <Typography component="label">{label}</Typography>}
      <TextField
        name={name}
        placeholder={placeholder}
        onChange={onInputChange}
        value={value}
        sx={sx}
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment position="start">
              {typeof startAdornment === "string" ? (
                <img
                  src={startAdornment}
                  alt="icon"
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                startAdornment
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default OutlinedInput;
