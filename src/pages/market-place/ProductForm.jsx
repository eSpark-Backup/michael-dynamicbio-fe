import {
  Box,
  Button,
  keyframes,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";

import AdInformation from "./AdInformation";
import FeatureAndImages from "./FeatureAndImages";
import PostAds from "./PostAds";
import { productData } from "../../constant";
import { getProductValidationSchema } from "../../schemas";
import { toast } from "react-toastify";
import { arrowRight, successLogo, successMark } from "../../assets";

const ProductForm = ({ setValue = () => {}, setInnerValue = () => {} }) => {
  const { adsInformationData, featureAndImagesData, postAdsData } =
    productData || {};
  const [step, setStep] = useState(3);
  const tabRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  const toBase64 = (file) =>
    new Promise((resolve) => {
      if (!file) return resolve(null);
      if (typeof file === "string") return resolve(file);

      if (file instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    });

  const defaultValues = {
    // step 1
    ad_name: "",
    category: "",
    sub_category: "",
    brand: "",
    model: "",
    conditions: "",
    authenticity: "",
    tags: "",
    ad_prices: "",
    nigotiable: "",

    // step 2
    description: "",
    feature: "",
    upload_photos: [],

    // step 3
    phone_number: "",
    backup_phone_number: "",
    email: "",
    website_url: "",
    country: "",
    city: "",
    state: "",
    location: "",
    map_location: "",
  };

  const loadSavedData = () => {
    try {
      const saved = localStorage.getItem("formData");
      return saved ? JSON.parse(saved) : defaultValues;
    } catch {
      return defaultValues;
    }
  };

  const handleNext = async (validateForm, setTouched, values, value) => {
    if (value === 2) {
      return;
    } else {
      const errors = await validateForm();
      if (Object.keys(errors).length) {
        setTouched(
          Object.keys(errors).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {})
        );
        return;
      }
      const convertedPhotos = await Promise.all(
        (values.upload_photos || []).map(async (f) => await toBase64(f))
      );
      const filteredPhotos = convertedPhotos.filter((p) => !!p);
      const updatedValues = { ...values, upload_photos: filteredPhotos };
      localStorage.setItem("formData", JSON.stringify(updatedValues));
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const STEPS = [
    { text: "Ads Information", icon: "icon" },
    { text: "Description, Features & Images", icon: "icon" },
    { text: "Post Ads", icon: "icon" },
  ];

  const handleTabClick = (index) => {
    setStep(index);
    const tab = tabRefs.current[index];
    const container = scrollContainerRef.current;

    if (tab && container) {
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const isMobile = window.innerWidth < 1024;

      const scrollTo = isMobile
        ? tabLeft - containerWidth / 2 + tabWidth / 2.3
        : tabLeft - containerWidth / 1 + 0 / 2;

      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const CustomTabPanel = ({
    children,
    value,
    index,
    validateForm,
    setTouched,
    values,
  }) => (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{ width: "100%", px: { xs: 2, md: 3.5 }, py: 4 }}
    >
      {value === index && children}

      <Box
        sx={{
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
        }}
      >
        {value !== 0 && (
          <Button
            onClick={handleBack}
            sx={{
              border: "1px solid #EBEEF7",
              fontSize: { xs: "14px", md: "18px" },
              maxWidth: { xs: "140px", md: "160px", lg: "180px" },
              height: { xs: "52px", lg: "62px" },
              background: "transparent",
              borderRadius: "8px",
              fontFamily: "Nunito",
              fontWeight: 700,
              "@media(max-width: 424px)": {
                maxWidth: "100%",
              },
            }}
          >
            Previous
          </Button>
        )}
        <Button
          type={value === 2 ? "submit" : "button"}
          onClick={() => handleNext(validateForm, setTouched, values, value)}
          sx={{
            fontSize: { xs: "14px", md: "18px" },
            maxWidth: { xs: "130px", md: "180px", lg: "200px" },
            height: { xs: "52px", lg: "62px" },
            color: "#fff",
            borderRadius: "8px",
            padding: 1,
            fontFamily: "Nunito",
            fontWeight: 700,
            "@media(max-width: 424px)": {
              maxWidth: "100%",
            },
          }}
          endIcon={
            <Box
              component="img"
              src={arrowRight}
              sx={{
                height: "auto",
                display: "block",
                width: { xs: 15, md: 22, lg: 24 },
              }}
            />
          }
        >
          {value === 2 ? "Post Ads" : "Next Steps"}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Formik
      enableReinitialize
      initialValues={loadSavedData()}
      validationSchema={getProductValidationSchema(step)}
      onSubmit={(values) => {
        toast.success("Product created successfully");
        console.log("Final Submit:", values);
        localStorage.removeItem("formData");
        setStep(3);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        validateForm,
        setTouched,
      }) => {
        useEffect(() => {
          const saveData = async () => {
            const convertedPhotos = await Promise.all(
              (values.upload_photos || []).map(async (f) => await toBase64(f))
            );
            const filteredPhotos = convertedPhotos.filter((p) => !!p);
            const updatedValues = { ...values, upload_photos: filteredPhotos };
            localStorage.setItem("formData", JSON.stringify(updatedValues));
          };

          saveData();
        }, [values]);

        if (step === 3) {
          const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
          return (
            <Paper
              elevation={0}
              sx={{
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
                boxShadow:
                  "0px 15.74px 62.94px 0px rgba(0, 34, 51, 0.06) !important",
                border: "0",
              }}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                spacing={{ xs: 1.8, sm: 2.3 }}
                p={2.5}
              >
                <Stack sx={{ position: "relative" }}>
                  <Box
                    component={"img"}
                    src={successLogo}
                    alt="Success Logo"
                    sx={{
                      width: { xs: "55px", md: "73px" },
                      animation: `${rotate} 10s linear infinite`,
                    }}
                  />
                  <Box
                    component={"img"}
                    src={successMark}
                    alt="Success Mark"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "35%",
                      height: "35%",
                    }}
                  />
                </Stack>

                <Typography
                  sx={{
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
                  }}
                >
                  Your ad is successfully publish
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                    fontWeight: 400,
                    color: "#767E94",
                    fontFamily: "Nunito",
                    maxWidth: { xs: "350px", md: "394px", lg: "494px" },
                  }}
                >
                  Proin placerat risus non justo faucibus commodo. Nunc non
                  neque sit amet magna aliquam condimentum.
                </Typography>
                <Box
                  sx={{
                    gap: 2,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    pt: { xs: 1, sm: 1.5 },
                    "@media(max-width: 319px)": {
                      flexDirection: "column",
                    },
                  }}
                >
                  <Button
                    onClick={() => setStep(0)}
                    sx={{
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
                    }}
                  >
                    Go back
                  </Button>

                  <Button
                    onClick={() => {
                      setStep(0);
                      setValue(0);
                      setInnerValue(0);
                    }}
                    sx={{
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
                    }}
                    endIcon={
                      <Box
                        component="img"
                        src={arrowRight}
                        sx={{
                          width: { xs: 15, md: 22, lg: 24 },
                          height: "auto",
                          display: "block",
                        }}
                      />
                    }
                  >
                    View Ads
                  </Button>
                </Box>
              </Stack>
            </Paper>
          );
        }

        return (
          <Paper
            elevation={0}
            sx={{
              p: 0,
              width: "100%",
              maxWidth: "1290px",
              borderRadius: 3,
              backgroundColor: "#fff",
              boxShadow:
                "0px 15.74px 62.94px 0px rgba(0, 34, 51, 0.06) !important",
              border: "0",
            }}
          >
            <Form>
              {/* Step Header */}
              <Box
                ref={scrollContainerRef}
                sx={{
                  display: "flex",
                  width: "100%",
                  overflowX: "auto",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #E4E4E4",
                  gap: { xs: 3, sm: 2 },
                  py: 2,
                  px: 3.5,
                  pb: 0,
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {STEPS?.map(({ text, icon }, index) => {
                  const isActive = step === index;
                  return (
                    <Stack
                      key={index}
                      ref={(el) => (tabRefs.current[index] = el)}
                      direction={{ xs: "row", sm: "row" }}
                      alignItems="center"
                      onClick={() => handleTabClick(index)}
                      spacing={1.5}
                      sx={{
                        cursor: "pointer",
                        flexShrink: 0,
                        width: { xs: "200px", sm: "32.2%" },
                        py: { xs: 1.5, sm: 2.5 },
                        borderBottom: isActive
                          ? "3px solid #00AAFF"
                          : "3px solid transparent",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Stack
                        sx={{
                          width: { xs: "45px", sm: "53px", md: "63px" },
                          height: { xs: "45px", sm: "53px", md: "63px" },
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                          background: isActive ? "#27C200" : "#C5C9D6",
                          color: "#FFF",
                          fontWeight: 600,
                        }}
                      >
                        {icon}
                      </Stack>
                      <Stack spacing={0.5}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: "14px", md: "16px", lg: "20px" },
                            color: "#191F33",
                            textTransform: "capitalize",
                            fontFamily: "Nunito",
                          }}
                        >
                          {`Step ${index + 1}`}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 400,
                            fontSize: { xs: "13px", md: "16px" },
                            color: "#767E94",
                            textTransform: "capitalize",
                            fontFamily: "Nunito",
                          }}
                        >
                          {text}
                        </Typography>
                      </Stack>
                    </Stack>
                  );
                })}
              </Box>

              {/* Step Panels */}
              {STEPS?.map(({ text }, index) => (
                <CustomTabPanel
                  key={index}
                  value={step}
                  index={index}
                  validateForm={validateForm}
                  setTouched={setTouched}
                  values={values}
                >
                  {text === "Ads Information" && (
                    <AdInformation
                      data={adsInformationData}
                      values={values}
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  {text === "Description, Features & Images" && (
                    <FeatureAndImages
                      data={featureAndImagesData}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  {text === "Post Ads" && (
                    <PostAds
                      data={postAdsData}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                </CustomTabPanel>
              ))}
            </Form>
          </Paper>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
