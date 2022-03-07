import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import Logo from "components/Logo";
// material

import {
  Box,
  Card,
  IconButton,
  Stack,
  TextField,
  Container,
  Typography,
  Button,
  Rating,
  Tooltip,
  Hidden,
} from "@mui/material";

export default function Detailpage() {
  const params = useParams();
  const dispatch = useDispatch();
  const { activateBrowserWallet, account } = useEthers();
  const currentProject = useSelector((state) => state.project.project);
  const [comment, setComment] = useState();
  console.log("currentProject", currentProject);

  return (
    <>
      <Container maxWidth="lg">
        <Card sx={{ p: 5 }}>
          <Stack alignItems="center">
            <Box component="img" src="/logo.png" sx={{ width: 240 }} />
            <Typography variant="h5">
              Arcane; adj understood by few; mysterious or secret. Stealth
              launched on the Ethereum network, the Arcane token isn’t just your
              next Anime coin. We’re proud to present the Arcane token, a
              project that will make ripples and changes in the Anime and
              cryptospheres as we know them.
              <br /> <br />
              Supply:
              <br /> - 100,000,000 ARC
              <br /> - Tax: 12% (6% Arcane Production Fund, 6% Crowdfund)
              <br />
              <br /> Contact:
              <br /> - info@arcaneuniverse.com
            </Typography>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
