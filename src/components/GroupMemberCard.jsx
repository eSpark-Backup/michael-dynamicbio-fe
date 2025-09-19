import { useState } from "react";
import { toast } from "react-toastify";
import { Avatar, Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";
import {
  useDeleteGroupAdminMutation,
  useMakeGroupAdminMutation,
} from "../services/group";
import { three_vertical_dots, user } from "../assets";
import { toTitleCase } from "../utils";

const GroupMemberCard = ({
  groupId,
  id,
  profile,
  name,
  role,
  groupRole,
  mainType,
  madeBy,
  refetch,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [showPermissionModal, setPermissionModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const HandlePermission = (event) => {
    setSelectedChoice(event);
    setPermissionModal(true);
    handleCloseMenu();
  };

  const [makeAdmin, { isMakeAdminLoading }] = useMakeGroupAdminMutation();
  const [deleteAdmin, { isDeleteAdminLoading }] = useDeleteGroupAdminMutation();

  const handleMakeAdmin = (body) => {
    makeAdmin(body).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        handleCloseModal();
        refetch();
      }
    });
  };

  const handleDeleteAdmin = (body) => {
    deleteAdmin(body).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message);
        handleCloseModal();
        refetch();
      }
    });
  };

  const handleAccept = () => {
    const body = {
      id: groupId,
      credentials: {
        userId: id,
      },
    };
    selectedChoice === "add-admin"
      ? handleMakeAdmin(body)
      : selectedChoice === "remove-admin"
        ? handleDeleteAdmin(body)
        : null;
  };

  const handleCloseModal = () => {
    setPermissionModal(false);
    setSelectedChoice("");
  };

  return (
    <Box
      sx={{
        borderTop: "1px solid #E4E4E4",
        p: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1.5}>
        <Avatar
          alt="Travis Howard"
          src={profile || user}
          sx={{ width: 43, height: 43 }}
        />
        <Stack direction={"column"}>
          <Box sx={{ display: "flex", columnGap: "10px" }}>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}
            >
              {toTitleCase(name)}
            </Typography>
            {groupRole === "owner" && (
              <Box sx={{ p: "2px 10px", backgroundColor: "#d3d3d3" }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
                >
                  Owner
                </Typography>
              </Box>
            )}
            {mainType === "members" && groupRole === "admin" && (
              <Box sx={{ p: "2px 10px", backgroundColor: "#d3d3d3" }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}
                >
                  Admin
                </Typography>
              </Box>
            )}
          </Box>
          <Typography
            sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
          >
            {role || "--"}
          </Typography>
          {mainType === "admins" && groupRole === "admin" && (
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              Made admin by {toTitleCase(madeBy)}
            </Typography>
          )}
          {mainType === "blocked" && (
            <Typography
              sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}
            >
              Blocked by {toTitleCase(madeBy)}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", columnGap: "4px" }}>
        {groupRole !== "owner" && mainType !== "blocked" && (
          <Box
            sx={{
              width: "150px",
              height: "36px",
              borderRadius: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "8px",
                padding: "1px",
                background:
                  "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                WebkitMask:
                  "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude",
              },
              cursor: "pointer",
            }}
          >
            <Typography variant="gradientText">Message</Typography>
          </Box>
        )}
        {groupRole !== "owner" && (
          <img
            src={three_vertical_dots}
            alt=""
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          />
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {mainType === "members" && groupRole === "member" && (
          <>
            <MenuItem onClick={() => HandlePermission("add-admin")}>
              Make Admin
            </MenuItem>
          </>
        )}
        {mainType === "members" && groupRole === "admin" && (
          <>
            <MenuItem onClick={() => HandlePermission("remove-admin")}>
              Remove admin permissions
            </MenuItem>
          </>
        )}
        {mainType === "admins" && groupRole === "admin" && (
          <>
            <MenuItem onClick={() => HandlePermission("remove-admin")}>
              Remove admin permissions
            </MenuItem>
          </>
        )}
      </Menu>

      <ConfirmationModal
        isLoading={isMakeAdminLoading || isDeleteAdminLoading}
        open={showPermissionModal}
        handleClose={handleCloseModal}
        title={
          selectedChoice === "add-admin"
            ? "Make group admin"
            : selectedChoice === "remove-admin"
              ? "Remove admin permissions"
              : selectedChoice === "owner"
                ? "Make group owner"
                : "Unblock from group"
        }
        cancelButtonText={"Cancel"}
        acceptButtonText={"Confirm"}
        handleAccept={handleAccept}
        handleCancel={handleCloseModal}
        sx={{ width: { xs: "90%", sm: "60%", md: "45%", lg: "35%" } }}
      >
        <Typography sx={{ fontSize: 17, fontWeight: 300, color: "#595959" }}>
          {selectedChoice === "add-admin"
            ? `As a group admin, ${toTitleCase(name)} will be able to manage members and conversations.`
            : selectedChoice === "remove-admin"
              ? `As a group member, ${toTitleCase(name)} will not be able to manage members and conversations.`
              : selectedChoice === "owner"
                ? "As a group owner, Default User will be able to remove you from the group, delete the group, edit group details, and manage members and conversations. "
                : "Default User will become a member of the group and be able to interact with the group again. "}
        </Typography>
      </ConfirmationModal>
    </Box>
  );
};

export default GroupMemberCard;
