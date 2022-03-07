import { Box } from "@mui/material";
const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: "Buy ARCANE",
    path: "https://app.uniswap.org/#/swap?outputCurrency=0x58530a272bf650827ae05fadee76f36271089f7f",
    icon: <Box component="img" src="/icons/uniswap.svg" sx={{ width: 24 }} />,
  },
  {
    title: "Chart",
    path: "https://www.dextools.io/app/ether/pair-explorer/0x82299760fe2ccc3282bf5c55849eb15ff184842c",
    icon: <Box component="img" src="/icons/dextools.png" sx={{ width: 20 }} />,
  },
  {
    title: "Contract",
    path: "https://etherscan.io/address/0x58530a272bf650827ae05fadee76f36271089f7f",
    icon: <Box component="img" src="/icons/etherscan.svg" sx={{ width: 20 }} />,
  },
];

export default menuConfig;
