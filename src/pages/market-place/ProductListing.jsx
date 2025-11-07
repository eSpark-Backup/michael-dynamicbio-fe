import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import FiltrationButton from "./FiltrationButton";
import { Link } from "react-router-dom";
import { arrow, label } from "../../assets";
import { useState } from "react";
import { useGetProductsQuery } from "../../services/product";

const ProductListing = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetProductsQuery({ page, pageSize });

  const products = data?.data?.products || [];

  const options = [
    { value: "5", label: "5 per page" },
    { value: "10", label: "10 per page" },
    { value: "21", label: "21 per page" },
  ];

  const handleSelect = (value) => {
    setPageSize(Number(value));
  };

  const ProductCard = ({ product }) => {
    const image =
      product?.photos[0] ||
      "https://ionicframework.com/docs/img/demos/thumbnail.svg";

    return (
      <Stack
        sx={{
          maxWidth: { xs: "270px", sm: "100%", md: "287px" },
          width: "100%",
          borderRadius: "14px",
          mx: "auto",
          mb: 2.5,
          background: "#fff",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            sx={{
              width: "100%",
              maxWidth: { xs: "270px", sm: "100%", md: "287px" },
              height: "195px",
              borderRadius: "7.71px",
              objectFit: "cover",
            }}
            src={image}
            alt={product?.ad_name}
          />
          <Box
            sx={{
              position: "absolute",
              top: 15,
              left: 10,
              backgroundColor: "#1E4084",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
              fontFamily: "Nunito",
              borderRadius: "20px",
              px: 2,
              py: 1,
            }}
          >
            Great Price
          </Box>

          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
              "&:hover": { backgroundColor: "#f2f2f2" },
            }}
          >
            <Box
              component="img"
              src={label}
              alt="label icon"
              sx={{ width: 12, height: 12 }}
            />
          </IconButton>
        </Box>

        <Stack p={2}>
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              fontWeight: 700,
              color: "#070E1E",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "Nunito",
            }}
          >
            {product?.ad_name || "Untitled Product"}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#9C9C9C",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "Nunito",
            }}
          >
            {product?.category || "No Category"}
          </Typography>
        </Stack>

        <Divider sx={{ borderColor: "#9C9C9C", opacity: 0.15 }} />

        <Stack
          direction="row"
          p={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              fontWeight: 700,
              color: "#070E1E",
              fontFamily: "Nunito",
            }}
          >
            ${product?.ad_price || "N/A"}
          </Typography>

          <Link
            to={`/market-place/${product?.id}`}
            style={{
              textDecoration: "none",
              color: "#1E4084",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.7,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "14px" },
                  fontWeight: 700,
                  fontFamily: "Nunito",
                }}
              >
                View Details
              </Typography>
              <Box
                component="img"
                src={arrow}
                alt="arrow icon"
                sx={{ width: 12, height: 12, objectFit: "contain" }}
              />
            </Box>
          </Link>
        </Stack>
      </Stack>
    );
  };

  if (isLoading)
    return (
      <Stack sx={{ width: "100%", height: "100%" }}>
        <LinearProgress />
      </Stack>
    );

  if (isError)
    return (
      <Typography textAlign="center" color="error" mt={5}>
        ❌ Failed to load products.
      </Typography>
    );

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        spacing={2}
        pb={2}
      >
        <Stack>
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "16px", lg: "20px" },
              fontWeight: 700,
              fontFamily: "Nunito",
            }}
          >
            {products?.length > 0 ? products?.length : "No"}
            <Typography
              component="span"
              sx={{
                ml: 1,
                color: "#767E94",
                fontSize: { xs: "14px", md: "16px", lg: "20px" },
                fontWeight: 400,
                fontFamily: "Nunito",
              }}
            >
              Results Found
            </Typography>
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1.5} justifyContent="center">
          <FiltrationButton label="Latest" onSelect={handleSelect} />
          <FiltrationButton
            label={`${pageSize} per page`}
            options={options}
            onSelect={handleSelect}
          />
        </Stack>
      </Stack>

      <Grid container spacing={2} maxWidth={"1500px"}>
        {products?.map((product) => (
          <Grid
            item
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
            minWidth={{ xs: "auto", lg: "287px" }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListing;
