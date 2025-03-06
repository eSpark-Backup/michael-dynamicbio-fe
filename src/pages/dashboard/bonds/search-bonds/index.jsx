import { Box, Stack, Typography } from "@mui/material";
import { BondCard, SuggestionPost } from "../../../../components";
import {
  suggestedSearchBonds,
  suggestionSearchPostContent,
} from "../../../../constant";
import { useQuery } from "../../../../utils";
import {
  addBond,
  deleteBond,
  userAvatar,
  verticleDots,
} from "../../../../assets";

const SearchBonds = () => {
  const query = useQuery();
  const q = query.get("q");
  const filter = query.get("filter");
  const requests = [
    {
      id: 1,
      profileImage: null,
      name: "Albert Einstein",
      company: "XYZ",
      country: "USA",
    },
  ];

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
      {suggestedSearchBonds.map(({ label, accounts }, index) => (
        <Box
          sx={{
            mb: index === suggestedSearchBonds.length - 1 ? "24px" : "",
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
      {suggestionSearchPostContent.length > 0 ? (
        suggestionSearchPostContent?.map((item, index) => (
          <SuggestionPost
            userName={item?.userName}
            userImage={item?.userImage}
            userRole={item?.userRole}
            postTime={item?.postTime}
            numberofLikes={item?.numberofLikes}
            isLiked={item?.isLiked}
            comments={item?.comments}
            activity={item?.activity}
            postPic={item?.postPic}
            postContent={item?.postContent}
            commentsContent={item?.commentsContent}
            key={index}
            index={index}
            length={suggestionSearchPostContent?.length}
          />
        ))
      ) : filter === "all" ? null : (
        <Typography>No posts with this name</Typography>
      )}
    </>
  );
};
export default SearchBonds;
