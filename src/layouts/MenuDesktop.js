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

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const { account } = useEthers();
  const isAdmin = account === process.env.REACT_APP_ADMIN_WALLET;
  return (
    <Stack flexGrow={1} direction="row" alignItems="center">
      <Stack direction="row" spacing={2}>
        <Button
          target="_blank"
          color="info"
          sx={{
            color: "white",
            border: "none",
            px: 2,
            transition: "all 0.2s",
            "&:hover": { transform: "scale(1.1)", background: "#a72fd2" },
            background: "#a72fd2",
          }}
          href="https://app.uniswap.org/#/swap?outputCurrency=0x58530a272bf650827ae05fadee76f36271089f7f"
          startIcon={
            <Box component="img" src="/icons/uniswap.svg" sx={{ width: 24 }} />
          }
        >
          Buy ARCANE
        </Button>
        <Button
          target="_blank"
          color="info"
          sx={{
            color: "white",
            border: "none",
            px: 2,
            transition: "all 0.2s",
            "&:hover": { transform: "scale(1.1)", background: "#a72fd2" },
            background: "#a72fd2",
          }}
          href="https://www.dextools.io/app/ether/pair-explorer/0x82299760fe2ccc3282bf5c55849eb15ff184842c"
          startIcon={
            <Box component="img" src="/icons/dextools.png" sx={{ width: 20 }} />
          }
        >
          Chart
        </Button>
        <Button
          target="_blank"
          color="info"
          sx={{
            color: "white",
            border: "none",
            px: 2,
            transition: "all 0.2s",
            "&:hover": { transform: "scale(1.1)", background: "#a72fd2" },
            background: "#a72fd2",
          }}
          href="https://etherscan.io/address/0x58530a272bf650827ae05fadee76f36271089f7f"
          startIcon={
            <Box
              component="img"
              src="/icons/etherscan.svg"
              sx={{ width: 20 }}
            />
          }
        >
          Contract
        </Button>
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
      <Stack direction="row" spacing={2}>
        <Hidden mdDown>
          <SearchInput />
        </Hidden>

        {isAdmin && (
          <Button variant="contained" href="/admin">
            Admin
          </Button>
        )}

        <Button variant="contained" href="/submit">
          Submit
        </Button>
        <ConnectButton />
      </Stack>
    </Stack>
  );
}
