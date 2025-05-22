import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, CircularProgress, Grid2 } from "@mui/material";
import ProfileCard from "./profile-card";
import RightBar from "./right-bar";
import LeftBar from "./left-bar";
import Feed from "./feed";
import { usePublicProfileMutation } from "../../../services/user";

const Profile = () => {
  const data = useLocation();
  const userId = data?.pathname?.split("/")[2];
  const { user } = useSelector((state) => state.auth);
  const [publicProfile, { isLoading }] = usePublicProfileMutation();
  const [isPublicView, setIsPublicView] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [userData, setUserData] = useState();
  const [modal, setModal] = useState("");


  useEffect(() => {
    if (userId === user?.id) {
      console.log(user)
      setUserData(user);
      setIsPublicView(false);
      setIsPublic(false);
      return;
    }
    publicProfile({ id: userId }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      } else {
        const updatedData = { ...res?.data?.data };

        const current = updatedData?.about?.currentExperience || [];
        const past = updatedData?.about?.pastExperience || [];

        updatedData.about = {
          ...updatedData.about,
          experience: [...current, ...past],
        };

        setUserData(updatedData);
        setIsPublicView(true);
        setIsPublic(true);
      }
    });
  }, [userId, user, data]);

  if (isLoading || !userData?.firstName) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 150px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#1877F2" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: "20px" }}>
      <Grid2 container spacing={5}>
        <Grid2 container spacing={5} size={{ xs: 12, lg: 9 }}>
          <Grid2
            sx={{ background: "#FFF", rowGap: "10px" }}
            container
            spacing={5}
            size={{ xs: 12 }}
          >
            <ProfileCard
              userData={userData}
              isPublicView={isPublicView}
              isPublic={isPublic}
              setIsPublicView={setIsPublicView}
              handleOpenExpModal={() => setModal("addexp")}
            />
          </Grid2>
          <Grid2
            size={{ xs: 12, lg: 3.5 }}
            sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
          >
            <LeftBar modal={modal} setModal={setModal} userData={userData} isPublicView={isPublicView} isPublic={isPublic} />
          </Grid2>

          <Grid2
            size={{ xs: 12, lg: 8.5 }}
            sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
          >
            <Feed userData={userData} isPublicView={isPublicView} isPublic={isPublic} userId={userId} />
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 3 }}>
          <RightBar isPublicView={isPublicView} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Profile;
