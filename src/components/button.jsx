import { Button as ButtonBase } from "@mui/material";

const Button = ({ children, ...rest }) => {
  return (
    <ButtonBase
      sx={{ span: { color: (theme) => theme.palette.primary.light } }}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
