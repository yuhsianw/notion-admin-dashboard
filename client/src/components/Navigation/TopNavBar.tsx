import MenuIcon from '@mui/icons-material/Menu';
import { AppBarProps, Toolbar, IconButton, Typography } from '@mui/material';
import React from 'react';
import logo from '../../../public/notion-logo.png';
import {
  AppBarStyledComponent,
  LogoStyledComponent,
} from '../StyledComponents';
import ColorModeToggle from './ColorModeToggle';

interface TopNavBarProps extends AppBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopNavBar({ open, setOpen }: TopNavBarProps) {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppBarStyledComponent position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}>
          <MenuIcon />
        </IconButton>
        <LogoStyledComponent src={logo} alt="logo"></LogoStyledComponent>
        <Typography variant="h6" noWrap component="div">
          Notion Admin Dashboard
        </Typography>
        <ColorModeToggle />
      </Toolbar>
    </AppBarStyledComponent>
  );
}
