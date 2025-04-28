import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { DynamicModal, Input } from "../../../../components";
import { useUpdateUserInfoMutation } from "../../../../services/auth";
import { updateUser } from "../../../../store/slices/auth";
import { skillSchema } from "../../../../schemas";

const EditSkillModal = ({ skill, userData, open, handleClose }) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserInfoMutation();

  const initialValues = useMemo(
    () => ({
      skill: skill?.skill || "",
    }),
    [skill]
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: skillSchema,
    onSubmit: (values) => {
      const ind = userData?.about?.skills?.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(skill)
      );
      let updatedSkill;
      if (ind !== -1) {
        updatedSkill = [...userData?.about?.skills];
        updatedSkill[ind] = values;
      } else {
        updatedSkill = [...userData?.about?.skills, values];
      }
      updateProfile({
        about: {
          ...userData?.about,
          skills: updatedSkill,
        },
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        if (res) {
          toast.success("Your skill edited successfully");
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
      title="Edit Skill"
      buttonText="Edit"
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

export default EditSkillModal;
