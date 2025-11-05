import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import FiltrationButton from "./FiltrationButton";
import { Link } from "react-router-dom";

const ProductListing = () => {
  const options = [
    { value: "5", label: "5 per page" },
    { value: "10", label: "10 per page" },
    { value: "21", label: "21 per page" },
  ];

  const handleSelect = (value) => {
    console.log("Selected:", value);
  };

  const ProductCard = () => {
    return (
      <Stack
        sx={{ maxWidth: "287px", borderRadius: "14px", background: "#fff" }}
      >
        <Box
          component={"img"}
          sx={{
            maxWidth: "290px",
            height: "195px",
            borderRadius: "7.71px",
            objectFit: "cover",
          }}
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAnpAttsCEfPFziyk58iYd-EfnNM83-q3QRg&s"
          }
        />
        <Stack p={2}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              // fontFamily: "Nunito",
              color: "#070E1E",
            }}
          >
            Sample Text
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: "Nunito",
              color: "#9C9C9C",
            }}
          >
            Example Text used here as placeholder
          </Typography>
        </Stack>
        <Divider />
        <Stack
          direction={"row"}
          p={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              // fontFamily: "Nunito",
              color: "#070E1E",
            }}
          >
            $88,800
          </Typography>
          <Link to={"#"} style={{ textDecoration: "none", color: "#1E4084" }}>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 700,
                // fontFamily: "Nunito",
              }}
            >
              View Details
            </Typography>
          </Link>
        </Stack>
      </Stack>
    );
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
        spacing={1}
        pb={2}
      >
        <Stack>
          <Typography>574,395 Results Founds</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1.5} justifyContent={"center"}>
          <FiltrationButton label="Latest" onSelect={handleSelect} />
          <FiltrationButton
            label="21 per page"
            options={options}
            onSelect={handleSelect}
          />
        </Stack>
      </Stack>
      <Grid container gap={1}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]?.map((_, index) => (
          <ProductCard key={index} />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListing;
