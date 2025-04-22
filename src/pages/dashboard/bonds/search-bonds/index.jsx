import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { SuggestedBonds } from "../../../../components";
import { useQuery } from "../../../../utils";
import {
  useAllBondsReqQuery,
  useUpdateBondReqMutation,
} from "../../../../services/bonds";
import { addBond, deleteBond, userAvatar } from "../../../../assets";

const SearchBonds = () => {
  const sent = false;
  const { search } = useSelector((state) => state.search);
  const query = useQuery();
  const q = query.get("q");
  const filter = query.get("filter");

  const [updateReq, { isLoading: isUpdateReqLoading }] =
    useUpdateBondReqMutation();
  const {
    data: reqData,
    isLoading: reqLoading,
    isFetching,
    error: reqError,
    refetch,
  } = useAllBondsReqQuery(
    { type: "received", search },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const requests = reqData?.data?.bonds;

  useEffect(() => {
    if (reqError) {
      toast.error(error?.data?.message);
      return;
    }
  }, [reqError]);

  const handleBond = (id, type) => {
    const bodyToSend = {
      bondId: id,
      action: type,
    };
    updateReq(bodyToSend).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res) {
        refetch();
      }
    });
  };

  if (reqLoading) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress sx={{ color: "#1877F2" }} />
      </Stack>
    );
  }

  return (
    <>
      <Typography
        fontSize="22px"
        sx={{
          background: "#FFF",
          border: "1px solid #E4E4E4",
          borderRadius: "4px",
          padding: "18px 30px",
        }}
      >
        {q}
      </Typography>
      {isUpdateReqLoading || reqLoading || isFetching ? (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <CircularProgress sx={{ color: "#1877F2" }} />
        </Stack>
      ) : requests?.length > 0 ? (
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
            <Typography fontSize="14px">Search Results</Typography>
          </Stack>
          {requests.map((item) => (
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
                  width={73}
                  height={73}
                  style={{ borderRadius: "50%" }}
                  src={
                    sent
                      ? item?.recipient?.profileImage
                      : item?.requester?.profileImage || userAvatar
                  }
                  alt="profile"
                />
                <Box>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight={300}
                  >
                    {`${
                      sent
                        ? item?.recipient?.firstName
                        : item?.requester?.firstName
                    } ${
                      sent
                        ? item?.recipient?.lastName
                        : item?.requester?.lastName
                    }`}
                  </Typography>
                  <Typography
                    sx={{ color: "#505050" }}
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {`${
                      sent
                        ? item?.recipient?.designation
                        : item?.requester?.designation
                    } at “${
                      sent ? item?.recipient?.company : item?.requester?.company
                    }” `}
                  </Typography>
                  <Typography
                    sx={{ color: "#505050" }}
                    fontSize="14px"
                    fontWeight={400}
                  >
                    {`${
                      sent ? item?.recipient?.city : item?.requester?.city
                    }, ${
                      sent ? item?.recipient?.country : item?.requester?.country
                    }`}
                  </Typography>
                </Box>
              </Stack>
              {sent ? (
                <Typography
                  onClick={() => handleBond(item?.id, "canceled")}
                  fontSize="14px"
                  sx={{
                    cursor: "pointer",
                    background:
                      "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                  }}
                >
                  Withdraw
                </Typography>
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  gap={1.5}
                >
                  <img
                    onClick={() => handleBond(item?.id, "rejected")}
                    style={{ cursor: "pointer" }}
                    src={deleteBond}
                    alt="trash"
                  />
                  <img
                    onClick={() => handleBond(item?.id, "accepted")}
                    style={{ cursor: "pointer" }}
                    src={addBond}
                    alt="bond"
                  />
                </Stack>
              )}
            </Stack>
          ))}
        </Box>
      ) : null}
      <SuggestedBonds refetch={refetch} search={search} />
    </>
  );
};
export default SearchBonds;
