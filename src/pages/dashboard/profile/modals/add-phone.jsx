import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { DynamicModal, Input } from '../../../../components';
import { useUpdateUserInfoMutation } from '../../../../services/auth';
import { updateUser } from '../../../../store/slices/auth';
import { phoneNoSchema } from '../../../../schemas';

const AddPhoneModal = ({ userData, open, handleClose }) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();
  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: phoneNoSchema,
    onSubmit: (values) => {
      const arrToSend = userData?.about?.phone
        ? [...userData.about.phone, { ...values }]
        : [{ ...values }];
      const filteredArr = arrToSend.filter((item) => item !== undefined);
      updateProfile({
        about: { ...userData?.about, phone: filteredArr },
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success('Your phone no added successfully');
          dispatch(updateUser(res?.data?.data));
          onClose();
        }
      });
    },
  });

  const onClose = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <DynamicModal
      isLoading={isLoading}
      title="Add Phone No"
      buttonText="Add"
      open={open}
      onSuccess={formik.handleSubmit}
      handleClose={onClose}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          '.MuiOutlinedInput-root': { height: 'auto !important' },
          textarea: { paddingBottom: '20px' },
        }}
      >
        <Input
          customLabel="Phone number *"
          variant="outlined"
          placeholder="Please enter your phone number"
          name="phone"
          value={formik.values.phone}
          handleChange={formik.handleChange}
          error={formik.touched.phone && !!formik.errors.phone}
          helperText={formik.touched.phone && formik.errors.phone}
        />
      </Box>
    </DynamicModal>
  );
};

export default AddPhoneModal;
