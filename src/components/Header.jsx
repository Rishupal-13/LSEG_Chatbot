import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { IconButton } from "@mui/material";
function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton sx={{color:"white"}}>
          <SmartToyIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LSEG Chatbot
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
