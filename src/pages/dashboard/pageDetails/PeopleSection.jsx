import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { OutlinedInput } from '../../../components/index.js'
import { noUser } from '../../../assets/index.js'

const PeopleSection = () => {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
            <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>0 associated members</Typography>
            <Box sx={{ width: "50%" }}>
                <OutlinedInput placeholder={"Search employees by title, keyword or school"} />
            </Box>
            <img src={noUser} alt="Image" style={{ width: "286px", height: "286px", margin: "0 auto 3.2rem" }} />
            <Typography sx={{ textAlign: "center" }}>The filters applied did not return any results. Try clearing some filters and try again</Typography>
        </Paper>
    )
}

export default PeopleSection
