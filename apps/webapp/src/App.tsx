import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import Routes from "./Routes";

function App() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
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
            {t("app-title")}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Routes />
    </React.Fragment>
  );
}

export default App;
