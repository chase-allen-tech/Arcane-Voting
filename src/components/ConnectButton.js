import { Button } from "@mui/material";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { ethers } from "ethers";
import { ArcaneAddress } from "constants/address";

export function ArcaneBalance() {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const arcaneBalanceBigNumber = useTokenBalance(ArcaneAddress, account);
  const arcaneBalance =
    arcaneBalanceBigNumber &&
    ethers.utils.formatUnits(arcaneBalanceBigNumber, 9);
  return arcaneBalance;
}

export default function ConnectButton() {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  console.log("ArcaneBalance:", ArcaneBalance());
  return (
    <>
      {account ? (
        <Button variant="contained" onClick={deactivate}>
          {`${account.slice(0, 6)}...${account.slice(-6)}`}
        </Button>
      ) : (
        <Button variant="contained" onClick={activateBrowserWallet}>
          Connect Wallet
        </Button>
      )}
    </>
  );
}
