import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Grid2 } from "@mui/material";
import ProfileCard from "./profile-card";
import RightBar from "./right-bar";
import LeftBar from "./left-bar";
import Feed from "./feed";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isPublicView, setIsPublicView] = useState(false);
  const [modal, setModal] = useState("");

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
              userData={user}
              isPublicView={isPublicView}
              setIsPublicView={setIsPublicView}
              handleOpenExpModal={() => setModal("addexp")}
            />
          </Grid2>
          <Grid2
            size={{ xs: 12, lg: 3.5 }}
            sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
          >
            <LeftBar modal={modal} setModal={setModal} userData={user} isPublicView={isPublicView} />
          </Grid2>

          <Grid2
            size={{ xs: 12, lg: 8.5 }}
            sx={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
          >
            <Feed userData={user} isPublicView={isPublicView} />
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 3 }}>
          <RightBar />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Profile;
