import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { PageCard } from "../../../../components";
import { plus } from "../../../../assets";

const PagesTab = ({ suggestedPages, accounts, type }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%" }}>
      {accounts?.length > 0 ? (
        <Stack
          sx={{ width: "100%" }}
          mt={2}
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          gap={2}
        >
          {accounts.map((group) => (
            <PageCard type={type} key={group.id} {...group} />
          ))}
        </Stack>
      ) : (
        <Typography>
          {type === "my-pages"
            ? "You  don’t have any page"
            : "You  didn't followed any page"}
        </Typography>
      )}
      {type === "my-pages" && (
        <Stack
          mt={5}
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/bonds?sub=page&edit=true")}
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            <img width={52} height={52} src={plus} alt="add" />
            <Typography>Create Page</Typography>{" "}
          </Stack>
        </Stack>
      )}
      {suggestedPages && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            mt={2}
          >
            <Typography fontSize="14px">
              Pages you might be interested in
            </Typography>
            <Typography
              fontSize="14px"
              variant="gradientText"
              sx={{
                cursor: "pointer",
              }}
            >
              View all
            </Typography>
          </Stack>

          <Stack
            sx={{ width: "100%" }}
            mt={2}
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            gap={2}
          >
            {suggestedPages.map((group) => (
              <PageCard type={type} key={group.id} {...group} />
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default PagesTab;
