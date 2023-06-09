/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { setMode } from "../features/theme/themeSlice";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "./utils/FlexBetween";
import {
  AccountCircleOutlined,
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search,
} from "@mui/icons-material";
import { useState } from "react";

function Navbar({ user, isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleTheme = (theme) => {
    dispatch(setMode(theme));
  };

  const handleAnchor = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween gap="0.5rem">
          <IconButton
            sx={{
              "&:hover": {
                borderRadius: "6px",
              },
            }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="6px"
            gap="3rem"
            p="0.1rem 1.2rem"
          >
            <InputBase placeholder="Search.." />
            <IconButton onClick={() => console.log("search")}>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* LEFT SIDE */}
        <FlexBetween gap="1rem">
          {theme.palette.mode === "dark" ? (
            <IconButton onClick={() => handleTheme("light")}>
              <DarkModeOutlined sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleTheme("dark")}>
              <LightModeOutlined sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          )}

          <FlexBetween>
            <Button
              onClick={handleAnchor}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "0.5rem",
              }}
            >
              <AccountCircleOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "1.5rem",
                }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.825rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "1.5rem",
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleAnchorClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleAnchorClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
