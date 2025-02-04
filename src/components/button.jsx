import LoadingButton from "@mui/lab/LoadingButton";

const Button = ({ children, ...rest }) => {
  return <LoadingButton {...rest}>{children}</LoadingButton>;
};

export default Button;
