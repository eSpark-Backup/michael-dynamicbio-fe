import LoadingButton from "@mui/lab/LoadingButton";

const Button = ({ children, ...rest }) => {
  return (
    <LoadingButton
      sx={{ span: { color: (theme) => theme.palette.primary.light } }}
      {...rest}
    >
      {children}
    </LoadingButton>
  );
};

export default Button;
