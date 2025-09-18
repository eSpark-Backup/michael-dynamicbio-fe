import { Box, InputAdornment, TextField, Typography } from '@mui/material';

const OutlinedInput = ({
  label,
  name,
  placeholder,
  onInputChange,
  sx,
  value,
  startAdornment,
  multiline,
  onKeyDown,
  disabled,
  inputRef,
  autoFocus,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '8px',
        width: '100%',
      }}
    >
      {label && (
        <Typography
          component="label"
          sx={{ fontSize: '14px', fontWeight: '400', color: '#171717' }}
        >
          {label}
        </Typography>
      )}
      <TextField
        name={name}
        placeholder={placeholder}
        onChange={onInputChange}
        value={value}
        sx={sx}
        onKeyDown={onKeyDown}
        disabled={disabled}
        autoFocus={autoFocus}
        inputRef={inputRef}
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment position="start">
              {typeof startAdornment === 'string' ? (
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
        multiline={multiline}
      />
    </Box>
  );
};

export default OutlinedInput;
