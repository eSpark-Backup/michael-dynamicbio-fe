import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Stack, Typography } from '@mui/material';

const MultiSelect = ({
  multiple,
  options,
  name,
  customLabel,
  required,
  value,
  setFieldValue,
  placeholder,
  error,
  helperText,
}) => {
  const handleChange = (event, newValue) => {
    if (multiple) {
      const selectedCodes = newValue.map((item) => item.label);
      setFieldValue(name, selectedCodes);
    } else {
      setFieldValue(name, newValue ? newValue.label : '');
    }
  };

  const getValueFromCode = (label) =>
    options.find((c) => c.label === label) || null;

  const displayValue = multiple
    ? value.map(getValueFromCode).filter(Boolean)
    : getValueFromCode(value);

  return (
    <>
      {customLabel && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize="12px" mb={1}>
            {customLabel}
          </Typography>
          {required && (
            <Typography fontSize="12px" mb={1}>
              Required
            </Typography>
          )}
        </Stack>
      )}
      <Autocomplete
        multiple={multiple}
        required={required}
        options={options}
        getOptionLabel={(option) => option.label}
        filterSelectedOptions={multiple}
        isOptionEqualToValue={(opt, val) => opt.label === val.label}
        value={displayValue}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
          />
        )}
      />
    </>
  );
};

export default MultiSelect;
