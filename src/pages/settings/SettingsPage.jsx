import {
  Avatar,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { user } from "../../assets";
import { useUpdateUserProfileSettingsMutation } from "../../services/auth";
import { toast } from "react-toastify";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const SettingsPage = ({ handleClose, selectedSetting, values }) => {
  const { user: userData } = useSelector((state) => state.auth);
  const [options, setOptions] = useState(values);
  const [updateSettings, { isLoading }] =
    useUpdateUserProfileSettingsMutation();

  const handleProfileViewChange = (event) => {
    const newValue = event.target.value;
    setOptions((prev) => ({
      ...prev,
      profileViewingOption: event.target.value,
    }));
    updateSettings({ ...options, profileViewingOption: newValue }).then(
      (res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success("Setting successfully");
        }
      }
    );
  };

  const handleConnectionChange = (event) => {
    const newValue = event.target.checked;
    setOptions((prev) => ({
      ...prev,
      showConnections: event.target.checked,
    }));
    updateSettings({ ...options, showConnections: newValue }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        toast.success("Setting updated successfully");
      }
    });
  };

  const handleOrganizationChange = (event) => {
    const newValue = event.target.checked;
    setOptions((prev) => ({
      ...prev,
      showOrganizationsAndInterests: event.target.checked,
    }));
    updateSettings({
      ...options,
      showOrganizationsAndInterests: newValue,
    }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        toast.success("Setting updated successfully");
      }
    });
  };

  const handleShowEmailChange = (event) => {
    const newValue = event.target.checked;
    setOptions((prev) => ({
      ...prev,
      showEmail: event.target.checked,
    }));
    updateSettings({ ...options, showEmail: newValue }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        toast.success("Setting updated successfully");
      }
    });
  };

  const handleViewProfilePhoto = (event) => {
    const newValue = event.target.checked;
    setOptions((prev) => ({
      ...prev,
      showProfilePhoto: event.target.checked,
    }));
    updateSettings({ ...options, showProfilePhoto: newValue }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        toast.success("Setting updated successfully");
      }
    });
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value === "true";
    setOptions((prev) => ({
      ...prev,
      showLastName: value,
    }));
    updateSettings({ ...options, showLastName: value }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        toast.success("Setting updated successfully");
      }
    });
  };

  if (selectedSetting === "profileViewingOption") {
    return (
      <Box
        sx={{
          px: "25px",
          pb: "16px",
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "3px",
            alignItems: "center",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={handleClose}
        >
          <ArrowBackIosIcon sx={{ fontSize: "16px", color: "#37A1F7" }} />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Back
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Profile viewing
          </Typography>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "400", color: "#505050" }}
          >
            {"Select what others see when you've viewed their profile"}
          </Typography>
        </Box>
        <RadioGroup
          name="profileViewingOption"
          sx={{ mr: "0px" }}
          value={options?.profileViewingOption}
          onChange={isLoading ? () => {} : handleProfileViewChange}
        >
          <Box
            sx={{ display: "flex", rowGap: "15px", flexDirection: "column" }}
          >
            <Stack
              sx={{
                label: { margin: 0 },
                display: "flex",
                alignItems: "center",
              }}
              direction="row"
            >
              <FormControlLabel
                value="Your name and headline"
                control={<Radio sx={{ pl: "0px" }} />}
                label="Your name and headline"
              />
            </Stack>
            <Stack
              sx={{
                label: { margin: 0 },
                display: "flex",
                alignItems: "center",
              }}
              direction="row"
            >
              <FormControlLabel
                value="Private profile characteristics"
                control={<Radio sx={{ pl: "0px" }} />}
                label="Private profile characteristics"
              />
            </Stack>
            <Stack
              sx={{
                label: { margin: 0 },
                display: "flex",
                alignItems: "center",
              }}
              direction="row"
            >
              <FormControlLabel
                value="Private mode"
                control={<Radio sx={{ pl: "0px" }} />}
                label="Private mode"
              />
            </Stack>
          </Box>
        </RadioGroup>
        <Typography
          sx={{
            fontSize: "14px",
            mt: "20px",
            fontWeight: "400",
            color: "#505050",
          }}
        >
          Selecting Private profile characteristics or Private mode will disable
          Who’s Viewed Your Profile and erase your viewer history.
        </Typography>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            border: "1px solid #E4E4E4",
            borderRadius: "0.8rem",
            p: 2,
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            This is what others will see:
          </Typography>
          <Box sx={{ display: "flex", columnGap: "10px", mt: "5px" }}>
            <Avatar
              src={
                userData?.profileImage &&
                options?.profileViewingOption === "Your name and headline"
                  ? userData.profileImage
                  : user
              }
              alt="User"
              sx={{ width: 24, height: 24, objectFit: "fill" }}
            />
            <Box>
              <Typography
                sx={{ fontSize: "15px", fontWeight: "500", color: "#171717" }}
              >
                {options?.profileViewingOption === "Your name and headline"
                  ? `${userData?.firstName} ${userData?.lastName}`
                  : options?.profileViewingOption ===
                      "Private profile characteristics"
                    ? `${userData?.designation} at ${userData?.company}`
                    : `Anonymous Fusion Member`}
              </Typography>
              {options?.profileViewingOption === "Your name and headline" && (
                <Typography
                  sx={{ fontSize: "13px", fontWeight: "300", color: "#505050" }}
                >
                  {userData?.about?.bio}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else if (selectedSetting === "showConnections") {
    return (
      <Box
        sx={{
          px: "25px",
          pb: "16px",
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "3px",
            alignItems: "center",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={handleClose}
        >
          <ArrowBackIosIcon sx={{ fontSize: "16px", color: "#37A1F7" }} />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Back
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Connection visibility
          </Typography>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "400", color: "#505050" }}
          >
            Allow others to see your connections list
          </Typography>
        </Box>
        <Box
          sx={{
            mt: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Connection visibility
          </Typography>
          <Box
            sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}
            >
              {options?.showConnections ? "On" : "Off"}
            </Typography>
            <Switch
              checked={options?.showConnections}
              onChange={isLoading ? () => {} : handleConnectionChange}
            />
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: "400",
            color: "#505050",
            mt: "20px",
          }}
        >
          If you turn off this setting, only you can see your connections list.
        </Typography>
      </Box>
    );
  } else if (selectedSetting === "showLastName") {
    return (
      <Box
        sx={{
          px: "25px",
          pb: "16px",
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "3px",
            alignItems: "center",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={handleClose}
        >
          <ArrowBackIosIcon sx={{ fontSize: "16px", color: "#37A1F7" }} />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Back
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Last name visibility
          </Typography>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "400", color: "#505050" }}
          >
            Select how your last name appears to others
          </Typography>
        </Box>
        <RadioGroup
          name="showLastName"
          sx={{ mr: "0px" }}
          value={options?.showLastName}
          onChange={isLoading ? () => {} : handleLastNameChange}
        >
          <Box
            sx={{ display: "flex", rowGap: "15px", flexDirection: "column" }}
          >
            <Stack
              sx={{
                label: { margin: 0 },
                display: "flex",
                alignItems: "center",
              }}
              direction="row"
            >
              <FormControlLabel
                value={true}
                control={<Radio sx={{ pl: "0px" }} />}
                label=""
              />
              <Box
                sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}
              >
                <Avatar
                  src={userData?.profileImage ? userData.profileImage : user}
                  alt="User"
                  sx={{ width: 24, height: 24, objectFit: "fill" }}
                />
                <Typography sx={{ textTransform: "capitalize" }}>
                  {userData?.firstName}{" "}
                  {userData?.lastName?.slice(0, 1).toUpperCase() +
                    userData?.lastName?.slice(1)}
                </Typography>
              </Box>
            </Stack>
            <Stack
              sx={{
                label: { margin: 0 },
                display: "flex",
                alignItems: "center",
              }}
              direction="row"
            >
              <FormControlLabel
                value={false}
                control={<Radio sx={{ pl: "0px" }} />}
                label=""
              />
              <Box
                sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}
              >
                <Avatar
                  src={userData?.profileImage ? userData.profileImage : user}
                  alt="User"
                  sx={{ width: 24, height: 24, objectFit: "fill" }}
                />
                <Typography sx={{ textTransform: "capitalize" }}>
                  {userData?.firstName}{" "}
                  {userData?.lastName?.slice(0, 1).toUpperCase() + "."}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </RadioGroup>
        <Box
          sx={{
            borderRadius: "0.8rem",
            p: "12px",
            backgroundColor: "#F2F8FD",
            border: "1px solid #E4E4E4",
          }}
        >
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            How this works
          </Typography>
          <ul style={{ margin: 0, paddingLeft: "1.5rem", marginTop: "5px" }}>
            <li
              style={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              Only the first initial of your last name will be displayed for
              anyone who isn’t a connection.
            </li>
            <li
              style={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              Your connections will continue to see your full first and last
              name.
            </li>
            <li
              style={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              Anyone who’s interested in connecting with you can still find you
              by using your first and last name.
            </li>
          </ul>
        </Box>
      </Box>
    );
  } else if (selectedSetting === "showOrganizationsAndInterests") {
    return (
      <Box
        sx={{
          px: "25px",
          pb: "16px",
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "3px",
            alignItems: "center",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={handleClose}
        >
          <ArrowBackIosIcon sx={{ fontSize: "16px", color: "#37A1F7" }} />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Back
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Represent company
          </Typography>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "400", color: "#505050" }}
          >
            Show your name and/or profile information with other content shown
            on LinkedIn?
          </Typography>
        </Box>
        <Box
          sx={{
            mt: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Profile information on content
          </Typography>
          <Box
            sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}
            >
              {options?.showOrganizationsAndInterests ? "On" : "Off"}
            </Typography>
            <Switch
              checked={options?.showOrganizationsAndInterests}
              onChange={isLoading ? () => {} : handleOrganizationChange}
            />
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: "400",
            color: "#505050",
            mt: "20px",
          }}
        >
          Your information can be presented with content such as job postings,
          company pages and insights, sponsored content, and other content
          related to your publicly expressed interests. Public interests can
          include a service you like, public events you are attending, or a
          company you follow or have interacted with on LinkedIn by sharing or
          commenting on its posts.
        </Typography>
      </Box>
    );
  } else if (selectedSetting === "showEmail") {
    return (
      <Box
        sx={{
          px: "25px",
          pb: "16px",
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "3px",
            alignItems: "center",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={handleClose}
        >
          <ArrowBackIosIcon sx={{ fontSize: "16px", color: "#37A1F7" }} />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Back
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Discover by email
          </Typography>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "400", color: "#505050" }}
          >
            Can other discover your profile or connect with you if they have
            your email address?
          </Typography>
        </Box>
        <Box
          sx={{
            mt: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Can user connect with email?
          </Typography>
          <Box
            sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}
            >
              {options?.showEmail ? "On" : "Off"}
            </Typography>
            <Switch
              checked={options?.showEmail}
              onChange={isLoading ? () => {} : handleShowEmailChange}
            />
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: "400",
            color: "#505050",
            mt: "20px",
          }}
        >
          {
            "Your bonds can always discover you, since you're already connected with them."
          }
        </Typography>
      </Box>
    );
  } else if (selectedSetting === "showProfilePhoto") {
    return (
      <Box
        sx={{
          px: "25px",
          pb: "16px",
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "3px",
            alignItems: "center",
            cursor: "pointer",
            width: "fit-content",
          }}
          onClick={handleClose}
        >
          <ArrowBackIosIcon sx={{ fontSize: "16px", color: "#37A1F7" }} />
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Back
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
          >
            Show profile photos
          </Typography>
          <Typography
            sx={{ fontSize: "15px", fontWeight: "400", color: "#505050" }}
          >
            Would you like other can see ypur profile picture?
          </Typography>
        </Box>
        <Box
          sx={{
            mt: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            Show profile picture?
          </Typography>
          <Box
            sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}
            >
              {options?.showProfilePhoto ? "On" : "Off"}
            </Typography>
            <Switch
              checked={options?.showProfilePhoto}
              onChange={isLoading ? () => {} : handleViewProfilePhoto}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return <></>;
};

export default SettingsPage;
