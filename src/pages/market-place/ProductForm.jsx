import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";

import AdInformation from "./AdInformation";
import FeatureAndImages from "./FeatureAndImages";
import PostAds from "./PostAds";
import { productData } from "../../constant";
import { getProductValidationSchema } from "../../schemas";
import { toast } from "react-toastify";
import { arrowRight, step1, step2, step3, whiteTick } from "../../assets";
import PublishedAd from "./PublishedAd";
import { PRODUCT_FORM_STYLE } from "./Styles";
import { base64ToFile, handleTabClick, toBase64 } from "../../utils";
import { useAddProductMutation } from "../../services/product";

const ProductForm = ({ setValue = () => {}, setInnerValue = () => {} }) => {
  const {
    goBackBtn,
    paper,
    stepTabsContainer,
    stepTab,
    stepIcon,
    stepTitle,
    stepSubtitle,
    panelWrapper,
    panelButtons,
    prevButton,
    nextButton,
    nextButtonIcon,
  } = PRODUCT_FORM_STYLE || {};
  const { adsInformationData, featureAndImagesData, postAdsData } =
    productData || {};
  const [step, setStep] = useState(0);
  const tabRefs = useRef([]);
  const scrollContainerRef = useRef(null);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [stepStatus, setStepStatus] = useState(
    JSON.parse(localStorage.getItem("stepProgress")) || [false, false, false]
  );

  const defaultValues = {
    // step 1
    ad_name: "",
    category: "",
    sub_category: "",
    brand: "",
    model: "",
    condition: "",
    authenticity: "",
    tags: [],
    ad_price: "",
    negotiable: "",

    // step 2
    description: "",
    features: "",
    upload_photos: [],

    // step 3
    phone_number: "",
    backup_phone_number: "",
    email_address: "",
    website_link: "",
    country: "",
    city: "",
    state: "",
    location: "",
    map_location: {
      lat: 24.8607,
      lng: 67.0011,
    },
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
    if (value === 3) return;

    const errors = await validateForm();
    if (Object.keys(errors).length) {
      setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      return;
    }

    const convertedPhotos = await Promise.all(
      (values.upload_photos || []).map(async (f) => await toBase64(f))
    );
    const filteredPhotos = convertedPhotos.filter((p) => !!p);
    const updatedValues = { ...values, upload_photos: filteredPhotos };

    localStorage.setItem("formData", JSON.stringify(updatedValues));

    const savedProgress = JSON.parse(localStorage.getItem("stepProgress")) || [
      false,
      false,
      false,
    ];
    savedProgress[value] = true;
    localStorage.setItem("stepProgress", JSON.stringify(savedProgress));
    setStepStatus(savedProgress);

    if (value < 2) {
      handleTabClick(value + 1, setStep, tabRefs, scrollContainerRef);
    } else if (value === 2) {
      document.querySelector("form").requestSubmit();
    }
  };

  const handleBack = (value) => {
    handleTabClick(value - 1, setStep, tabRefs, scrollContainerRef);
  };

  const STEPS = [
    { text: "Ads Information", icon: step1, active: whiteTick },
    { text: "Description, Features & Images", icon: step2, active: whiteTick },
    { text: "Post Ads", icon: step3, active: whiteTick },
  ];

  const CustomTabPanel = ({
    children,
    value,
    index,
    validateForm,
    setTouched,
    values,
  }) => (
    <Box role="tabpanel" hidden={value !== index} sx={panelWrapper}>
      {value === index && children}
      <Box sx={panelButtons}>
        {value !== 0 && (
          <Button
            disabled={isLoading}
            onClick={() => handleBack(value)}
            sx={prevButton}
          >
            Previous
          </Button>
        )}
        <Button
          onClick={() => handleNext(validateForm, setTouched, values, value)}
          sx={nextButton}
          loading={isLoading}
          endIcon={
            isLoading ? null : (
              <Box component="img" src={arrowRight} sx={nextButtonIcon} />
            )
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
      validateOnBlur
      validateOnChange
      onSubmit={async (values) => {
        try {
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) => {
            if (key === "upload_photos") return;
            if (Array.isArray(value) || typeof value === "object") {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, value);
            }
          });

          if (values.upload_photos && values.upload_photos.length > 0) {
            values.upload_photos.forEach((b64, index) => {
              const file = base64ToFile(b64, `photo_${index + 1}.jpg`);
              formData.append("photos", file);
            });
          }

          const response = await addProduct(formData).unwrap();

          toast.success("Product created successfully!");
          console.log("✅ Final Submit Response:", response);

          setTimeout(() => {
            localStorage.removeItem("formData");
            localStorage.removeItem("stepProgress");
            setStep(3);
          }, 3000);
        } catch (error) {
          console.error("❌ Product create failed:", error);
          toast.error(error?.data?.message || "Failed to create product");
        }
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

        if (step === 3)
          return (
            <PublishedAd
              setStep={setStep}
              setValue={setValue}
              setInnerValue={setInnerValue}
            />
          );

        return (
          <>
            <Stack sx={{ width: "100%", maxWidth: "1290px" }}>
              <Button
                onClick={() => {
                  setStep(0);
                  setValue(0);
                }}
                disableRipple
                sx={goBackBtn}
              >
                Go back
              </Button>
            </Stack>

            <Paper elevation={0} sx={paper}>
              <Form>
                <Box ref={scrollContainerRef} sx={stepTabsContainer}>
                  {STEPS?.map(({ text, icon, active }, index) => {
                    const isActive = step === index;
                    return (
                      <Stack
                        key={index}
                        direction="row"
                        spacing={1.5}
                        sx={stepTab(isActive)}
                        ref={(el) => (tabRefs.current[index] = el)}
                      >
                        <Stack sx={stepIcon(isActive, stepStatus, index)}>
                          <Box
                            component="img"
                            src={stepStatus[index] ? active : icon}
                          />
                        </Stack>
                        <Stack
                          spacing={0.5}
                          sx={{ width: "calc(100% - 63px)" }}
                        >
                          <Typography sx={stepTitle}>
                            {`Step ${index + 1}`}
                          </Typography>
                          <Typography sx={stepSubtitle}>{text}</Typography>
                        </Stack>
                      </Stack>
                    );
                  })}
                </Box>

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
          </>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
