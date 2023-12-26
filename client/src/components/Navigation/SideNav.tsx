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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupIcon from '@mui/icons-material/Group';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import React from 'react';
import DrawerHeader from './DrawerHeader';
import { drawerWidth } from '../../config/constants';

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
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
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
          <ListItemButton>
            <ListItemIcon>
              <WorkspacesIcon />
            </ListItemIcon>
            <ListItemText primary={'Workspaces'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'users'} disablePadding>
          <ListItemButton>
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
