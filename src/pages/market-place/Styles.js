export const MARKET_PLACE_STYLE = {
  mainWrapper: {
    display: "flex",
    width: "100%",
    height: "100%",
    minHeight: "calc(100vh - 131px)",
    overflow: "hidden",
    padding: { xs: 2, md: 3 },
    gap: { xs: 3, lg: 4 },
  },
  childWrapper: {
    width: "100%",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    zIndex: 1,
    overflow: "hidden",
  },
  stack: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sideNavBox: {
    maxHeight: "100%",
  },
};

export const PRODUCT_FORM_STYLE = {
  goBackBtn: {
    ml: 0,
    mr: "auto",
    fontSize: { xs: "14px", md: "16px" },
    maxWidth: { xs: "102px", md: "102px" },
    textDecoration: "underline",
    background: "transparent",
    color: "#1E4084",
    fontFamily: "Nunito",
    fontWeight: 700,
    "&:hover": {
      color: "#1E4084",
      background: "transparent",
      textDecoration: "underline",
    },
    "@media(max-width: 319px)": {
      maxWidth: "100%",
    },
  },

  paper: {
    p: 0,
    width: "100%",
    maxWidth: "1290px",
    borderRadius: 3,
    backgroundColor: "#fff",
    boxShadow: "0px 15.74px 62.94px 0px rgba(0, 34, 51, 0.06) !important",
    border: 0,
  },

  stepTabsContainer: {
    display: "flex",
    width: "100%",
    overflowX: "auto",
    justifyContent: "space-between",
    borderBottom: "1px solid #E4E4E4",
    gap: { xs: 3, sm: 2 },
    py: 2,
    px: 4,
    pb: 0,
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": { display: "none" },
  },

  stepTab: (isActive) => ({
    flexShrink: 0,
    width: { xs: "200px", lg: "32.2%" },
    py: { xs: 1.5, sm: 2.5 },
    borderBottom: isActive ? "3px solid #00AAFF" : "3px solid transparent",
    transition: "all 0.3s ease",
  }),

  stepIcon: (isActive = false, status = [], index) => {
    const safeStatus = Array.isArray(status) ? status : [];

    const isCompleted = safeStatus[index] === true;

    return {
      width: { xs: "45px", sm: "53px", lg: "63px" },
      height: { xs: "45px", sm: "53px", lg: "63px" },
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      background: isActive
        ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)"
        : isCompleted
        ? "#27C200"
        : "#C5C9D6",
      color: "#FFF",
      fontWeight: 600,
      transition: "all 0.3s ease",
    };
  },

  stepTitle: {
    fontWeight: 600,
    fontSize: { xs: "14px", md: "16px", lg: "20px" },
    color: "#191F33",
    textTransform: "capitalize",
    fontFamily: "Nunito",
  },

  stepSubtitle: {
    fontWeight: 400,
    fontSize: { xs: "13px", md: "14px", lg: "16px" },
    color: "#767E94",
    textTransform: "capitalize",
    fontFamily: "Nunito",
  },

  panelWrapper: {
    width: "100%",
    px: { xs: 2, md: 3.5 },
    pt: 4,
    pb: 3,
  },

  panelButtons: {
    my: 2,
    px: 1.8,
    gap: 2,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    pt: { xs: 1, sm: 1.5 },
    "@media(max-width: 424px)": {
      flexDirection: "column",
    },
  },

  prevButton: {
    border: "1px solid #EBEEF7",
    fontSize: { xs: "14px", md: "16px", lg: "18px" },
    maxWidth: { xs: "140px", md: "160px", lg: "180px" },
    height: { xs: "52px", lg: "62px" },
    background: "transparent",
    borderRadius: "8px",
    fontFamily: "Nunito",
    fontWeight: 700,
    "@media(max-width: 424px)": { maxWidth: "100%" },
  },

  nextButton: {
    fontSize: { xs: "14px", md: "16px", lg: "18px" },
    maxWidth: { xs: "150px", md: "180px", lg: "200px" },
    height: { xs: "52px", lg: "62px" },
    color: "#fff",
    borderRadius: "8px",
    padding: 1,
    fontFamily: "Nunito",
    fontWeight: 700,
    "@media(max-width: 424px)": { maxWidth: "100%" },
  },

  nextButtonIcon: {
    height: "auto",
    display: "block",
    width: { xs: 15, md: 22, lg: 24 },
  },
};

export const PUBLISHED_AD_STYLE = {
  paper: {
    p: 0,
    width: "100%",
    height: "100%",
    maxWidth: "984px",
    maxHeight: "588px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 15.74px 62.94px 0px rgba(0, 34, 51, 0.06) !important",
    border: 0,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    p: 2.5,
  },
  logoWrapper: {
    position: "relative",
  },
  successLogoStyle: (rotate) => ({
    width: { xs: "55px", md: "73px" },
    animation: `${rotate} 10s linear infinite`,
  }),
  successMarkStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    height: "35%",
  },
  title: {
    color: "#191F33",
    fontSize: {
      xs: "22px",
      sm: "25px",
      md: "30px",
      lg: "40px",
    },
    fontWeight: 600,
    fontFamily: "Nunito",
    lineHeight: "auto",
  },
  subtitle: {
    fontSize: { xs: "12px", sm: "14px", md: "16px" },
    fontWeight: 400,
    color: "#767E94",
    fontFamily: "Nunito",
    maxWidth: { xs: "350px", md: "394px", lg: "494px" },
  },
  buttonGroup: {
    gap: 2,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    pt: { xs: 1, sm: 1.5 },
    "@media(max-width: 319px)": {
      flexDirection: "column",
    },
  },
  backButton: {
    border: "1px solid #CCEEFF",
    fontSize: { xs: "14px", md: "16px" },
    maxWidth: { xs: "102px", md: "102px" },
    height: { xs: "40px", lg: "50px" },
    background: "transparent",
    borderRadius: "4px",
    color: "#1E4084",
    fontFamily: "Nunito",
    fontWeight: 700,
    "@media(max-width: 319px)": {
      maxWidth: "100%",
    },
  },
  viewButton: {
    fontSize: { xs: "14px", md: "16px" },
    maxWidth: { xs: "124px", md: "144px" },
    height: { xs: "40px", lg: "50px" },
    fontFamily: "Nunito",
    fontWeight: 700,
    color: "#fff",
    borderRadius: "4px",
    padding: 1,
    "@media(max-width: 319px)": {
      maxWidth: "100%",
    },
  },
  arrowIcon: {
    width: { xs: 15, md: 22, lg: 24 },
    height: "auto",
    display: "block",
  },
};

export const AD_INFORMATION_STYLE = {
  inputStyle: {
    "& .MuiInputBase-root": {
      minHeight: { xs: 52, lg: 62 },
      fontSize: { xs: "14px", lg: "20px" },
      fontWeight: 400,
      borderRadius: "7px",
      fontFamily: "Nunito",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#939AAD",
      opacity: 1,
      fontWeight: 400,
      fontSize: { xs: "14px", lg: "20px" },
      fontFamily: "Nunito",
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
      WebkitTextFillColor: "inherit !important",
      fontFamily: "Nunito !important",
      fontWeight: 400,
      fontSize: { xs: "14px", lg: "20px" },
      transition: "background-color 5000s ease-in-out 0s",
    },
  },

  dropdownInput: {
    "& .MuiOutlinedInput-root": {
      position: "relative",
      padding: "3px 35px 3px 14px !important",
      display: "flex",
      alignItems: "center",
    },
    "& .custom-arrow": {
      position: "absolute",
      right: "18px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "18px",
      height: "18px",
      pointerEvents: "none",
    },
  },

  labelText: {
    color: "#191F33",
    fontSize: { xs: "14px", md: "16px", lg: "18px" },
    fontFamily: "Nunito",
  },

  autocompleteArrow: {
    position: "absolute",
    right: "18px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "18px",
    height: "10px",
    pointerEvents: "none",
  },

  autocompletePaper: {
    borderRadius: "10px",
    mt: 1,
    padding: "0px",
    "& .MuiAutocomplete-option": {
      padding: "9px 10px",
      fontFamily: "Nunito",
      fontSize: "18px",
    },
  },

  optionLabel: {
    color: "#191F33",
    fontSize: { xs: "14px", md: "16px", lg: "18px" },
    fontFamily: "Nunito",
  },
};

export const FEATURE_AND_IMAGES_STYLE = {
  labelText: {
    color: "#191F33",
    fontSize: { xs: "14px", md: "16px", lg: "18px" },
    fontFamily: "Nunito",
  },

  descriptionField: {
    "& .MuiInputBase-root": {
      height: "auto",
      alignItems: "flex-start",
      padding: "20px",
      border: "1.31px solid #EDEFF5",
      borderRadius: "7px",
    },
    "& .MuiInputBase-input": {
      fontFamily: "Nunito",
      fontWeight: 400,
      fontSize: { xs: "14px", lg: "20px" },
      color: "#000",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#939AAD",
      opacity: 1,
      fontWeight: 400,
      fontSize: { xs: "14px", lg: "20px" },
      fontFamily: "Nunito",
    },
  },

  uploadLabel: {
    fontWeight: 400,
    color: "#191F33",
    fontSize: { xs: "14px", lg: "20px" },
    fontFamily: "Nunito",
  },

  uploadBox: (previewsLength) => ({
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "auto", sm: "center" },
    border: "1.31px dashed #EBEEF7",
    borderRadius: "6.56px",
    my: 2,
    py: { xs: 2.5, sm: previewsLength === 0 ? 2.5 : 0.5 },
    px: 2.5,
    gap: { xs: 0.5, sm: previewsLength === 0 ? 0 : 2 },
  }),

  previewContainer: (previewsLength) => ({
    width: {
      xs: "calc(fit-content - 166px)",
      lg: "calc(fit-content - 166px)",
    },
    gap: 2.5,
    display: "flex",
    order: { xs: 2, sm: 1 },
    py: previewsLength === 0 ? 0 : 2.5,
    px: previewsLength === 0 ? 0 : 1,
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      height: 8,
      pt: 1,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#ccc",
      borderRadius: 4,
    },
  }),

  imageWrapper: {
    position: "relative",
    width: { xs: 120, lg: 150 },
    height: { xs: 120, lg: 150 },
    flexShrink: 0,
  },

  imageInnerBox: {
    width: "100%",
    height: "100%",
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#F5F7FA",
  },

  cancelButton: {
    position: "absolute",
    top: -8,
    right: -8,
    bgcolor: "white",
    color: "#FF4F4F",
    borderRadius: "50%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    p: "2px",
    zIndex: 10,
    "&:hover": { bgcolor: "#fff5f5" },
  },

  addButton: {
    display: "flex",
    width: { xs: "100%", sm: 120, lg: 150 },
    height: { xs: 100, sm: 120, lg: 150 },
    backgroundColor: "#F5F7FA",
    cursor: "pointer",
    borderRadius: "8px",
    order: { xs: 1, sm: 2 },
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    "&:hover": {
      backgroundColor: "#F0F3F7",
    },
  },

  addIcon: { width: 49, height: 49 },

  errorText: { color: "#d32f2f", fontSize: 12, mt: -1, ml: 1.5 },
};

export const POST_ADS_STYLE = {
  inputField: {
    "& .MuiInputBase-root": {
      height: { xs: 52, lg: 62 },
      fontSize: { xs: "14px", lg: "20px" },
      fontWeight: 400,
      borderRadius: "7px",
      fontFamily: "Nunito",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#939AAD",
      opacity: 1,
      fontWeight: 400,
      fontSize: { xs: "14px", lg: "18px" },
      fontFamily: "Nunito",
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px transparent inset !important",
      WebkitTextFillColor: "inherit !important",
      fontFamily: "Nunito !important",
      fontWeight: 400,
      fontSize: { xs: "14px", lg: "20px" },
      transition: "background-color 5000s ease-in-out 0s",
    },
  },

  dropdownInput: {
    "& .MuiOutlinedInput-root": {
      position: "relative",
      padding: "0px 35px 0px 14px !important",
      display: "flex",
      alignItems: "center",
    },
    "& .custom-arrow": {
      position: "absolute",
      right: "18px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "18px",
      height: "18px",
      pointerEvents: "none",
    },
  },

  dropdownPaper: {
    borderRadius: "10px",
    mt: 1,
    padding: "0px",
    "& .MuiAutocomplete-option": {
      padding: "9px 10px",
      fontFamily: "Nunito",
      fontSize: { xs: "14px", lg: "20px" },
    },
  },

  fieldLabel: {
    color: "#191F33",
    fontSize: { xs: "14px", md: "16px", lg: "18px" },
    fontFamily: "Nunito",
  },

  errorText: {
    color: "#d32f2f",
    fontSize: 12,
    mt: -1,
    ml: 2.5,
  },
};

export const SIDENAV_STYLES = {
  mainWrapper: {
    width: 315,
    height: "100%",
    minHeight: 400,
    maxHeight: "100%",
    display: "none",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E4E4E4",
    py: 2.5,
    px: 2.5,
    pr: 0,
    "@media(min-width:1024px)": {
      display: "flex",
    },
  },

  titleBox: {
    p: 2,
  },

  tabsContainer: {
    alignItems: "flex-start",
    "& .MuiTab-root": { mb: 1 },
    ".MuiTabs-indicator": { display: "none" },
  },

  tabItem: (pathname, path) => {
    const isExact = pathname === path;
    const isChildRoute =
      pathname.startsWith(path + "/") && path !== "/create-product";

    const isActive = isExact || isChildRoute;

    return {
      minHeight: 52,
      fontSize: 14,
      fontWeight: 400,
      fontFamily: "Nunito",
      display: "flex",
      alignItems: "center",
      pl: 2.5,
      textTransform: "none",

      background: isActive
        ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)"
        : "transparent",
      color: isActive ? "#FFF" : "#000000",

      "&:hover": {
        background:
          "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
        color: "#FFF",
      },
    };
  },
};
