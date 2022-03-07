import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useEthers } from "@usedapp/core";
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
      <Container maxWidth="xl">
        <Card sx={{ p: 5 }}>
          <Stack>
            <Box component="img" src="/roadmap1.png" />
          </Stack>
        </Card>
      </Container>
    </>
  );
}
