import { useMemo, useState } from 'react';
import {
  BoxWithTextIcon,
  Dropdown,
  DynamicModal,
  Input,
} from '../../../../components';
import {
  Autocomplete,
  Box,
  Chip,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { monthOptions } from '../../../../constant';
import { checkDate, yearOptions } from '../../../../utils';
import { deleteIcon, link, plus } from '../../../../assets';
import AddLink from './add-link';
import { certificateSchema } from '../../../../schemas';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../store/slices/auth';
import { useUpdateUserInfoMutation } from '../../../../services/auth';

const EditCertificate = ({ certificate, open, handleClose, userData }) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateUserInfoMutation();

  const initialValues = useMemo(
    () => ({
      name: certificate?.name ? certificate?.name : '',
      issuer: certificate?.issuer ? certificate?.issuer : '',
      issueYear: certificate?.issueYear ? certificate?.issueYear : '',
      issueMonth: certificate?.issueMonth ? certificate?.issueMonth : '',
      expireMonth: certificate?.expireMonth ? certificate?.expireMonth : '',
      expireYear: certificate?.expireYear ? certificate?.expireYear : '',
      credId: certificate?.credId ? certificate?.credId : '',
      credURL: certificate?.credURL ? certificate?.credURL : '',
      skills: certificate?.skills ? certificate?.skills : [],
      links: certificate?.links ? certificate?.links : [],
    }),
    [certificate]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: certificateSchema,
    onSubmit: (values) => {
      const isValidDate = checkDate(
        values?.issueMonth,
        values?.issueYear,
        values?.expireMonth,
        values?.expireYear
      );
      if (!isValidDate) {
        toast.error('Check Date Please');
        return;
      }

      const ind = userData?.about?.certifications?.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(certificate)
      );
      let updatedCertificates;
      if (ind !== -1) {
        updatedCertificates = [...userData.about.certifications];
        updatedCertificates[ind] = values;
      } else {
        updatedCertificates = [...userData.about.certifications, values];
      }
      updateProfile({
        about: {
          ...userData?.about,
          certifications: updatedCertificates,
        },
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success('Your certificate edited successfully');
          dispatch(updateUser(res?.data?.data));
          onClose();
        }
      });
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [showLinkModal, setShowLinkModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuItemClose = () => {
    setAnchorEl(null);
  };

  const HandleMenuItemClicked = (event) => {
    if (event === 'link') {
      setShowLinkModal(true);
    } else if (event === 'media') {
      event.current.click();
    }
    handleMenuItemClose();
  };

  const handleAddLink = (newLink) => {
    formik.setFieldValue('links', [...formik.values.links, newLink]);
  };

  const handleDeleteLink = (indexToRemove) => {
    const updatedLinks = formik.values.links.filter(
      (_, i) => i !== indexToRemove
    );
    formik.setFieldValue('links', updatedLinks);
  };

  const onClose = () => {
    handleClose();
    formik.resetForm();
  };

  const [showSkillsInput, setShowSkillsInput] = useState(false);
  return (
    <DynamicModal
      isLoading={updateLoading}
      title={'Add certificate'}
      buttonText="Save"
      open={open}
      onSuccess={formik.handleSubmit}
      handleClose={onClose}
    >
      <Typography
        sx={{ fontSize: '15px', fontWeight: '400', color: '#505050' }}
      >
        * Indicates required
      </Typography>
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
          customLabel="Name*"
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
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          '.MuiOutlinedInput-root': { height: 'auto !important' },
          textarea: { paddingBottom: '20px' },
          mt: '20px',
        }}
      >
        <Input
          customLabel="Issuing organization*"
          variant="outlined"
          placeholder=""
          name="issuer"
          value={formik.values.issuer}
          handleChange={formik.handleChange}
          error={formik.touched.issuer && !!formik.errors.issuer}
          helperText={formik.touched.issuer && formik.errors.issuer}
        />
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '8px',
            width: '45%',
          }}
        >
          <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
            Issue date
          </Typography>
          <Dropdown
            variant="outlined"
            options={monthOptions}
            handleChange={(event) =>
              formik.setFieldValue('issueMonth', event.target.value)
            }
            customLabel=""
            noLabel
            placeholder="Month"
            error={formik.touched.issueMonth && !!formik.errors.issueMonth}
            helperText={formik.touched.issueMonth && formik.errors.issueMonth}
            value={formik.values.issueMonth}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '8px',
            width: '45%',
          }}
        >
          <Typography
            sx={{ fontSize: '12px', fontWeight: '400', visibility: 'hidden' }}
          >
            Start date
          </Typography>
          <Dropdown
            variant="outlined"
            options={yearOptions}
            handleChange={(event) =>
              formik.setFieldValue('issueYear', event.target.value)
            }
            customLabel=""
            noLabel
            placeholder="Year"
            error={formik.touched.issueYear && !!formik.errors.issueYear}
            helperText={formik.touched.issueYear && formik.errors.issueYear}
            value={formik.values.issueYear}
          />
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '8px',
            width: '45%',
          }}
        >
          <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
            Expiration date
          </Typography>
          <Dropdown
            variant="outlined"
            options={monthOptions}
            handleChange={(event) =>
              formik.setFieldValue('expireMonth', event.target.value)
            }
            customLabel=""
            noLabel
            placeholder="Month"
            error={formik.touched.expireMonth && !!formik.errors.expireMonth}
            helperText={formik.touched.expireMonth && formik.errors.expireMonth}
            value={formik.values.expireMonth}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '8px',
            width: '45%',
          }}
        >
          <Typography
            sx={{ fontSize: '12px', fontWeight: '400', visibility: 'hidden' }}
          >
            Expiration date
          </Typography>
          <Dropdown
            variant="outlined"
            options={yearOptions}
            handleChange={(event) =>
              formik.setFieldValue('expireYear', event.target.value)
            }
            customLabel=""
            noLabel
            placeholder="Year"
            error={formik.touched.expireYear && !!formik.errors.expireYear}
            helperText={formik.touched.expireYear && formik.errors.expireYear}
            value={formik.values.expireYear}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          '.MuiOutlinedInput-root': { height: 'auto !important' },
          textarea: { paddingBottom: '20px' },
          mt: '20px',
        }}
      >
        <Input
          customLabel="Credential ID"
          variant="outlined"
          placeholder=""
          name="credId"
          value={formik.values.credId}
          handleChange={formik.handleChange}
          error={formik.touched.credId && !!formik.errors.credId}
          helperText={formik.touched.credId && formik.errors.credId}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          '.MuiOutlinedInput-root': { height: 'auto !important' },
          textarea: { paddingBottom: '20px' },
          mt: '20px',
        }}
      >
        <Input
          customLabel="Credential URL"
          variant="outlined"
          placeholder=""
          name="credURL"
          value={formik.values.credURL}
          handleChange={formik.handleChange}
          error={formik.touched.credURL && !!formik.errors.credURL}
          helperText={formik.touched.credURL && formik.errors.credURL}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          my: '15px',
        }}
      >
        <Typography
          sx={{ fontSize: '22px', fontWeight: '500', color: '#171717' }}
        >
          Skills
        </Typography>
        <Typography
          sx={{ fontSize: '14px', fontWeight: '400', color: '#505050' }}
        >
          Associate atleast 1 skill to this certificate. It will also appear in
          your Skills section
        </Typography>

        {/* Always show selected skills as chips */}
        <Box sx={{ mt: '10px', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {formik.values.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              variant="outlined"
              onDelete={() => {
                const updated = [...formik.values.skills];
                updated.splice(index, 1);
                formik.setFieldValue('skills', updated);
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
                  border: 'none',
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                }}
              />
            )}
            onChange={(event, newValue) => {
              const unique = [...new Set(newValue.map((item) => item.trim()))];
              formik.setFieldValue('skills', unique);
              setShowSkillsInput(false);
            }}
            renderTags={() => null}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Type a skill and press Enter"
                variant="standard"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    e.preventDefault();
                    const newSkill = e.target.value.trim();
                    if (!formik.values.skills.includes(newSkill)) {
                      formik.setFieldValue('skills', [
                        ...formik.values.skills,
                        newSkill,
                      ]);
                    }
                    e.target.value = '';
                    setShowSkillsInput(false);
                  }
                }}
                autoFocus
              />
            )}
          />
        ) : (
          <Box sx={{ width: '200px', mt: '10px' }}>
            <BoxWithTextIcon
              icon={plus}
              text={'Add skill'}
              onClick={() => setShowSkillsInput(true)}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          my: '15px',
        }}
      >
        <Typography
          sx={{ fontSize: '22px', fontWeight: '500', color: '#171717' }}
        >
          Link
        </Typography>
        <Typography
          sx={{ fontSize: '14px', fontWeight: '400', color: '#505050' }}
        >
          Add links related to this certificate.
        </Typography>
        <Box sx={{ width: '200px', mt: '10px' }}>
          <BoxWithTextIcon
            icon={plus}
            text={'Add link'}
            onClick={handleClick}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '2px' }}>
        {formik?.values?.links?.map((item, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
          >
            <Typography
              variant="gradientText"
              sx={{ fontSize: '16px', fontWeight: '500' }}
              key={index}
            >
              {item}
            </Typography>
            <img
              src={deleteIcon}
              alt=""
              style={{ cursor: 'pointer' }}
              onClick={() => handleDeleteLink(index)}
            />
          </Box>
        ))}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onClick={() => HandleMenuItemClicked('link')}
          sx={{
            width: { xs: 'fit-content', sm: '350px' },
            display: 'flex',
            columnGap: '5px',
            alignItems: 'flex-start',
          }}
        >
          <img src={link} alt="Icon" />
          <Box>
            <Typography
              sx={{ fontSize: '14px', fontWeight: '500', color: '#171717' }}
            >
              Add a link
            </Typography>
            <Typography
              sx={{ fontSize: '12px', fontWeight: '400', color: '#505050' }}
            >
              Use for videos, articles, and websites
            </Typography>
          </Box>
        </MenuItem>
      </Menu>

      <AddLink
        open={showLinkModal}
        handleClose={() => setShowLinkModal(false)}
        onAddLink={handleAddLink}
      />
    </DynamicModal>
  );
};

export default EditCertificate;
