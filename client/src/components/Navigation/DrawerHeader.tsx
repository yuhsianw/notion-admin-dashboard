import { styled } from '@mui/material/styles';
import React, { PropsWithChildren } from 'react';

const DrawerHeaderStyledComponent = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-end',
  ...theme.mixins.toolbar, // necessary for content to be below app bar
}));

export default function DrawerHeader({ children }: PropsWithChildren<{}>) {
  return <DrawerHeaderStyledComponent>{children}</DrawerHeaderStyledComponent>;
}
