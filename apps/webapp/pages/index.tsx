import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import type { NextPage } from 'next'
import React from 'react';

const Home: NextPage = () => {
  return (
    <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
      Main
    </Typography>
  );
}

export default Home
