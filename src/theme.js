import { createTheme } from "@mui/material";

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 601,
            md: 769,
            lg: 1281,
            xl: 1921,
        },
    },
    palette: {
        primary: {
            main: "#F2F8FD",
            light: "#FFFFFF",
            dark: "#000000",
        },
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        gradientText: {
            background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    background:
                        "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                    height: "65px",
                    textTransform: "capitalize",
                    width: "100%",
                    borderRadius: "4px",
                    color: "#000000",
                    fontSize: "20px",
                    fontWeight: "400",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    lineHeight: "0px",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                        background:
                            "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                        color: "#FFF",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: "100%",
                    "& .MuiInputLabel-root": {
                        color: "#505050",
                        fontSize: "18px",
                        fontWeight: "400",
                        paddingTop: "5px",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#505050",
                    },
                },

            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    width: "100%",
                    backgroundColor: "#FCFCFC",
                    height: "65px",
                    "&:hover": {
                        backgroundColor: "#FCFCFC",
                    },
                    "&.Mui-focused": {
                        backgroundColor: "#FCFCFC",
                    },
                    "&.Mui-disabled": {
                        backgroundColor: "#FCFCFC80",
                        opacity: 0.5,
                    },
                    "&:before": {
                        borderBottom: "1px solid #000000 !important", // Ensure it applies
                    },
                    "&.Mui-disabled:before": {
                        borderBottom: "1px solid #00000080 !important", // Force border color for disabled
                    },
                    "&:hover:before": {
                        borderBottom: "1px solid #000000 !important",
                    },
                    "&:after": {
                        borderBottom: "1px solid #000000",
                    },
                },
                input: {
                    "&::placeholder": {
                        color: "#000000CC",
                        fontWeight: "300",
                        opacity: 1,
                        fontSize: "17px",
                        position: "relative",
                        bottom: "5px",
                    },
                    color: "#000000CC",
                    fontWeight: "300",
                    opacity: 1,
                    fontSize: "17px",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    "&::placeholder": {
                        color: "#000000CC",
                        fontWeight: "300",
                        opacity: 1,
                        fontSize: "17px"
                    },
                },

                root: {
                    border: "1px solid #000",
                    width: "100%",
                    outline: "none",
                    padding: " 0px 5px",
                    fontSize: "24px",
                    color: "#000",
                    fontWeight: 400,
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                    height: "42px",
                    ":focus": {
                        border: "1px solid #000",
                    },
                    fieldset: {
                        border: 0,
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    "&.Mui-checked": {
                        color: "#1877F2",
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    "&.Mui-checked": {
                        color: "#1877F2",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "4px",
                    padding: "16px 25px",
                    boxShadow: "none !important",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E4E4E4"
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    boxShadow: "0px 0px 15px 0px #00000066 !important",
                    padding: "0px",
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    padding: "10px",
                    "& .MuiMenuItem-root": {
                        color: "#000000",
                        fontSize: "14px",
                        height: "48px",
                        // width: "245px",
                        fontWeight: 400,
                        "&.Mui-focusVisible": {
                            backgroundColor: "#FFFFFF",
                            color: "#000000",
                        },
                    },
                },
            },
        },
    }
});
