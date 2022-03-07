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
  IconButton,
  Link,
} from "@mui/material";
// hooks
// components
import Logo from "components/Logo";
import ConnectButton from "components/ConnectButton";
import SearchInput from "components/SearchInput";

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(20px)",
        // height: 80,
        px: 10,
        py: 2,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Button variant="contained" sx="small" color="warning" href="/about">
          About
        </Button>
        <Button variant="contained" sx="small" color="warning" href="/Arcane-Whitepaper.pdf">
          Whitepaper
        </Button>
        <Button variant="contained" sx="small" color="warning" href="/roadmap">
          Roadmap
        </Button>
        <Button variant="contained" sx="small" color="warning" href="https://alpha.arcaneuniverse.com/">
          Alpha dApp
        </Button>

        {/* <Button
          variant="contained"
          sx="small"
          color="warning"
          href="mailto:info@arcaneuniverse.com"
        >
          Contact
        </Button> */}
      </Stack>

      <Link
        href="#"
        sx={{
          color: "white",
          textDecoration: "none",
          fontSize: { xs: 12, md: "initial" },
        }}
      >
        Powered by Arcane Universe &copy; 2021
      </Link>

      <Stack direction="row" spacing={2}>
        <IconButton target="_blank" href="https://twitter.com/ArcaneVerse">
          <Box
            component="img"
            src="/socials/twitter.png"
            sx={{
              width: 40,
              transition: "all 0.2s",
              "&:hover": { transform: "scale(1.3)" },
            }}
          />
        </IconButton>
        <IconButton target="_blank" href="https://t.me/ArcaneVerse">
          <Box
            component="img"
            src="/socials/telegram.png"
            sx={{
              width: 40,
              transition: "all 0.2s",
              "&:hover": { transform: "scale(1.3)" },
            }}
          />
        </IconButton>
        <IconButton target="_blank" href="https://arcaneuniverse.com">
          <Box
            component="img"
            src="/socials/discord.png"
            sx={{
              width: 40,
              transition: "all 0.2s",
              "&:hover": { transform: "scale(1.3)" },
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
}
