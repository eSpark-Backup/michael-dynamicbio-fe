import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

const OutlinedInput = ({ label, name, placeholder, onInputChange, sx, value }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "8px",
            }}>
            {label && (
                <Typography
                    component="label"
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
            />

        </Box>
    )
}

export default OutlinedInput
