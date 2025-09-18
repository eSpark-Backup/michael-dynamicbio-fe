import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { gradientRightArrow } from '../../assets';
import SettingsPage from './SettingsPage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VisibilitySettings = () => {
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const [selectedSettings, setSelectedSettings] = useState('');
  const { user: userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [options, setOptions] = useState({
    profileViewingOption: '',
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
  });

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

  const HandleSettings = (setting) => {
    setSelectedSettings(setting);
    setShowSettingsPage(true);
  };

  const handleClose = () => {
    setSelectedSettings('');
    setShowSettingsPage(false);
  };

  if (showSettingsPage) {
    return (
      <SettingsPage
        handleClose={handleClose}
        selectedSetting={selectedSettings}
        values={options}
      />
    );
  }

  return (
    <Box>
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: '500',
          color: '#171717',
          px: '16px',
        }}
      >
        Visibility of your profile & network
      </Typography>
      <Box sx={{ mt: '10px' }}>
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            py: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/profile/${userData?.id}`)}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '100',
              color: '#505050',
              pl: '16px',
            }}
          >
            Edit your public profile
          </Typography>
          <img
            src={gradientRightArrow}
            alt=""
            style={{ marginRight: '16px' }}
          />
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            py: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => HandleSettings('showConnections')}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '100',
              color: '#505050',
              pl: '16px',
            }}
          >
            Who can see your connections
          </Typography>
          <Box sx={{ display: 'flex', columnGap: '15px' }}>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '100',
                color: '#505050',
                pl: '16px',
              }}
            >
              {options?.showConnections ? 'On' : 'Off'}
            </Typography>
            <img
              src={gradientRightArrow}
              alt=""
              style={{ marginRight: '16px' }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            py: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => HandleSettings('showLastName')}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '100',
              color: '#505050',
              pl: '16px',
            }}
          >
            Who can see your last name
          </Typography>
          <img
            src={gradientRightArrow}
            alt=""
            style={{ marginRight: '16px' }}
          />
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            py: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => HandleSettings('showOrganizationsAndInterests')}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '100',
              color: '#505050',
              pl: '16px',
            }}
          >
            Representing your organizations and interests
          </Typography>
          <Box sx={{ display: 'flex', columnGap: '15px' }}>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '100',
                color: '#505050',
                pl: '16px',
              }}
            >
              {options?.showOrganizationsAndInterests ? 'On' : 'Off'}
            </Typography>
            <img
              src={gradientRightArrow}
              alt=""
              style={{ marginRight: '16px' }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VisibilitySettings;
