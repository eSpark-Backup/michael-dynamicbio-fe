import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import React from 'react';
import { DropDownIcon } from '../assets';

const CustomIcon = (props) => (
    <img
        {...props}
        src={DropDownIcon}
        alt="Dropdown Icon"
        width="16"
        height="8"
        style={{ pointerEvents: 'none', position: "relative", top: "5px" }}
    />
);

const Dropdown = ({ options, handleChange, placeholder, isCountries, error, helperText }) => {
    return (
        <FormControl variant="filled" error={error}>
            <InputLabel id="demo-simple-select-filled-label">{placeholder}</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={handleChange}
                IconComponent={CustomIcon}
            >
                {!isCountries && options?.map((item, index) => (
                    <MenuItem value={item?.value} key={index}>
                        {item?.label}
                    </MenuItem>
                ))}
                {
                    isCountries && options?.map((item, index) => (
                        <MenuItem value={item.dialCode} key={index}>
                            {item.name} ({item.dialCode})
                        </MenuItem>
                    ))
                }
            </Select>
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default Dropdown;
