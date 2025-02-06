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
          "&:hover": {
            background:
              "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
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
            backgroundColor: "#FCFCFC",
            opacity: 0.5,
          },
          "&:before": {
            borderBottom: "1px solid #000000",
          },
          "&:hover:before": {
            borderBottom: "1px solid #000000 !important",
          },
          "&:after": {
            borderBottom: "1px solid #000000",
          },
        },
        input: {
          color: "#505050",
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
            fontSize: "17px",
          },
        },

        root: {
          border: "1px solid #DDE2E4",
          width: "100%",
          outline: "none",
          padding: " 0px 5px",
          fontSize: "14px",
          color: "#505050",
          fontWeight: 400,
          borderRadius: "4px",
          backgroundColor: "#FFFFFF",
          height: "42px",
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
  },
});
