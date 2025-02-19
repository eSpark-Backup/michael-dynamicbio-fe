import { Box, Stack, Typography } from "@mui/material";
import { BondCard } from "../../../../components";
import { suggestedBonds } from "../../../../constant";
import {
  addBond,
  deleteBond,
  userAvatar,
  verticleDots,
} from "../../../../assets";

const Grow = ({ requests }) => {
  return (
    <Box>
      <Box
        sx={{
          padding: "23px 32px",
          background: "#fff",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize="14px">
            {requests?.length > 0
              ? "You have new bonding request"
              : "You  don’t have any bonding request "}
          </Typography>
          <img src={verticleDots} alt="dots" />
        </Stack>
        {requests?.length > 0 &&
          requests.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: "1px solid #DDE2E4",
                background: "#F2F8FD",
                borderRadius: "4px",
                padding: "10px 26px 10px 22px",
                mt: 2,
                mb: 1,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={1.5}
              >
                <img
                  style={{ borderRadius: "50%" }}
                  src={item?.profileImage || userAvatar}
                  alt="user-image"
                />
                <Box>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight={300}
                  >
                    {item?.name}
                  </Typography>
                  <Typography fontSize="17px" fontWeight={300}>
                    {`${item?.company} Company, ${item?.country}`}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={1.5}
              >
                <img
                  style={{ cursor: "pointer" }}
                  src={deleteBond}
                  alt="trash"
                />
                <img style={{ cursor: "pointer" }} src={addBond} alt="bond" />
              </Stack>
            </Stack>
          ))}
      </Box>
      {suggestedBonds.map(({ label, accounts }, index) => (
        <Box
          sx={{
            mt: index === 0 ? "40px" : "24px",
            mb: index === suggestedBonds.length - 1 ? "24px" : "",
            padding: "20px 32px 25px 32px",
            background: "#FFF",
            border: "1px solid #E4E4E4",
            borderRadius: "4px",
          }}
          key={label}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Typography fontSize="14px">{label}</Typography>
            <Typography
              fontSize="14px"
              sx={{
                cursor: "pointer",
                background:
                  "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
              }}
            >
              View all
            </Typography>
          </Stack>
          <Stack
            mt={3}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap"
          >
            {accounts.map((bond) => (
              <BondCard key={bond.id} {...bond} />
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default Grow;
