import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AddHomeIcon from "@mui/icons-material/AddHome";
import HomeIcon from "@mui/icons-material/Home";

const NavSidebar = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuItemsGroups = [
    [
      {
        key: "HousesGroup",
        items: [
          {
            label: "Add House Ad",
            icon: <AddHomeIcon />,
          },
          {
            label: "View House Ads",
            icon: <HomeIcon />,
          },
        ],
      },
    ],
  ];

  const toggleDrawer = (isShowMenu) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setShowMenu(isShowMenu);
  };

  const CustomList = () => (
    <Box
      sx={{ width: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {menuItemsGroups.map((menuItemGroup) => {
        return (
          <>
            <List>
              {menuItemGroup[0].items.map((row) => {
                return (
                  <ListItem key={menuItemGroup.key} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{row.icon}</ListItemIcon>
                      <ListItemText primary={row.label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Divider />
          </>
        );
      })}
    </Box>
  );

  return (
    <div>
      <>
        <Box
          sx={{
            flexGrow: 1,
            width: "100vw",
          }}
        >
          <AppBar position="static">
            <Toolbar
              variant="dense"
              sx={{ backgroundColor: "var(--main-color1dark)" }}
            >
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon onClick={toggleDrawer(true)} />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                onClick={() => {
                  window.location.reload();
                }}
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                GetAPlace
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer anchor={"left"} open={showMenu} onClose={toggleDrawer(false)}>
          {CustomList()}
        </Drawer>
        {children}
      </>
    </div>
  );
};

export default NavSidebar;
