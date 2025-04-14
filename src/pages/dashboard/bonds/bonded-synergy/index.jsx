import { useState } from "react";
import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { searchIcon, user, verticleDots } from "../../../../assets";
import { Button, OutlinedInput } from "../../../../components";

const bonds = [
  {
    id: 1,
    firstName: "Zaheer",
    lastName: "Babar",
    designation: "React JS",
    company: "eSpark",
    createdAt: "1st April 2025",
  },
  {
    id: 2,
    firstName: "Zaheer",
    lastName: "Babar",
    designation: "React JS",
    company: "eSpark",
    createdAt: "1st April 2025",
  },
  {
    id: 3,
    firstName: "Zaheer",
    lastName: "Babar",
    designation: "React JS",
    company: "eSpark",
    createdAt: "1st April 2025",
  },
  {
    id: 4,
    firstName: "Zaheer",
    lastName: "Babar",
    designation: "React JS",
    company: "eSpark",
    createdAt: "1st April 2025",
  },
  {
    id: 5,
    firstName: "Zaheer",
    lastName: "Babar",
    designation: "React JS",
    company: "eSpark",
    createdAt: "1st April 2025",
  },
  {
    id: 6,
    firstName: "Zaheer",
    lastName: "Babar",
    designation: "React JS",
    company: "eSpark",
    createdAt: "1st April 2025",
  },
];

const BondedSynergy = () => {
  const [search, setSearch] = useState("");
  const [myBonds] = useState(bonds);
  const [count] = useState(bonds?.length);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelected(id);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setSelected(null);
  };

  const handleRemove = (e) => {
    console.log(selected, "remove bond");
    handleClose(e);
  };

  const handleMessage = (id) => {
    console.log(id, "message");
  };
  return (
    <Box
      sx={{
        background: "#FFF",
        border: "1px solid #E4E4E4",
        borderRadius: "4px",
        padding: "18px 30px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        sx={{ pb: 2, borderBottom: "1px solid #aaaeb0" }}
      >
        <Typography fontSize="20px">
          {count} {`Bond${count > 1 ? "s" : ""}`}
        </Typography>
        <Box
          sx={{
            width: "280px",
            height: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OutlinedInput
            value={search}
            onInputChange={(e) => setSearch(e.target.value)}
            sx={{ width: "280px" }}
            placeholder="Search by name"
            startAdornment={searchIcon}
          />
        </Box>
      </Stack>
      <Stack sx={{ maxHeight: "650px", overflowY: "auto" }} gap={2}>
        {myBonds.map((bond, ind) => {
          return (
            <Stack
              sx={{ padding: "10px" }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
              key={ind}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <img src={user} alt="profile" />
                <Box>
                  <Typography sx={{ color: "#171717" }} fontSize="18px">
                    {`${bond?.firstName} ${bond?.lastName}`}
                  </Typography>
                  <Typography sx={{ color: "#171717" }} fontSize="18px">
                    {`${bond?.designation} at ${bond?.company}`}
                  </Typography>
                  <Typography sx={{ color: "#505050" }} fontSize="14px">
                    {`Bonded on ${bond?.createdAt}`}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <Button
                  onClick={() => handleMessage(bond?.id)}
                  sx={{ height: "45px", fontSize: "16px", width: "100px" }}
                >
                  Message
                </Button>
                <img
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleClick(e, bond?.id)}
                  src={verticleDots}
                  alt="menu"
                />
              </Stack>
            </Stack>
          );
        })}
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleRemove}>Remove bond</MenuItem>
      </Menu>
    </Box>
  );
};
export default BondedSynergy;
