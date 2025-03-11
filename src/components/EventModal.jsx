import { Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useRef } from "react";
import { uploadIcon } from "../assets";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { timezoneOptions } from "../constant";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers";

const EventModal = () => {
    const eventImgRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            eventType: "online",
            format: "",
            name: "",
            selectedFile: null,
            timezone: "",
            startDate: new Date(),
            startTime: new Date(),
        },
        validationSchema: Yup.object({
            format: Yup.string().required("Event format is required"),
            name: Yup.string().required("Event name is required").max(75, "Must be 75 characters or less"),
            timezone: Yup.string().required("Timezone is required"),
        }),
        onSubmit: (values) => {
            console.log("Form submitted:", values);
        },
    });

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            formik.setFieldValue("selectedFile", files[0]);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                {/* Image Upload */}
                <Box
                    sx={{
                        width: "100%",
                        backgroundColor: "#F4F2EE",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        rowGap: "10px",
                        flexDirection: "column",
                        height: "350px",
                        cursor: "pointer",
                        backgroundImage: formik.values.selectedFile
                            ? `url(${URL.createObjectURL(formik.values.selectedFile)})`
                            : "none",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                    onClick={() => eventImgRef.current.click()}
                >
                    {!formik.values.selectedFile && (
                        <>
                            <img src={uploadIcon} alt="Icon" style={{ width: "48px", height: "48px" }} />
                            <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>
                                Upload cover image
                            </Typography>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
                                Minimum width 480 pixels, 16:9 recommended
                            </Typography>
                        </>
                    )}
                </Box>

                {/* Event Type */}
                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Event type</Typography>
                <RadioGroup
                    name="eventType"
                    sx={{ width: "100%", display: "flex" }}
                    value={formik.values.eventType}
                    onChange={formik.handleChange}
                >
                    <Box sx={{ display: "flex", columnGap: "25px" }}>
                        <Stack sx={{ label: { margin: 0 }, display: "flex", alignItems: "center" }} direction="row">
                            <FormControlLabel value="online" control={<Radio />} label="Online" />
                        </Stack>
                        <Stack sx={{ label: { margin: 0 }, display: "flex", alignItems: "center" }} direction="row">
                            <FormControlLabel value="Inperson" control={<Radio />} label="In person" />
                        </Stack>
                    </Box>
                </RadioGroup>

                {/* Event Format */}
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3px" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Event format*</Typography>
                    <Dropdown
                        variant="outlined"
                        options={[
                            { label: "LinkedIn Live", value: "LinkedInLive" },
                            { label: "External Event Link", value: "ExternalEventLink" },
                        ]}
                        handleChange={(event) =>
                            formik.setFieldValue("format", event.target.value)
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.format}
                        noLabel
                        placeholder="Select format"
                        error={formik.touched.format && !!formik.errors.format}
                        helperText={formik.touched.format && formik.errors.format}
                    />

                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "3px",
                        ".MuiOutlinedInput-root": { height: "65px !important" },
                        input: { paddingBottom: "20px" },
                    }}
                >
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Event name*</Typography>
                    <Input
                        wordLimit={75}
                        required
                        customLabel=""
                        placeholder="Enter event name"
                        type="text"
                        name="name"
                        variant="outlined"
                        value={formik.values.name}
                        handleChange={formik.handleChange}
                        error={
                            formik.touched.name && !!formik.errors.name
                        }
                        helperText={
                            formik.touched.name && formik.errors.name
                        }
                        onBlur={formik.handleBlur}
                    />
                </Box>
                <Divider sx={{ my: "15px" }} />
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3px" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Timezone*</Typography>
                    <Dropdown
                        variant="outlined"
                        options={timezoneOptions}
                        handleChange={(event) =>
                            formik.setFieldValue("timezone", event.target.value)
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.timezone}
                        noLabel
                        placeholder="Timezone"
                        error={formik.touched.timezone && !!formik.errors.timezone}
                        helperText={formik.touched.timezone && formik.errors.timezone}
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ width: "45%", display: "flex", flexDirection: "column", rowGap: "3px" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Start date*</Typography>
                            <DatePicker
                                value={formik.values.startDate}
                                onChange={(date) => formik.setFieldValue("startDate", date)}
                                minDate={new Date()}
                                slotProps={{
                                    textField: {
                                        variant: "outlined",
                                        fullWidth: true,
                                        error: formik.touched.startDate && !!formik.errors.startDate,
                                        helperText: formik.touched.startDate && formik.errors.startDate,
                                        InputLabelProps: {
                                            shrink: false,
                                            sx: { fontSize: "14px" },
                                        },
                                        inputProps: {
                                            sx: { fontSize: "14px" },
                                            readOnly: true,
                                            userSelect: "none"
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ width: "45%", display: "flex", flexDirection: "column", rowGap: "3px" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Start time*</Typography>
                            <TimePicker
                                value={formik.values.startTime}
                                onChange={(time) => formik.setFieldValue("startTime", time)}
                                disableCloseOnSelect={false}
                                showToolbar={false}
                                slotProps={{
                                    textField: {
                                        variant: "outlined",
                                        fullWidth: true,
                                        error: formik.touched.startTime && !!formik.errors.startTime,
                                        helperText: formik.touched.startTime && formik.errors.startTime,
                                        InputLabelProps: {
                                            shrink: false,
                                            sx: { fontSize: "14px" },
                                        },
                                        inputProps: {
                                            sx: { fontSize: "14px" },
                                            readOnly: true,
                                            userSelect: "none",
                                        },
                                    },
                                    actionBar: {
                                        actions: [],
                                    },
                                }}
                            />
                        </Box>
                    </LocalizationProvider>
                </Box>
                <input
                    type="file"
                    ref={eventImgRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </Box>
        </form>
    );
};

export default EventModal;
