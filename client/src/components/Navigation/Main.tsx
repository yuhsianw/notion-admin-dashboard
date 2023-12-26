import React, { PropsWithChildren } from 'react';
import DrawerHeader from './DrawerHeader';
import { styled } from '@mui/material';
import { drawerWidth } from '../../config/constants';

interface MainProps {
  open: boolean;
}

export default function Main({ open, children }: PropsWithChildren<MainProps>) {
  const StyledComponent = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: `-${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <>
      <StyledComponent open={open}>
        <DrawerHeader />
        {children}
      </StyledComponent>
    </>
  );
}
