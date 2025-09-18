import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Stack, Typography } from '@mui/material';
import { Button } from '../../../components';
import { useVerifymfaWithEmailMutation } from '../../../services/auth';
import { maskEmail, useQuery } from '../../../utils';

const EmailMfa = () => {
  const query = useQuery();
  const email = query.get('email');
  const [verifymfaWithEmail, { isLoading }] = useVerifymfaWithEmailMutation();

  const handleEmailMfa = () => {
    verifymfaWithEmail().then((res) => {
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
      sx={{ width: { xs: '100%', md: '90%', lg: '77%', xl: '706px' } }}
      direction="column"
      alignItems="center"
      justifyItems="flex-start"
    >
      <Typography
        sx={{ fontSize: { xs: '28px', md: '40px' } }}
        textAlign="center"
      >
        Email Address Verification
      </Typography>
      <Typography
        sx={{ marginTop: '48px' }}
        textAlign="center"
        fontWeight={300}
        fontSize="17px"
      >
        Authenticate your account by verifying the email address. You will
        receive an email at {maskEmail(email)}, which will include instructions
        to verify your identity.
      </Typography>

      <Box sx={{ width: '250px', mt: '55px' }}>
        <Button loading={isLoading} onClick={handleEmailMfa}>
          Resend
        </Button>
      </Box>
      <Typography sx={{ marginTop: '192px', mb: 5 }}>
        Back to
        <Link
          style={{
            textDecoration: 'none',
            marginLeft: '8px',
            width: '100%',
          }}
          to="/login"
        >
          <Typography
            variant="gradientText"
            fontSize="18px"
            fontWeight={500}
            component="span"
          >
            Login
          </Typography>
        </Link>
      </Typography>
    </Stack>
  );
};

export default EmailMfa;
