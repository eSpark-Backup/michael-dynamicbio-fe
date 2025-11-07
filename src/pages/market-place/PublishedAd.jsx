import {
  Box,
  Button,
  keyframes,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { arrowRight, successLogo, successMark } from "../../assets";
import { PUBLISHED_AD_STYLE } from "./Styles";
import { useNavigate } from "react-router-dom";

const PublishedAd = ({ setStep = () => {} }) => {
  const {
    paper,
    container,
    logoWrapper,
    successLogoStyle,
    successMarkStyle,
    title,
    subtitle,
    buttonGroup,
    backButton,
    viewButton,
    arrowIcon,
  } = PUBLISHED_AD_STYLE || {};

  const navigate = useNavigate();

  const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

  return (
    <Paper elevation={0} sx={paper}>
      <Stack sx={container} spacing={{ xs: 1.8, sm: 2.3 }}>
        <Stack sx={logoWrapper}>
          <Box
            component="img"
            src={successLogo}
            alt="Success Logo"
            sx={successLogoStyle(rotate)}
          />
          <Box
            component="img"
            src={successMark}
            alt="Success Mark"
            sx={successMarkStyle}
          />
        </Stack>

        <Typography sx={title}>Your ad is successfully publish</Typography>

        <Typography sx={subtitle}>
          Proin placerat risus non justo faucibus commodo. Nunc non neque sit
          amet magna aliquam condimentum.
        </Typography>

        <Box sx={buttonGroup}>
          <Button onClick={() => setStep(0)} sx={backButton}>
            Go back
          </Button>

          <Button
            onClick={() => navigate("/market-place")}
            sx={viewButton}
            endIcon={<Box component="img" src={arrowRight} sx={arrowIcon} />}
          >
            View Ads
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default PublishedAd;
