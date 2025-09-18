import { DynamicModal, Input } from '../../../../components';
import { useFormik } from 'formik';
import { addLinkSchema } from '../../../../schemas';
import { Box } from '@mui/material';

const AddLink = ({ open, handleClose, onAddLink }) => {
  const formik = useFormik({
    initialValues: {
      link: '',
    },
    validationSchema: addLinkSchema,
    onSubmit: (values) => {
      onAddLink(values.link);
      onClose();
    },
  });

  const onClose = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <DynamicModal
      title="Add Link"
      buttonText="Save"
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
          mt: '30px',
        }}
      >
        <Input
          customLabel="Add a link*"
          variant="outlined"
          placeholder=""
          name="link"
          value={formik.values.link}
          handleChange={formik.handleChange}
          error={formik.touched.link && !!formik.errors.link}
          helperText={formik.touched.link && formik.errors.link}
        />
      </Box>
    </DynamicModal>
  );
};

export default AddLink;
