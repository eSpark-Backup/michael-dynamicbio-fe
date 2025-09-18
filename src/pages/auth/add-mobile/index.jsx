import { useFormik } from 'formik';
import countries from 'country-telephone-data';
import { Button, Dropdown, Input } from '../../../components';
import { addMobileSchema } from '../../../schemas';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AddMobile = () => {
  const countriesOptions = countries?.allCountries?.map((item) => ({
    name: item?.name,
    dialCode: item?.dialCode,
    iso2: item?.iso2,
  }));

  const formik = useFormik({
    initialValues: {
      countryCode: '',
      phoneNumber: '',
    },
    validationSchema: addMobileSchema,
    onSubmit: (values) => {
      console.log(values, 'values');
    },
  });
  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          rowGap: '20px',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '28px', md: '40px' },
            fontWeight: '400',
            textAlign: 'center',
          }}
        >
          Number verification
        </Typography>
        <Typography textAlign="center" fontWeight={300} fontSize="17px">
          Please verify your phone number to proceed.
        </Typography>
        <Box
          sx={{
            width: { xs: '90%', sm: '70%' },
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',
            mt: '30px',
          }}
        >
          <Dropdown
            options={countriesOptions}
            handleChange={(event) =>
              formik.setFieldValue('countryCode', event.target.value)
            }
            placeholder="Country Code*"
            isCountries={true}
            error={formik.touched.countryCode && !!formik.errors.countryCode}
            helperText={formik.touched.countryCode && formik.errors.countryCode}
            value={formik.values.countryCode}
          />
          <Input
            placeholder="Phone Number*"
            type="tel"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            handleChange={formik.handleChange}
            error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <Box
            sx={{
              mt: '250px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              rowGap: '20px',
            }}
          >
            <Box sx={{ width: '250px' }}>
              <Button loading={false} type="submit">
                Verify Number
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '27px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '300',
                  textAlign: 'center',
                }}
              >
                Already have an account?
                <Link
                  style={{
                    textDecoration: 'none',
                    width: '100%',
                  }}
                  to="/login"
                >
                  <Typography
                    ml={1}
                    fontSize="18px"
                    fontWeight={400}
                    component="span"
                    sx={{
                      color: (theme) => theme.palette.primary.dark,
                      textAlign: 'center',
                    }}
                    variant="gradientText"
                  >
                    Login
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddMobile;
