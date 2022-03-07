import { useState } from "react";
import {
  Pagination,
  Box,
  Stack,
  Button,
  Menu,
  MenuItem,
  Icon,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function PaginatedList({
  pageSize,
  currentPage,
  dataList,
  handlePageChange,
  handlePageSizeChange,
  children,
}) {
  const PAGE_OPTIONS = [12, 24, 36];

  const [open, setOpen] = useState(false);

  const pageCount = Math.ceil(dataList?.length / pageSize);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {children}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Stack direction="row">
          <Button
            color="inherit"
            disableRipple
            onClick={handleOpen}
            endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          >
            Items per page: &nbsp;
            <Typography
              component="span"
              variant="subtitle2"
              sx={{ color: "text.secondary" }}
            >
              {pageSize}
            </Typography>
          </Button>
          <Menu
            keepMounted
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{ sx: { backdropFilter: "blur(20px)" } }}
          >
            {PAGE_OPTIONS.map((option) => (
              <MenuItem
                key={option}
                selected={option === pageSize}
                onClick={() => {
                  handlePageSizeChange(option);
                  handleClose();
                }}
                sx={{ typography: "body2" }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
        <Pagination
          color="primary"
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </Box>
  );
}
