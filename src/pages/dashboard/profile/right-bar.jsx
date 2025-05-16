import { Box, Paper, Switch, Typography } from "@mui/material";
import { Button } from "../../../components";
import { copyToClipboard } from "../../../utils";
import { copy } from "../../../assets";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserProfileSettingsMutation } from "../../../services/auth";
import { toast } from "react-toastify";

const RightBar = ({ isPublicView }) => {
  const url = "www.fnkdfhudfhidjfvhdfkvgjdhfkbhkfddsfd/jdsfiods.com";
  const { user: userData } = useSelector((state) => state.auth);
  const [updateSettings, { isLoading }] = useUpdateUserProfileSettingsMutation();


  const [options, setOptions] = useState({
    profileViewingOption: "",
    showConnections: null,
    showLastName: null,
    showOrganizationsAndInterests: null,
    showEmail: null,
    showHeadline: null,
    showSummary: null,
    showArticlesAndActivity: true,
    showCurrentExperience: null,
    showCurrentExperienceDetails: null,
    showPastExperience: null,
    showPastExperienceDetails: null,
    showEducation: null,
    showEducationDetails: null,
    showCertifications: null,
    showProjects: true,
    showLanguages: true,
    showProfilePhoto: null,
  })

  const handleToggle = (key) => {
    const updatedOptions = { ...options, [key]: !options[key] };

    if (["showCurrentExperience", "showPastExperience", "showEducation"].includes(key)) {
      const detailKey = key + "Details";
      updatedOptions[detailKey] = updatedOptions[key];
    }

    setOptions(updatedOptions);

    updateSettings(updatedOptions).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        toast.success("Setting updated successfully");
      }
    });
  };

  const fields = [
    // { key: "showHeadline", label: "Headline" },
    { key: "showSummary", label: "Summary" },
    { key: "showCurrentExperience", label: "Current Experience" },
    { key: "showCurrentExperienceDetails", label: "Details", indent: true, parent: "showCurrentExperience" },
    { key: "showPastExperience", label: "Past Experience" },
    { key: "showPastExperienceDetails", label: "Details", indent: true, parent: "showPastExperience" },
    { key: "showEducation", label: "Education" },
    { key: "showEducationDetails", label: "Details", indent: true, parent: "showEducation" },
    { key: "showProjects", label: "Projects" },
    { key: "showProjects", label: "Projects" },
    { key: "showCertifications", label: "Certifications" },
  ];

  useEffect(() => {
    if (userData?.profileSettings) {
      setOptions((prev) => {
        const updated = { ...prev };
        Object.keys(prev).forEach((key) => {
          if (key in userData.profileSettings) {
            updated[key] = userData.profileSettings[key];
          }
        });
        return updated;
      });
    }
  }, [userData]);

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          px: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#171717",
            }}
          >
            Language
          </Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid #E4E4E4",
            borderRadius: "4px",
            p: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#171717",
            }}
          >
            English
          </Typography>
        </Box>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          px: "20px",
          mt: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#171717",
            }}
          >
            URL
          </Typography>
          <img
            onClick={() => copyToClipboard(url)}
            style={{ cursor: "pointer" }}
            src={copy}
            alt="copy"
          />
        </Box>
        <Box
          sx={{
            border: "1px solid #E4E4E4",
            borderRadius: "4px",
            p: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#171717",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {url}
          </Typography>
        </Box>
      </Paper>
      {!isPublicView &&
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "24px" }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
              px: "20px",
              mt: "24px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "14px", fontWeight: 400, color: "#171717" }}
              >
                Analytics
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 400, cursor: "pointer" }}
                variant="gradientText"
              >
                View all
              </Typography>
            </Box>
            {[1, 2]?.map((item, index) => {
              return (
                <Box
                  sx={{
                    border: "1px solid #E4E4E4",
                    p: "10px 5px 10px 5px",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      color: "#171717",
                    }}
                  >
                    {index === 0 ? "Profile views" : "Post impression"}
                  </Typography>
                  <Box>
                    <Typography
                      sx={{
                        textAlign: "right",
                        fontSize: "16px",
                        fontWeight: 300,
                        color: (theme) => theme.palette.primary.dark,
                      }}
                    >
                      0
                    </Typography>
                    {index === 1 && (
                      <Typography
                        sx={{
                          textAlign: "right",
                          fontSize: "10px",
                          fontWeight: 300,
                          color: (theme) => theme.palette.primary.dark,
                        }}
                      >
                        Last 7 days
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
            <Button
              sx={{
                height: "40px",
                fontSize: "14px",
                fontWeight: 400,
                color: "#171717",
              }}
            >
              Manage
            </Button>
          </Paper>
          <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
            {fields.map(({ key, label, indent, parent }) => (
              <Box key={key} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050", pl: indent ? "20px" : 0 }}>
                  {label}
                </Typography>
                <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "12px", fontWeight: "400", color: "#505050" }}>
                    {options[key] ? "Show" : "Hide"}
                  </Typography>
                  <Switch
                    checked={options[key]}
                    onChange={isLoading ? () => { } : () => handleToggle(key)}
                    disabled={parent ? !options[parent] : false}
                  />
                </Box>
              </Box>
            ))}
          </Paper>
        </Box>
      }
    </>
  );
};

export default RightBar;
