import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Stack, Typography } from '@mui/material';
import { Button } from '../../../components';
import { maskEmail, useQuery } from '../../../utils';
import { successTick } from '../../../assets';
import {
  useForgotPasswordMutation,
  useRegisterMutation,
} from '../../../services/auth';

const VerifyEmail = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const [forgotPw, { isLoading: resetLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const query = useQuery();
  const email = query.get('email');
  const reset = query.get('reset');

  const handleResend = () => {
    const dataToSend = JSON.parse(localStorage.getItem('temp_user_data'));
    register(dataToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        toast.success(res?.data?.message);
      }
    });
  };

  const handleReset = () => {
    forgotPw({ email }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        toast.success(res?.data?.message);
      }
    });
  };

  return (
    <Stack
      sx={{
        width: { xs: '100%', md: '90%', lg: '77%', xl: '706px' },
      }}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <img style={{ marginTop: '134px' }} src={successTick} alt="success" />
      <Typography mt={4} fontSize="29px" textAlign="center">
        Verification link has been sent to {maskEmail(email)} Please check your
        email and verify.
      </Typography>
      <Box sx={{ width: '250px', mt: '75px' }}>
        <Button
          loading={isLoading || resetLoading}
          onClick={reset ? handleReset : handleResend}
        >
          Resend
        </Button>
      </Box>
      <Typography
        sx={{ mt: '30px', cursor: 'pointer', mb: 5 }}
        onClick={() => navigate(-1)}
      >
        Back
      </Typography>
    </Stack>
  );
};

export default VerifyEmail;
