import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { DynamicModal, Input } from "../../../../components";
import { useUpdateUserInfoMutation } from "../../../../services/auth";
import { updateUser } from "../../../../store/slices/auth";
import { skillSchema } from "../../../../schemas";

const AddSkillModal = ({ userData, open, handleClose }) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();
  const formik = useFormik({
    initialValues: {
      skill: "",
    },
    validationSchema: skillSchema,
    onSubmit: (values) => {
      const arrToSend = userData?.about?.skill
        ? [...userData?.about?.skill, { ...values }]
        : [{ ...values }];
      const filteredArr = arrToSend.filter((item) => item !== undefined);
      updateProfile({
        about: { ...userData?.about, skill: filteredArr },
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success("Your skill added successfully");
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
      title="Add Skill"
      buttonText="Add"
      open={open}
      onSuccess={formik.handleSubmit}
      handleClose={onClose}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          ".MuiOutlinedInput-root": { height: "auto !important" },
          textarea: { paddingBottom: "20px" },
        }}
      >
        <Input
          customLabel="Skill *"
          variant="outlined"
          placeholder="Please enter your skill"
          name="skill"
          value={formik.values.skill}
          handleChange={formik.handleChange}
          error={formik.touched.skill && !!formik.errors.skill}
          helperText={formik.touched.skill && formik.errors.skill}
        />
      </Box>
    </DynamicModal>
  );
};

export default AddSkillModal;
