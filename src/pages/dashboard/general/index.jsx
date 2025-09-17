import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetGeneralPageQuery } from "../../../services/general";
import { Box, CircularProgress } from "@mui/material";

const GeneralPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Use useMemo to get the raw encoded `data` parameter
  const encodedData = useMemo(() => {
    const match = window.location.search.match(/data=([^&]*)/);
    return match ? match[1] : null;
  }, []);

  const {
    data: getGeneralData,
    isSuccess: getGeneralSuccess,
    isError: isGetGeneralError,
    error: getGeneralError,
    isLoading: isGetGeneralLoading,
  } = useGetGeneralPageQuery(encodedData, {
    skip: !encodedData,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  console.log(isGetGeneralError, getGeneralError);

  useEffect(() => {
    if (getGeneralData && getGeneralSuccess) {
      if (getGeneralData?.data?.type === "ARTICLE") {
        if (token) {
          navigate(`/article/${getGeneralData?.data?.id}`);
        } else {
          navigate(`/general/article?data=${encodedData}`);
        }
      } else if (getGeneralData?.data?.type === "EVENT") {
        if (token) {
          navigate(`/event/${getGeneralData?.data?.id}`);
        } else {
          navigate(`/general/event?data=${encodedData}`);
        }
      } else if (getGeneralData?.data?.type === "TEXT") {
        if (token) {
          navigate(`/post/${getGeneralData?.data?.id}`);
        } else {
          navigate(`/general/text?data=${encodedData}`);
        }
      } else if (getGeneralData?.data?.type === "IMAGE") {
        if (token) {
          navigate(`/post/${getGeneralData?.data?.id}`);
        } else {
          navigate(`/general/image?data=${encodedData}`);
        }
      } else if (getGeneralData?.data?.type === "VIDEO") {
        if (token) {
          navigate(`/post/${getGeneralData?.data?.id}`);
        } else {
          navigate(`/general/video?data=${encodedData}`);
        }
      } else if (getGeneralData?.data?.type === "POLL") {
        if (token) {
          navigate(`/post/${getGeneralData?.data?.id}`);
        } else {
          navigate(`/general/poll?data=${encodedData}`);
        }
      }
    }
  }, [getGeneralData, getGeneralSuccess]);

  if (isGetGeneralLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <div></div>;
};

export default GeneralPage;
