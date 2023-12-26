import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBarProps,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import React from 'react';
import { drawerWidth } from '../../config/constants';
import logo from '../../../public/notion-logo.png';

interface AppBarStyledComponentProps extends AppBarProps {
  open?: boolean;
}

const AppBarStyledComponent = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarStyledComponentProps>(({ theme, open }) => ({
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

const LogoStyledComponent = styled('img')(({ theme }) => ({
  height: '30px',
  marginRight: theme.spacing(2),
}));

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
      </Toolbar>
    </AppBarStyledComponent>
  );
}
