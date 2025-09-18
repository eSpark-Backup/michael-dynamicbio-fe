import { Button as ButtonBase } from "@mui/material";

const Button = ({ sx, children, ...rest }) => {
  return (
    <ButtonBase
      sx={{ ...sx, span: { color: (theme) => theme.palette.primary.light } }}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
