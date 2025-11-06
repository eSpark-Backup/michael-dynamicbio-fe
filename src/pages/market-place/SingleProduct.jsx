import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { productId } = useParams();
  return <Box>{productId}</Box>;
};

export default SingleProduct;
