import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { promoteProject } from "redux/slices/project";
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Button,
  Box,
  Stack,
} from "@mui/material";
// ----------------------------------------------------------------------

const PROMOTIONS = [
  { value: "default", label: "Default" },
  { value: "diamond", label: "Diamond" },
  { value: "platinum", label: "Platinum" },
  { value: "gold", label: "Gold" },
  { value: "funded", label: "Funded" },
];
export default function PromoteButton({ project }) {
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <Stack
          direction="row"
          ref={menuRef}
          onClick={handleOpen}
          variant="contained"
          alignItems="center"
          sx={{
            background: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(20px)",
            p: 1,
            borderRadius: 1,
            maxWidth: 140,
            cursor: "pointer",
          }}
        >
          {project.promotion !== "default" && (
            <Box
              component="img"
              src={`/promotions/${project.promotion}.png`}
              sx={{ width: 24 }}
            />
          )}

          <Typography
            variant="body1"
            sx={{ ml: 1, textTransform: "capitalize" }}
          >
            {project.promotion}
          </Typography>
        </Stack>
      </>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%", backdropFilter: "blur(20px)" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {PROMOTIONS.map((item) => (
          <MenuItem
            key={item.value}
            onClick={() => {
              dispatch(promoteProject(project._id, item.value));
              handleClose();
            }}
          >
            <Box
              component="img"
              src={`/promotions/${item.value}.png`}
              sx={{
                width: 32,
                visibility: item.value !== "default" ? "visible" : "hidden",
              }}
            />
            <Typography variant="h6" sx={{ ml: 2 }}>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
