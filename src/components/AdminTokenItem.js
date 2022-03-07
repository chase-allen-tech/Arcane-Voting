import { Box, Stack, Rating, Typography, Button } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/StarRounded";

const TitleStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  height: 44,
  color: "inherit",
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
}));

export default function Logo({ token }) {
  return (
    <Box
      sx={{
        width: 1,
        bgcolor: "rgba(255,255,255,0.3)",
        borderRadius: 1,
        height: 300,
        px: 3,
        py: 2,
        transition: "all .3s",
        cursor: "pointer",
        "&:hover": {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box
          component="img"
          src={`chains/${token.chain}.png`}
          sx={{ width: 32 }}
        />
        <Stack direction="row" alignItems="flex-end" spacing={0.5}>
          <StarIcon sx={{ color: "yellow", fontSize: 28 }} />
          <Typography fontSize={19}>4.5</Typography>
        </Stack>

        <Button href={`/edit/${token._id}`}>Edit</Button>
      </Stack>

      <Stack direction="row" sx={{ p: 2 }} spacing={1} alignItems="center">
        <Box component="img" src="shiba.png" sx={{ width: 72 }} />
        <Stack spacing={1}>
          <Typography variant="h6">Shiba Inu</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              sx={{
                minWidth: 38,
                height: 16,
                background: "rgba(255,255,255,0.3)",
                py: 0.5,
                px: 0,
                "&:hover": { background: "rgba(255,255,255,0.5)" },
              }}
            >
              <Box component="img" src="socials/twitter.png" width="20px" />
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: 38,
                height: 16,
                background: "rgba(255,255,255,0.3)",
                py: 0.5,
                px: 0,
                "&:hover": { background: "rgba(255,255,255,0.5)" },
              }}
            >
              <Box component="img" src="socials/youtube.png" width="18px" />
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: 38,
                height: 16,
                background: "rgba(255,255,255,0.3)",
                py: 0.5,
                px: 0,
                "&:hover": { background: "rgba(255,255,255,0.5)" },
              }}
            >
              <Box component="img" src="socials/telegram.png" width="14px" />
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <Typography variant="h5">About</Typography>
        <TitleStyle>
          Lorem Ipsum is simply dummy text of the printing and industry has been
          the industry.
        </TitleStyle>
      </Stack>

      <Stack justifyContent="center" alignItems="center">
        <Typography variant="h6">Presale In:</Typography>
      </Stack>
    </Box>
  );
}
