// material
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
// hooks
import useCountdown from "hooks/useCountdown";
// components

// ----------------------------------------------------------------------

const CountdownStyle = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
}));

// ----------------------------------------------------------------------

export default function CountDown({ date }) {
  const countdown = useCountdown(new Date("2021/12/12"));
  return (
    <CountdownStyle>
      <div>
        <Typography variant="h6">{countdown.days}</Typography>
        {/* <Typography sx={{ color: "text.secondary" }}>Days</Typography> */}
      </div>

      <SeparatorStyle variant="h6">:</SeparatorStyle>

      <div>
        <Typography variant="h6">{countdown.hours}</Typography>
        {/* <Typography sx={{ color: "text.secondary" }}>Hours</Typography> */}
      </div>

      <SeparatorStyle variant="h6">:</SeparatorStyle>

      <div>
        <Typography variant="h6">{countdown.minutes}</Typography>
        {/* <Typography sx={{ color: "text.secondary" }}>Minutes</Typography> */}
      </div>

      <SeparatorStyle variant="h6">:</SeparatorStyle>

      <div>
        <Typography variant="h6">{countdown.seconds}</Typography>
        {/* <Typography sx={{ color: "text.secondary" }}>Seconds</Typography> */}
      </div>
    </CountdownStyle>
  );
}
