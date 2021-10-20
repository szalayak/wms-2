import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { NextPage } from "next";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WMS
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <main>
        {children}
      </main>
    </Box>
  );
}
