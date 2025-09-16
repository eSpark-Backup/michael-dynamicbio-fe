import { Box } from "@mui/material";
import React from "react";
import OutlinedInput from "./outline-input";
import BondCard2 from "./BondCard";
import { emoji, postPicture, user } from "../assets";

const RepostWithThoughts = ({ onChange }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
      <OutlinedInput
        placeholder={"Start writing or use @ to tag people or companies"}
        sx={{
          height: "60px",
          width: "100%",
          backgroundColor: "#FCFCFC",
          borderRadius: "4px",
          "& .MuiOutlinedInput-root": {
            border: "1px solid #E4E4E4",
            height: "100%",
            backgroundColor: "#FCFCFC",
            borderRadius: "4px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #E4E4E4",
          },
        }}
        onInputChange={onChange}
      />
      <Box
        sx={{ border: "1px solid #E4E4E4", borderRadius: "4px", py: "15px" }}
      >
        <BondCard2
          userImage={user}
          userName={"James Bond"}
          userRole={"UI/UX Designer at “eSpark Consulting Group”"}
          time={"2h ago"}
        />
        <img src={postPicture} alt="Post" />
      </Box>
    </Box>
  );
};

export default RepostWithThoughts;
