import { useLocation, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
//
import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";
import Scrollbar from "components/Scrollbar";

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      <Scrollbar>
        <Box
        sx={{
          minHeight: '100vh',
          background: "linear-gradient(to right, #fc5c7d, #6a82fb)",
        }}
        >
          <MainNavbar />
          <Box sx={{ py: 4 }}>
            <Outlet />
          </Box>
          <MainFooter />
        </Box>
      </Scrollbar>
    </>
  );
}
