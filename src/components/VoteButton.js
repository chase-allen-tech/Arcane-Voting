import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useEthers,
  useEtherBalance,
  formatEther,
  useTokenBalance,
} from "@usedapp/core";
import { ethers } from "ethers";
import { voteProject } from "redux/slices/project";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Button,
  Popover,
  Stack,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { ArcaneBalance } from "./ConnectButton";


// ----------------------------------------------------------------------

export default function VoteButton({ project }) {
  const dispatch = useDispatch();
  const { account, activateBrowserWallet, chainId } = useEthers();
  const balance = useEtherBalance(account);
  const accountBalance = balance ? ethers.utils.formatEther(balance) : 0;
  const isHold = ArcaneBalance() >= 1000;
  const isWrong = chainId !== 1;
  const voted = project?.votes?.find((vote) => vote === account);
  return (
    <>
      <>
        {account ? (
          isWrong ? (
            <Button
              fullWidth
              variant="contained"
              disabled
              sx={{
                "&.Mui-disabled": {
                  color: "rgba(255, 255, 255, 0.7)",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Wrong Network
            </Button>
          ) : !isHold ? (
            <Button
              fullWidth
              variant="contained"
              disabled
              sx={{
                "&.Mui-disabled": {
                  color: "rgba(255, 255, 255, 0.7)",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              You need at least 1000 ARC to vote
            </Button>
          ) : (
            <Button
              onClick={() => dispatch(voteProject(project._id, account))}
              fullWidth
              variant="contained"
              color={voted ? "error" : "success"}
              startIcon={voted ? <ThumbDownIcon /> : <ThumbUpIcon />}
            >
              {voted ? "Remove Vote" : "Vote"}
            </Button>
          )
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="warning"
            onClick={activateBrowserWallet}
          >
            Connect Wallet
          </Button>
        )}
      </>
    </>
  );
}
