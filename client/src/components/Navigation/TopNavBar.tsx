import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBarProps as MuiAppBarProps,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import React from 'react';
import { drawerWidth } from '../../config/constants';

interface TopNavBarProps extends MuiAppBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopNavBar({ open, setOpen }: TopNavBarProps) {
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Notion Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
