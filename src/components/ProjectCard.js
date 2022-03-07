import {
  Box,
  Stack,
  Rating,
  Typography,
  Button,
  Card,
  Divider,
  IconButton,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/StarRounded";
import Moment from "react-moment";

import { useNavigate } from "react-router";
import MoreMenuButton from "components/MoreMenuButton";
import VoteButton from "components/VoteButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const TitleStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  height: 44,
  color: "inherit",
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
}));

const SERVER_URL = "https://arcaneuniverse.com/uploads"; // was http://localhost:5000/uploads

function PromotionCardWrapper({ type, children }) {
  let border;
  switch (type) {
    case "diamond":
      border = "5px solid #ab4bff";
      break;
    case "platinum":
      border = "5px solid #49f0ff";
      break;
    case "gold":
      border = "5px solid #fcd316";
      break;
    case "funded":
      border = "5px solid #5dc35d"; // 339933
      break;
    default:
      border = "none";
      break;
  }
  return (
    <Box
      sx={{
        border: border,
        borderRadius: 3,
        position: "relative",
      }}
    >
      {type !== "default" && (
        <Box
          component="img"
          src={`/promotions/${type}.png`}
          sx={{
            position: "absolute",
            top: 0,
            width: 52,
            marginLeft: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        />
      )}
      {children}
    </Box>
  );
}

export default function ProjectCard({ project, index }) {
  const navigate = useNavigate();
  return (
    <PromotionCardWrapper type={project.promotion}>
      <Card
        sx={{
          width: 1,
          py: 3,
          transition: "all .3s",
          cursor: "pointer",
          "&:hover": {
            boxShadow: (theme) => theme.customShadows.z24,
          },
        }}
      >
        <Box sx={{ px: 3 }} onClick={() => navigate(`/id/${project._id}`)}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ height: 60 }}
            >
              <Typography variant="h5">#{index}</Typography>
              <Typography variant="h5">{project.name}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ThumbUpIcon sx={{ color: "yellow", fontSize: 20 }} />
              <Typography fontSize={19}>{project.voteCount}</Typography>
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Box
              component="img"
              src={`/chains/${project.chain}.png`}
              sx={{ width: 32 }}
            />
          </Stack>
        </Box>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ p: 6, height: 220 }}
          onClick={() => navigate(`/id/${project._id}`)}
        >
          <Box
            component="img"
            src={`${SERVER_URL}/${project.image}`}
            sx={{ borderRadius: 1, maxWidth: 200 }}
          />
        </Stack>

        <Box sx={{ px: 3 }} onClick={() => navigate(`/id/${project._id}`)}>
          <Stack>
            {/* <Typography variant="h5">About</Typography> */}
            <TitleStyle>{project.description}</TitleStyle>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", mt: 2 }} />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ p: 2, pb: 0 }}
        >
          <IconButton target="_blank" href={project.twitter}>
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
          <IconButton target="_blank" href={project.telegram}>
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
          <IconButton target="_blank" href={project.website}>
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2, pb: 0 }}
          spacing={4}
        >
          <VoteButton project={project} />
        </Stack>
      </Card>
    </PromotionCardWrapper>
  );
}
