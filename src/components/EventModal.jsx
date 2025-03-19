import { Box, Button, Checkbox, Divider, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import { uploadIcon } from "../assets";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { timezoneOptions } from "../constant";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers";
import { inpersonEventSchema, onlineEventSchema } from "../schemas";

const EventModal = ({ onFormSubmit, receivedValues }) => {
    const eventImgRef = useRef(null);
    const [tempEventType, setEventType] = useState("online")
    const [imagePreview, setImagePreview] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
        setIsEditMode(Object.keys(receivedValues || {}).length > 0 ? true : false)
    }, [receivedValues])

    const formik = useFormik({
        initialValues: Object.keys(receivedValues || {}).length > 0 ? receivedValues : {
            eventType: "online",
            format: "",
            name: "",
            selectedFile: null,
            timezone: timezoneOptions[0]?.value || "",
            startDate: new Date(),
            startTime: new Date(),
            endDate: new Date(),
            endTime: new Date(),
            showEndTime: true,
            description: "",
            speakers: "",
            address: "",
            venue: "",
            externalLink: "",
        },
        validationSchema: tempEventType === "online" ? onlineEventSchema : inpersonEventSchema,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
            onFormSubmit(values);
        },
    });

    useEffect(() => { console.log(formik.errors) }, [formik.errors])


    React.useEffect(() => {
        if (formik.values.selectedFile) {
            const objectUrl = URL.createObjectURL(formik.values.selectedFile);
            setImagePreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [formik.values.selectedFile]);

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            formik.setFieldValue("selectedFile", files[0]);
        }
    };

    useEffect(() => {
        setEventType(formik.values.eventType)
        formik.setErrors({});
    }, [formik.values.eventType])

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
                        backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
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
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050", textAlign: "center" }}>
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
                {formik.values.eventType !== "Inperson" && <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3px" }}>
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

                </Box>}
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
                <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, rowGap: "15px" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ width: { xs: "100%", md: "45%" }, display: "flex", flexDirection: "column", rowGap: "3px" }}>
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
                        <Box sx={{ width: { xs: "100%", md: "45%" }, display: "flex", flexDirection: "column", rowGap: "3px" }}>
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
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <FormControlLabel
                        sx={{
                            width: "100%",
                            alignItems: "flex-start",
                            padding: 0,
                            margin: 0,
                            gap: "10px",
                            span: { padding: 0 },
                        }}
                        control={
                            <Checkbox
                                checked={formik.values.showEndTime}
                                onChange={formik.handleChange}
                                name="showEndTime"
                            />
                        }
                        label="Add end date and time"
                    />
                </Box>
                {formik.values?.showEndTime &&
                    <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, rowGap: "15px" }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box sx={{ width: { xs: "100%", md: "45%" }, display: "flex", flexDirection: "column", rowGap: "3px" }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>End date*</Typography>
                                <DatePicker
                                    value={formik.values.endDate}
                                    onChange={(date) => formik.setFieldValue("endDate", date)}
                                    minDate={new Date()}
                                    slotProps={{
                                        textField: {
                                            variant: "outlined",
                                            fullWidth: true,
                                            error: formik.touched.endDate && !!formik.errors.endDate,
                                            helperText: formik.touched.endDate && formik.errors.endDate,
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
                            <Box sx={{ width: { xs: "100%", md: "45%" }, display: "flex", flexDirection: "column", rowGap: "3px" }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>End time*</Typography>
                                <TimePicker
                                    value={formik.values.endTime}
                                    onChange={(time) => formik.setFieldValue("endTime", time)}
                                    disableCloseOnSelect={false}
                                    showToolbar={false}
                                    slotProps={{
                                        textField: {
                                            variant: "outlined",
                                            fullWidth: true,
                                            error: formik.touched.endTime && !!formik.errors.endTime,
                                            helperText: formik.touched.endTime && formik.errors.endTime,
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
                }
                {formik?.values?.eventType === "Inperson" &&
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "3px",
                                ".MuiOutlinedInput-root": { height: "65px !important" },
                                input: { paddingBottom: "20px" },
                            }}
                        >
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Address*</Typography>
                            <Input
                                required
                                customLabel=""
                                placeholder="E.g., street, city, pincode, etc.,"
                                type="text"
                                name="address"
                                variant="outlined"
                                value={formik.values.address}
                                handleChange={formik.handleChange}
                                error={
                                    formik.touched.address && !!formik.errors.address
                                }
                                helperText={
                                    formik.touched.address && formik.errors.address
                                }
                                onBlur={formik.handleBlur}
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
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Venue</Typography>
                            <Input
                                customLabel=""
                                placeholder="E.g. floor number, room number, etc."
                                type="text"
                                name="venue"
                                variant="outlined"
                                value={formik.values.venue}
                                handleChange={formik.handleChange}
                                error={
                                    formik.touched.venue && !!formik.errors.venue
                                }
                                helperText={
                                    formik.touched.venue && formik.errors.venue
                                }
                                onBlur={formik.handleBlur}
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
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>External event link</Typography>
                            <Input
                                wordLimit={1024}
                                customLabel=""
                                placeholder=""
                                type="text"
                                name="externalLink"
                                variant="outlined"
                                value={formik.values.externalLink}
                                handleChange={formik.handleChange}
                                error={
                                    formik.touched.externalLink && !!formik.errors.externalLink
                                }
                                helperText={
                                    formik.touched.externalLink && formik.errors.externalLink
                                }
                                onBlur={formik.handleBlur}
                            />
                        </Box>
                    </>
                }
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "3px",
                        ".MuiOutlinedInput-root": { height: "65px !important" },
                        input: { paddingBottom: "20px" },
                    }}
                >
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Description</Typography>
                    <Input
                        wordLimit={5000}
                        required
                        customLabel=""
                        placeholder="Ex: topics, schedule, etc."
                        type="text"
                        name="description"
                        variant="outlined"
                        value={formik.values.description}
                        handleChange={formik.handleChange}
                        error={
                            formik.touched.description && !!formik.errors.description
                        }
                        helperText={
                            formik.touched.description && formik.errors.description
                        }
                        onBlur={formik.handleBlur}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "3px",
                        ".MuiOutlinedInput-root": { height: "35px !important" },
                        input: { paddingBottom: "20px" },
                    }}
                >
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Speakers</Typography>
                    <Input
                        required
                        customLabel=""
                        placeholder=""
                        type="text"
                        name="speakers"
                        variant="outlined"
                        value={formik.values.speakers}
                        handleChange={formik.handleChange}
                        error={
                            formik.touched.speakers && !!formik.errors.speakers
                        }
                        helperText={
                            formik.touched.speakers && formik.errors.speakers
                        }
                        onBlur={formik.handleBlur}
                    />
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
                        Add connections to speak at the event. Speakers can join the event early and will be shown in the event’s Details section and presenter area. They cannot allow attendees to speak or end the event.
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", columnGap: "5px", flexWrap: "wrap" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
                        By continuing, you agree with
                    </Typography>
                    <Typography variant="gradientText" sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}> Fusion’s event policy</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", columnGap: "5px", paddingBottom: "20px", flexWrap: "wrap"  }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>
                        Make the most of LinkedIn Events.
                    </Typography>
                    <Typography variant="gradientText" sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Learn more</Typography>
                </Box>
                <input
                    type="file"
                    ref={eventImgRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <Stack justifyContent={"flex-end"} alignItems={"flex-end"} px={6} direction={"row"} gap={3}
                    sx={{
                        height: "55px",
                        borderTop: "1px solid #E4E4E4",
                        // boxShadow: "0px 0px 10px 0px #00000040",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        // margin: "0 -20px -20px -20px",
                        position: "fixed",
                        bottom: "0px",
                        right: "0px",
                        zIndex: 999,
                        backgroundColor: "white"
                    }}
                >

                    <Box sx={{
                        width: "150px", height: "36px", borderRadius: "2px", display: "flex", justifyContent: "center", alignItems: "center",
                        background: "white",
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: "8px",
                            padding: "1px",
                            background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                            mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                            WebkitMask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                            WebkitMaskComposite: "destination-out",
                            maskComposite: "exclude",
                        },
                        cursor: "pointer"
                    }}>
                        <Typography variant="gradientText" sx={{ fontSize: "16px", fontWeight: "400" }}>Back</Typography>
                    </Box>
                    <Button type="submit" sx={{ maxWidth: "150px", height: "36px", fontSize: "16px" }} disabled={!(formik.isValid && (formik.dirty || isEditMode))} >
                        Next
                    </Button>
                </Stack>
            </Box>

        </form>
    );
};

export default EventModal;
