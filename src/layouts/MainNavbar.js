import { NavLink as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/styles";
import {
  Box,
  Button,
  Stack,
  AppBar,
  Toolbar,
  Container,
  Typography,
  Hidden,
  IconButton,
} from "@mui/material";
// hooks
// components
import Logo from "components/Logo";
import ConnectButton from "components/ConnectButton";
import SearchInput from "components/SearchInput";
import { useEthers } from "@usedapp/core";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 100;
const APP_BAR_DESKTOP = 100;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,

  // backdropFilter: 'blur(10px)',
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const { account } = useEthers();
  const isAdmin = account === process.env.REACT_APP_ADMIN_WALLET;
  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <ToolbarStyle disableGutters>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            height: 1,
            justifyContent: { xs: "space-between", lg: "inherit" },
          }}
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Hidden mdDown>
            <MenuDesktop />
          </Hidden>
          <Hidden mdUp>
            <MenuMobile />
          </Hidden>
        </Container>
      </ToolbarStyle>
    </AppBar>
  );
}
