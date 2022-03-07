import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProject,
  approveProject,
  fundProject,
} from "redux/slices/project";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, Typography, IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
// ----------------------------------------------------------------------

export default function AdminMoreMenuButton({ project }) {
  const navigate = useNavigate();
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
        <IconButton ref={menuRef} onClick={handleOpen}>
          <MoreVertIcon sx={{ color: "white" }} />
        </IconButton>
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
        <MenuItem onClick={() => dispatch(approveProject(project._id))}>
          {project?.approved ? (
            <>
              <CloseIcon color="error" />
              <Typography color="error" variant="body2" sx={{ ml: 2 }}>
                Deny
              </Typography>
            </>
          ) : (
            <>
              <CheckIcon color="warning" />
              <Typography color="warning.main" variant="body2" sx={{ ml: 2 }}>
                Approve
              </Typography>
            </>
          )}
        </MenuItem>

        {/* <MenuItem onClick={() => dispatch(fundProject(project._id))}>
          {project?.funded ? (
            <>
              <AttachMoneyIcon color="warning" />
              <Typography color="warning.main" variant="body2" sx={{ ml: 2 }}>
                Funded
              </Typography>
            </>
          ) : (
            <>
              <MoneyOffIcon color="error" />
              <Typography color="error" variant="body2" sx={{ ml: 2 }}>
                Unfunded
              </Typography>
            </>
          )}
        </MenuItem> */}

        <MenuItem onClick={() => navigate(`/edit/${project._id}`)}>
          <BorderColorIcon color="info" />
          <Typography color="info.main" variant="body2" sx={{ ml: 2 }}>
            Edit
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => dispatch(deleteProject(project._id))}>
          <DeleteIcon color='error' />
          <Typography color='error.main' variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
