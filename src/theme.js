import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 601,
      md: 769,
      lg: 1281,
      xl1: 1450,
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
    fontFamily: "'Inter', 'Nunito', sans-serif",
    gradientText: {
      background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "unstyled" },
          style: {
            background: "none",
            border: "none",
            boxShadow: "none",
            padding: 0,
            minWidth: "auto",
            color: "inherit",
            textTransform: "none",
          }, "&:hover": {
            background:
              "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
            color: "#FFF",
          },
        },
      ],
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
            color: "#505050",
            fontWeight: "400",
            opacity: 1,
            fontSize: "14px",
          },
        },

        root: {
          border: "1px solid #DDE2E4",
          width: "100%",
          outline: "none",
          padding: "0px 5px",
          fontSize: "14px",
          color: "#000",
          fontWeight: 400,
          borderRadius: "4px",
          backgroundColor: "transparent",
          minHeight: "42px",
          ":focus": {
            border: "1px solid #DDE2E4",
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
          boxShadow: "none",
          // boxShadow: "0px 15.74px 62.94px 0px rgba(0, 34, 51, 0.06)",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E4E4E4",
        },
      },
    },
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          padding: 0,
        },
      },
    },
    MuiPickersDesktopPaper: {
      styleOverrides: {
        root: {
          padding: 0,
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
    MuiPickersYear: {
      styleOverrides: {
        root: {
          button: {
            "&.Mui-selected": {
              color: "#FFF !important",
            },
          },
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
    MuiChip: {
      styleOverrides: {
        root: {
          background: `linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%),
                             linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04))`,
          borderRadius: "4px",
          border: "1px solid #E4E4E4",
          color: "#fff",
          fontWeight: "400",
          paddingRight: "10px",
          fontSize: "12px",
        },
        deleteIcon: {
          color: "#505050",
          backgroundColor: "transparent !important",
          marginLeft: "1px",
          "&:hover": {
            color: "#505050",
            backgroundColor: "transparent !important",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 2,
          transitionDuration: "300ms",
          "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#FFFFFF",
            "& + .MuiSwitch-track": {
              background:
                "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 22,
          height: 22,
          backgroundColor: "#FFFFFF",
        },
        track: {
          borderRadius: 13,
          backgroundColor: "#BDBDBD",
          opacity: 1,
          transition: "300ms",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          background: "#FFF",
          span: {
            background: "#1877F2",
          },
        },
      },
    },
  },
});
