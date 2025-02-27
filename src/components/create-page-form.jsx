import { useRef, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import Input from "./Input";
import Dropdown from "./Dropdown";
import Button from "./button";
import { createPageSchema } from "../schemas";
import { uploadIcon } from "../assets";

const CreatePageForm = ({ pageType }) => {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const formik = useFormik({
    initialValues: {
      pageType,
      organizationName: "",
      address: "",
      location: "",
      branches: "",
      size: "",
      type: "",
      industry: "",
      website: "",
      tagline: "",
      permissions: false,
      //production
      sellingItem: "",
      megajooules: "",
      energyDuration: "",
      cost: "",
      //transportation
      shippingItem: "",
      fuelCells: "",
      transportCost: "",
      //storage and miscellaneous
      storageDuration: "",
      storageTemp: "",
    },
    validationSchema: createPageSchema,
    onSubmit: (values) => {
      console.log(values, "values")
    },
  });
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "70%" },
        display: "flex",
        flexDirection: "column",
        ".MuiOutlinedInput-root": { height: "65px !important" },
        input: { paddingBottom: "20px" },
        ".MuiStack-root": { marginTop: "24px" },
      }}
    >
      <Input
        wordLimit={100}
        variant="outlined"
        customLabel="Organization name"
        placeholder="Add your organization’s name"
        required
        name="organizationName"
        value={formik.values.organizationName}
        handleChange={formik.handleChange}
        error={
          formik.touched.organizationName && !!formik.errors.organizationName
        }
        helperText={
          formik.touched.organizationName && formik.errors.organizationName
        }
      />
      <Input
        variant="outlined"
        customLabel="Address"
        required
        name="address"
        placeholder="Add a unique address (as fusion.com/company/"
        value={formik.values.address}
        handleChange={formik.handleChange}
        error={formik.touched.address && !!formik.errors.address}
        helperText={formik.touched.address && formik.errors.address}
      />
      <Input
        variant="outlined"
        customLabel="Location/Country"
        required
        name="location"
        placeholder="Add a headquater/main location"
        value={formik.values.location}
        handleChange={formik.handleChange}
        error={formik.touched.location && !!formik.errors.location}
        helperText={formik.touched.location && formik.errors.location}
      />
      <Input
        variant="outlined"
        customLabel="Branches/ Operating in"
        name="branches"
        placeholder="Add country(s)"
        value={formik.values.branches}
        handleChange={formik.handleChange}
        error={formik.touched.branches && !!formik.errors.branches}
        helperText={formik.touched.branches && formik.errors.branches}
      />
      <Dropdown
        variant="outlined"
        options={[{ label: "abc", value: "abc" }]}
        handleChange={(event) =>
          formik.setFieldValue("size", event.target.value)
        }
        customLabel="Organization size"
        required
        noLabel
        placeholder="Select size"
        error={formik.touched.size && !!formik.errors.size}
        helperText={formik.touched.size && formik.errors.size}
        value={formik.values.size}
      />
      <Dropdown
        variant="outlined"
        options={[{ label: "abc", value: "abc" }]}
        handleChange={(event) =>
          formik.setFieldValue("type", event.target.value)
        }
        customLabel="Organization type"
        required
        noLabel
        placeholder="Select size"
        error={formik.touched.type && !!formik.errors.type}
        helperText={formik.touched.type && formik.errors.type}
        value={formik.values.type}
      />
      <Dropdown
        variant="outlined"
        options={[
          { label: "Production", value: "production" },
          { label: "Transportation", value: "transportation" },
          { label: "Storage", value: "storage" },
          { label: "Miscellaneous services", value: "miscellaneous_services" },
        ]}
        handleChange={(event) =>
          formik.setFieldValue("industry", event.target.value)
        }
        customLabel="Add industry"
        noLabel
        placeholder="Select Industry"
        error={formik.touched.industry && !!formik.errors.industry}
        helperText={formik.touched.industry && formik.errors.industry}
        value={formik.values.industry}
      />
      {formik?.values?.industry === "production" && (
        <>
          <Input
            variant="outlined"
            customLabel="What you are selling?"
            name="sellingItem"
            placeholder="Write here..."
            value={formik.values.sellingItem}
            handleChange={formik.handleChange}
            error={formik.touched.sellingItem && !!formik.errors.sellingItem}
            helperText={formik.touched.sellingItem && formik.errors.sellingItem}
          />
          <Input
            variant="outlined"
            customLabel="How many megajooules of energy are created?"
            name="megajooules"
            placeholder="Write here..."
            value={formik.values.megajooules}
            handleChange={formik.handleChange}
            error={formik.touched.megajooules && !!formik.errors.megajooules}
            helperText={formik.touched.megajooules && formik.errors.megajooules}
          />
          <Input
            variant="outlined"
            customLabel="How long it will create that energy?"
            name="energyDuration"
            placeholder="Write here..."
            value={formik.values.energyDuration}
            handleChange={formik.handleChange}
            error={
              formik.touched.energyDuration && !!formik.errors.energyDuration
            }
            helperText={
              formik.touched.energyDuration && formik.errors.energyDuration
            }
          />
          <Input
            variant="outlined"
            customLabel="How much it will cost?"
            name="cost"
            placeholder="Write here..."
            value={formik.values.cost}
            handleChange={formik.handleChange}
            error={formik.touched.cost && !!formik.errors.cost}
            helperText={formik.touched.cost && formik.errors.cost}
          />
        </>
      )}
      {formik?.values?.industry === "transportation" && (
        <>
          <Input
            variant="outlined"
            customLabel="What is being shipped?"
            name="shippingItem"
            placeholder="Write here..."
            value={formik.values.shippingItem}
            handleChange={formik.handleChange}
            error={formik.touched.shippingItem && !!formik.errors.shippingItem}
            helperText={
              formik.touched.shippingItem && formik.errors.shippingItem
            }
          />
          <Input
            variant="outlined"
            customLabel="How many fuel cells or how many (other) can be shipped at a time?"
            name="fuelCells"
            placeholder="Write here..."
            value={formik.values.fuelCells}
            handleChange={formik.handleChange}
            error={formik.touched.fuelCells && !!formik.errors.fuelCells}
            helperText={formik.touched.fuelCells && formik.errors.fuelCells}
          />
          <>
            <Typography mb={1} mt="24px">
              Enter the places of shippinga
            </Typography>
            <Stack
              direction="row"
              alignItems="flex-end"
              justifyContent="center"
              gap={2}
              sx={{ marginTop: "0px !important" }}
            >
              <Input
                variant="outlined"
                name="to"
                placeholder="To"
                value={formik.values.to}
                handleChange={formik.handleChange}
                error={formik.touched.to && !!formik.errors.to}
                helperText={formik.touched.to && formik.errors.to}
              />
              <Input
                variant="outlined"
                name="from"
                placeholder="From"
                value={formik.values.from}
                handleChange={formik.handleChange}
                error={formik.touched.from && !!formik.errors.from}
                helperText={formik.touched.from && formik.errors.from}
              />
            </Stack>
          </>
          <Input
            variant="outlined"
            customLabel="How much it will cost?"
            name="transportCost"
            placeholder="Write here..."
            value={formik.values.transportCost}
            handleChange={formik.handleChange}
            error={
              formik.touched.transportCost && !!formik.errors.transportCost
            }
            helperText={
              formik.touched.transportCost && formik.errors.transportCost
            }
          />
        </>
      )}
      {(formik?.values?.industry === "storage" ||
        formik?.values?.industry === "miscellaneous_services") && (
        <>
          <Input
            variant="outlined"
            customLabel="How long can it be stored?"
            name="storageDuration"
            placeholder="Write here..."
            value={formik.values.storageDuration}
            handleChange={formik.handleChange}
            error={
              formik.touched.storageDuration && !!formik.errors.storageDuration
            }
            helperText={
              formik.touched.storageDuration && formik.errors.storageDuration
            }
          />
          <Input
            variant="outlined"
            customLabel="What temperature it is stored at?"
            name="storageTemp"
            placeholder="Write here..."
            value={formik.values.storageTemp}
            handleChange={formik.handleChange}
            error={formik.touched.storageTemp && !!formik.errors.storageTemp}
            helperText={formik.touched.storageTemp && formik.errors.storageTemp}
          />
        </>
      )}
      <Input
        variant="outlined"
        customLabel="Website"
        required
        name="website"
        placeholder="https//or www."
        value={formik.values.website}
        handleChange={formik.handleChange}
        error={formik.touched.website && !!formik.errors.website}
        helperText={formik.touched.website && formik.errors.website}
      />

      <>
        <Typography mt="24px" mb={1}>
          Logo
        </Typography>
        <Box
          sx={{
            padding: "7px 21px",
            width: "100%",
            borderRadius: "4px",
            height: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {image && (
            <img
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.5,
              }}
              src={URL.createObjectURL(image)}
              alt="image"
            />
          )}
          <img
            onClick={() => imageRef.current.click()}
            style={{ cursor: "pointer", zIndex: 2 }}
            width={52}
            height={52}
            src={uploadIcon}
            alt="upload"
          />
          <input
            ref={imageRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Box>
      </>
      <Input
        variant="outlined"
        customLabel="Tagline"
        required
        name="tagline"
        placeholder="Add a catchy tagline"
        value={formik.values.tagline}
        handleChange={formik.handleChange}
        error={formik.touched.tagline && !!formik.errors.tagline}
        helperText={formik.touched.tagline && formik.errors.tagline}
      />
      <>
        <Stack
          mb={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt="24px"
        >
          <Typography>permissions</Typography>
          {<Typography>Required</Typography>}
        </Stack>
        <Box
          sx={{
            padding: "7px 21px",
            width: "100%",
            border: "1px solid #000",
            borderRadius: "4px",
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
                checked={formik.values.permissions}
                onChange={formik.handleChange}
                name="permissions"
              />
            }
            label="I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this page. The organization and I agree to the additional terms for Pages."
          />
        </Box>
        {formik.touched.permissions && formik.errors.permissions && (
          <Typography
            sx={{
              color: "#d32f2f ",
              fontSize: "14px",
              margin: "3px 14px 0 14px",
            }}
          >
            {formik.errors.permissions}
          </Typography>
        )}
      </>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "50px",
        }}
      >
        <Box sx={{ width: "250px" }}>
          <Button type="submit" onClick={formik.handleSubmit}>
            Confirm Email
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePageForm;
