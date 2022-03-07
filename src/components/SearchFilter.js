import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import {
  InputBase,
  Typography,
  TextField,
  Stack,
  MenuItem,
  Box,
  Select,
  RadioGroup,
  Radio,
  FormControlLabel,
  Hidden,
} from "@mui/material";
import { filterProject } from "redux/slices/project";
import useLocalStorage from "hooks/useLocalStorage";
import SearchInput from "components/SearchInput";

const CHAINS = [
  { value: "all", label: "All" },
  { value: "eth", label: "Ethereum" },
  { value: "bnb", label: "BSC" },
  { value: "sol", label: "Solana" },
  { value: "other", label: "Other" },
];

const SORTS = [
  { value: "default", label: "Default" },
  { value: "new", label: "New" },
  { value: "funded", label: "Funded" },
];

const SearchButton = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useLocalStorage("filters", {
    chain: "all",
    sort: "default",
  });

  const [stateFilters, setStateFilters] = useState(filters);

  useEffect(() => {
    dispatch(filterProject(filters));
  }, [dispatch, filters]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      justifyContent="flex-end"
    >
      <Hidden mdUp>
        <SearchInput />
      </Hidden>
      <Stack direction="row" spacing={3}>
        <Select
          size="small"
          value={filters.chain}
          onChange={(e) => {
            setFilters({ ...filters, chain: e.target.value });
            setStateFilters({ ...filters, chain: e.target.value });
          }}
          fullWidth
          inputProps={{
            sx: {
              display: "flex",
              alignItems: "center",
            },
          }}
          MenuProps={{
            sx: {
              "& .MuiPaper-root": {
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(20px)",
              },
            },
          }}
          sx={{ width: 180 }}
        >
          {CHAINS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value !== "all" && (
                <Box
                  component="img"
                  src={`/chains/${option.value}.png`}
                  sx={{ width: 32, mr: 2 }}
                />
              )}

              {option.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          size="small"
          value={filters.sort}
          onChange={(e) => {
            setFilters({ ...filters, sort: e.target.value });
            setStateFilters({ ...filters, sort: e.target.value });
          }}
          fullWidth
          inputProps={{
            sx: {
              display: "flex",
              alignItems: "center",
            },
          }}
          MenuProps={{
            sx: {
              "& .MuiPaper-root": {
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(20px)",
              },
            },
          }}
          sx={{ width: 160 }}
        >
          {SORTS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};
export default SearchButton;
