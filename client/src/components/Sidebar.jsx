import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "./utils/FlexBetween";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AccountCircleOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import navItems from "../utils/navItems";

export default function Sidebar({
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  user,
}) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.light}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    Dashboard
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft sx={{ fontSize: "1.5rem" }} />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      variant="h5"
                      fontWeight="bold"
                      textTransform="Capitalized"
                      sx={{
                        m: "1.5rem 0 0.5rem 1.5rem",
                        color: theme.palette.secondary.main,
                      }}
                    >
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLocaleLowerCase();

                return (
                  <ListItem key={text}>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        bgcolor:
                          active === lcText
                            ? theme.palette.secondary.light
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.secondary.dark
                            : theme.palette.grey.text,
                        py: "0.125rem",
                        borderRadius: "0.125rem",
                        "&:hover": {
                          bgcolor:
                            active === lcText && theme.palette.secondary.main,
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "0.5rem",
                          color:
                            active === lcText
                              ? theme.palette.secondary.dark
                              : theme.palette.grey.text,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box
            position="absolute"
            bottom="1.5rem"
          >
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="0.725rem 0 0 2rem"
            >
              <AccountCircleOutlined
                sx={{
                  color: theme.palette.secondary.light,
                  fontSize: "1.5rem",
                }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.grey.text }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.725rem"
                  sx={{ color: theme.palette.secondary.light }}
                >
                  {user.email}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.grey.text,
                  fontSize: "1.5rem",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}
