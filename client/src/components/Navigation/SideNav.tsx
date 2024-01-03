/**
 * TODO:  Add mini drawer when closed https://mui.com/material-ui/react-drawer/#mini-variant-drawer
 */
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupIcon from '@mui/icons-material/Group';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import React from 'react';
import DrawerHeader from './DrawerHeader';
import { DRAWER_WIDTH } from '../../config';

interface SideNavProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideNav({ open, setOpen }: SideNavProps) {
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        <ListItem key={'workspaces'} disablePadding>
          <ListItemButton component={Link} to={'/workspaces'}>
            <ListItemIcon>
              <WorkspacesIcon />
            </ListItemIcon>
            <ListItemText primary={'Workspaces'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'users'} disablePadding>
          <ListItemButton component={Link} to={'/users'}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={'Users'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
