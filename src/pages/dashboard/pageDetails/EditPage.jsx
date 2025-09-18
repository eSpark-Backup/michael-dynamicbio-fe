import { Paper } from "@mui/material";
import EditPageForm from "../../../components/edit-page-form";

const EditPage = ({ page, refetch }) => {
  return (
    <>
      <Paper sx={{ display: "flex", justifyContent: "center" }}>
        <EditPageForm page={page} refetch={refetch} />
      </Paper>
    </>
  );
};

export default EditPage;
