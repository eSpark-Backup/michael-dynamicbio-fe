import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Button, OutlinedInput } from "../../../../components";
import { useGetMyBondsQuery } from "../../../../services/bonds";
import { formatDate } from "../../../../utils";
import { searchIcon, user, verticleDots } from "../../../../assets";

const BondedSynergy = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page] = useState(1);
  const [pageSize] = useState(100);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);
  const open = Boolean(anchorEl);

useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => {
    clearTimeout(handler);
  };
}, [search]);

  const { data, error, isLoading, isFetching } = useGetMyBondsQuery({
    page,
    pageSize,
    search: debouncedSearch,
  });
  const myBonds = data?.data;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
      return;
    }
  }, [error]);

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
          {data?.total} {`Bond${data?.total > 1 ? "s" : ""}`}
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
        {isLoading || isFetching ? (
          <Stack
            p={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress sx={{ color: "#1877F2" }} />
          </Stack>
        ) : data?.total > 0 ? (
          myBonds.map((bond, ind) => {
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
                  <img
                    width={73}
                    height={73}
                    src={bond?.friend?.profileImage || user}
                    alt="profile"
                  />
                  <Box>
                    <Typography sx={{ color: "#171717" }} fontSize="18px">
                      {`${bond?.friend?.firstName} ${bond?.friend?.lastName}`}
                    </Typography>
                    <Typography sx={{ color: "#171717" }} fontSize="18px">
                      {`${bond?.friend?.designation} at ${bond?.friend?.company}`}
                    </Typography>
                    <Typography sx={{ color: "#505050" }} fontSize="14px">
                      {`Bonded on ${formatDate(bond?.createdAt)}`}
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
          })
        ) : (
          <Typography textAlign="center" fontSize="20px" p={3}>
            No bonds
          </Typography>
        )}
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
