import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { phoneArrow } from "../../assets";

const FiltrationButton = ({
  label = "Select Option",
  options = [],
  onSelect,
  buttonVariant = "outlined",
  buttonColor = "primary",
  sx = {},
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState("");

  const handleClick = (event) => {
    if (!onSelect) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setAnchorEl(null);
    if (value) {
      setSelected(value);
      onSelect?.(value);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        disableRipple
        variant={buttonVariant}
        color={buttonColor}
        onClick={handleClick}
        endIcon={
          <Box
            component="img"
            src={phoneArrow}
            alt="arrow"
            sx={{ width: "12px" }}
          />
        }
        sx={{
          gap: 1,
          textTransform: "none",
          fontSize: { xs: "12px", sm: "14px" },
          minWidth: "fit-content",
          fontFamily: "Nunito",
          fontWeight: 400,
          height: "48px",
          color: "#464D61",
          background: "#FFFFFF",
          border: "1px solid #EDEFF5",
          "&:hover": {
            color: "#464D61",
            background: "#FFFFFF",
          },
          ...sx,
        }}
      >
        {selected || label}
      </Button>

      {onSelect && options?.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: {
              boxShadow: "none !important",
              border: "1px solid #EDEFF5",
              "& .MuiList-root": {
                p: 0, 
              },
            },
          }}
        >
          {options.map((opt) => (
            <MenuItem
              key={opt.value}
              onClick={() => handleClose(opt.label)}
              sx={{
                fontFamily: "Nunito",
                fontWeight: 400,
                color: "#464D61",
              }}
            >
              {opt.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default FiltrationButton;
