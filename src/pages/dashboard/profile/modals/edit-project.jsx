import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BoxWithTextIcon,
  Dropdown,
  DynamicModal,
  Input,
} from "../../../../components";
import {
  Autocomplete,
  Avatar,
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { projectSchema } from "../../../../schemas";
import { close, deleteIcon, link, photo, plus, user } from "../../../../assets";
import AddLink from "./add-link";
import { monthOptions } from "../../../../constant";
import { checkDate, yearOptions } from "../../../../utils";
import { useGetMyBondsQuery } from "../../../../services/bonds";
import { useUpdateUserInfoMutation } from "../../../../services/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../store/slices/auth";

const EditProject = ({ project, open, handleClose, userData }) => {
  const { data, error, isLoading, isFetching, refetch, isSuccess } =
    useGetMyBondsQuery(
      {
        page: 0,
        pageSize: 10000,
        search: "",
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const [bondOptions, setBondOptions] = useState([]);
  const [relatedOptions, setRelatedOptions] = useState([]);
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateUserInfoMutation();

  useEffect(() => {
    if (isSuccess && data) {
      const users = data?.data?.map((item) => ({
        name: item?.friend?.firstName + " " + item?.friend?.lastName,
        bio: item?.friend?.about?.bio,
        id: item?.friend?.id,
        profileImg: item?.friend?.profileImage,
      }));
      setBondOptions(users);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    const data = (userData?.about?.experience || [])
      .filter((item) => item?.title && item?.company)
      .map((item) => ({
        label: `${item.title} at ${item.company}`,
        value: `${item.title} at ${item.company}`,
      }));

    const data2 = (userData?.about?.education || [])
      .filter((item) => item?.school)
      .map((item) => ({
        label: `Student at ${item.school}`,
        value: `Student at ${item.school}`,
      }));

    setRelatedOptions([...data, ...data2]);
  }, [userData]);

  const initialValues = useMemo(
    () => ({
      name: project?.name ? project?.name : "",
      description: project?.description ? project?.description : "",
      skills: project?.skills ? project?.skills : [],
      links: project?.links ? project?.links : [],
      files: project?.files ? project?.files : [],
      working: project?.working ? project?.working : false,
      startYear: project?.startYear ? project?.startYear : "",
      startMonth: project?.startMonth ? project?.startMonth : "",
      endMonth: project?.endMonth ? project?.endMonth : "",
      endYear: project?.endYear ? project?.endYear : "",
      contributors: project?.contributors ? project?.contributors : [],
      related: project?.related ? project?.related : "",
    }),
    [project]
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: projectSchema,
    onSubmit: (values) => {
      const isWorking = values?.working;
      const isValidDate = checkDate(
        values?.startMonth,
        values?.startYear,
        values?.endMonth,
        values?.endYear
      );

      if (!isWorking && !isValidDate) {
        toast.error("Check Date Please");
        return;
      }

      const ind = userData?.about?.projects?.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(project)
      );
      let updatedProjects;
      if (ind !== -1) {
        updatedProjects = [...userData?.about?.projects];
        updatedProjects[ind] = values;
      } else {
        updatedProjects = [...userData?.about?.projects, values];
      }
      updateProfile({
        about: {
          ...userData?.about,
          projects: updatedProjects,
        },
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success("Your project edited successfully");
          dispatch(updateUser(res?.data?.data));
          onClose();
        }
      });
    },
  });

  const [showSkillsInput, setShowSkillsInput] = useState(false);
  const [showContributorInput, setShowContributorInput] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    handleClose();
    formik.resetForm();
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuItemClose = () => {
    setAnchorEl(null);
  };

  const HandleMenuItemClicked = (event) => {
    if (event === "link") {
      setShowLinkModal(true);
    } else if (event === "media") {
      fileInputRef.current.click();
    }
    handleMenuItemClose();
  };

  const handleAddLink = (newLink) => {
    formik.setFieldValue("links", [...formik.values.links, newLink]);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    formik.setFieldValue("files", selectedFiles);
  };

  const handleDeleteLink = (indexToRemove) => {
    const updatedLinks = formik.values.links.filter(
      (_, i) => i !== indexToRemove
    );
    formik.setFieldValue("links", updatedLinks);
  };

  const handleDeleteFile = (indexToRemove) => {
    const updatedFiles = formik.values.files.filter(
      (_, i) => i !== indexToRemove
    );
    formik.setFieldValue("files", updatedFiles);
  };
  return (
    <DynamicModal
      isLoading={updateLoading}
      title={"Edit Project"}
      buttonText="Save"
      open={open}
      onSuccess={formik.handleSubmit}
      handleClose={onClose}
    >
      <Typography
        sx={{ fontSize: "15px", fontWeight: "400", color: "#505050" }}
      >
        * Indicates required
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          ".MuiOutlinedInput-root": { height: "auto !important" },
          textarea: { paddingBottom: "20px" },
          mt: "30px",
        }}
      >
        <Input
          customLabel="Project name*"
          variant="outlined"
          placeholder=""
          name="name"
          value={formik.values.name}
          handleChange={formik.handleChange}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          ".MuiOutlinedInput-root": { height: "auto !important" },
          textarea: { paddingBottom: "20px" },
          mt: "15px",
        }}
      >
        <Input
          customLabel="Description"
          variant="outlined"
          placeholder=""
          name="description"
          value={formik.values.description}
          handleChange={formik.handleChange}
          error={formik.touched.description && !!formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
          wordLimit={2000}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          my: "15px",
        }}
      >
        <Typography
          sx={{ fontSize: "22px", fontWeight: "500", color: "#171717" }}
        >
          Skills
        </Typography>
        <Typography
          sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
        >
          We recommend adding your top 5 skills used in this project. They'll
          also appear in your Skills section.
        </Typography>

        {/* Always show selected skills as chips */}
        <Box sx={{ mt: "10px", display: "flex", gap: 1, flexWrap: "wrap" }}>
          {formik.values.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              variant="outlined"
              onDelete={() => {
                const updated = [...formik.values.skills];
                updated.splice(index, 1);
                formik.setFieldValue("skills", updated);
              }}
            />
          ))}
        </Box>

        {showSkillsInput ? (
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={formik.values.skills}
            disableClearable={true}
            PaperComponent={(props) => (
              <Paper
                {...props}
                elevation={0}
                sx={{
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
              />
            )}
            onChange={(event, newValue) => {
              const unique = [...new Set(newValue.map((item) => item.trim()))];
              formik.setFieldValue("skills", unique);
              setShowSkillsInput(false);
            }}
            renderTags={() => null}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Type a skill and press Enter"
                variant="standard"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    e.preventDefault();
                    const newSkill = e.target.value.trim();
                    if (!formik.values.skills.includes(newSkill)) {
                      formik.setFieldValue("skills", [
                        ...formik.values.skills,
                        newSkill,
                      ]);
                    }
                    e.target.value = "";
                    setShowSkillsInput(false);
                  }
                }}
                autoFocus
              />
            )}
          />
        ) : (
          <Box sx={{ width: "200px", mt: "10px" }}>
            <BoxWithTextIcon
              icon={plus}
              text={"Add skill"}
              onClick={() => setShowSkillsInput(true)}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          my: "15px",
        }}
      >
        <Typography
          sx={{ fontSize: "22px", fontWeight: "500", color: "#171717" }}
        >
          Link
        </Typography>
        <Typography
          sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
        >
          Add links related to your project.
        </Typography>
        <Box sx={{ width: "200px", mt: "10px" }}>
          <BoxWithTextIcon
            icon={plus}
            text={"Add link"}
            onClick={handleClick}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "2px" }}>
        {formik?.values?.links?.map((item, index) => (
          <Box
            sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}
          >
            <Typography
              variant="gradientText"
              sx={{ fontSize: "16px", fontWeight: "500" }}
              key={index}
            >
              {item}
            </Typography>
            <img
              src={deleteIcon}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={() => handleDeleteLink(index)}
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "8px",
          mt: "10px",
        }}
      >
        {formik?.values?.files?.map((file, index) => {
          const imageUrl = URL.createObjectURL(file);
          return (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", columnGap: "12px" }}
            >
              {/* Image Preview */}
              {file.type.startsWith("image/") && (
                <img
                  src={imageUrl}
                  alt={file.name}
                  style={{
                    width: 100,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                />
              )}
              <span>{file.name}</span>
              <img
                src={deleteIcon}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteFile(index)}
              />
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
          mt: "15px",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
        >
          Additional details
        </Typography>
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
              checked={formik.values.working}
              onChange={(e) =>
                formik.setFieldValue("working", e.target.checked)
              }
              name="working"
            />
          }
          label="I am currently working on this project"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "8px",
              width: "45%",
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
              Start date
            </Typography>
            <Dropdown
              variant="outlined"
              options={monthOptions}
              handleChange={(event) =>
                formik.setFieldValue("startMonth", event.target.value)
              }
              customLabel=""
              noLabel
              placeholder="Month"
              error={formik.touched.startMonth && !!formik.errors.startMonth}
              helperText={formik.touched.startMonth && formik.errors.startMonth}
              value={formik.values.startMonth}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "8px",
              width: "45%",
            }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "400", visibility: "hidden" }}
            >
              Start date
            </Typography>
            <Dropdown
              variant="outlined"
              options={yearOptions}
              handleChange={(event) =>
                formik.setFieldValue("startYear", event.target.value)
              }
              customLabel=""
              noLabel
              placeholder="Year"
              error={formik.touched.startYear && !!formik.errors.startYear}
              helperText={formik.touched.startYear && formik.errors.startYear}
              value={formik.values.startYear}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "8px",
              width: "45%",
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
              End date
            </Typography>
            <Dropdown
              variant="outlined"
              options={monthOptions}
              handleChange={(event) =>
                formik.setFieldValue("endMonth", event.target.value)
              }
              customLabel=""
              noLabel
              placeholder="Month"
              error={formik.touched.endMonth && !!formik.errors.endMonth}
              helperText={formik.touched.endMonth && formik.errors.endMonth}
              value={formik.values.endMonth}
              disabled={formik.values.working}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "8px",
              width: "45%",
            }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "400", visibility: "hidden" }}
            >
              End date
            </Typography>
            <Dropdown
              variant="outlined"
              options={yearOptions}
              handleChange={(event) =>
                formik.setFieldValue("endYear", event.target.value)
              }
              customLabel=""
              noLabel
              placeholder="Year"
              error={formik.touched.endYear && !!formik.errors.endYear}
              helperText={formik.touched.endYear && formik.errors.endYear}
              value={formik.values.endYear}
              disabled={formik.values.working}
            />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}
          >
            Contributors
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "400",
              mt: "2px",
              color: "#505050",
            }}
          >
            Add connections who contributed to the project.
          </Typography>
          <Box
            sx={{
              mt: "10px",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
            }}
          >
            {formik.values.contributors.map((item, index) => (
              <Box
                sx={{
                  display: "flex",
                  columnGap: "10px",
                  alignItems: "flex-start",
                }}
                key={index}
              >
                <Avatar
                  src={item?.profileImg ? item?.profileImg : user}
                  alt="User"
                  sx={{ width: 40, height: 40, objectFit: "fill" }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "#171717",
                      }}
                    >
                      {item?.name}
                    </Typography>
                    <img
                      src={close}
                      alt="Icon"
                      onClick={() => {
                        const updated = formik.values.contributors.filter(
                          (contributor) => contributor.id !== item.id
                        );
                        formik.setFieldValue("contributors", updated);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "400",
                      color: "#505050",
                    }}
                  >
                    {item?.bio}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          {showContributorInput ? (
            <Autocomplete
              multiple
              options={bondOptions} // your object array
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.name
              }
              value={formik.values.contributors}
              disableClearable={true}
              onChange={(event, newValue) => {
                // Normalize strings into objects with just 'name'
                const formatted = newValue.map((item) =>
                  typeof item === "string" ? { name: item } : item
                );

                // Filter by unique names only
                const unique = formatted.filter(
                  (item, index, self) =>
                    index === self.findIndex((t) => t.name === item.name)
                );

                formik.setFieldValue("contributors", unique);
                setShowContributorInput(false);
              }}
              renderTags={() => null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Enter name of contributor and press enter"
                  variant="standard"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      e.preventDefault();
                      const newContributor = { name: e.target.value.trim() };

                      // Only add if name is not already present
                      if (
                        !formik.values.contributors.some(
                          (c) => c.name === newContributor.name
                        )
                      ) {
                        formik.setFieldValue("contributors", [
                          ...formik.values.contributors,
                          newContributor,
                        ]);
                      }

                      e.target.value = "";
                      setShowContributorInput(false);
                    }
                  }}
                  autoFocus
                  sx={{ minWidth: "350px" }}
                />
              )}
            />
          ) : (
            <Box sx={{ width: "300px", mt: "10px" }}>
              <BoxWithTextIcon
                icon={plus}
                text={"Add contributor"}
                onClick={() => setShowContributorInput(true)}
              />
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "2px" }}>
          <Typography
            sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}
          >
            Associated with
          </Typography>
          <Dropdown
            variant="outlined"
            options={relatedOptions}
            handleChange={(event) =>
              formik.setFieldValue("related", event.target.value)
            }
            customLabel=""
            noLabel
            placeholder="Please select"
            error={formik.touched.related && !!formik.errors.related}
            helperText={formik.touched.related && formik.errors.related}
            value={formik.values.related}
          />
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => HandleMenuItemClicked("link")}
          sx={{
            width: { xs: "fit-content", sm: "350px" },
            display: "flex",
            columnGap: "5px",
            alignItems: "flex-start",
          }}
        >
          <img src={link} alt="Icon" />
          <Box>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}
            >
              Add a link
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}
            >
              Use for videos, articles, and websites
            </Typography>
          </Box>
        </MenuItem>
      </Menu>

      <input
        type="file"
        ref={fileInputRef}
        accept=".jpeg, .jpg, .tiff, .png, .webp .pdf"
        style={{ display: "none" }}
        multiple
        onChange={handleFileChange}
      />

      <AddLink
        open={showLinkModal}
        handleClose={() => setShowLinkModal(false)}
        onAddLink={handleAddLink}
      />
    </DynamicModal>
  );
};

export default EditProject;
