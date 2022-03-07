import { Box, Stack, Divider, Avatar, Typography } from "@mui/material";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";

export default function CommentItem({ comment }) {
  const { account, text } = comment;
  const avatar = createAvatar(style, { seed: account });
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.4)", py: 2 }}
      >
        {/* <Box component="img" src={avatar} /> */}

        <Avatar
          size="large"
          src={avatar}
          sx={{ width: 56, height: 56, bgcolor: "rgba(255, 255, 255, 0.4)" }}
        >
          <Box
            dangerouslySetInnerHTML={{ __html: avatar }}
            style={{ width: 40, height: 40 }}
          />
        </Avatar>
        <Stack>
          <Typography variant="h6">{`${account.slice(0, 6)}...${account.slice(
            -6
          )}`}</Typography>
          <Typography>{text}</Typography>
        </Stack>
      </Stack>
    </>
  );
}
