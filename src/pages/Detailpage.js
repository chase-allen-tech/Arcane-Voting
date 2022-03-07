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
import Moment from "react-moment";
import { getProjectById, leaveComment } from "redux/slices/project";
import CommentItem from "components/CommentItem";
import Scrollbar from "components/Scrollbar";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarIcon from "@mui/icons-material/StarRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VoteButton from "components/VoteButton";

const SERVER_URL = "https://arcaneuniverse.com/uploads"; // was http://localhost:5000/uploads

export default function Detailpage() {
  const params = useParams();
  const dispatch = useDispatch();
  const { activateBrowserWallet, account } = useEthers();
  const currentProject = useSelector((state) => state.project.project);
  const [comment, setComment] = useState();
  console.log("currentProject", currentProject);

  useEffect(() => {
    try {
      dispatch(getProjectById(params.id));
    } catch (error) {
      console.log("Error occured")
    }
  }, [dispatch, params.id, account]);

  const handleSubmit = () => {
    const data = {
      id: currentProject._id,
      text: comment,
      account,
    };
    dispatch(leaveComment(data));
  };

  return (
    <>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
          <IconButton disableRipple component={RouterLink} to="/">
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography>Go Back</Typography>
        </Stack>
        <Card sx={{ p: 5 }}>
          <Stack direction="row" justifyContent="space-between">
            <Box
              component="img"
              src={`/chains/${currentProject.chain}.png`}
              sx={{ width: 40, height: 40 }}
            />
            <Stack direction="row" alignItems="center" spacing={1}>
              <ThumbUpIcon sx={{ color: "yellow", fontSize: 32 }} />
              <Typography variant="h4">{currentProject?.voteCount}</Typography>
            </Stack>
          </Stack>
          <Stack alignItems="center" sx={{ position: "relative" }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ width: 240, height: 240 }}
            >
              <Box
                component="img"
                src={`${SERVER_URL}/${currentProject.image}`}
                sx={{ width: 1, borderRadius: 1, mt: { xs: 15, md: 0 } }}
              />
              <Box sx={{ position: "absolute", right: 0, top: "10px" }}>
                <VoteButton project={currentProject} />
              </Box>
            </Stack>
            <Typography variant="h3" sx={{ mt: 1 }}>
              {currentProject.name}
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ p: 2, pb: 0 }}
            >
              <IconButton target="_blank" href={currentProject.twitter}>
                <Box
                  component="img"
                  src="/socials/twitter.png"
                  sx={{
                    width: 24,
                    transition: "all 0.2s",
                    "&:hover": { transform: "scale(1.3)" },
                  }}
                />
              </IconButton>
              <IconButton target="_blank" href={currentProject.telegram}>
                <Box
                  component="img"
                  src="/socials/telegram.png"
                  sx={{
                    width: 24,
                    transition: "all 0.2s",
                    "&:hover": { transform: "scale(1.3)" },
                  }}
                />
              </IconButton>
              <IconButton target="_blank" href={currentProject.website}>
                <Box
                  component="img"
                  src="/socials/website.png"
                  sx={{
                    width: 24,
                    transition: "all 0.2s",
                    "&:hover": { transform: "scale(1.3)" },
                  }}
                />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ mb: 3, mt: 3 }}>
            <Typography variant="h6">{currentProject.description}</Typography>
          </Stack>
          <Stack sx={{ maxHeight: 300 }}>
            <Scrollbar>
              {currentProject.comments?.map((comment, index) => (
                <CommentItem key={index} comment={comment} />
              ))}
            </Scrollbar>
          </Stack>
          <Stack sx={{ mt: 3 }} spacing={{ xs: 3, sm: 2 }}>
            <TextField
              label="Leave your comment"
              fullWidth
              multiline
              rows={3}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              size="large"
              variant="contained"
              color="warning"
              onClick={account ? handleSubmit : activateBrowserWallet}
              disabled={!comment}
              sx={{
                "&.Mui-disabled": {
                  color: "rgba(255, 255, 255, 0.7)",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              {account ? "Leave a Comment" : "Connect Wallet"}
            </Button>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
