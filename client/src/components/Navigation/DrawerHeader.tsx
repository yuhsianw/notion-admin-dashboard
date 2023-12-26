import { styled } from '@mui/material/styles';
import React, { PropsWithChildren } from 'react';

export default function DrawerHeader({ children }: PropsWithChildren<{}>) {
  const StyledComponent = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar, // necessary for content to be below app bar
  }));

  return <StyledComponent>{children}</StyledComponent>;
}
