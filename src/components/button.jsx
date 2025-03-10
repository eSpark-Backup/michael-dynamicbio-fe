import LoadingButton from "@mui/lab/LoadingButton";

const Button = ({ children, ...rest }) => {
  return <LoadingButton sx={{ span: { color: "#FFF" } }} {...rest}>{children}</LoadingButton>;
};

export default Button;
